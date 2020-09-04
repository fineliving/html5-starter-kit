# 初探 CSS 对象模型（CSSOM）

https://www.w3cplus.com/javascript/cssom-css-typed-om.html

可以通过一些 JavaScript 的 API 操作和处理 Web 页面上的 HTML 元素。在 Web 中除了 DOM 之外还有另外一个对象模型： **CSS 对象模型（即 CSSOM）** 。

或许你已经在项目中已经用过了，只不过没有意识到这一点而以。今天这篇文章中，我们主要来一起探讨有关于 CSSOM 相关的特性。

## CSSOM 是什么？

既然我们要探讨 CSSOM 是什么？那就很有必要先了解它是一个什么东东？ [MDN 上对 CSSOM 的描述](https://developer.mozilla.org/zh-CN/docs/Web/API/CSS_Object_Model) 是这样的：

> **CSS Object Model** 是一组允许用 JavaScript 操纵 CSS 的 API。 它是继 DOM 和 HTML API 之后，又一个操纵 CSS 的接口，从而能够动态地读取和修改 CSS 样式。

非常类似于 DOM，但是用于 CSS 而不是 HTML。它允许用户动态读取和修改 CSS 样式。

[CSSOM 在 W3C 规范中有一个独立的模块](http://www.w3.org/TR/cssom-1/) ，对于我们学习 CSSOM 还是很有帮助的，但相较于 MDN 而来，更难于阅读和理解。

为了更好的理解 CSSOM 是什么？我来们先来看一个简单的示例。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <link href="style.css" rel="stylesheet" />
    <title>Critical Path</title>
  </head>
  <body>
    <p>Hello <span>web performance</span> students!</p>
    <div><img src="awesome-photo.jpg" /></div>
  </body>
</html>
```

```css
/*style.css*/
body {
  font-size: 16px;
}
p {
  font-weight: bold;
}
span {
  color: red;
}
p span {
  display: none;
}
img {
  float: right;
}
```

::: run {title:"理解 CSSOM",row:true,reverse:true}

```html
<template>
  <div>
    <p>Hello <span>web performance</span> students!</p>
    <div><img src="/basic/css/align.jpg" /></div>
  </div>
</template>
<style>
  body {
    font-size: 16px;
  }
  p {
    font-weight: bold;
  }
  span {
    color: red;
  }
  p span {
    display: none;
  }
  img {
    float: right;
  }
</style>
```

:::

这是一个非常简单的 Web 页面，“包含了一些文本和一幅图片”。浏览器处理这个页面的过程如下：

![img](/basic/css/DOM树构建流程.png)

根据前面所学，其对应的 DOM 结构建如下：

![img](/basic/css/DOM树.png)

对于 Web 的样式，其处理 HTML 有点类似，**需要将收到的 CSS 规则转换成某种浏览器能够理解和处理的东西** 。因此，我们会重复 HTML 过程，只不过是为 CSS 而不是 HTML:

![img](/basic/css/CSSOM规则树构建流程.png)

**CSS 字节转换成字符，接着转换成令牌和节点，最后链接到一个 CSSOM 的树结构中：**

![img](/basic/css/CSSOM规则树.png)

是不是看上去和 DOM 结构树类似呀。那么 CSSOM 为何具有树结构呢？**为页面上的任何对象计算最后一组样式时，浏览器都会先从适用于该节点的最通用规则开始**，比如，如果该节点是 `body` 元素的子元素，则应用所有 `body` 样式，然后通过应用更具体的规则（这里将会运用 [CSS 层级相关的管理规则](/basic/css/层叠和继承) ）以递归方式优化计算的样式。

上面的示例就很形象的介绍了 CSSOM。

注意，上图显示的树并非是一颗完整的 CSSOM 树，它只显示了我们决定在样式表中替换的样式。

事实上这一过程是相当复杂的过程，在这里不做过多的介绍，如果你感兴趣的话，可以阅读下面两篇文章：

- [浏览器的渲染原理简介](http://coolshell.cn/articles/9666.html)
- [浏览器的渲染：过程与原理](http://zhuanlan.zhihu.com/p/29418126)
- [浏览器内核、JS 引擎、页面呈现原理及其优化](http://www.zybuluo.com/yangfch3/note/671516)
- [探究 CSS 解析原理](http://jartto.wang/2017/11/13/Exploring-the-principle-of-CSS-parsing/)
- [浏览器的工作原理：新式网络浏览器幕后揭秘](http://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/#Layered_representation)
- [浏览器原理](http://github.com/lhyt/issue/issues/22)
- [理解关键的渲染路径](http://www.w3cplus.com/performance/understanding-the-critical-rendering-path.html)
- [关键渲染路径](http://github.com/berwin/Blog/issues/29)

但这一切都并不重要，重要的是我们可以通过这篇文章来学习 CSSOM 一些常见的特性，有利于我们更好的掌握 CSSOM 相关的特性和 API 所起的相关作用。

## 使用 `ele.style` 设置元素行内样式

在 Web 开发中，我们有的时候需要动态的控制 HTML 元素的样式，对于这样的场景，大多数都是通过 JavaScript 的 API 来控制 HTML 的 `style` 属性。 面对这样的场景是使用 `ele.style` 这个 API 来控制 `style` 对象。我们可以通过在浏览器的控制台中，输入 `$0.style` 可以输出对应元素的 `style` 所对应的属性：

![img](/basic/css/style.png)

比如我们要修改表单元素 `input` 的背景颜色，我们可以这么做：

```js
$0.style.backgroundColor='green'
```

这样元素 `input` 自动加下了 `style` 属性，而且值为 `background-color: green` 。同时表单的背景颜色变成了 `green` ：

![img](/basic/css/style使用.png)

`$0` 是浏览器调试器中的一个技巧，指定是选择中的元素。在实际使用的时候，可以通过 JavaScript 选择器相关的 API 来获取你想要的 DOM 元素。最为常见的就是使用 `getElement*` 和 `querySelector*` API，有关于这方面更为详细的介绍，可以阅读 DOM 系列中的《 [`getElement*` 和 `querySelector*` ](http://www.w3cplus.com/javascript/searching-elements-dom.html)》一文。

也就是说，我们可以使用相同的格式添加或更改页面上任何对象的 CSS： **`ele.style.propertyName`** ，其中 `ele` 指的是 DOM 元素， `propertyName` 指的是希望给 `ele` 元素要添加的样式属性（ 记住，带有 `-` 中划线的 CSS 属性需要改用陀峰形式，比如上面示例中的 `background-color` 属性要写成 `backgroundColor` ）。

注意，在动态设置 `float` 属性时，需要使用 `cssFloat` ，这是因为 `float` 是 JavaScript 中的一个关键词。这个有点类似于 `getAttribute()` 给 HTML 元素设置 `for` 属性时，需要使用 `htmlFor` 。

这种方式是使用 JavaScript 给 DOM 元素设置样式最简单的方法。但是以这种方式给 DOM 元素设置样式有一个最大的局限性： **只能给 DOM 元素添加内联样式** 。同样的，如果我们想获取一个 DOM 元素的内联样式中某个属性的值时，也可以采用这种方式：

```js
$0.style.backgroundColor // => green
```

当然，通过上面方式获取 DOM 元素内联样式对应属性的值时，有个前提条件，那就是该元素定义了该内联样式。如果未指定（定义）该样式，那么将不会返回任何值：

```js
$0.style.color // => ""
```

在 [CSS Houdini](http://developers.google.com/web/updates/2016/05/houdini) 中的 [CSSOM](http://drafts.css-houdini.org/css-typed-om/) ，我们可以使用 `.attributeStyleMap` 属性来替代 `ele.style` 。可以使用 `ele.attributeStyleMap.set(property, value)` 来设置元素内联样式：

```js
$0.attributeStyleMap.set('background-color', 'green')
```

其得到的效果和 `ele.style.property = value` 等同的效果。另外， `.attributeStyleMap` 类似于 Map 对象，所以它们支持对象常有的一些方法，比如 `get` 、 `set` 、 `keys` 、 `values` 和 `entry` 等。这样让我们的工作也变得更为灵活：

```js
$0.attributeStyleMap.set('background-color', 'green') // 设置background-color的值为green
$0.attributeStyleMap.get('background-color').value === 'green' // => false
$0.attributeStyleMap.has('background-color') // => true
$0.attributeStyleMap.delete('background-color') // => 删除background-color
$0.attributeStyleMap.clear() // => 删除所有样式
```

## 获取计算样式

我们可以使用 `window.getComputedStyle()` 方法获取元素上任何 CSS 的计算值。

![img](/basic/css/getComputedStyle.png)

在浏览器的 **Computed** 一项中，我们可以查看到任何元素具有的可计算的样式。如上图所示。那么我们可以通过 `window.getComputedStyle()` 方法获取相应的计算样式，比如像下面这样：

```js
window.getComputedStyle($0).backgroundColor // => "rgb(0, 128, 0)"
```

上面只是获取了其中一个计算样式值。除了上述的方式，我们还可以通过其他的方式来获取，比如：

```js
window.getComputedStyle(el).backgroundColor;
window.getComputedStyle(el)['background-color'];
window.getComputedStyle(el).getPropertyValue('background-color');
```

而在新的 CSSOM 中有一个新的 API，可以让我们获取计算值。比如：

```js
el.computedStyleMap().get('opacity').value // => 0.5
```

注意， `window.getComputedStyle()` 和 `ele.computedStyleMap()` 的差别是，前者返回的是解析值，而后值返回计算值。类如，如果你的样式中有一个这样的值， `width: 50%` ，那么在 **Typed OM** 中将保留百分值（ `width: 50%` ）;而 CSSOM 中返回的是解析值（ `width: 200px` ）。

上面示例中， `window.getComputedStyle()` 方法只传了一个参数，对于普通元素可以省略第二个参数，或者显示的传一个 `null` 值：

```js
window.getComputedStyle(ele, null).property;
```

其实，它有一个小细节，它允许你检索伪元素的样式信息：

```js
window.getComputedStyle(ele, '::before').property;
```

## CSSStyleDeclaration 相关 API

通过前面的内容我们知道如何通过 `style` 对象或使用 `getComputedStyle()` 访问样式属性，这两个其实是 `CSSStyleDeclaration` 接口。也就是说，我们可以像下面这样将 `body` 元素上返回一个 `CSSStyleDeclaration` 对象：

```js
document.body.style;
window.getComputedStyle(document.body);
```

我们可以在浏览器控制台中看到上面的命令将会输出的内容：

![img](/basic/css/CSSStyleDeclaration接口.png)

这两者有点不同，前者其实是前面介绍的 `ele.style` ，它可以获取和设置元素 CSS 属性的值，只不过只是给元素添加内联样式；但 `window.getComputedStyle(ele)` 获取的是只读值。

`CSSStyleDeclaration` 有几个常用的方法：

- **`setProperty()`** ：给一个声明了 CSS 样式的对象设置一个新的值
- **`getPropertyValue()`** ：用来获取 CSS 属性的值
- **`item()`** ：通过下标从 `CSSStyleDeclaration` 返回一个 CSS 属性值
- **`getPropertyPriority()`** ：根据传入的 CSS 属性，返回一个 `DOMString` 来表示该属性的权重（优先级）
- **`removeProperty()`** ：移除 `style` 对象的一个属性

接下来分别看这几个方法是如何使用的。

### `setProperty()`

该方法可以给 CSS 的属性设置一个新的值。可以像下面这样使用：

```js
ele.style.setProperty(property, value, priority)
```

其中 `property` 指的是 CSS 属性， `value` 设置的属性的值， `priority` 允许设置 CSS 的权重，即 `!important` 。比如下面这个示例：

```js
$0.style.setProperty('color', 'red')

window.getComputedStyle($0).color  // => "rgb(255, 0, 0)"
```

### `getPropertyValue()`

该方法可以用来获取 CSS 属性的值，比如像下面这样：

```js
$0.style.getPropertyValue('color')  // => "red"
```

使用该方法时，如果 `getComputedStyle` 没有给元素指定属性时，它将返回一个空字符串：

```js
$0.style.getPropertyValue('background-color') // => ""
```

### `item()`

在 `CSSStyleDeclaration` 的 `item()` 方式可以让我们通过下标从 `CSSStyleDeclaration` 返回一个 CSS 属性值。其使用格式：

```js
ele.style.item(index)
```

其中 `index` 是需要查找节点的索引，索引下标从 `0` 开始。如果我们要获取元素行内样式中所有的属性时可以通过下面的方式遍历出来：

```js
for(let i = 0; i < $0.style.length; i++) {
    console.log($0.style.item(i))
}

// => clear
// => position
// => zoom
```

这里有一个小细节， `item()` 方法只要传入参数，这个方法就不会抛出异常，当传入的下标越界时会返回空字符串，当未传入参数时会抛出一个 `TypeError` 。

![img](/basic/css/item.png)

### `getPropertyPriority()`

`getPropertyPriority()` 方法是一个很有意思的方法。这个方法会根据传入的 CSS 属性，返回一个 `DOMString` 来表示该属性的优先级。如果有的话，则返回 `important` ；如果不存在的话，返回空字符串。

在介绍 `style.setProperty()` 方法的时候，我们在给其传参数的时候，第三个参数就可以指定属性的优先级。或者在原有的 CSS 中带有 `!important` 时，该方法也会返回 `important` 字符串。比如下面这个小示例：

```js
$0.style.setProperty('border', '2px solid red', 'important')
$0.style.setProperty('background-color', 'orange')

$0.style.getPropertyPriority('border')                // => "important"
$0.style.getPropertyPriority('background-color')      // => ""
```

上面的示例中，第一行代码和第二行代码使用了 `ele.style.setProperty()` 方式给元素分别设置了 `border` 和 `background-color` 两个属性，不同之处是，第一个传了第三个参数 `priority` （即 `"important"` ）。这个参数就相当于在给属性值后面附加了 `!important` 关键字。

![img](/basic/css/getPropertyPriority.png)

在用 `!important` 设置属性之后，使用 `ele.style.getPropertyPriority()` 方法检查该属性的优先级。前面也提到过了，如果元素的 `style` 中的属性带有 `!important` 值，也可以使用该方法进行检查。

这里有一个小细节需要注意，如果内联样式中的简写属性，比如 `margin` 属性值带有 `!important` 关键词，如果我们使用 `ele.style.getPropertyPriority()` 在检查简写属性或示简写的属性的时，都将返回 `important` 的值。比如下面的代码：

```js
$0.style.getPropertyPriority('margin')       // =>  "important"
$0.style.getPropertyPriority('margin-top')   // =>  "important"
$0.style.getPropertyPriority('margin-right') // =>  "important"
$0.style.getPropertyPriority('margin-bottom')// =>  "important"
$0.style.getPropertyPriority('margin-left')  // =>  "important"
```

### `removeProperty()`

该方法可以移除 `style` 对象的一个属性：

```js
$0.style.removeProperty('margin')    // => ""
$0.style.getPropertyValue('margin')  // => ""
```

这个时候，DOM 元素中 `style` 里的 `margin` 属性被移除了，比如下图所示的结果：

![img](/basic/css/removeProperty.png)

## CSSStyleSheet 接口

前面我们所聊的内容大部分都是关于元素内联样式（通常局限性较大）和计算样式（通常很有用，但过于具体）。接下来要聊的 `CSSStyleSheet` 相关的 API 是一个更有用的 API，它允许检索具有可读和可写值的样式表，而不仅仅是内联样式表。简单地说，该接口代表一个单一的 CSS 样式表。

在写 Web 页面的时候，我们一直都提倡将页面的样式规则放入到一个单一（或多个）样式文件中，或者 `` 标签中。这两种方式写样式都会包含一组 CSS 规则。每条 CSS 规则可以通过与之相关联的对象进行操作，这个关联对象实现了 `CSSStyleRule` 接口，而 `CSSStyleRule` 反过来实现了 `CSSRule` 。 `CSSStyleSheet` 允许你检测与修改和它相关联的的样式表，包括样式表的规则列表。

实际上， `CSSStyleSheet` 也实现了更为通用的 `StyleSheet` 接口。实现一个 `document` 的样式表的 `CSSStyleSheet` 列表可以过 `document.styleSheet` 属性获取(这个 `document` 通过外联样式表或内嵌的 `style` 元素定义样式)。

比如，我们可以使用下面的方式来查看一个页面（文档）中有多少样式表：

```js
document.styleSheets.length  // => 5
```

上面代码查询出 W3cplus 网站总共用了多少个 CSS 样式表（样式文件）：

![img](/basic/css/styleSheets使用1.png)

同样的，我们可以使用下标索引引用文档中的任何样式表，比如：

![img](/basic/css/styleSheets使用2.png)

我们也可遍历出来所有运用到的样式表的相关信息：

```js
for(let i = 0; i < document.styleSheets.length; i++) {
    console.log(document.styleSheets[i])
}
```

![img](/basic/css/styleSheets使用3.png)

在上面两个截图中，我们都可以看到 `cssRules` 和 `ownerRule` 两个属性：

- **`cssRules`** ：返回样式表中 CSS 规则的 `CSSRuleList` 对象
- **`ownerRule`** ：如果一个样式表示通过 `@import` 规则引入 `document` 的，则 `ownerRule` 将返回那个 `CSSImportRule` 对象，否则返回 `null`

其中 `cssRules` 属性是较为有用的。此属性提供样式表中包含的所有 CSS 规则（包括声明块、 `at-rules` 和媒体查询等）的列表。

![img](/basic/css/cssRules.png)

在这个示例中，总共有 `116` 个 CSS 规则。

在接下来的部分中，我们将详细介绍如何使用这个 API 来操作和读取外部样式表中的样式。比如我们要把第一个 `.css` 文件中所有选择器打印出来，我们就可以像下面这样做：

```js
let myRules = document.styleSheets[0].cssRules

for (i of myRules) {
    if (i.type === 1) {
        console.log(i.selectorText)
    }
}
```

打印出来的结果类似下图这样：

![img](/basic/css/cssRules2.png)

在上面的代码中需要注意两件事。首先，把第一个样式表中的 `cssRules` 对象赋值给一个变量缓存起来，然后使用 `for... of` 循环来循环该对象中的所有规则，检查每个规则的类型。在这种情况之下，我们需要的规则类型( `type` )是 `1` ，它表示 `STYLE_RULE` 常量。其他常量包括 `IMPORT_RULE` (对应的 `type = 3` )、 `MEDIA_RULE` （对应的 `type=4` ）和 `KEYFRAMES_RULE` （对应的 `type=7` ）。更多的类型如下图所示， [也可以在 MDN 上查阅](http://developer.mozilla.org/zh-CN/docs/Web/API/CSSRule#Type_constants) ：

![img](/basic/css/cssRules类型.png)

同样的，我们可以使用类似的方法打印出 `@media` 和 `@keyframes` 里面相关的信息。也可以以类似方式打印出类似 `selectorText` 相关的信息，比如 `style` 、 `styleMap` 和 `cssText` 等。比如：

```js
let myRules = document.styleSheets[0].cssRules

for (i of myRules) {
    if (i.type === 1) {
        console.log(i.cssText)
    }
}
```

打印出来的结果类似下图：

![img](/basic/css/cssRules3.png)

在 `CSSStyleSheet` 接口中除了上面提到的两个常见属性之外，还有两个方法，允许你从样式表中添加或删除整个规则。

- **`insertRule`** ：向样式表中插入一条新规则
- **`deleteRule`** ：从当前样式表对象中删除指定的样式规则

比如我们要给第一个样式表中添加一条新的样式规则：

```js
let firstStylesheet = document.styleSheets[0]
console.log(firstStylesheet.cssRules.length)  // => 116

firstStylesheet.insertRule(
    `body {
        background-color: orange;
        font-size: 3em;
        padding: 2em;
    }`,
    firstStylesheet.cssRules.length
)
```

这个时候在样式表中添加了下面的样式：

![img](/basic/css/insertRule.png)

我也可以通过下面的代码，来验证：

```js
for (i of firstStylesheet.cssRules) {
    if (i.type === 1) {
        console.log(i.cssText)
    }
}
```

![img](/basic/css/cssRules4.png)

其 `cssRules` 的 `length` 值由 `116` 变成 `117` ：

```js
console.log(firstStylesheet.cssRules.length)   // => 117
```

`stylesheet.insertRule()` 方法接受两值参数：

```js
rule
index
```

注意，对于普通样式规则来说,要插入的字符串应该包含选择器和样式声明。对于 `@` 规则来说，要插入的字符串应该包含 `@` 标识符和样式规则的内容。另外， `index` 未设置的话，则默认为 `0` ，新添加的 `rule` 将会插入到样式表的最前面，如果 `index` 索引值恰好大于 `cssRules.length` ，将会抛出一个错误。

`deleteRule()` 方法相对来说更为容易，它只接受一个参数 `index` 。 `index` 就是一个数字，用来指定样式规则的位置。作为参数传入的所选 `index` 必须小于 `cssRules.length` ，否则将抛出错误。比如我们现在要删除刚才新增加的样式规则：

```css
body {
    background-color: orange;
    font-size: 3em;
    padding: 2em;
}
```

我们就可以像下面这样来删除这条规则：

```js
firstStylesheet.deleteRule(116)
```

对应的样式规则就删除了。如果把 `116` 换成 `117` 就会报错：

![img](/basic/css/deleteRule.png)

## CSSOM 的未来

在介绍 `ele.style` 这个 API 的时候，简单的提到过， [CSS Houdini](http://drafts.css-houdini.org/) 中提到了新的 CSSOM（即 [CSS Typed OM](http://drafts.css-houdini.org/css-typed-om/) ）。新的 CSSOM 相关的 API 能提供更大的优势。有关于这方面的介绍，可以阅读 Google 开发者文档中 [@Eric Bidelman](http://developers.google.com/web/resources/contributors/ericbidelman) 写的 [博文](http://developers.google.com/web/updates/2018/03/cssom) 。

## 总结

通过 JavaScript 中的相关 API 来操作 CSS 样式表肯定不是每个项目中都会用到的。但文章中提到的一些 API 的的确确可以帮助我们实现一些复杂交互。因此，掌握这些 API 是很有必要的，同时能加强我们处理业务的能力。

## 扩展阅读

- [An Introduction and Guide to the CSS Object Model](http://css-tricks.com/an-introduction-and-guide-to-the-css-object-model-cssom/)
- [Working with the new CSS Typed Object Model](http://developers.google.com/web/updates/2018/03/cssom)
- [CSS Object Model](http://www.w3.org/TR/cssom-1/)
- [更高效、更安全地操作 CSSOM ：CSS Typed OM](http://www.miaoroom.com/code/cssom-css-typed-om.html)
- [CSSOM 视图模式(CSSOM View Module)相关整理](http://www.zhangxinxu.com/wordpress/?p=1907)
