# HTTP请求

网页需要的所有内容都必须是网页-文本，图形，样式，脚本以及所有内容-必须通过HTTP请求从服务器下载。可以毫不夸张地说，页面总显示时间的绝大部分都花在了下载其组件上，而不是在实际显示它们上。到目前为止，我们已经讨论过通过压缩图像，最小化CSS和JavaScript，压缩文件等等来减少下载量。但是，还有一个更基本的方法：除了减少下载*大小之外*，我们还考虑减少下载*频率*。

减少页面所需的组件数量成比例地减少了它必须发出的HTTP请求的数量。这并不意味着省略内容，而是意味着更有效地组织内容。

## 合并文字资源

许多网页使用多个样式表和脚本文件。在开发页面并向其中添加有用的格式和行为代码时，为了清晰和易于维护，我们经常将代码片段放入单独的文件中。或者，我们可以将自己的样式表与市场部要求我们使用的样式表分开。或者我们可以在测试过程中将实验性规则或脚本放在单独的文件中。这些都是拥有多个资源文件的正当理由。

但是因为每个文件都需要自己的HTTP请求，并且每个请求都需要时间，所以我们可以通过合并文件来加快页面加载；一个请求而不是三个或四个请求肯定会节省时间。乍一看，这似乎不费吹灰之力-只需将所有CSS（例如）放入主样式表，然后从页面中除去一个即可。通过这种方式消除的每个额外文件都会删除一个HTTP请求并节省往返时间。但是有一些警告。

对于级联样式表，请注意“ C”。级联优先级允许后面的规则在没有警告的情况下覆盖以前的规则-从字面上看。当通过较新的规则重置先前定义的属性时，CSS不会引发错误，因此仅将样式表混在一起会带来麻烦。相反，应查找有冲突的规则，并确定一个规则是否总是要取代另一个规则，或者是否应该使用更特定的选择器来正确应用。例如，考虑以下两个简单规则，第一个规则来自主样式表，第二个规则由Marketing提供的样式表导入。

```css
h2 { font-size: 1em; color: #000080; } /* master stylesheet */

. . .

h2 { font-size: 2em; color: #ff0000; } /* Marketing stylesheet */
```

营销部门希望他们`h2`的领导地位突出，而您的领导地位则应该更加柔和。但是由于级联顺序，它们的规则优先，并且`h2`页面中的每个页面都会大红色。显然，您不能仅仅翻转样式表的顺序，否则就会遇到同样的问题。

一项小小的研究可能表明Marketing `h2`总是出现在的特定类中`section`，因此通过对第二个规则的选择器进行调整可以解决冲突。Marketing的`h2`s仍然会看起来像他们想要的一样，但不会影响`h2`页面其他位置的。

```css
h2 { font-size: 1em; color: #000080; }

. . .

section.product h2 { font-size: 2em; color: #ff0000; }
```

合并JavaScript文件时，您可能会遇到类似情况。完全不同的函数可能具有相同的名称，或者名称相同的变量可能具有不同的范围和用途。如果您积极寻找这些障碍，它们并不是不可克服的障碍。

合并文本资源以减少HTTP请求是值得的，但是在这样做时要小心。请参阅下面**的警告**。

## 合并图形资源

从表面上看，这种技术听起来有点荒谬。当然，将多个CSS或JavaScript资源组合到一个文件中是合乎逻辑的，但是图像吗？实际上，它相当简单，并且与组合文本资源一样，具有减少HTTP请求数量的效果-有时甚至更为明显。

尽管此技术可以应用于任何图像组，但最常用于诸如图标之类的小型图像，在这种情况下，额外的HTTP请求来获取多个小型图形特别浪费。

基本思想是将小图像合并到一个物理图像文件中，然后使用CSS背景定位在页面的正确位置仅显示图像的正确部分（通常称为 [雪碧图(sprites)](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Images/Implementing_image_sprites_in_CSS) ）。CSS的重新定位是快速，无缝的，可以在已经下载的资源上运行，并且可以很好地折衷其他需要的多个HTTP请求和图像下载。

例如，您可能具有一系列社交媒体图标，并带有指向它们各自网站或应用程序的链接。您可以像这样将它们组合成一个图像文件，而不是下载三个（或更多）单独的图像。

