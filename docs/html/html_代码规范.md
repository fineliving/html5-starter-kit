# AI Design HTML 指南

_用更合理的方式写 HTML_

## 1. 代码风格

### 1.1 缩进与换行

使用 `2` 个空格做为一个缩进层级。示例：

```html
<ul>
  <li>first</li>
  <li>second</li>
</ul>
```

### 1.2 段落

段落之间用两行分隔，段落里用一行分隔，段落添加相应注释。示例：

```html
<!--module1 start -->
<div class="module1">
  <div class="module1-1">module1-1</div>

  <div class="module1-2">module1-2</div>
</div>
<!--module1 end -->

<!--module2 start -->
<div class="module2">
  <div class="module2-1">module2-1</div>
</div>
<!--module2 end -->
```

### 1.3 标签

**_1. 标签名使用小写字母_**

示例：

```html
<!-- good -->
<p>Hello StyleGuide!</p>

<!-- bad -->
<p>Hello StyleGuide!</p>
```

**_2. 对 `HTML5` 中规定允许省略的闭合标签，不允许省略闭合标签_**

示例：

```html
<!-- good -->
<ul>
  <li>first</li>
  <li>second</li>
</ul>

<!-- bad -->
<ul>
  <li>first</li>
  <li>second</li>
</ul>
```

**_3. 标签使用必须符合标签嵌套规则_**

比如：

