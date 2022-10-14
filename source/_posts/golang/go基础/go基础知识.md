---
title: go 语言基础——基础&函数
categories: 
- [golang, go语言基础]
tags:
- golang
---



# case、fallthrough

可以使用 `fallthrough` 强制执行后面的 case 代码

# 接口——interface

一组method签名的组合，通过interface来定义对象的一组行为。

如果某个对象实现了某个接口的所有方法，则此对象就实现了此接口。

## interface值

```go
package main

import (
	"fmt"
)

type human struct {
	name string
	age  int
}

type Employee struct {
	human
	addr string
}

type Student struct {
	human
	shcool string
}

func (h *human) SayHi() {
	fmt.Printf("Hi!I'm a Student.My name is %s\n", h.name)
}

func (h *human) sing(singname string) {
	fmt.Printf("The sing name is %s\n", singname)
}

func (e *Employee) SayHi() {
	fmt.Printf("Hi!I'm a employee.My name is %s\n", e.name)
}

type Men interface {
	SayHi()
	sing(name string)
}

func main() {
	wang := Student{human{"王强", 18}, "高中"}
	//li := Student{human{"李红", 12}, "小学"}
	//tian := Student{human{"天天", 23}, "大公司"}
	//wu := Student{human{"呜呜", 23}, "小公司"}

	var m Men

	m = &wang
	fmt.Println("This is 王,")
	m.sing("lalalla")
	m.SayHi()
}

This is 王,
The sing name is lalalla
Hi!I'm a Student.My name is 王强
```

通过定义interface参数，让函数接收各种类型的参数

以下代码实现了实现了Stringer这个接口参数，可以使任意格式的字符串打印。

```go
package main

import (
	"fmt"
	"strconv"
)

type human struct {
	name string
	age  int
}

func (h human) String() string {
	return "<" + h.name + "-" + strconv.Itoa(h.age) + ">"
}

func main() {
	Bob := human{"jamsBob", 12}
	fmt.Println("This human is : ", Bob)
}
```

## 嵌入interface

将接口1作为接口2的嵌入阻断，则说明接口2隐式包含了接口1的方法

# 基础类型

## make和new

两者均是分配内存的。

**new：**

- 只分配内存，不初始化内存

- 创建之后返回该类型内存地址的指针，同时将内存置为0。

  ```go
  func new(Type) *Type
  ```

**make：**

- 即分配内存又初始化

- 用于slice、map、channel的初始化，返回值是创建类型的本身。

  ```go
  func make(t Type, size ...IntegerType) Type
  ```

## 数组和slice

slice基于数组创建。其中数组在创建之后，大小固定，而slice创建后具有动态扩容的机制，会相比与数据更加灵活。

数组在使用过程中是值传递，将一个数组赋值给另一个新变量之后，原数组的内容不变；而slice都是源数组在内存中的地址的一个引用。

```go
package main

import (
	"fmt"
)

func print(arr []int) {
	arr[2] = 12
	fmt.Println("function arrS")
	for _, v := range arr {
		fmt.Printf("%d ", v)
	}
	fmt.Println()
}

func printArr(arr [3]int) {
	arr[2] = 10
	fmt.Println("function arr")
	fmt.Println(arr)
}

func main() {
	arr := [3]int{1, 2, 3}
	printArr(arr)
	fmt.Println("arr after")
	fmt.Println(arr)
	arrS := []int{1, 2, 3, 4, 5}
	print(arrS)
	fmt.Println("arrS after")
	fmt.Println(arrS)
}

function arr
[1 2 10]
arr after
[1 2 3]
function arrS
1 2 12 4 5 
arrS after
[1 2 12 4 5]
```



# 函数

## 值传参和指针传参

**值传递：**实际上是copy的，当修改传入的该值时，并不会影响到实际的变量值。

**指针传递：**变量的内存存放于地址上，当以指针的形式传递时，传递的是地址的内容，如果修改指针内容会影响到实际的值。

```go
package main

import "fmt"

//传参和传指针

func add(a int) int {
	a += 1
	return a
}

func addP(a *int) int {
	*a += *a
	return *a
}
func main() {

	a := 2
	fmt.Println("---------值传参----------")
	fmt.Printf("function's value is %d\n", add(a))
	fmt.Printf("Actual value is %d\n", a)

	fmt.Println("---------指针传参----------")
	fmt.Printf("function's value is %d\n", addP(&a))
	fmt.Printf("Actual value is %d\n", a)
}

---------值传参----------
function's value is 3
Actual value is 2
---------指针传参----------
function's value is 4
Actual value is 4
```

## 函数作为值、类型

将相同类型的函数（参数传入相同、返回类型相同）作为函数的传递，增大灵活性

```go
package main

import "fmt"

//函数作为传递

type testInt func(int) int

func addOdd(num int) int {
	return num + 2
}

func addEven(num int) int {
	return num + 1
}

//提高函数使用的灵活性
func resultNum(num int, f testInt) (int, string) {
	if num%2 == 0 {
		return addOdd(num), "Excute Odd func"
	} else {
		return addEven(num), "Excute Even func"
	}
}
func main() {
	num := 1
	num1 := 2
    //调用该函数定义
	fmt.Println(resultNum(num, addOdd))
	fmt.Println(resultNum(num1, addEven))

}

2 Excute Even func
4 Excute Odd func
```

## panic和recover

### panic

内建函数，可以终端原有的控制流程，当程序发生错误的时候，制造一次宕机——程序运行终止。一般是碰到不可能发生的状况，panic是最好的处理方式。

### recover

恢复——panic之后的其他处理。当panic的时候会将参数传递给recover，如果recover没有收到，依旧为nil，那么表明并没有发生panic。

```go
package main

import (
	"fmt"
)

//panic和recover

func main() {
	defer func() {
		if msg := recover(); msg != nil {
			fmt.Println(msg)
		} else {
			fmt.Println("run success")
		}
	}()

	fmt.Println("process A")
	fmt.Println("process B")
	panic("panic")

}
```

