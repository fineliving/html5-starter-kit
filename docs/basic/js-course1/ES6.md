# 前言

### 学习 ES6 的原因：

ES5 还是主流，速度也更快，但 ES6 引入的新特性是 ES5 无法比拟的

### 学习 ES6 的前置知识：

1. 熟练掌握 ES5 的知识
2. 了解 ES6

## ES6 的开发环境搭建

ES6 自动转化成 ES5：

1. Chrome 浏览器已经支持 ES6，有些低版本的浏览器还是不支持 ES6 的语法

2. 除了 Webpack 自动编译，还可以用 Babel 来完成。使用 Babel 把 ES6 编译成 ES5。

### 工程目录：

- src：ES6 代码文件夹。

- dist：Babel 编译成的 ES5 代的文件夹，在 HTML 页面需要引入的时这里的 js 文件。

- index.html

### 编程

#### 1.编写 index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title></title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script src="./dist/index.js"></script>
    <!--引用编译成ES5后的js-->
  </head>

  <body>
    Hello ECMA Script 6
  </body>
</html>
```

#### 2.编写 index.js

```js
let a = 1
console.log(a)
```

- let 是 ES6 的一种声明方式

### Babel 自动编程

接下来我们需要把这个 ES6 的语法文件自动编程成 ES5 的语法文件。

#### 1.初始化项目

安装 Babel 之前，需要用 npm init 先初始化我们的项目。

```node
npm init -y
```

- -y 代表全部默认同意，就不用一次次按回车了。

- 命令执行完成后，会在项目根目录下生产 package.json 文件。

```json
{
  "name": "es6",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

#### 2.全局安装 Babel-cli

```node
npm install -g babel-cli
```

#### 3.安装转换包

使用命令`babel src/index.js -o dist/index.js`。文件并没有变化，还是使用了 ES6 的语法。因为我们还需要安装转换包才能成功转换，继续往下看吧。

1. 本地安装 babel-preset-es2015 和 babel-cli：

   ```node
   npm install --save-dev babel-preset-es2015 babel-cli
   ```

   安装完成后，package.json 多了 devDependencies 选项。

   ```json
   "devDependencies": {
       "babel-cli": "^6.24.1",
       "babel-preset-es2015": "^6.24.1"
     }
   ```

2. 新建`.babelrc`

   ```babellrc
   {
       "presets":[
           "es2015"
       ],
       "plugins":[]
   }
   ```

3. 转换命令，转 ES6 为 ES5

   ```node
   babel src/index.js -o dist/index.js
   ```

4. 简化转化命令：

   可以使用 npm run build 直接利用 webpack 进行打包，在这里也希望利用这种方式完成转换。

   1. package.json 修改：

      ```json
      {
        "name": "es6",
        "version": "1.0.0",
        "description": "",
        "main": "index.js",
        "scripts": {
          "build": "babel src/index.js -o dist/index.js"
        },
        "keywords": [],
        "author": "",
        "license": "ISC",
        "devDependencies": {
          "babel-cli": "^6.24.1",
          "babel-preset-es2015": "^6.24.1"
        }
      }
      ```

   2. 使用`npm run build`来进行转换了

## 新的声明方式

三种声明方式：

1. `var`：variable 的简写，理解成变量。
2. `let`：“让”的意思，理解为一种声明。
3. `const`：”常量“的意思。

var、let、const，这三种方式各有所长，不要再只使用 var 了。

### var 全局声明：

用来声明全局变量

```js
var a = "JSPang"
console.log(a)
```

- 用匿名函数验证：

  ```js
  var a = "JSPang"
  window.onload = function() {
    console.log(a)
  }
  ```

  控制台输出了 JSPang

- 用区块进行验证：

  ```js
  var a = 2
  {
    var a = 3
  }
  console.log(a)
  ```

  控制台输出了 3

### let 局部声明

用来声明局部变量

- let 声明只在区块内起作用，外部是不可以调用的。

  ```js
  var a = 2
  {
    let a = 3
  }
  console.log(a)
  ```

  控制台输出了 2

  ```js
  {
    let a = 3
  }
  console.log(a)
  ```

  a is not defined

- let 是防止你的数据污染的，在大型项目中是非常有用

  ```js
  for (let i = 0; i < 10; i++) {
    console.log("循环体中:" + i)
  }
  console.log("循环体外:" + i)
  ```

  控制台报错了，找不到循环体外的 i 变量。

两种声明的比较：习惯 let 声明防止程序数据污染上。减少 var 声明污染全局空间

### const 常量声明

用来声明常量，声明后在业务层就不再发生变化

```js
const a = "JSPang"
var a = "技术胖"
console.log(a)
```

控制台报错

## 变量的解构赋值

数据的解构：

- 解构：ES6 按照一定模式，从数组和对象中提取值，对变量赋值。
- **解构赋值**在实际开发中可以大量减少我们的代码量
- 实战项目中解构 Json 数据格式还是很普遍的

### <span id='2'>数组的解构赋值：</span>

- 简单的数组解构：

  ```js
  let a = 0
  let b = 1
  let c = 2
  ```

  用**数组解构**的方式来进行赋值

  ```js
  let [a, b, c] = [1, 2, 3]
  ```

  从**数组中提取值**，按照位置的对象关系对变量赋值。

- 数组模式和赋值模式统一：

  简单理解：等号左边和等号右边的形式要统一，如果不统一解构将失败，很可能获得 undefined 或者直接报错。

  ```js
  let [a, [b, c], d] = [1, [2, 3], 4]
  ```

#### 解构的默认值：

**解构赋值**允许使用**默认值**

- 单值数组

  ```js
  let [foo = true] = []
  console.log(foo) //控制台打印出true
  ```

- 多值数组

  ```js
  let [a, b = "JSPang"] = ["技术胖"]
  console.log(a + b) //控制台显示“技术胖JSPang”
  ```

- 注意：**undefined 和 null 的区别** - undefined 相当于什么都没有，b 是默认值。 - null 相当于有值，但值为 null。所以 b 并没有取默认值，而是解构成了 null。
  ```js
  let [a, b = "JSPang"] = ["技术胖", undefined]
  console.log(a + b) //控制台显示“技术胖JSPang”
  ```
      ```js
  let [a,b="JSPang"]=['技术胖',null];
  console.log(a+b); //控制台显示“技术胖 null”
  ```###对象的解构赋值：

  ```

对象的解构与数组有一个重要的不同：

- 数组的元素是按次序排列的，变量的取值由它的位置决定；
- 对象的属性没有次序，变量必须与属性同名，才能取到正确的值。

```js
let { foo, bar } = { foo: "JSPang", bar: "技术胖" }
console.log(foo + bar) //控制台打印出了“JSPang技术胖”
```

#### 圆括号的使用:

解构之前先定义变量再解构会出现问题。使用圆括号解决报错

```js
let foo;
{foo} ={foo:'JSPang'};
console.log(foo);
```

```js
let foo
;({ foo } = { foo: "JSPang" })
console.log(foo) //控制台输出jspang
```

### 字符串解构赋值：

字符串被转换成了一个类似数组的对象

```js
const [a, b, c, d, e, f] = "JSPang"
console.log(a)
console.log(b)
console.log(c)
console.log(d)
console.log(e)
console.log(f)
```

## <span id="1">扩展运算符和 rest 运算符</span>

扩展运算符和 rest 运算符(都是`…`)作用：

- 可以很好的为我们解决**参数**和**对象数组**未知情况下的编程
- 让代码更健壮和简洁
- 两个非常类似，但要区分，这样才能在工作中运用自如。

### 对象扩展运算符：

传入参数不确定，使用对象扩展运算符来作参数。

```js
function jspang(...arg) {
  console.log(arg[0])
  console.log(arg[1])
  console.log(arg[2])
  console.log(arg[3])
}
jspang(1, 2, 3)
```

控制台输出了 1,2,3,undefined

#### 扩展运算符的用处：

可以简化解决：对象赋值不是真正的赋值，而是对内存堆栈的引用问题。

- 改变 arr2 的值，arr1 的值改变

  ```js
  let arr1 = ["www", "jspang", "com"]
  let arr2 = arr1
  console.log(arr2)
  arr2.push("shengHongYu")
  console.log(arr1)
  ```

  控制台输出：["www", "jspang", "com"],["www", "jspang", "com", "shengHongYu"]

- 改变 arr2 的值，arr1 并没有改变

  ```js
  let arr1 = ["www", "jspang", "com"]
  //let arr2=arr1;
  let arr2 = [...arr1]
  console.log(arr2)
  arr2.push("shengHongYu")
  console.log(arr2)
  console.log(arr1)
  ```

  控制台看到 arr1 并没有改变

### rest 运算符：

和对象扩展运算符有很多相似之处，甚至很多时候你不用特意去区分。

`rest`:' 剩余部分'，代表**参数**和**对象数组**剩余的部分

```js
function jspang(first, ...arg) {
  console.log(arg.length)
}

jspang(0, 1, 2, 3, 4, 5, 6, 7)
```

控制台打印出了 7，是 rest 运算符的最简单用法。

#### 如何循环输出 rest 运算符

```js
function jspang(first, ...arg) {
  for (let val of arg) {
    console.log(val)
  }
}
jspang(0, 1, 2, 3, 4, 5, 6, 7)
```

for…of 的循环可以避免我们开拓内存空间，增加代码运行效率

## 字符串模版

> 对字符串操作的不好，就很难写出令人惊奇的程序

ES6 对字符串新增的操作，最重要的就是字符串模版，字符串模版的出现让我们：

- 再也不用拼接变量了，

- 支持在模板里进行简单计算操作。

### 字符串模版

ES5 用+xxx+这样的形式进行拼接，这样很麻烦而且很容易出错。

```js
let jspang = "技术胖"
let blog = "非常高兴你能看到这篇文章，我是你的老朋友" + jspang + "。这节课我们学习字符串模版。"
document.write(blog)
```

ES6 新增了字符串模版，可以很好的解决这个问题。

- 不再使用‘xxx’这样的单引号，而是换成了\`xxx\`这种的连接号。
- 用`${jspang}`这种形式

```js
let jspang = "技术胖"
let blog = `<b>非常高兴你能看到这篇文章</b>，我是你的老朋友${jspang}。<br/>这节课我们学习字符串模版。`
document.write(blog)
```

#### 支持 html 标签

```js
let jspang = "技术胖"
let blog = `<b>非常高兴你能看到这篇文章</b>，我是你的老朋友${jspang}。<br/>这节课我们学习字符串模版。`
document.write(blog)
```

#### 支持运算

```js
let a = 1
let b = 2
let result = `${a + b}`
document.write(result)
```

强大的字符串模版，在实际开发中，我们可以让后台写一个活动页面，然后轻松的输出给用户。

### 字符串查找

ES6 增加了字符串的查找功能，而且支持中文

#### 查找是否存在：

- `indexOf()`：ES5，不好用，返回索引位置，我们自己还要确定位置。

  ```js
  let jspang = "技术胖"
  let blog = "非常高兴你能看到这篇文章，我是你的老朋友技术胖。这节课我们学习字符串模版。"
  document.write(blog.indexOf(jspang))
  ```

  网页中输出了 20，我们还要自己判断。

- `includes()`：ES6，不再返回索引值，返回是否存在

  ```js
  let jspang = "技术胖"
  let blog = "非常高兴你能看到这篇文章，我是你的老朋友技术胖。这节课我们学习字符串模版。"
  document.write(blog.includes(jspang))
  ```

- `startsWith()`：ES6，判断开头是否存在

  ```text
  blog.startsWith(jspang);
  ```

- `endsWith()`：ES6，判断结尾是否存在

  ```js
  blog.endsWith(jspang)
  ```

  注意：starts 和 ends 后边都要加 s

### 字符串复制

需要字符串重复的，比如分隔符和特殊符号，`repeat()`:复制字符串就派上用场了

```js
document.write("jspang|".repeat(3))
```

ES6 对字符串还有一些其它操作，因为实际工作中不太使用，这里就不作太多的介绍了。

## ES6 数字操作

> 对数字操作的不好，就很难写出令人惊奇的程序

### 二进制和八进制声明

并不是 ES6 的特性，但很多人会把他们当成字符串

- 二进制声明：英文 Binary，开始是 0（零），第二个位置是 b（注意这里大小写都可以实现），然后跟上二进制的值

  ```js
  let binary = 0b010101
  console.log(binary)
  ```

  控制台显示出了 21。

- 八进制声明：英文 Octal，开始是 0（零），第二个位置是 O（欧），然后跟上八进制的值。

  ```js
  let b = 0o666
  console.log(b)
  ```

  控制台显示出了 438。

### 数字判断和转换

- `Number.isFinite( xx )`：数字验证。只要是数字，不论是浮点型还是整形都会返回 true，其他时候会返回 false。

  ```js
  let a = 11 / 4
  console.log(Number.isFinite(a)) //true
  console.log(Number.isFinite("jspang")) //false
  console.log(Number.isFinite(NaN)) //false
  console.log(Number.isFinite(undefined)) //false
  ```

- `Number.isNaN()`：NaN 验证。NaN 是特殊的非数字

  ```js
  console.log(Number.isNaN(NaN)) //true
  ```

- `Number.isInteger(xx)`：整数验证。判断是否为整数

  ```js
  let a = 123.1
  console.log(Number.isInteger(a)) //false
  ```

- `Number.parseInt(xxx)`：整数转换，`Number.parseFloat(xxx)`：浮点型转换

  ```js
  let a = "9.18"
  console.log(Number.parseInt(a))
  console.log(Number.parseFloat(a))
  ```

### 整数取值范围操作

整数的操作是有一个取值范围的，它的取值范围就是**2 的 53 次方**。计算时会经常超出这个值，所以我们要进行判断

```js
let a = Math.pow(2, 53) - 1
console.log(a) //9007199254740991
```

- `MAX_SAFE_INTEGER`：最大安全整数

  ```js
  console.log(Number.MAX_SAFE_INTEGER)
  ```

- `MIN_SAFE_INTEGER`：最小安全整数

```js
console.log(Number.MIN_SAFE_INTEGER)
```

- `isSafeInteger()`：安全整数判断

  ```js
  let a = Math.pow(2, 53) - 1
  console.log(Number.isSafeInteger(a)) //false
  ```

ES6 数字的操作，方法很多，很零散

## ES6 对数组的扩展

### 转化为数组

**JSON 数组格式**：跟普通的 JSON 对比是在最后多了一个 length 属性。

```js
let json = {
  "0": "jspang",
  "1": "技术胖",
  "2": "大胖逼逼叨",
  length: 3,
}
```

这种特殊的 json 格式都可以轻松使用 ES6 的语法转变成数组。

**转化为数组**：

- `Array.from()`：将类数组转换为数组

  ```js
  let json = {
    "0": "jspang",
    "1": "技术胖",
    "2": "大胖逼逼叨",
    length: 3,
  }

  let arr = Array.from(json)
  console.log(arr)
  ```

  比较常用，节省了我们代码行数，也让我们的程序更清晰

- `Array.of()`：将一组（字符串）数转化为数组

  ```js
  let arr = Array.of(3, 4, 5, 6)
  console.log(arr)
  ```

  ```js
  let arr = Array.of("技术胖", "jspang", "大胖逼逼叨")
  console.log(arr)
  ```

  常见，经常拿到类似数组的字符串，需要使用 eval 来进行转换，但是 eval 的效率是很低的，它会拖慢我们的程序。

### 数组的操作

**实例方法**：并不是以 Array 对象开始的，而是必须有一个已经存在的数组，然后使用的方法

- `find()`实例方法：从数组中查找。在函数中如果找到符合条件的数组元素就进行 return，并停止查找。

  需要传入一个匿名函数，函数需要传入三个参数：

  - value：表示当前查找的值。
  - index：表示当前查找的数组索引。
  - arr：表示当前数组。

  ```js
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  console.log(
    arr.find(function(value, index, arr) {
      return value > 5
    })
  )
  ```

  控制台输出了 6，说明找到了符合条件的值，并进行返回了，如果找不到会显示 undefined。

- `fill()`实例方法：把数组进行填充

  接收三个参数：

  - 第一个参数是填充的变量
  - 第二个是开始填充的位置
  - 第三个是填充到的位置。

  ```js
  let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  arr.fill("jspang", 2, 5)
  console.log(arr)
  ```

  把数组从第二位到第五位用 jspang 进行填充。

### 数组的遍历

- `for…of`循环：

  这种形式比 ES5 的 for 循环要简单而且高效。

  ```js
  let arr = ["jspang", "技术胖", "大胖逼逼叨"]

  for (let item of arr) {
    console.log(item)
  }
  ```

  - `数组索引`：有时候开发中是需要数组的索引的，那我们可以使用下面的代码输出数组索引。

    ```js
    let arr = ["jspang", "技术胖", "大胖逼逼叨"]
    for (let index of arr.keys()) {
      console.log(index) //0,1,2
    }
    ```

  - `同时输出数组的内容和索引`：用 entries()实例方法，配合 for…of 循环可以同时输出内容和索引。

    ```js
    let arr = ["jspang", "技术胖", "大胖逼逼叨"]
    for (let [index, val] of arr.entries()) {
      console.log(index + ":" + val)
    }
    ```

- `entries()`实例方法：

  生成的是`Iterator形式`的数组，好处是在需要时用 next()手动跳转到下一个值。

  ```js
  let arr = ["jspang", "技术胖", "大胖逼逼叨"]
  let list = arr.entries()
  console.log(list.next().value)
  console.log(list.next().value)
  console.log(list.next().value)
  ```

## ES6 中的函数扩展和箭头函数

### ES5 中函数写法

```js
function add(a, b) {
  return a + b
}
console.log(add(1, 2))
```

控制台打印是 3.

### ES6 中函数扩展

#### 默认值

ES6 中增加了默认值的操作

```js
function add(a, b = 1) {
  return a + b
}
console.log(add(1))
```

#### 主动抛出错误

> 在使用 Vue 的框架中，可以经常看到框架主动抛出一些错误，比如 v-for 必须有:key 值。那尤大神是如何做到的那？

ES6 中我们直接用`throw new Error(xxxx)`，就可以抛出错误。

```js
function add(a, b = 1) {
  if (a == 0) {
    throw new Error("This is error")
  }
  return a + b
}

console.log(add(0))
```

#### 函数中的严谨模式

> 我们在 ES 中就经常使用严谨模式来进行编程，但是必须写在代码最上边，相当于全局使用。

ES6 中我们可以写在函数体中，相当于针对函数来使用。

```js
function add(a, b = 1) {
  "use strict"
  if (a == 0) {
    throw new Error("This is error")
  }
  return a + b
}
console.log(add(1))
```

控制台报错，这是 ES6 中的一个坑，错误的原因是如果你使用了默认值，再使用严谨模式的话，就会有冲突。

所以要取消默认值的操作。

```js
function add(a, b) {
  "use strict"
  if (a == 0) {
    throw new Error("This is error")
  }
  return a + b
}
console.log(add(1, 2))
```

#### 获得需要传递的参数个数

> 如果你在使用别人的框架时，不知道别人的函数需要传递几个参数怎么办？

ES6 为我们提供了得到参数的方法`xxx.length`。我们用上边的代码看一下需要传递的参数个数。

```js
function add(a, b) {
  "use strict"
  if (a == 0) {
    throw new Error("This is error")
  }
  return a + b
}
console.log(add.length)
```

控制台打印出了 2。

```js
function add(a, b = 1) {
  if (a == 0) {
    throw new Error("This is error")
  }
  return a + b
}
console.log(add.length)
```

但是如果我们去掉严谨模式，并给第二个参数加上默认值的话，这时候 add.length 的值就变成了 1， 也就是说它**得到的是必须传入的参数**。

### 箭头函数

> 在学习 Vue 的时候，我已经大量的使用了箭头函数，因为箭头函数真的很好用

我们来看一个最简单的箭头函数。也就是上边我们写的 add 函数，进行一个改变，写成箭头函数。

```js
var add = (a, b = 1) => a + b
console.log(add(1))
```

#### {}的使用

在箭头函数中，方法体内如果是两句话，那就需要在方法体外边加上{}括号。例如下边的代码就必须使用{}.

```js
var add = (a, b = 1) => {
  console.log("jspang")
  return a + b
}
console.log(add(1))
```

#### 不能当构造函数

箭头函数中不可加 new，也就是说箭头函数不能当构造函数进行使用。

## ES6 中的函数和数组补漏

### 对象的`函数解构`

> 我们在前后端分离时，后端经常返回来 JSON 格式的数据，前端的美好愿望是直接把这个 JSON 格式数据当作参数，传递到函数内部进行处理。

ES6 就为我们提供了这样的解构赋值。方便了很多，我们再也不用一个个传递参数了。

```js
let json = {
  a: "jspang",
  b: "技术胖",
}
function fun({ a, b = "jspang" }) {
  console.log(a, b)
}
fun(json)
```

### 数组的函数解构

> 函数能解构 JSON，那解构我们的数组就更不在话下了。

声明一个数组，然后写一个方法，最后用`…`进行解构赋值。

```js
let arr = ["jspang", "技术胖", "免费教程"]
function fun(a, b, c) {
  console.log(a, b, c)
}

fun(...arr)
```

这种方法其实在前面的课程中已经学过了，这里我们就当复习了。[扩展运算符和 rest 运算符](#1) [数组的解构赋值](#2)

### in 的用法

in 是用来**判断**对象或者数组中是否存在某个值的。我们先来看一下用 in 如何判断对象里是否有某个值。

#### 对象判断

```js
let obj = {
  a: "jspang",
  b: "技术胖",
}
console.log("a" in obj) //true
```

#### 数组判断

ES5 判断的弊端，以前会使用 length 属性进行判断，为 0 表示没有数组元素。

```js
let arr = [, , , , ,]
console.log(arr.length) //5
```

但是这并不准确，或者说真实开发中有弊端。上边的代码输出了 5，但是数组中其实全是空值，这就是一个坑啊。

ES6 的 in 就可以解决这个问题。

```js
let arr = [, , , , ,]
console.log(0 in arr) //false

let arr1 = ["jspang", "技术胖"]
console.log(0 in arr1) // true
```

注意：这里的 0 指的是数组下标位置是否为空。

### 数组的遍历方法

- `forEach()`实例方法：

  ```js
  let arr = ["jspang", "技术胖", "前端教程"]
  arr.forEach((val, index) => console.log(index, val))
  ```

  forEach 循环的特点是会自动省略为空的数组元素，相当于直接给我们筛空了。当是有时候也会给我们帮倒忙。

- `filter()`实例方法：

  ```js
  let arr = ["jspang", "技术胖", "前端教程"]
  arr.filter((x) => console.log(x))
  ```

  这种方法在 Vue 实战里我讲过，他其实也有循环的功能，这里我们在复习一遍。

- `some()`实例方法：

  ```js
  let arr = ["jspang", "技术胖", "前端教程"]
  arr.some((x) => console.log(x))
  ```

* `map()`实例方法：

  ```js
  let arr = ["jspang", "技术胖", "前端教程"]
  console.log(arr.map((x) => "web"))
  ```

  map 在这里起到一个替换的作用，这个我们后续课程会详细讲解。

  数组转换字符串 在开发中我们经常会碰到把数组输出成字符串的形式，我们今天学两种方法，你要注意两种方法的区别。

* `join()`实例方法：

  ```js
  let arr = ["jspang", "技术胖", "前端教程"]

  console.log(arr.join("|"))
  ```

  join()方法就是在数组元素中间，加了一些间隔，开发中很有用处。

* `toString()`实例方法：

  ```js
  let arr = ["jspang", "技术胖", "前端教程"]

  console.log(arr.toString())
  ```

  转换时只是是用逗号隔开了。

## ES6 中对象

> 对象对于 Javascript 是非常重要的。在 ES6 中对象有了很多新特性。

### 对象赋值

ES6 允许把**声明的变量直接赋值给对象**。

```js
let name = "jspang"
let skill = "web"
var obj = { name, skill }
console.log(obj) //Object {name: "jspang", skill: "web"}
```

### Key 值构建对象

> 有时候我们会在后台取出 key 值，而不是我们前台定义好的，这时候我们如何构建我们的 key 值呢？

比如我们在后台取了一个 key 值，然后可以用`[]` 的形式，进行对象的构建。

```js
let key = "skill"
var obj = {
  [key]: "web",
}
console.log(obj.skill)
```

### 自定义对象方法

ES5 已有方式，对象方法就是把兑现中的属性，用匿名函数的形式编程方法。

```js
var obj = {
  add: function(a, b) {
    return a + b
  },
}
console.log(obj.add(1, 2)) //3
```

### 对象比较

对象的比较方法,以前进行对象值的比较，经常使用`===`来判断，比如下面的代码：

```js
var obj1 = { name: "jspang" }
var obj2 = { name: "jspang" }
console.log(obj1.name === obj2.name) //true
```

那 ES6 为我们提供了`Object.is()`方法进行对比。

```js
var obj1 = { name: "jspang" }
var obj2 = { name: "jspang" }
console.log(obj1.name === obj2.name) //true
console.log(Object.is(obj1.name, obj2.name)) //true
```

===和 is 方法的区别：

```js
console.log(+0 === -0) //true
console.log(NaN === NaN) //false
console.log(Object.is(+0, -0)) //false
console.log(Object.is(NaN, NaN)) //true
```

这太诡异了，我要怎么记忆，那技术胖在这里告诉你一个小妙招，===为同值相等，is()为严格相等。

### 合并对象

操作数组时我们经常使用数组合并，那对象也有合并方法，那就是`Object.assign()`。看一下啊具体的用法。

```js
var a = { a: "jspang" }
var b = { b: "技术胖" }
var c = { c: "web" }

let d = Object.assign(a, b, c)
console.log(d)
```

## Symbol 在对象中的作用

我们通过场景应用的方式学习 Symbol，它的意思是全局标记。我们先看看它的声明方式。

**声明 Symbol**

我们先来回顾一下我们的数据类型，在最后在看看 Symbol 如何声明，并进行一个数据类型的判断。

```
var a = new String;
var b = new Number;
var c = new Boolean;
var d = new Array;
var e = new Object;
var f= Symbol();
console.log(typeof(d));
```

**Symbol 的打印**

我们先声明一个 Symbol，然后我们在控制台输出一下。

```
var g = Symbol('jspang');
console.log(g);
console.log(g.toString());
```

这时候我们仔细看控制台是有区别的，没有 toString 的是红字，toString 的是黑字。

**Symbol 在对象中的应用**

看一下如何用 Symbol 构建对象的 Key，并调用和赋值。

```
var jspang = Symbol();
var obj={
    [jspang]:'技术胖'
}
console.log(obj[jspang]);
obj[jspang]='web';
console.log(obj[jspang]);
```

**Symbol 对象元素的保护作用**

在对象中有很多值，但是循环输出时，并不希望全部输出，那我们就可以使用 Symbol 进行保护。

没有进行保护的写法：

```
var obj={name:'jspang',skill:'web',age:18};

for (let item in obj){
    console.log(obj[item]);
}
```

现在我不想别人知道我的年龄，这时候我就可以使用 Symbol 来进行循环保护。

```
let obj={name:'jspang',skill:'web'};
let age=Symbol();
obj[age]=18;
for (let item in obj){
    console.log(obj[item]);
}
console.log(obj);
```

## 第 13 节：Set 和 WeakSet 数据结构

这节学习 Set 数据结构，注意这里不是数据类型，而是数据结构。它是 ES6 中新的东西，并且很有用处。Set 的数据结构是以数组的形式构建的。

** Set 的声明 **

```
let setArr = new Set(['jspang','技术胖','web','jspang']);
console.log(setArr);//Set {"jspang", "技术胖", "web"}
```

Set 和 Array 的区别是 Set 不允许内部有重复的值，如果有只显示一个，相当于去重。虽然 Set 很像数组，但是他不是数组。

**Set 值的增删查**

追加 add：

在使用 Array 的时候，可以用 push 进行追加值，那 Set 稍有不同，它用更语义化的 add 进行追加。

```
let setArr = new Set(['jspang','技术胖','web','jspang']);
console.log(setArr);//Set {"jspang", "技术胖", "web"}

setArr.add('前端职场');
console.log(setArr);
```

删除 delete：

```
let setArr = new Set(['jspang','技术胖','web','jspang']);
console.log(setArr);//Set {"jspang", "技术胖", "web"}

setArr.add('前端职场');
console.log(setArr); //Set {"jspang", "技术胖", "web", "前端职场"}

setArr.delete('前端职场');
console.log(setArr); //Set {"jspang", "技术胖", "web"}
```

查找 has：

用 has 进行值的查找，返回的是 true 或者 false。

```
let setArr = new Set(['jspang','技术胖','web','jspang']);
console.log(setArr);//Set {"jspang", "技术胖", "web"}

console.log(setArr.has('jspang'));//true
```

删除 clear:

```
let setArr = new Set(['jspang','技术胖','web','jspang']);
console.log(setArr);//Set {"jspang", "技术胖", "web"}
setArr.clear();

console.log(setArray);//true
```

set 的循环 for…of…循环：

```
let setArr = new Set(['jspang','技术胖','web','jspang']);
for (let item of setArr){
    console.log(item);
}
```

size 属性

size 属性可以获得 Set 值的数量。

```
let setArr = new Set(['jspang','技术胖','web','jspang']);
for (let item of setArr){
    console.log(item);
}

console.log(setArr.size);
```

forEach 循环

```
let setArr = new Set(['jspang','技术胖','web','jspang']);
setArr.forEach((value)=>console.log(value));
```

WeakSet 的声明

```
let weakObj=new WeakSet();
let obj={a:'jspang',b:'技术胖'}
weakObj.add(obj);

console.log(weakObj);
```

这里需要注意的是，如果你直接在 new 的时候就放入值，将报错。

WeakSet 里边的值也是不允许重复的，我们来测试一下。

```
let weakObj=new WeakSet();
let obj={a:'jspang',b:'技术胖'}
let obj1=obj;

weakObj.add(obj);
weakObj.add(obj1);

console.log(weakObj);
```

总结：在实际开发中 Set 用的比较多，WeakSet 用的并不多，但是他对传入值必须是对象作了很好的判断，我们灵活应用还是有一定的用处的。

## 第 14 节：map 数据结构

这节课主要学习 map 的这种 ES6 新加的数据结构。在一些构建工具中是非常喜欢使用 map 这种数据结构来进行配置的，因为 map 是一种灵活，简单的适合一对一查找的数据结构。我们知道的数据结构，已经有了 json 和 set。那 map 有什么特点。

** Json 和 map 格式的对比 **

map 的效率和灵活性更好

先来写一个 JSON，这里我们用对象进行模拟操作。

```
let json = {
    name:'jspang',
    skill:'web'
}
console.log(json.name);
```

但是这种反应的速度要低于数组和 map 结构。而且 Map 的灵活性要更好，你可以把它看成一种特殊的键值对，但你的 key 可以设置成数组，值也可以设置成字符串，让它不规律对应起来。

```
let json = {
    name:'jspang',
    skill:'web'
}
console.log(json.name);

var map=new Map();
map.set(json,'iam');
console.log(map);
```

当然也可 key 字符串，value 是对象。我们调换一下位置，依然是符合 map 的数据结构规范的。

```
map.set('jspang',json);
console.log(map);
```

** map 的增删查**

上边我们已经会为 map 增加值了，就是用我们的 set 方法，这里我就不重复讲解了。直接看如何取出我们的值。

**取值 get**

现在取 json 对应的值。

```
console.log(map.get(json));
```

**删除 delete**

删除 delete 的特定值：

```
map.delete(json);
console.log(map)
```

** size 属性 **

```
console.log(map.size);
```

** 查找是否存在 has **

```
consolec .log(map.has('jspang'))
```

**清楚所有元素 clear**

```
map.clear()
```

总结：map 在现在开发中已经经常使用，它的灵活性和高效性是我们喜欢的。开发中试着去使用 map 吧，你一定会喜欢上它的。

## 第 15 节：用 Proxy 进行预处理

如果你学过我的 Vue 的课程，一定会知道钩子函数，那如果你刚接触我的博客，并没有学习 Vue，那我这里给你简单解释一下什么是钩子函数。当我们在操作一个对象或者方法时会有几种动作，比如：在运行函数前初始化一些数据，在改变对象值后做一些善后处理。这些都算钩子函数，Proxy 的存在就可以让我们给函数加上这样的钩子函数，你也可以理解为在执行方法前预处理一些代码。你可以简单的理解为他是函数或者对象的生命周期。

Proxy 的应用可以使函数更加强大，业务逻辑更加清楚，而且在编写自己的框架或者通用组件时非常好用。Proxy 涉及的内容非常多，那这里我就带你入门并且介绍给你后续的学习方法。

在学习新知识之前，先来回顾一下定义对象的方法。

```
var obj={
    add:function(val){
        return val+10;
    },
    name:'I am Jspang'

};
console.log(obj.add(100));
console.log(obj.name);
```

声明了一个 obj 对象，增加了一个对象方法 add 和一个对象属性 name，然后在控制台进行了打印。

**声明 Proxy**

我们用 new 的方法对 Proxy 进行声明。可以看一下声明 Proxy 的基本形式。

```
new Proxy（{},{}）;
```

需要注意的是这里是两个花括号，第一个花括号就相当于我们方法的主体，后边的花括号就是 Proxy 代理处理区域，相当于我们写钩子函数的地方。

现在把上边的 obj 对象改成我们的 Proxy 形式。

```
var pro = new Proxy({
    add: function (val) {
        return val + 10;
    },
    name: 'I am Jspang'
}, {
        get:function(target,key,property){
            console.log('come in Get');
            return target[key];
        }
    });

console.log(pro.name);
```

可以在控制台看到结果，先输出了 come in Get。相当于在方法调用前的钩子函数。

**get 属性**

get 属性是在你得到某对象属性值时预处理的方法，他接受三个参数

- target：得到的目标值
- key：目标的 key 值，相当于对象的属性
- property：这个不太常用，用法还在研究中，还请大神指教。

**set 属性**

set 属性是值你要改变 Proxy 属性值时，进行的预先处理。它接收四个参数。

- target:目标值。
- key：目标的 Key 值。
- value：要改变的值。
- receiver：改变前的原始值。

```
var pro = new Proxy({
    add: function (val) {
        return val + 10;
    },
    name: 'I am Jspang'
}, {
        get:function(target,key){
            console.log('come in Get');
            return target[key];
        },
        set:function(target,key,value,receiver){
            console.log(`    setting ${key} = ${value}`);
            return target[key] = value;
        }

    });

console.log(pro.name);
pro.name='技术胖';
console.log(pro.name);
```

**apply 的使用**

apply 的作用是调用内部的方法，它使用在方法体是一个匿名函数时。看下边的代码。

```
get = function () {
    return 'I am JSPang';
};
var handler = {
    apply(target, ctx, args) {
        console.log('do apply');
        return Reflect.apply(...arguments);
    }
}

var pro = new Proxy(target, handler);

console.log(pro());
```

其实 proxy 的知识是非常多的，这里我建议看阮一峰大神的《ES6》。我这里只能算是入门课程，俗话说得好：“师傅领进门，修行靠个人”，那我们下节课见了。

## 第 16 节：promise 对象的使用

ES6 中的 promise 的出现给我们很好的解决了回调地狱的问题，在使用 ES5 的时候，在多层嵌套回调时，写完的代码层次过多，很难进行维护和二次开发，ES6 认识到了这点问题，现在 promise 的使用，完美解决了这个问题。那我们如何理解 promise 这个单词在 ES5 中的作用那，你可以想象他是一种承诺，当它成功时执行一些代码，当它失败时执行一些代码。它更符合人类的行为思考习惯，而不在是晦涩难懂的冰冷语言。

**promise 的基本用法**

promise 执行多步操作非常好用，那我们就来模仿一个多步操作的过程，那就以吃饭为例吧。要想在家吃顿饭，是要经过三个步骤的。

1. 洗菜做饭。
2. 坐下来吃饭。
3. 收拾桌子洗碗。

这个过程是有一定的顺序的，你必须保证上一步完成，才能顺利进行下一步。我们可以在脑海里先想想这样一个简单的过程在 ES5 写起来就要有多层的嵌套。那我们现在用 promise 来实现。

```
let state=1;

function step1(resolve,reject){
    console.log('1.开始-洗菜做饭');
    if(state==1){
        resolve('洗菜做饭--完成');
    }else{
        reject('洗菜做饭--出错');
    }
}


function step2(resolve,reject){
    console.log('2.开始-坐下来吃饭');
    if(state==1){
        resolve('坐下来吃饭--完成');
    }else{
        reject('坐下来吃饭--出错');
    }
}


function step3(resolve,reject){
    console.log('3.开始-收拾桌子洗完');
     if(state==1){
        resolve('收拾桌子洗完--完成');
    }else{
        reject('收拾桌子洗完--出错');
    }
}

new Promise(step1).then(function(val){
    console.log(val);
    return new Promise(step2);

}).then(function(val){
     console.log(val);
    return new Promise(step3);
}).then(function(val){
    console.log(val);
    return val;
});
```

Promis 在现在的开发中使用率算是最高的，而且你面试前端都会考这个对象，大家一定要掌握好。

## 第 17 节：class 类的使用

我们在 ES5 中经常使用方法或者对象去模拟类的使用，虽然可以实现功能，但是代码并不优雅，ES6 为我们提供了类的使用。需要注意的是我们在写类的时候和 ES5 中的对象和构造函数要区分开来，不要学混了。

**类的声明**

先声明一个最简单的 coder 类，类里只有一个 name 方法，方法中打印出传递的参数。

```
class coder{
    name(val){
        console.log(val);
    }
}
```

**类的使用**

我们已经声明了一个类，并在类里声明了 name 方法，现在要实例化类，并使用类中的方法。

```
class Coder{
    name(val){
        console.log(val);
    }
}

let jspang= new Coder;
jspang.name('jspang');
```

类的多方法声明

```
class Coder{
    name(val){
        console.log(val);
        return val;
    }
    skill(val){
        console.log(this.name('jspang')+':'+'Skill:'+val);
    }
}

let jspang= new Coder;
jspang.name('jspang');
jspang.skill('web');
```

这里需要注意的是两个方法中间不要写逗号了，还有这里的 this 指类本身，还有要注意 return 的用法。

**类的传参**

在类的参数传递中我们用 constructor( )进行传参。传递参数后可以直接使用 this.xxx 进行调用。

```
class Coder{
    name(val){
        console.log(val);
        return val;
    }
    skill(val){
        console.log(this.name('jspang')+':'+'Skill:'+val);
    }

    constructor(a,b){
        this.a=a;
        this.b=b;
    }

    add(){
        return this.a+this.b;
    }
}

let jspang=new Coder(1,2);
console.log(jspang.add());
```

我们用 constructor 来约定了传递参数，然后用作了一个 add 方法，把参数相加。这和以前我们的传递方法有些不一样，所以需要小伙伴们多注意下。

**class 的继承**

如果你学过 java，一定知道类的一大特点就是继承。ES6 中也就继承，在这里我们简单的看看继承的用法。

```
class htmler extends Coder{

}

let pang=new htmler;
pang.name('技术胖');
```

声明一个 htmler 的新类并继承 Coder 类，htmler 新类里边为空，这时候我们实例化新类，并调用里边的 name 方法。结果也是可以调用到的。

## 第 18 节：模块化操作

在 ES5 中我们要进行模块华操作需要引入第三方类库，随着前后端分离，前端的业务日渐复杂，ES6 为我们增加了模块话操作。模块化操作主要包括两个方面。

- export :负责进行模块化，也是模块的输出。
- import : 负责把模块引，也是模块的引入操作。

** export 的用法：**

export 可以让我们把变量，函数，对象进行模块话，提供外部调用接口，让外部进行引用。先来看个最简单的例子，把一个变量模块化。我们新建一个 temp.js 文件，然后在文件中输出一个模块变量。

```
export var a = 'jspang';
```

然后可以在 index.js 中以 import 的形式引入。

```
import {a} from './temp.js';

console.log(a);
```

这就是一个最简单的模块的输出和引入。

**多变量的输出**

这里声明了 3 个变量，需要把这 3 个变量都进行模块化输出，这时候我们给他们包装成对象就可以了。

```
var a ='jspang';
var b ='技术胖';
var c = 'web';

export {a,b,c}
```

函数的模块化输出

```
export function add(a,b){
    return a+b;
}
```

as 的用法 有些时候我们并不想暴露模块里边的变量名称，而给模块起一个更语义话的名称，这时候我们就可以使用 as 来操作。

```
var a ='jspang';
var b ='技术胖';
var c = 'web';

export {
    x as a,
    y as b,
    z as c
}
```

export default 的使用 加上 default 相当是一个默认的入口。在一个文件里 export default 只能有一个。我们来对比一下 export 和 export default 的区别

1.export

```
export var a ='jspang';

export function add(a,b){
    return a+b;
}
```

对应的导入方式

```
import {a,add} form './temp';//也可以分开写
```

2.export defalut

```
export default var a='jspang';
```

对应的引入方式

```
import str from './temp';
```

ES6 的模块化不能直接在浏览器中预览，必须要使用 Babel 进行编译之后正常看到结果。这节课讲完我们 ES6 的课程就算结束了，你可能觉的没有书上的内容多，那是因为很多东西都归到了 ES7 中。甚至连 Babel 都不能很好的转换，这些知识我就不给大家讲解了。另外如果你想继续深入学习，可以搜索阮一峰大神的 ES6 在线图书。我是技术胖，那我们下套课程见了。