- div 不得置于 p 中
- tbody 必须置于 table 中
- 详细的标签嵌套规则参见[HTML DTD](http://www.cs.tut.fi/~jkorpela/html5.dtd)中的 `Elements` 定义部分

**_4. 组合标签不要拆开_**

示例：

```html
<!-- good -->
<ul>
  <li>first</li>
  <li>second</li>
</ul>

<!-- bad -->
<div>
  <li>first</li>
  <li>second</li>
</div>

<!-- bad -->
<ul>
  <li>first</li>
  <p>second</p>
</ul>
```

**_5. `HTML` 标签的使用应该遵循标签的语义_**

对于语义不强的地方，块级可选择用`div`，行内用`span`

下面是常见标签语义,更多标签参见[HTML 标签列表](http://www.w3school.com.cn/tags/index.asp)：

- p - 段落
- h1,h2,h3,h4,h5,h6 - 层级标题
- strong,em - 强调
- ins - 插入
- del - 删除
- abbr - 缩写
- code - 代码标识
- cite - 引述来源作品的标题
- q - 引用
- blockquote - 一段或长篇引用
- ul - 无序列表
- ol - 有序列表
- dl,dt,dd - 定义列表

**_6. 标签的使用应尽量简洁，减少不必要的父标签_**

示例：

```html
<!-- good -->
<img class="avatar" src="image.png" />

<!-- bad -->
<span class="avatar">
  <img src="image.png" />
</span>
```

### 1.4 属性

**_1. `HTML` 属性应当按照以下给出的顺序依次排列，确保代码的易读性_**

class 用于标识高度可复用组件，因此应该排在首位。id 用于标识具体组件，应当谨慎使用（例如，页面内的书签），因此排在第二位。

- `class`
- `id`,`name`
- `data-`
- `src`,`for`,`type`,`href`,`value`
- `title`,`alt`
- `role`,`aria-`

```html
<a class="..." id="..." data-toggle="modal" href="#">
  Example link
</a>

<input class="form-control" type="text" />

<img src="..." alt="..." />
```

**_2. 属性名必须使用小写字母_**

示例：

```html
<!-- good -->
<table cellspacing="0">
  ...
</table>

<!-- bad -->
<table cellspacing="0">
  ...
</table>
```

**_3. 属性值必须用双引号包围_**

示例：

```html
<!-- good -->
<script src="esl.js"></script>

<!-- bad -->
<script src="esl.js"></script>
<script src="esl.js"></script>
```

**_4. 布尔类型的属性，建议不添加属性值_**

示例：

```html
<input type="text" disabled /> <input type="checkbox" value="1" checked />
```

## 2. 通用

### 2.1 DOCTYPE

使用 `HTML5` 的 `doctype` 来启用标准模式，建议使用大写的 `DOCTYPE`

示例：

```html
<!DOCTYPE html>
```

### 2.2 IE 兼容模式

建议启用 IE Edge 模式,IE 支持通过特定的 `<meta>` 标签来确定绘制当前页面所应该采用的 IE 版本。除非有强烈的特殊需求，否则最好是设置为 edge mode，从而通知 IE 采用其所支持的最新的模式。

示例：

```html
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
```

### 2.3 语言属性

建议在 `html` 标签上设置正确的 lang 属性,有助于提高页面的可访问性，如：让语音合成工具确定其所应该采用的发音，令翻译工具确定其翻译语言等。

示例：

```html
<html lang="zh-CN"></html>
```

### 2.4 字符编码

通过明确声明字符编码，能够确保浏览器快速并容易的判断页面内容的渲染方式。这样做的好处是，可以避免在 HTML 中使用字符实体标记（character entity），从而全部与文档编码一致（一般采用 UTF-8 编码）。

示例：

```html
<html>
  <head>
    <meta charset="UTF-8" />
    ......
  </head>
  <body>
    ......
  </body>
</html>
```

### 2.5 CSS 和 JavaScript 引入

**_1. 引入 `CSS` 时必须指明 `rel="stylesheet"`_**

示例：

```html
<link rel="stylesheet" src="page.css" />
```

**_2. 引入 `CSS` 和 `JavaScript` 时一般无须指明 `type` 属性。_**

`text/css` 和 `text/javascript` 是 type 的默认值

**_3. 在 `head` 中引入页面需要的所有 `CSS` 资源,`JavaScript` 应当放在页面末尾，或采用异步加载_**

在页面渲染的过程中，新的 CSS 可能导致元素的样式重新计算和绘制，页面闪烁。 将 script 放在页面中间将阻断页面的渲染。出于性能方面的考虑，如非必要，请遵守此条建议。

示例：

```html
<html>
  <head>
    ......
    <link rel="stylesheet" src="page.css" />
  </head>
  <body>
    ......
    <!-- a lot of elements -->
    <script src="init-behavior.js"></script>
  </body>
</html>
```

## 3. 图片

**_1. 禁止 `img` 的 `src` 取值为空。延迟加载的图片也要增加默认的 `src`_**

src 取值为空，会导致部分浏览器重新加载一次当前页面

**_2. 避免为 `img` 添加不必要的 `title` 属性_**

多余的 title 影响看图体验，并且增加了页面尺寸。

**_3. 为重要图片添加 `alt` 属性_**

可以提高图片加载失败时的用户体验。

**_4. 有下载需求的图片采用 `img` 标签实现，无下载需求的图片采用 `CSS` 背景图实现_**

- 产品 logo、用户头像、用户产生的图片等有潜在下载需求的图片，以 img 形式实现，能方便用户下载。
- 无下载需求的图片，比如：icon、背景、代码使用的图片等，尽可能采用 css 背景图实现。

## 4. 表单

### 4.1 控件标题

有文本标题的控件必须使用 `label` 标签将其与其标题相关联。

示例：

```html
<label><input type="checkbox" name="confirm" value="on" /> 我已确认上述条款</label>

<label for="username">用户名：</label> <input type="textbox" name="username" id="username" />
```

### 4.2 按钮

使用 `button` 元素时必须指明 `type` 属性值
button 元素的默认 type 为 submit，如果被置于 form 元素中，点击后将导致表单提交。为显示区分其作用方便理解，必须给出 type 属性。

示例：

```html
<button type="submit">提交</button> <button type="button">取消</button>
```

### 4.3 输入框

在针对移动设备开发的页面时，根据内容类型指定输入框的 `type` 属性。
根据内容类型指定输入框类型，能获得能友好的输入体验。

示例：

```html
<input type="date" />
```
