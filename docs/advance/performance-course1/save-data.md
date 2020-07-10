# 通过保存数据交付快速轻便的应用程序

**该[`Save-Data`客户端提示请求头](https://httpwg.github.io/http-extensions/client-hints.html#the-save-data-hint) 在Chrome，Opera和Yandex的浏览器可让开发者为用户提供更轻，更快的应用谁选择在数据在浏览器省电模式。**

## 对轻量级页面的需求

![Weblight统计](https://developers.google.cn/web/updates/images/2016/02/save-data/google-weblight.png)

每个人都同意，更快，更轻便的网页可以提供更令人满意的用户体验，可以更好地理解和保留内容，并带来更多的转化和收益。[谷歌的研究](https://support.google.com/webmasters/answer/6211428)表明：“ ...经过优化的页面加载速度比原始页面快四倍，并且使用的字节数减少了80％。由于这些页面的加载速度如此之快，我们还看到这些页面的访问量增加了50％。”

而且，尽管2G连接的数量[最终呈下降趋势](http://www.gsmamobileeconomy.com/GSMA_Global_Mobile_Economy_Report_2015.pdf)，但2G [仍是](http://www.gsmamobileeconomy.com/GSMA_Global_Mobile_Economy_Report_2015.pdf) 2015年[的主导网络技术](http://www.gsmamobileeconomy.com/GSMA_Global_Mobile_Economy_Report_2015.pdf)。3G和4G网络的渗透率和可用性正在迅速增长，但是相关的拥有成本和网络限制仍然是一个重要因素适用于亿万用户。

这些是页面优化的有力论据。

有其他方法可以提高站点速度，而无需开发人员直接参与，例如代理浏览器和代码转换服务。尽管此类服务非常流行，但它们具有很多缺点-简单（有时甚至是不可接受的）图像和文本压缩，无法处理安全（HTTPS）页面，仅优化通过搜索结果访问的页面等。这些服务的高度流行本身就表明Web开发人员无法正确解决用户对快速轻便的应用程序和页面的高需求。但是，实现这一目标是一条复杂而有时是困难的道路。

## 的`Save-Data`请求头

一种相当简单的技术是使用`Save-Data`请求标头让浏览器提供帮助 。通过标识此标头，网页可以自定义并向受成本和性能限制的用户提供最佳的用户体验。

受支持的浏览器（如下）允许用户启用*数据保存模式，该模式使浏览器有权应用一组优化来减少呈现页面所需的数据量。公开或宣传此功能后，浏览器可能会请求较低分辨率的图像，推迟某些资源的加载或通过应用其他特定于内容的优化（例如图像和文本资源压缩）的服务来路由请求。

## 浏览器支持

- `Save-Data` [当用户](https://support.google.com/chrome/answer/2392284)在移动设备上[启用](https://support.google.com/chrome/answer/2392284) “数据保护程序”选项或在桌面浏览器上启用“数据保护程序”扩展程序[时，](https://support.google.com/chrome/answer/2392284)**Chrome 49+会**发布广告。
- `Save-Data`当用户在桌面上启用“ [Opera Turbo](http://www.opera.com/computer/features/fast-browser) ”模式，或在Android浏览器上启用“ [数据保存](http://www.opera.com/help/mobile/android#turbo) ”选项时，**Opera 35+会**做广告。
- `Save-Data`当在桌面或[移动浏览器](https://yandex.com/support/browser-mobile-android-phone/navigation/turbo-mode.xml)上启用[Turbo模式](https://yandex.com/support/newbrowser/search-and-browse/turbo.xml)时，**Yandex 16.2+会**发布广告。

## 检测`Save-Data`设定

为了确定何时向用户提供“轻松”的体验，您的应用程序可以检查`Save-Data`客户端提示请求标头。此请求标头指示客户端由于传输成本高，连接速度慢或其他原因而减少数据使用的偏好。

当用户在其浏览器中启用数据保存模式时，浏览器会将`Save-Data`请求标头附加到所有传出请求（HTTP和HTTPS）上。在撰写本文时，浏览器只发布一个* *上* -在头（标志`Save-Data: on`），但是这可能会在未来扩展到指示其他用户的喜好。

另外，可以检测是否`Save-Data`在JavaScript中打开了：

```javascript
if ("connection" in navigator) {
    if (navigator.connection.saveData === true) {
        // Implement data saving operations here.
    }
}
```

检查`connection`对象中是否存在`navigator` 对象至关重要，因为它代表Network Information API，该API仅在Chrome，Chrome for Android和Samsung Internet浏览器中实现。从那里，您只需要检查是否`navigator.connection.saveData`等于 `true`，就可以在这种情况下执行任何数据保存操作。

![如图所示，Chrome开发人员工具中显示的Save-Data标头以及Data Saver扩展名。](https://developers.google.cn/web/updates/images/2016/02/save-data/data-saver-chrome.png)在Chrome桌面中启用Data Saver扩展程序。

如果您的应用程序[使用服务工作者](https://developers.google.cn/web/fundamentals/getting-started/push-notifications/step-03)，它可以检查请求标头并应用相关逻辑以优化体验。或者，服务器可以在`Save-Data`请求标头中查找广告的首选项， 并返回备用响应-不同的标记，较小的图像和视频，等等。

> *提示：如果使用[PageSpeed for Apache或Nginx](https://developers.google.cn/speed/pagespeed/module)来优化页面，请参阅[此讨论](https://github.com/pagespeed/mod_pagespeed/issues/1258)以了解如何`Save-Data`为用户节省费用。*

## 实施技巧和最佳实践

1. 使用时

   ```
   Save-Data
   ```

   ，请提供一些支持它的UI设备，并允许用户轻松切换体验。例如：

   - 通知`Save-Data`受支持的用户，并鼓励他们使用它。
   - 允许用户通过适当的提示以及直观的开/关按钮或复选框来识别和选择模式。
   - 选择了数据保存模式后，宣布并提供一种简便而明显的方法来禁用它，并在需要时恢复到完整的体验。

2. 请记住，轻量级应用程序不是较小的应用程序。他们不忽略重要的功能或数据，只是更了解所涉及的成本和用户体验。例如：

   - 相册应用程序可以提供较低分辨率的预览，或使用较少代码量的轮播机制。
   - 搜索应用程序可能一次返回较少的结果，限制大量介质的结果，或者减少呈现页面所需的依赖性。
   - 面向新闻的网站可能只会减少新闻报道，忽略热门类别或提供较小的媒体预览。

3. 提供服务器逻辑以检查

   ```
   Save-Data
   ```

   请求标头，并考虑在启用请求后提供备用的，较浅的页面响应-例如，减少所需资源和依赖项的数量，应用更具侵略性的资源压缩等。

   - 如果您要基于`Save-Data`标头提供替代响应，请记住将其添加到Vary列表中`Vary: Save-Data`，以告诉上游缓存仅当存在`Save-Data`请求标头时才应缓存并提供此版本 。有关更多详细信息，请参见[与缓存交互](https://httpwg.github.io/http-extensions/client-hints.html#interaction-with-caches)的最佳实践 。

4. 如果您使用服务工作者，则您的应用程序可以通过检查`Save-Data`请求标头的存在或通过检查`navigator.connection.saveData` 属性的值来检测何时启用了数据保存选项。如果启用，请考虑是否可以重写请求以获取较少的字节，或使用已获取的响应。

5. 考虑`Save-Data`使用其他信号进行扩充，例如有关用户连接类型和技术的信息（请参阅[NetInfo API](http://w3c.github.io/netinfo/#examples-of-usage)）。例如，即使`Save-Data`未启用2G连接，您也可能希望向任何用户提供轻量级体验 。相反，仅因为用户处于“快速” 4G连接上并不意味着他们对保存数据不感兴趣，例如在漫游时。此外，您可以`Save-Data`使用`Device-Memory`客户端提示来增加的存在， 以进一步适应内存有限的设备上的用户。用户设备内存也会在`navigator.deviceMemory`客户端提示中公告 。

## 菜谱

您只能通过`Save-Data`自己的想法来实现。为了让您了解可行的方法，让我们来看几个用例。阅读本文时，您可能还会提出自己的其他用例，因此请随时进行实验，看看有什么可能！

### 检查`Save-Data`服务器端代码

虽然`Save-Data`状态*可以*通过`navigator.connection.saveData`属性在JavaScript中 检测到，但是有时最好在服务器端进行检测。JavaScript 在某些情况下*可能*无法执行。另外，服务器端检测是在将标记发送给客户端*之前*修改标记的唯一方法，这在某些`Save-Data`最有利的用例中涉及到。

用于检测`Save-Data`服务器端代码中标头的特定语法取决于所使用的语言，但是对于任何应用程序后端，基本思想应相同。例如，在PHP中，请求标头存储在 [`$_SERVER`超全局数组中](http://php.net/manual/en/reserved.variables.server.php)以开头的索引处`HTTP_`。这意味着您可以`Save-Data`通过检查`$_SERVER["HTTP_SAVE_DATA"]`变量的存在和值来检测标头，如下所示：

```php
// false by default.
$saveData = false;

// Check if the `Save-Data` header exists and is set to a value of "on".
if (isset($_SERVER["HTTP_SAVE_DATA"]) && strtolower($_SERVER["HTTP_SAVE_DATA"]) === "on") {
  // `Save-Data` detected!
  $saveData = true;
}
```

如果在将任何标记发送到客户端之前进行了此检查，则`$saveData` 变量将包含`Save-Data`状态，并且将在页面上的任何位置可用。通过说明这种机制，让我们看一些如何使用它来限制发送给用户的数据量的示例。

### 为高分辨率屏幕提供低分辨率图像

网络上图像的一个常见用例涉及以两个为一组的形式提供图像：一个图像用于“标准”屏幕（1x），另一幅图像是高分辨率屏幕（例如[Retina Display](https://en.wikipedia.org/wiki/Retina_Display)）的两倍大（2x ）。这类高分辨率屏幕不一定限于高端设备，并且变得越来越普遍。如果需要较浅的应用程序体验，则最好将较低分辨率（1x）的图像发送到这些屏幕，而不是较大（2x）的变体。要在出现`Save-Data` 标头时实现此目的，我们只需修改发送给客户端的标记：

```php
if ($saveData === true) {
  // Send a low-resolution version of the image for clients specifying `Save-Data`.
  ?><img src="butterfly-1x.jpg" alt="A butterfly perched on a flower."><?php
}
else {
  // Send the usual assets for everyone else.
  ?><img src="butterfly-1x.jpg" srcset="butterfly-2x.jpg 2x, butterfly-1x.jpg 1x" alt="A butterfly perched on a flower."><?php
}
```

这个用例是一个完美的例子，它可以轻松地容纳专门要求您向他们发送更少数据的人。如果您不喜欢在后端修改标记，则也可以通过使用URL重写模块（例如[Apache的） `mod_rewrite`](http://httpd.apache.org/docs/current/mod/mod_rewrite.html)来获得相同的结果。有一些 [示例，介绍了如何](https://css-tricks.com/help-users-save-data/#article-header-id-0)使用相对较少的配置[来实现此目的](https://css-tricks.com/help-users-save-data/#article-header-id-0)。

您还可以`background-image`通过简单地将一个类添加到``元素来将此概念扩展到CSS 属性：

```php
<html class="<?php if ($saveData === true): ?>save-data<?php endif; ?>">
```

从这里，您可以将`save-data`类定位到``CSS中的元素，以更改图像的传递方式。您可以将低分辨率的背景图像发送到高分辨率屏幕，如上面的HTML示例所示，或者完全省略某些资源。

### 忽略不必要的图像

网络上的某些图像内容完全是不必要的。尽管此类图像可以为内容锦上添花，但对于那些试图从计量数据计划中挤出全部精力的人来说，它们可能并不理想。在最简单的用例中`Save-Data`，我们可以使用较早版本的PHP检测代码，并完全省略不必要的图像标记：

```php
<p>This paragraph is essential content. The image below may be humorous, but it's not critical to the content.</p>
<?php
if ($saveData === false) {
  // Only send this image if `Save-Data` hasn't been detected.
  ?><img src="meme.jpg" alt="One does not simply consume data."><?php
}
```

如下图所示，此技术无疑可以产生明显的效果：

![缺少保存数据时加载的非关键图像的比较，与存在保存数据时忽略的相同图像的比较。](https://developers.google.cn/web/fundamentals/performance/optimizing-content-efficiency/save-data/images/omitted-images-1x.png)缺少保存数据时加载的非关键图像的比较，与存在保存数据时忽略的相同图像的比较。

当然，省略图像不是唯一的可能性。您也可以 `Save-Data`放弃发送其他非关键资源，例如某些字体。

### 省略不必要的网络字体

尽管网络字体通常不像图像那样构成给定页面的总有效负载，但是它们仍然很受欢迎。[它们也不会消耗少量的数据](https://httparchive.org/reports/page-weight#bytesFont)。此外，浏览器获取和呈现字体的方式比您想象的要复杂得多，因为诸如 [FOIT](https://www.zachleat.com/web/webfont-glossary/#foit)， [FOUT](https://www.zachleat.com/web/webfont-glossary/#fout)和浏览器启发法之类的概念使渲染操作变得微妙。

这可能是有原因的，那么您可能想要为需要更精简用户体验的用户省去不必要的Web字体。`Save-Data`使这件事变得相当轻松。

例如，假设您已经包括[菲拉三世](https://fonts.google.com/specimen/Fira+Sans)从[谷歌的字体](https://fonts.google.com/)在您的网站。Fira Sans是一种出色的正文复制字体，但对于尝试保存数据的用户而言，也许并不是那么重要。通过在出现标头时`save-data`向``元素添加一个类`Save-Data`，我们可以编写样式，该样式首先调用非必需字体，但是在出现`Save-Data`标头时退出该样式：

```css
/* Opt into web fonts by default. */
p,
li {
  font-family: "Fira Sans", "Arial", sans-serif;
}

/* Opt out of web fonts if the `save-Data` class is present. */
.save-data p,
.save-data li {
  font-family: "Arial", sans-serif;
}
```

使用这种方法，您可以保留``来自Google字体的代码段，因为浏览器通过先将样式应用于DOM，然后检查是否有任何HTML元素调用该样式中的任何资源，从而以推测方式加载CSS资源（包括网络字体）。片。如果有人碰巧`Save-Data`碰上了on，Fira Sans将永远不会加载，因为样式化的DOM永远不会调用它。相反，Arial会加入。它不像Fira Sans那样好，但是对于那些试图扩展其数据计划的用户而言可能更可取。

### 选择退出服务器推送

[HTTP / 2服务器推送](https://tools.ietf.org/html/rfc7540#section-8.2)通常是HTTP / 2最受吹捧的功能。[尽管它可以提高性能](https://www.smashingmagazine.com/2017/04/guide-http2-server-push/#measuring-server-push-performance)，但由于[缓存“陷阱”](https://jakearchibald.com/2017/h2-push-tougher-than-i-thought/)而可能会出现问题。

如果您习惯使用服务器推送并了解其当前与浏览器缓存交互的古怪方式，那就太好了。但是，如果`Save-Data`存在标头，则可能要考虑完全禁用它。

设置`Link` 响应头调用后，许多HTTP / 2实现都会启动服务器对资源的推送[`rel=preload`](https://www.w3.org/TR/preload/)。这导致关于`rel=preload`服务器推送和服务器推送是否相同的困惑，但是它们是两个截然不同的事情。`rel=preload`是资源提示，服务器推送是HTTP / 2的一部分。恰好`Link`在许多HTTP / 2实现中，标头启动了服务器推送。

该规范通过提供 要在HTTP响应标头中使用的关键字来`rel=preload` [解决这一潜在的痛点](https://www.w3.org/TR/preload/#server-push-http-2)。使用前面概述的后端检测逻辑，可以附加（如果存在）：`nopush``Link``nopush``Save-Data`

```php
// `preload` like usual...
$preload = "</css/styles.css>; rel=preload; as=style";

if($saveData === true) {
  // ...but don't push anything if `Save-Data` is detected!
  $preload .= "; nopush";
}

header("Link: " . $preload);
```

[还有其他方法可以实现此目的](https://www.ctrl.blog/entry/http2-save-data-push)，但比[其他方法要](https://www.ctrl.blog/entry/http2-save-data-push)细微得多，但是想法是相同的：当`Save-Data`存在HTTP / 2服务器推送时，将其关闭 。

如您所见，可以完成很多工作`Save-Data`。这些只是一些简单的用例，可以助您一臂之力，因此，请随时进行实验，看看您能提出哪些新颖的用例！

## 摘要

该`Save-Data`头没有太多的细微差别; 它是打开还是关闭，并且无论原因如何，应用程序均承担根据其设置提供适当体验的负担。

例如，某些用户怀疑即使在较差的连接情况下也会丢失应用程序内容或功能，因此他们可能不允许数据保存模式。相反，即使在良好的连接情况下，某些用户也可以顺理成章地使页面尽可能小和简单。最好让您的应用假设用户想要完整无限制的体验，直到您通过明确的用户操作明确指出为止。

作为网站所有者和Web开发人员，让我们承担管理内容的责任，以改善数据和成本受限的用户的用户体验。

有关更多详细信息`Save-Data`和出色的实际示例，请参阅“ [帮助用户”`Save Data`](https://css-tricks.com/help-users-save-data/)。