![socialmediaicons.png](https://developers.google.cn/web/fundamentals/performance/get-started/images/image_500.png)

然后，不要对链接使用不同的图像，只需检索整个图像一次，并对每个链接使用CSS背景定位（“ spriting”），以显示该链接的图像的正确部分。

这是一些示例CSS。

```css
a.facebook {
   display: inline-block;
   width: 64px; height: 64px;
   background-image: url("socialmediaicons.png");
   background-position: 0px 0px;
   }
a.twitter {
   display: inline-block;
   width: 64px; height: 64px;
   background-image: url("socialmediaicons.png");
   background-position: -64px 0px;
   }
a.pinterest {
   display: inline-block;
   width: 64px; height: 64px;
   background-image: url("socialmediaicons.png");
   background-position: -128px 0px;
   }
```

请注意该类中的无关`background-position`属性`facebook`。不需要，因为默认位置为0,0，但为了保持一致性而包含在此处。其他两个类别只是简单地将图像相对于其容器分别向左水平移动了64px和128px，从而在64 x 64像素链接“窗口”中保留了适当的图像部分。

这是与该CSS一起使用的HTML。

```html
<p>Find us on:</p>
<p><a class="facebook" href="https://facebook.com"></a></p>
<p><a class="twitter" href="https://twitter.com"></a></p>
<p><a class="pinterest" href="https://pinterest.com"></a></p>
```

不用在链接本身中包含单独的图像，只需应用CSS类并将链接内容保留为空。通过让CSS在幕后移动图像，这项简单的技术可以为您节省两个HTTP请求。如果您有很多小图像（例如，导航图标或功能按钮），则可以节省许多前往服务器的行程。

您可以在[WellStyled](https://wellstyled.com/css-nopreload-rollovers.html)中找到有关此技术的简短但出色的文章，包括工作示例。

## 注意事项

在讨论组合文本和图形时，我们应注意，较新的 [HTTP/2](https://developers.google.cn/web/fundamentals/performance/http2) 协议可能会改变您考虑组合资源的方式。例如，最小化，服务器压缩和图像优化等常见且有价值的技术应在HTTP/2上继续进行。但是，如上所述在物理上组合文件可能无法在HTTP/2上获得所需的结果。

这主要是因为服务器请求在HTTP/2上的速度更快，因此合并文件以消除请求可能不会产生实质性的效果。此外，如果将相当静态的资源与相当动态的资源组合起来以保存请求，则可能会通过强制重新加载资源的静态部分以仅获取动态部分而对缓存效率产生不利影响。

在这种情况下，HTTP/2的功能和优点值得探讨。

## JavaScript位置和内联推送

到目前为止，我们假设所有CSS和JavaScript资源都存在于外部文件中，这通常是交付它们的最佳方法。请记住，脚本加载是一个大而复杂的问题- 有关完整处理方法，请参见**HTML5Rocks**这篇出色的文章《[深入探讨脚本加载的浑水](https://www.html5rocks.com/en/tutorials/speed/script-loading/)》。但是，关于JavaScript有两个相当直接的位置因素值得考虑。

### 脚本位置

常见的约定是将脚本块放在页眉中。这种定位的问题在于，通常只有很少或根本没有脚本真正要在页面显示之前执行，但是在加载页面时，它不必要地阻塞了页面渲染。识别渲染阻止脚本是[PageSpeed Insights](https://developers.google.cn/speed/docs/insights/BlockingJS)的报告规则之一 。

一种简单有效的解决方案是在页面末尾重新放置延迟的脚本块。也就是说，将脚本引用放在最后，紧接在body标记之前。这样，浏览器可以加载和呈现页面内容，然后在用户感知初始内容的同时下载脚本。例如：

```html
<html>
  <head>
  </head>
  <body>
    [Body content goes here.]
  <script src="mainscript.js"></script>
  </body>
</html>
```

该技术的例外是任何脚本，该脚本可操纵初始内容或DOM，或者在渲染之前或渲染期间提供所需的页面功能。像这样的关键脚本可以像往常一样放入一个单独的文件中，并加载到页眉中，其余脚本仍可以放置在页面中的最后一件事，仅在呈现页面后才能加载。

必须加载资源以获得最大效率的顺序称为 *关键渲染路径* ; 您可以在[Bits of Code](https://bitsofco.de/understanding-the-critical-rendering-path/)上找到有关它的详尽文章 。

### 代码位置

当然，上述技术会将您的JavaScript分成服务器上的两个文件，因此需要两个HTTP请求而不是一个，这正是我们要避免的情况。重定位关键的预渲染脚本的更好解决方案可能是将它们直接放置在页面本身内，称为“内联推送”。

在这里，不要将关键脚本放在单独的文件中并在`...`页眉中引用，而是在页眉或正文中添加一个块，然后插入脚本本身（不是文件引用，而是实际的脚本代码）在需要的时候。假设脚本不是太大，则此方法将脚本与HTML一起加载并立即执行，并避免了将其放在页眉中的额外HTTP请求开销。

例如，如果返回的用户名已经可用，则您可能希望通过调用JavaScript函数在页面中尽快显示它，而不是等到所有内容加载完毕后再显示。

<p>Welcome back, <script>insertText(username)</script>!</p>

或者，您可能需要在页面加载时就地执行整个功能，以便正确呈现某些内容。

```html
<h1>Our Site</h1>

<h2 id="greethead">, and welcome to Our Site!</h2>

<script>
//insert time of day greeting from computer time
var hr = new Date().getHours();
var greeting = "Good morning";
if (hr > 11) {
    greeting = "Good afternoon";
}
if (hr > 17) {
    greeting = "Good evening";
}
h2 = document.getElementById("greethead");
h2.innerHTML = greeting + h2.innerHTML;
</script>

<p>Blah blah blah</p>
```

这种简单的技术避免了单独的HTTP请求来检索少量代码，并允许脚本立即在页面中的适当位置运行，而在HTML页面中仅需花费几十个额外的字节即可。

## 摘要

在本节中，我们介绍了减少页面发出的HTTP请求数量的方法，并讨论了文本和图形资源的技术。我们可以避免每次服务器往返都节省时间，加快页面加载速度，并尽快将其内容提供给我们的用户。