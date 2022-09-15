---
title: struct类型
---

## struct

声明新的类型，作为其他类型的属性或者字段的容器。

## 匿名字段

```go
type Human struct {
    name string
    age int
    weight int
}

type Student struct {
    Human  // 匿名字段，那么默认Student就包含了Human的所有字段
    speciality string
}
```

匿名字段可以实现字段的继承。

struct不仅仅能够将struct作为匿名字段，自定义类型、内置类型都可以作为匿名字段，而且可以在相应的字段上面进行函数操作