const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const POSTS_DIR = path.join(ROOT, 'source', '_posts');
const WORKSERVER_TARGET = 8889;
const PROXY_PORT = 8888;
const EDITOR_PORT = 3457;

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
};

function proxyTo(targetPort, req, res, pathPrefix = '') {
  const url = new URL(req.url, `http://localhost:${PROXY_PORT}`);
  const options = {
    hostname: '127.0.0.1',
    port: targetPort,
    path: pathPrefix + url.pathname + url.search,
    method: req.method,
    headers: { ...req.headers, host: `localhost:${targetPort}` },
  };
  const proxy = http.request(options, (pres) => {
    res.writeHead(pres.statusCode, pres.headers);
    pres.pipe(res);
  });
  proxy.on('error', () => {
    res.writeHead(502);
    res.end('Proxy error');
  });
  req.pipe(proxy);
}

function sendJSON(res, code, data) {
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(data));
}

function sendError(res, code, msg) {
  sendJSON(res, code, { error: msg });
}

function parseFrontMatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { frontMatter: {}, body: content };
  const rawFront = match[1];
  const body = match[2].trimStart();
  const fm = {};
  let currentKey = null;
  for (const line of rawFront.split('\n')) {
    const keyMatch = line.match(/^(\w+):\s*(.*)/);
    const listMatch = line.match(/^\s*-\s*(.+)/);
    const catListMatch = line.match(/^\s*-\s*\[(.+?)\]/);
    if (keyMatch) {
      currentKey = keyMatch[1];
      let val = keyMatch[2].trim();
      if (val === '') fm[currentKey] = [];
      else if (val.startsWith('[') && val.endsWith(']'))
        fm[currentKey] = val.slice(1, -1).split(',').map(s => s.trim().replace(/^['"]|['"]$/g, ''));
      else fm[currentKey] = val.replace(/^['"]|['"]$/g, '');
    } else if (catListMatch && currentKey) {
      if (!Array.isArray(fm[currentKey])) fm[currentKey] = [];
      fm[currentKey].push(catListMatch[1].split(',').map(s => s.trim()));
    } else if (listMatch && currentKey) {
      if (!Array.isArray(fm[currentKey])) fm[currentKey] = [];
      fm[currentKey].push(listMatch[1].replace(/^['"]|['"]$/g, ''));
    }
  }
  return { frontMatter: fm, body };
}

function buildFrontMatter(fm) {
  let out = '---\n';
  for (const [key, val] of Object.entries(fm)) {
    if (key === 'categories' && Array.isArray(val) && val.length > 0) {
      out += 'categories:\n';
      if (Array.isArray(val[0])) for (const sub of val) out += `- [${sub.join(', ')}]\n`;
      else for (const c of val) out += `- ${c}\n`;
    } else if (key === 'tags' && Array.isArray(val) && val.length > 0) {
      out += 'tags:\n';
      for (const t of val) out += `- ${t.includes(' ') ? `"${t}"` : t}\n`;
    } else if (typeof val === 'string') out += `${key}: ${val}\n`;
  }
  out += '---\n';
  return out;
}

function getAllPosts(dir, basePath = '') {
  const entries = [];
  try {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const full = path.join(dir, item.name);
      const rel = basePath ? `${basePath}/${item.name}` : item.name;
      if (item.isDirectory()) entries.push(...getAllPosts(full, rel));
      else if (item.isFile() && item.name.endsWith('.md') && item.name !== 'README.md')
        entries.push({ path: full, relPath: rel });
    }
  } catch {}
  return entries;
}

function handleEditorAPI(req, res) {
  const url = new URL(req.url, `http://localhost:${PROXY_PORT}`);
  const method = req.method;

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (method === 'OPTIONS') { res.writeHead(204); res.end(); return true; }

  if (url.pathname === '/editor/api/posts' && method === 'GET') {
    const allPosts = getAllPosts(POSTS_DIR);
    const posts = allPosts.map(p => {
      try {
        const content = fs.readFileSync(p.path, 'utf-8');
        const { frontMatter } = parseFrontMatter(content);
        const stats = fs.statSync(p.path);
        return {
          relPath: p.relPath, title: frontMatter.title || path.basename(p.relPath, '.md'),
          date: frontMatter.date || stats.mtime.toISOString(),
          categories: frontMatter.categories || [], tags: frontMatter.tags || [],
        };
      } catch { return null; }
    }).filter(Boolean);
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    sendJSON(res, 200, posts);
    return true;
  }

  const pathMatch = url.pathname.match(/^\/editor\/api\/posts\/(.+)$/);
  if (pathMatch && method === 'GET') {
    const relPath = decodeURIComponent(pathMatch[1]);
    const fullPath = path.resolve(POSTS_DIR, relPath);
    if (!fullPath.startsWith(POSTS_DIR)) { sendError(res, 403, 'Forbidden'); return true; }
    try {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const { frontMatter, body } = parseFrontMatter(content);
      sendJSON(res, 200, { ...frontMatter, body, _path: relPath });
    } catch { sendError(res, 404, 'Not found'); }
    return true;
  }

  if (pathMatch && method === 'PUT') {
    const relPath = decodeURIComponent(pathMatch[1]);
    const fullPath = path.resolve(POSTS_DIR, relPath);
    if (!fullPath.startsWith(POSTS_DIR)) { sendError(res, 403, 'Forbidden'); return true; }
    let bodyData = '';
    req.on('data', c => bodyData += c);
    req.on('end', () => {
      try {
        const data = JSON.parse(bodyData);
        const fm = {};
        for (const [k, v] of Object.entries(data)) if (k !== 'body') fm[k] = v;
        const dir = path.dirname(fullPath);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(fullPath, buildFrontMatter(fm) + (data.body || ''), 'utf-8');
        sendJSON(res, 200, { ok: true });
      } catch (e) { sendError(res, 500, e.message); }
    });
    return true;
  }

  if (url.pathname === '/editor/api/build' && method === 'POST') {
    try {
      const out = execSync('npx hexo generate', { cwd: ROOT, encoding: 'utf-8' });
      sendJSON(res, 200, { ok: true, output: out });
    } catch (e) { sendJSON(res, 200, { ok: false, output: e.stderr || e.message }); }
    return true;
  }

  if (url.pathname === '/editor/api/categories' && method === 'GET') {
    const catSet = new Set();
    for (const p of getAllPosts(POSTS_DIR)) {
      try {
        const { frontMatter } = parseFrontMatter(fs.readFileSync(p.path, 'utf-8'));
        const cats = frontMatter.categories || [];
        for (const c of Array.isArray(cats) ? cats : [cats]) {
          if (Array.isArray(c)) c.forEach(x => catSet.add(x));
          else if (typeof c === 'string') catSet.add(c);
        }
      } catch {}
    }
    sendJSON(res, 200, [...catSet].sort());
    return true;
  }

  if (url.pathname === '/editor/api/tags' && method === 'GET') {
    const tagSet = new Set();
    for (const p of getAllPosts(POSTS_DIR)) {
      try {
        const { frontMatter } = parseFrontMatter(fs.readFileSync(p.path, 'utf-8'));
        const tags = frontMatter.tags || [];
        for (const t of Array.isArray(tags) ? tags : [tags])
          if (typeof t === 'string') tagSet.add(t);
      } catch {}
    }
    sendJSON(res, 200, [...tagSet].sort());
    return true;
  }

  if (pathMatch && method === 'DELETE') {
    const relPath = decodeURIComponent(pathMatch[1]);
    const fullPath = path.resolve(POSTS_DIR, relPath);
    if (!fullPath.startsWith(POSTS_DIR)) { sendError(res, 403, 'Forbidden'); return true; }
    try { fs.unlinkSync(fullPath); sendJSON(res, 200, { ok: true }); }
    catch (e) { sendError(res, 500, e.message); }
    return true;
  }

  return false;
}

function handleRequest(req, res) {
  const url = new URL(req.url, `http://localhost:${PROXY_PORT}`);

  // Editor: API routes
  if (url.pathname.startsWith('/editor/api/')) {
    if (handleEditorAPI(req, res)) return;
  }

  // Editor: static files — strip /editor/ prefix
  if (url.pathname.startsWith('/editor/') || url.pathname === '/editor') {
    let filePath;
    if (url.pathname === '/editor' || url.pathname === '/editor/') {
      filePath = path.join(__dirname, 'public', 'index.html');
    } else {
      filePath = path.join(__dirname, 'public', url.pathname.replace(/^\/editor\//, ''));
    }
    const ext = path.extname(filePath);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        // SPA fallback
        fs.readFile(path.join(__dirname, 'public', 'index.html'), (err2, data2) => {
          if (err2) { proxyTo(WORKSERVER_TARGET, req, res); return; }
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(data2);
        });
        return;
      }
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
      res.end(data);
    });
    return;
  }

  // Everything else → workserver
  proxyTo(WORKSERVER_TARGET, req, res);
}

// Kill old port 3456 editor if running
try { process.kill(require('child_process').execSync('lsof -ti:3456', {encoding:'utf8'}).trim()); } catch {}

// Start the unified proxy
const server = http.createServer(handleRequest);
server.listen(PROXY_PORT, '0.0.0.0', () => {
  console.log(`🚀 Unified proxy running on port ${PROXY_PORT}`);
  console.log(`📝 Editor: http://123.60.18.97:${PROXY_PORT}/editor/`);
  console.log(`🔧 Workserver backend: http://127.0.0.1:${WORKSERVER_TARGET}`);
});
