const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync, exec } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const POSTS_DIR = path.join(ROOT, 'source', '_posts');
const PUBLIC_DIR = path.join(ROOT, 'public');
const PORT = 3456;

// --- Helpers ---
function normalizeArray(val) {
  if (val == null) return [];
  if (Array.isArray(val)) return val.flat().filter(Boolean);
  return [String(val)];
}

// --- MIME types ---
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.eot': 'application/vnd.ms-fontobject',
  '.xml': 'application/xml',
  '.map': 'application/json',
};

// --- Last build state ---
let lastBuild = null; // { time, ok, output }
let buildInProgress = false;

// --- Helpers ---
function sendJSON(res, code, data) {
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(data));
}

function sendError(res, code, msg) {
  sendJSON(res, code, { error: msg });
}

// --- Run a command, return promise ---
function runCmd(cmd, cwd = ROOT) {
  return new Promise((resolve, reject) => {
    exec(cmd, { cwd, maxBuffer: 10 * 1024 * 1024 }, (err, stdout, stderr) => {
      if (err) reject(stderr || err.message);
      else resolve(stdout);
    });
  });
}

// --- Safe git wrapper ---
function git(args) {
  try {
    return execSync(`git ${args}`, { cwd: ROOT, encoding: 'utf-8', timeout: 15000 }).trim();
  } catch {
    return null;
  }
}

// --- Parse front matter ---
function parseFrontMatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { frontMatter: {}, body: content, rawFront: '' };
  const rawFront = match[1];
  const body = match[2].trimStart();
  const fm = {};
  let currentKey = null;
  for (const line of rawFront.split('\n')) {
    const keyMatch = line.match(/^(\w+):\s*(.*)/);
    const listItemMatch = line.match(/^\s*-\s*(.+)/);
    if (keyMatch) {
      currentKey = keyMatch[1];
      let val = keyMatch[2].trim();
      if (val === '') {
        fm[currentKey] = [];
      } else if (val.startsWith('[') && val.endsWith(']')) {
        fm[currentKey] = val.slice(1, -1).split(',').map(s => s.trim().replace(/^['"]|['"]$/g, ''));
      } else {
        fm[currentKey] = val.replace(/^['"]|['"]$/g, '');
      }
    } else if (listItemMatch && currentKey) {
      const val = listItemMatch[1].replace(/^['"]|['"]$/g, '');
      if (Array.isArray(fm[currentKey])) {
        fm[currentKey].push(val);
      } else {
        fm[currentKey] = [val];
      }
    }
  }
  // Handle nested category format like: categories: - [热点追踪, 每日报告]
  const rawLines = rawFront.split('\n');
  const cats = [];
  for (const line of rawLines) {
    const catMatch = line.match(/^\s*-\s*\[(.+?)\]/);
    if (catMatch) {
      cats.push(catMatch[1].split(',').map(s => s.trim()));
    }
  }
  if (cats.length > 0) {
    fm.categories = cats.length === 1 ? cats[0] : cats;
  }
  return { frontMatter: fm, body, rawFront };
}

function buildFrontMatter(fm) {
  let out = '---\n';
  for (const [key, val] of Object.entries(fm)) {
    if (key === 'categories' && Array.isArray(val) && val.length > 0) {
      out += 'categories:\n';
      if (Array.isArray(val[0])) {
        for (const sub of val) out += `- [${sub.join(', ')}]\n`;
      } else {
        for (const cat of val) out += `- ${cat}\n`;
      }
    } else if (key === 'tags' && Array.isArray(val) && val.length > 0) {
      out += 'tags:\n';
      for (const tag of val) {
        out += tag.includes(' ') ? `- "${tag}"\n` : `- ${tag}\n`;
      }
    } else if (typeof val === 'string') {
      out += `${key}: ${val}\n`;
    }
  }
  out += '---\n';
  return out;
}

// --- Walk all posts ---
function getAllPosts(dir, basePath = '') {
  const entries = [];
  try {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const full = path.join(dir, item.name);
      const rel = basePath ? `${basePath}/${item.name}` : item.name;
      if (item.isDirectory()) {
        entries.push(...getAllPosts(full, rel));
      } else if (item.isFile() && item.name.endsWith('.md') && item.name !== 'README.md') {
        entries.push({ path: full, relPath: rel });
      }
    }
  } catch {}
  return entries;
}

// --- Serve directory listing for /blog/ ---
function serveDir(dirPath, reqUrl, res) {
  // Try exact file first
  let filePath = path.join(dirPath, reqUrl);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    const content = fs.readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(content);
    return true;
  }
  // Try index.html for directories
  let indexPath = path.join(filePath, 'index.html');
  if (fs.existsSync(indexPath)) {
    const content = fs.readFileSync(indexPath);
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(content);
    return true;
  }
  // Fallback: try adding .html (Hexo sometimes generates post.html)
  if (!path.extname(filePath)) {
    let htmlPath = filePath + '.html';
    if (fs.existsSync(htmlPath)) {
      const content = fs.readFileSync(htmlPath);
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(content);
      return true;
    }
  }
  // Try 404.html
  indexPath = path.join(dirPath, '404.html');
  if (fs.existsSync(indexPath)) {
    const content = fs.readFileSync(indexPath);
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(content);
    return true;
  }
  return false;
}

// --- Routes ---
function handleRequest(req, res) {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const method = req.method;
  const pathname = url.pathname;

  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // --- Serve generated blog ---
  if (pathname.startsWith('/blog') || pathname.startsWith('/blog/')) {
    const relPath = pathname.replace(/^\/blog/, '') || '/';
    const found = serveDir(PUBLIC_DIR, relPath, res);
    if (found) return;
    // Last resort: redirect to /
    res.writeHead(302, { Location: '/blog/' });
    res.end();
    return;
  }

  // --- API: Status (git + build) ---
  if (pathname === '/api/status' && method === 'GET') {
    const status = {
      build: lastBuild,
      building: buildInProgress,
      git: {},
      categories: [],
      tags: [],
    };

    // Git status
    const branch = git('rev-parse --abbrev-ref HEAD');
    status.git.branch = branch;

    const dirty = git('status --porcelain');
    status.git.dirty = dirty ? dirty.split('\n').filter(Boolean).length : 0;
    status.git.clean = status.git.dirty === 0;

    const behind = git('rev-list --count HEAD..@{u}');
    status.git.behind = behind ? parseInt(behind) : 0;
    const ahead = git('rev-list --count @{u}..HEAD');
    status.git.ahead = ahead ? parseInt(ahead) : 0;

    const lastCommit = git('log -1 --format=%h %s %ai');
    status.git.lastCommit = lastCommit;

    // Collect categories and tags from all posts
    const allPosts = getAllPosts(POSTS_DIR);
    const catSet = new Set();
    const tagSet = new Set();
    for (const p of allPosts) {
      try {
        const content = fs.readFileSync(p.path, 'utf-8');
        const { frontMatter } = parseFrontMatter(content);
        const cats = frontMatter.categories || [];
        for (const c of Array.isArray(cats) ? cats : [cats]) {
          if (Array.isArray(c)) { c.forEach(x => catSet.add(x)); }
          else if (typeof c === 'string') { catSet.add(c); }
        }
        const tags = frontMatter.tags || [];
        for (const t of Array.isArray(tags) ? tags : [tags]) {
          if (typeof t === 'string') tagSet.add(t);
        }
      } catch {}
    }
    status.categories = [...catSet].sort();
    status.tags = [...tagSet].sort();

    sendJSON(res, 200, status);
    return;
  }

  // --- API: Build ---
  if (pathname === '/api/build' && method === 'POST') {
    if (buildInProgress) {
      sendJSON(res, 200, { ok: false, message: '正在构建中，请稍候...' });
      return;
    }
    buildInProgress = true;
    runCmd('npx hexo generate', ROOT)
      .then(stdout => {
        lastBuild = { time: Date.now(), ok: true, output: stdout };
        buildInProgress = false;
        sendJSON(res, 200, { ok: true, output: stdout });
      })
      .catch(stderr => {
        lastBuild = { time: Date.now(), ok: false, output: stderr || '构建失败' };
        buildInProgress = false;
        sendJSON(res, 200, { ok: false, output: stderr || '构建失败' });
      });
    return;
  }

  // --- API: Deploy (build + git commit + push) ---
  if (pathname === '/api/deploy' && method === 'POST') {
    if (buildInProgress) {
      sendJSON(res, 200, { ok: false, message: '正在构建中，请稍候...' });
      return;
    }

    // We'll do this sequentially and stream back, but for simplicity, do it all and return result
    buildInProgress = true;
    let results = [];

    // Step 1: Build
    runCmd('npx hexo generate', ROOT)
      .then(out => {
        lastBuild = { time: Date.now(), ok: true, output: out };
        results.push('✅ hexo generate 完成');
        // Step 2: Git add
        return runCmd('git add -A', ROOT);
      })
      .then(() => {
        results.push('✅ git add 完成');
        // Step 3: Check if anything to commit
        const status = git('status --porcelain');
        if (!status) {
          results.push('ℹ️ 没有改动需要提交');
          buildInProgress = false;
          return sendJSON(res, 200, { ok: true, results, pushed: false, message: '没有改动' });
        }
        // Step 4: Git commit
        const fileCount = status.split('\n').length;
        const dateStr = new Date().toISOString().slice(0, 19).replace('T', ' ');
        return runCmd(`git commit -m "📝 编辑器更新 ${dateStr}"`, ROOT);
      })
      .then(out => {
        results.push(`✅ git commit: ${out ? out.trim().split('\n')[0] : ''}`);
        // Step 5: Git push
        return runCmd('git push origin source', ROOT);
      })
      .then(out => {
        results.push('✅ git push 完成，GitHub Actions 将自动部署');
        buildInProgress = false;
        sendJSON(res, 200, { ok: true, results, pushed: true });
      })
      .catch(err => {
        results.push('❌ ' + err);
        buildInProgress = false;
        sendJSON(res, 200, { ok: false, results, error: err });
      });
    return;
  }

  // --- API: List posts ---
  if (pathname === '/api/posts' && method === 'GET') {
    const allPosts = getAllPosts(POSTS_DIR);
    const posts = allPosts.map(p => {
      try {
        const content = fs.readFileSync(p.path, 'utf-8');
        const { frontMatter, body } = parseFrontMatter(content);
        const stats = fs.statSync(p.path);
        // Determine if draft
        const postDate = frontMatter.date ? new Date(frontMatter.date) : null;
        const isDraft = frontMatter.draft === true || frontMatter.draft === 'true' || 
                        (postDate && postDate > new Date());
        return {
          relPath: p.relPath,
          title: frontMatter.title || path.basename(p.relPath, '.md'),
          date: frontMatter.date || stats.mtime.toISOString(),
          categories: normalizeArray(frontMatter.categories),
          tags: normalizeArray(frontMatter.tags),
          draft: isDraft,
          excerpt: body.trim().slice(0, 150).replace(/\n/g, ' '),
        };
      } catch {
        return null;
      }
    }).filter(Boolean);
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    sendJSON(res, 200, posts);
    return;
  }

  // --- API: Get single post ---
  const getMatch = pathname.match(/^\/api\/posts\/(.+)$/);
  if (getMatch && method === 'GET') {
    const relPath = decodeURIComponent(getMatch[1]);
    const fullPath = path.resolve(POSTS_DIR, relPath);
    if (!fullPath.startsWith(POSTS_DIR)) return sendError(res, 403, 'Forbidden');
    try {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const { frontMatter, body } = parseFrontMatter(content);
      sendJSON(res, 200, { ...frontMatter, body, _path: relPath });
    } catch (e) {
      sendError(res, 404, 'Not found');
    }
    return;
  }

  // --- API: Save post ---
  if (getMatch && method === 'PUT') {
    const relPath = decodeURIComponent(getMatch[1]);
    const fullPath = path.resolve(POSTS_DIR, relPath);
    if (!fullPath.startsWith(POSTS_DIR)) return sendError(res, 403, 'Forbidden');
    let bodyData = '';
    req.on('data', chunk => bodyData += chunk);
    req.on('end', () => {
      try {
        const data = JSON.parse(bodyData);
        const fm = {};
        for (const [key, val] of Object.entries(data)) {
          if (key !== 'body') fm[key] = val;
        }
        const fmStr = buildFrontMatter(fm);
        const dir = path.dirname(fullPath);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(fullPath, fmStr + (data.body || ''), 'utf-8');
        sendJSON(res, 200, { ok: true });
      } catch (e) {
        sendError(res, 500, e.message);
      }
    });
    return;
  }

  // --- API: Delete post ---
  if (getMatch && method === 'DELETE') {
    const relPath = decodeURIComponent(getMatch[1]);
    const fullPath = path.resolve(POSTS_DIR, relPath);
    if (!fullPath.startsWith(POSTS_DIR)) return sendError(res, 403, 'Forbidden');
    try {
      fs.unlinkSync(fullPath);
      sendJSON(res, 200, { ok: true });
    } catch (e) {
      sendError(res, 500, e.message);
    }
    return;
  }

  // --- Serve editor static files ---
  let filePath = path.join(__dirname, 'public', pathname === '/' ? 'index.html' : pathname);
  const ext = path.extname(filePath);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Fallback to index.html for SPA
      fs.readFile(path.join(__dirname, 'public', 'index.html'), (err2, data2) => {
        if (err2) { res.writeHead(404); res.end('Not found'); return; }
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(data2);
      });
      return;
    }
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
}

const server = http.createServer(handleRequest);
server.listen(PORT, '0.0.0.0', () => {
  console.log(`📝 Blog Editor running at http://localhost:${PORT}`);
  console.log(`📂 Posts: ${POSTS_DIR}`);
  console.log(`📖 Blog preview: http://localhost:${PORT}/blog/ (after build)`);
});
