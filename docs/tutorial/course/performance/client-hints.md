# 通过客户提示适应用户

开发到处都是快速的站点可能是一个棘手的前景。过多的设备功能以及它们连接到的网络的质量，可能使它看起来像是一项无法克服的任务。虽然我们可以利用浏览器功能来改善加载性能，但是我们如何知道用户设备的功能或网络连接的质量呢？解决方案是[客户提示](https://tools.ietf.org/html/draft-ietf-httpbis-client-hints-06)！

客户端提示是一组可选的HTTP请求标头，可让我们深入了解用户设备及其所连接的网络的这些方面。通过挖掘这些信息的服务器端，我们可以改变*如何*，我们基于设备和/或网络条件下提供内容。这可以帮助我们创建更具包容性的用户体验。

## 全部与内容协商有关

客户端提示是*内容协商的*另一种方法，这意味着根据浏览器请求标头更改内容响应。

内容协商的一个示例涉及 [`Accept`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept) 请求标头。它描述了浏览器可以理解的*内容*类型，服务器可以用来*协商*响应的*内容*类型。对于图像请求，Chrome `Accept`标头的内容为：

```http
Accept: image/webp,image/apng,image/*,*/*;q=0.8
```

虽然所有浏览器都支持JPEG，PNG和GIF等图像格式，但是Accept表示在这种情况下浏览器*还*支持[WebP](https://developers.google.cn/speed/webp)和 [APNG](https://en.wikipedia.org/wiki/APNG)。使用此信息，我们可以为每种浏览器协商最佳图像类型：

```php
<?php
// Check Accept for an "image/webp" substring.
$webp = stristr($_SERVER["HTTP_ACCEPT"], "image/webp") !== false ? true : false;

// Set the image URL based on the browser's WebP support status.
$imageFile = $webp ? "whats-up.webp" : "whats-up.jpg";
?>
<img src="<?php echo($imageFile); ?>" alt="I'm an image!">
```

像一样`Accept`，客户端提示是协商内容的另一种途径，但是在设备功能和网络条件下。借助客户端提示，我们可以根据用户的个人经验来决定服务器端的性能，例如确定是否应为网络状况较差的用户提供非关键资源。在本指南中，我们将描述所有可用的提示以及使用它们的一些方法，以使内容交付更适合用户。

## 选择加入

与`Accept`标头不同，客户端提示不只是神奇地出现（除了`Save-Data`，我们将在后面讨论）。为了尽量减少请求标头，您需要通过`Accept-CH`在用户请求资源时发送标头来选择要接收的客户端提示：

```http
Accept-CH: Viewport-Width, Downlink
```

的值为`Accept-CH`逗号分隔的请求提示列表，该站点将在确定后续资源请求的结果时使用该提示。当客户端读取此标头时，将被告知“此站点需要`Viewport-Width` 和`Downlink`客户端提示。” 不必担心特定提示本身。我们一会儿再谈。

还有一个可选的`Accept-CH-Lifetime`标头，用于指定时间长度（以秒为单位），浏览器应记住`Accept-CH`为原点设置的值 。

**注意：**用户首次访问您的网站时，客户端提示不会出现在导航请求中。但是，如果您通过保留提示`Accept-CH-Lifetime`，则此信息将在导航请求中可用。

您可以使用任何后端语言设置这些选择加入标头。例如，可以使用[PHP的 `header`功能](http://php.net/manual/en/function.header.php)。你甚至可以设置这些选择在头[的`http-equiv` 属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-http-equiv) 上的``标签：

```html
<meta http-equiv="Accept-CH" content="Viewport-Width, Downlink">
<meta http-equiv="Accept-CH-Lifetime" content="86400">
```

**注意：**为了使客户端提示完全起作用，您的站点必须通过HTTPS提供服务！

## 所有的客户提示！

客户端提示描述了以下两件事之一：用户*使用*的设备，以及*使用*的设备以及他们用来访问您的网站的网络。让我们简要介绍所有可用的提示。

### 设备提示

一些客户端提示描述了用户设备的特征，通常是屏幕特征。它们中的一些可以帮助您为给定用户的屏幕选择最佳的媒体资源，但并非全部都必须以媒体为中心。

在进入此列表之前，学习一些用于描述屏幕和媒体分辨率的关键术语可能会有所帮助：

**内在尺寸：**媒体资源的实际尺寸。例如，如果您在Photoshop中打开图像，则图像尺寸对话框中显示的尺寸将描述其*固有尺寸*。

**密度校正的固有大小：**已针对像素密度校正的媒体资源的尺寸。它是图像的*固有尺寸* 除以[设备像素比率](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio)。例如，让我们看一下这个标记：

```html
<img src="whats-up-1x.png"
     srcset="whats-up-2x.png 2x, whats-up-1x.png 1x"
     alt="I'm that image you wanted.">
```

假设`1x`在这种情况下，`2x`图像的固有尺寸为320x240， 图像的固有尺寸为640x480。如果此标记是由安装在屏幕设备像素比率为2（例如，视网膜屏幕）的设备上的客户端解析的，`2x`则请求图像。所述*密度校正的固有大小*的的`2x`图像为320x240，由于640×480除以2为320x240。

**外在大小：**将CSS和其他布局因素（例如`width`和`height`属性）应用到媒体资源之后的大小。假设您有一个``元素，该元素加载具有校正后的内部尺寸为320x240的图像，但它同时具有CSS `width`和`height`属性，其值分别为`256px`和`192px`应用于。在此实例中，*外在大小*那个的``元素变为256×192。

![内在大小与外在大小的说明。 显示的框尺寸为320x240像素，标签为“ INTRINSIC SIZE”。 在其中的是一个较小的框，其大小为256x192像素，它代表一个HTML <img>元素，其中应用了CSS。 此框标记为“外部尺寸”。 右边是一个包含CSS的框，该CSS应用于修改<img>元素的元素](https://developers.google.cn/web/fundamentals/performance/optimizing-content-efficiency/client-hints/images/figure-1.svg)***图1**。内在大小与外在大小的说明。在将布局因素应用到图像后，图像将获得其外部尺寸。在这种情况下，施加的CSS规则`width: 256px;` 和`height: 192px;`变换320×240本质尺寸图像到一个256×192大小的外在一个。*

掌握一些术语后，让我们进入可供您使用的特定于设备的客户端提示列表。

#### 视口宽度

`Viewport-Width` 是用户视口的宽度（以CSS像素为单位）：

```http
Viewport-Width: 320
```

该提示可以与其他特定于屏幕的提示一起使用，以提供对特定屏幕尺寸（即[艺术方向](https://www.smashingmagazine.com/2016/02/automatically-art-directed-responsive-images-go/)）最佳的图像不同处理（即裁切），或省略当前屏幕宽度不需要的资源。

#### DPR

`DPR`，是设备像素比率的缩写，报告用户屏幕的物理像素与CSS像素的比率：

```http
DPR: 2
```

当选择与屏幕像素密度相对应的图像源时，此提示很有用（就像`x`描述符在[`srcset` attribute中一样](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-srcset)）。

#### 宽度

该`Width`提示出现在对``或 ``使用[`sizes` 属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-sizes)触发的图像资源请求中。 `sizes`告诉浏览器资源的外部大小是多少； `Width`使用该外部尺寸来请求具有对于当前布局最佳的内部尺寸的图像。

例如，假设用户请求的页面具有320 CSS像素的宽屏幕，且DPR为2。设备加载的文档中的``元素包含`sizes`属性值`85vw`（即，所有屏幕尺寸的视口宽度的85％） 。如果`Width`提示已经选择加入到，客户端将发送此`Width`提示与该请求的服务器``的`src`：

```http
Width: 544
```

在这种情况下，客户端向服务器暗示，所请求图像的最佳固有宽度将是视口宽度（272像素）的85％乘以屏幕的DPR（2），等于544像素。

此提示特别有用，因为它不仅考虑了屏幕校正后的宽度，而且还将此关键信息与布局中图像的外部尺寸相协调。这使服务器有机会协商对于屏幕*和*布局均最佳的图像响应。

#### 内容DPR

尽管您已经知道*屏幕*具有设备的像素比率，但是资源也具有其自己的像素比率。在最简单的资源选择用例中，设备和资源之间的像素比率可以相同。但！在`DPR`和`Width`标头同时起作用的情况下，资源的外部大小可能会产生两者不同的情况。这是`Content-DPR`提示起作用的地方。

不像其他的客户机提示，`Content-DPR`是不是一个*请求*要由服务器使用报头，而是一个*响应*报头服务器*必须*发送每当`DPR`和 `Width`提示用于选择的资源。的值`Content-DPR`应为以下公式的结果：

`Content-DPR`= [所选图像资源大小] /（[[ `Width`/ `DPR`]]

当`Content-DPR`发送请求头时，浏览器将知道如何按比例给定图像为屏幕的装置中的像素比和布局。没有它，图像可能无法正确缩放。

#### 设备内存

从技术上讲，它是[设备内存API](https://www.w3.org/TR/device-memory-1/)的一部分，`Device-Memory`显示 了当前设备在GiB中拥有[的大概内存量](https://www.w3.org/TR/device-memory-1/#sec-device-memory-client-hint-header)：

```http
Device-Memory: 2
```

**注意：**由于此信息[可用于对用户进行指纹识别](https://blog.mozilla.org/internetcitizen/2018/07/26/this-is-your-digital-fingerprint/)，因此的值`Device-Memory`特意粗糙。有效值为`0.25`， `0.5`，`1`，`2`，`4`，和`8`。

此提示的可能用例是减少在内存有限的设备上发送给浏览器的JavaScript数量，[因为JavaScript是浏览器通常加载的最消耗资源的内容类型](https://medium.com/@addyosmani/the-cost-of-javascript-in-2018-7d8950fbb5d4)。或者，您可以发送较低的DPR图像，因为它们使用较少的内存进行解码。

### 网络提示

该[网络信息API](https://wicg.github.io/netinfo/)提供描述用户的网络连接的性能的客户提示的另一个类别。我认为，这些是最有用的提示。通过它们，我们可以通过更改在慢速连接上向客户端提供资源的方式来为用户量身定制体验。

**注意：**网络提示值是基于过去的等待时间和带宽读数的预测。因此，它们不是100％准确的，但被认为足以满足客户提示用例。

#### RTT

该`RTT`提示在应用程序层上提供了大约为毫秒的*往返时间*。`RTT`与传输层RTT不同，该提示包括服务器处理时间。

```http
RTT: 125
```

**注意：**的值`RTT`四舍五入到最接近的25毫秒，以防止出现指纹。

由于延迟在加载性能中扮演的角色，因此此提示很有用。使用`RTT`提示，我们可以基于网络响应能力做出决策，这可以帮助加快整个体验的交付（例如，通过省略一些请求）。

#### 下行链接

虽然延迟对于加载性能很重要，但是带宽也很重要。该`Downlink`提示以每秒兆位（Mbps）表示，它揭示了用户连接的 *近似*下行速度：

```http
Downlink: 2.5
```

**注意：**的值`Downlink`四舍五入为每秒25 KB的最接近倍数。再次因为有指纹。

与结合使用`RTT`，`Downlink`可以根据网络连接的质量来更改将内容交付给用户的方式。

#### ECT

该`ECT`提示代表*有效连接类型*。它的值是连接类型，其中的每一个描述的枚举列表之一[两者的指定范围内的连接`RTT`和`Downlink` 值](https://wicg.github.io/netinfo/#effective-connection-types)。

此标头不解释*实际的*连接类型是什么，例如，它不报告网关是蜂窝塔还是wifi接入点。相反，它分析当前连接的等待时间和带宽，并确定它最类似于哪个网络配置文件。例如，如果您通过wifi连接到慢速网络，则`ECT`可能会填充值`2g`，这是*有效*连接的最近似值：

```http
ECT: 2g
```

有效值`ECT`是`4g`，`3g`，`2g`，和`slow-2g`。该提示可以用作评估连接质量的起点，然后使用`RTT`和`Downlink`提示进行完善。

#### 保存数据

`Save-Data` 并不是描述网络状况的提示，而是用户喜好指出页面应发送较少的数据。

**注意：**在所有客户端提示中，`Save-Data`是您唯一*不能*选择使用的提示`Accept-CH`。只有用户可以通过在Android设备上切换Chrome的[Data Saver功能](https://support.google.com/chrome/answer/2392284)来控制是否发送此提示。

我更喜欢将其分类`Save-Data`为网络提示，因为您将要执行的许多操作与其他网络提示相似。用户也可能在高延迟/低带宽环境中启用它。该提示（如果存在）始终如下所示：

```http
Save-Data: on
```

在Google，[我们已经讨论了您可以使用做什么 `Save-Data`](https://developers.google.cn/web/fundamentals/performance/optimizing-content-efficiency/save-data)。它可能会对性能产生深远的影响。这是用户实际上要求您向他们发送更少内容的信号！如果您收听并根据该信号采取行动，那么用户将不胜感激。

## 绑在一起

你有什么*做*用客户端提示取决于你。因为它们提供了很多信息，所以您有很多选择。为了使一些想法流淌，让我们看看客户的建议对[Sconnie Timber](https://github.com/malchata/client-hints-example)可以做什么，[Sconnie Timber](https://github.com/malchata/client-hints-example)是一家位于中西部中部乡村的虚构木材公司。[就像在偏远地区一样](https://www.technologyreview.com/s/603083/the-unacceptable-persistence-of-the-digital-divide/)，网络连接可能很脆弱。这是诸如客户提示之类的技术真正可以为用户带来改变的地方。

### 响应式图像

除了最简单的响应式图像用例之外，所有其他用例都可能变得复杂。如果您针对不同的屏幕尺寸*和*格式使用同一图像的多种处理方式*和*变体，该怎么办？该标记得到[*非常*](https://dev.opera.com/articles/responsive-images/#changing-image-sizes-high-dpi-images-different-image-types--art-direction-use-case)[复杂](https://dev.opera.com/articles/responsive-images/#changing-image-sizes-high-dpi-images-different-image-types--art-direction-use-case)[*非常*](https://dev.opera.com/articles/responsive-images/#changing-image-sizes-high-dpi-images-different-image-types--art-direction-use-case)[ 快](https://dev.opera.com/articles/responsive-images/#changing-image-sizes-high-dpi-images-different-image-types--art-direction-use-case)。容易出错，容易忘记或误解重要概念（例如）。`sizes`

虽然``并且工具`srcset`无疑是*很棒的*工具，但是对于复杂的用例，它们的开发和维护可能非常耗时。我们可以使标记生成自动化，但是这样做也很困难，因为功能``和`srcset`提供的功能 足够复杂，以至于需要以保持其提供的灵活性的方式来实现其自动化。

客户提示可以简化此过程。与客户提示协商图像响应可能看起来像这样：

1. 如果适用于您的工作流程，请首先通过检查`Viewport-Width`提示来选择图像处理（即艺术指导的图像）。
2. 通过检查`Width`提示和`DPR`提示，然后选择适合图像布局大小和屏幕密度的源（类似于`x`和`w`描述符的工作方式`srcset`），选择图像分辨率。
3. 选择浏览器支持的最佳文件格式（这`Accept` 可以帮助我们在大多数浏览器中完成操作）。

对于我的虚拟木材公司客户，我用PHP开发了一个幼稚的响应图像选择例程，该例程使用了客户提示。这意味着不是将此标记发送给所有用户：

```html
<picture>
  <source srcset="company-photo-256w.webp 256w,
                  company-photo-512w.webp 512w,
                  company-photo-768w.webp 768w,
                  company-photo-1024w.webp 1024w,
                  company-photo-1280w.webp 1280w"
          type="image/webp">
  <img srcset="company-photo-256w.jpg 256w,
               company-photo-512w.jpg 512w,
               company-photo-768w.jpg 768w,
               company-photo-1024w.jpg 1024w,
               company-photo-1280w.jpg 1280w"
       src="company-photo-256w.jpg"
       sizes="(min-width: 560px) 251px, 88.43vw"
       alt="The Sconnie Timber Staff!">
</picture>
```

我可以根据各个浏览器的支持将其简化为以下几种：

```html
<img src="/image/sizes:true/company-photo.jpg"
     sizes="(min-width: 560px) 251px, 88.43vw"
     alt="SAY CHEESY PICKLES.">
```

在此示例中，`/image`URL是一个PHP脚本，后跟由[mod_rewrite](https://httpd.apache.org/docs/current/mod/mod_rewrite.html)重写的参数 。它需要图像文件名和其他参数，以帮助后端脚本在给定条件下选择最佳图像。

我感觉*“但不是这只是重新实现``，并`srcset`在后台？”* 是你的第一个问题。

在某种程度上，是的，但是有一个重要的区别：当应用程序使用客户端提示来制作媒体响应时，大多数（如果不是全部）工作更容易实现自动化，其中可以包括一项服务（例如CDN）可以代表您这样做。鉴于HTML解决方案，需要编写新的标记以提供每种用例。当然，您*可以*自动生成标记。但是，如果您的设计或需求有所变化，将来很有可能需要重新考虑自动化策略。

客户提示使从无损，高分辨率的主图像开始，然后可以对其进行动态调整大小，使其最适合屏幕和布局的*任何*组合。不同于`srcset`，您需要枚举固定的可能候选图像列表供浏览器选择，而这种方法可以更加灵活。虽然`srcset`迫使你提供浏览器粗集变形，发言权，`256w`，`512w`，`768w`，和`1024w`-a客户提示供电解决方案可以为所有的宽度，没有标记的一个巨大的一堆。

当然，你不必*有*自己写的图像选择逻辑。[当您使用`w_auto` 参数时](https://cloudinary.com/blog/automatic_responsive_images_with_client_hints)，[Cloudinary使用客户端提示来制作图像响应](https://cloudinary.com/blog/automatic_responsive_images_with_client_hints)，并观察到中位数用户在使用支持客户端提示的浏览器时下载的字节减少了42％。

但是要当心！[桌面版Chrome 67的更改已删除了对跨域客户端提示的支持](https://cloudinary.com/blog/client_hints_and_responsive_images_what_changed_in_chrome_67)。幸运的是，这些限制不会影响Chrome的移动版本，并且在完成“ [功能政策”后](https://wicg.github.io/feature-policy/)，所有平台都将完全取消这些限制。

### 帮助网络缓慢的用户

*自适应性能*是一种想法，我们可以根据客户提示提供给我们的信息来调整我们如何交付资源；特别是有关用户网络连接当前状态的信息。

凡Sconnie木材的网站来讲，我们会采取措施，以减轻负荷情况下的网络速度慢，有`Save-Data`，`ECT`，`RTT`，和`Downlink`正在我们的后端代码检查头。完成此操作后，我们将生成网络质量评分，可用于确定是否应进行干预以获得更好的用户体验。该网络得分在`0`和之间`1`，其中`0`网络质量可能最差，`1`也是最好的。

最初，我们检查是否`Save-Data`存在。如果是，则将分数设置为 `0`，因为我们假设用户希望我们做所有必要的事情以使体验更轻松，更快捷。

如果`Save-Data`不存在，但是，我们继续前进，衡量的价值`ECT`， `RTT`和`Downlink`提示，以计算描述网络连接的质量分数。所述[网络得分生成源代码](https://github.com/malchata/client-hints-example/blob/master/includes/functions.php#L8) 是可用在Github。结论是，如果我们以*某种*方式使用与网络相关的提示 ，则可以为网络速度较慢的用户提供更好的体验。

![一个网站的比较](https://developers.google.cn/web/fundamentals/performance/optimizing-content-efficiency/client-hints/images/figure-2-1x.png)***图2**。本地商户网站的“关于我们”页面。基准体验包括Web字体，驱动轮播和手风琴行为的JavaScript以及内容图像。当网络状况太慢而无法快速加载时，我们可以忽略所有这些内容。*

当网站适应客户提示提供的信息时，我们不必采用“全有或全无”的方法。我们可以明智地决定发送哪些资源。我们可以修改响应式图像选择逻辑，以针对给定的显示器发送较低质量的图像，以在网络质量较差时加快加载性能。

在此示例中，我们可以看到客户端提示对提高慢速网络上站点的性能产生的影响。以下是慢速网络上无法适应客户端提示的站点的WebPagetest瀑布：

![Sconnie Timber站点的WebPagetest瀑布通过缓慢的网络连接加载所有资源。](https://developers.google.cn/web/fundamentals/performance/optimizing-content-efficiency/client-hints/images/figure-3.png)***图3**。资源密集型站点在缓慢的连接上加载图像，脚本和字体。*

现在，在相同的慢速连接上，这是同一站点的瀑布，除了这次，该站点使用客户端提示来消除非关键的页面资源：

![Sconnie Timber站点的WebPagetest瀑布，使用客户端提示来决定是否在慢速网络连接上不加载非关键资源。](https://developers.google.cn/web/fundamentals/performance/optimizing-content-efficiency/client-hints/images/figure-4.png)***图4**。相同连接上的相同站点，仅排除了“不错”的资源，以便更快地加载。*

客户端提示将页面加载时间从超过45秒*减少*到*不到该时间的十分之一*。在这种情况下，客户端提示的好处不能得到足够的重视，对于在慢速网络上寻求关键信息的用户而言，这可能是一个很大的福音。

此外，可以使用客户端提示而不会破坏不支持客户端提示的浏览器的体验。例如，如果我们想使用`ECT`提示的值来调整资源交付，同时仍为不支持的浏览器提供完整的体验，则可以将回退设置为默认值，如下所示：

```php
// Set the ECT value to "4g" by default.
$ect = isset($_SERVER["HTTP_ECT"]) ? $_SERVER["HTTP_ECT"] : "4g";
```

在这里，`"4g"`代表`ECT`标题描述的最高质量的网络连接。如果我们初始化`$ect`为`"4g"`，则不支持客户端提示的浏览器将不会受到影响。选择加入FTW！

## 注意那些缓存！

每当您更改基于HTTP标头的响应时，都需要了解缓存如何处理该资源将来的提取。[所述`Vary` 报头](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Vary)是不可缺少的在这里，因为它的密钥缓存条目提供给它的请求头的值。简而言之，如果您基于给定的HTTP请求标头修改任何响应，则几乎应始终包括以下请求标头`Vary` ：

```http
Vary: DPR, Width
```

不过，有一个*很大的*警告：您永远不想`Vary`在频繁更改的标头（如`Cookie`）上缓存可响应，因为这些资源实际上变得不可缓存。知道这一点后，您可能希望避免使用 `Vary`诸如`RTT`或的客户端提示标头`Downlink`，因为这些是可能经常更改的连接因素。如果要修改这些标头上的响应，请考虑仅键入`ECT`标头，这样可以最大程度地减少缓存丢失。

当然，这仅适用于首先缓存响应的情况。例如，如果HTML资产的内容是动态的，则不会缓存它们，因为这可能会破坏重复访问的用户体验。在这种情况下，请随时根据自己的需要修改自己的反应，而不用担心自己`Vary`。

## 客户提示服务人员

内容协商不再只是针对服务器！由于服务人员充当客户端和服务器之间的代理，因此您可以控制如何通过JavaScript交付资源。这包括客户端提示。在服务工作者 `fetch`事件中，可以使用`event`对象的 [`request.headers.get`](https://developer.mozilla.org/en-US/docs/Web/API/Request/headers) 方法来读取资源的请求标头，如下所示：

```javascript
self.addEventListener("fetch", event => {
  let dpr = event.request.headers.get("DPR");
  let viewportWidth = event.request.headers.get("Viewport-Width");
  let width = event.request.headers.get("Width");

  event.respondWith(async function() {
    // Do what you will with these hints!
  }());
});
```

**警告：**由于并非所有浏览器都支持客户端提示，因此您需要检查`event.request.headers.get`返回的值 。一种可能的替代方法是记录JS当量如 [`window.devicePixelRatio`](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio) 或[`window.innerWidth`](https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth)到 [`IndexedDB`](https://developers.google.cn/web/ilt/pwa/working-with-indexeddb)，这是在服务范围工人访问。

您选择加入的任何客户端提示头都可以这种方式读取。虽然这不是获取某些信息的唯一方法。可以在`navigator`对象的以下等效JavaScript属性中读取特定于网络的提示：

| 客户提示        | 相当于JS                             |
| :-------------- | :----------------------------------- |
| `ECT`           | `navigator.connection.effectiveType` |
| `RTT`           | `navigator.connection.rtt`           |
| `Save-Data`     | `navigator.connection.saveData`      |
| `Downlink`      | `navigator.connection.downlink`      |
| `Device-Memory` | `navigator.deviceMemory`             |

由于这些API并非在所有地方都可用，因此您需要与[`in` 操作员进行](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in)功能检查 ：

```javascript
if ("connection" in navigator) {
  // Work with netinfo API properties in JavaScript!
}
```

从这里开始，您可以使用与在服务器上使用的逻辑类似的逻辑，只是*不需要*服务器与客户端提示协商内容。由于服务工作者必须在用户离线时提供内容的附加能力，仅服务工作者就有能力使体验变得更快，更富有弹性。

## 包起来

借助客户的提示，我们有能力以完全渐进的方式为用户带来更快的体验。我们可以根据用户设备的功能来提供媒体服务，这种方式比依靠``and 更加容易提供响应图像`srcset`，尤其是对于复杂的用例。这使我们不仅可以减少开发方面的时间和精力，还可以优化资源（尤其是图像），从而使用户的屏幕比目标屏幕更精细。 和srcset可以。

也许更重要的是，我们可以通过修改发送的内容以及发送的方式来侦听不良的网络连接并为用户消除差距。这可以走*很长*的制作网站更容易获得对脆弱的网络用户的方式。结合服务人员，我们可以创建可脱机访问的快速站点。

虽然客户端提示仅在Chrome和基于Chromium的浏览器中可用，但可以以不妨碍不支持它们的浏览器的方式使用它们。考虑使用客户端提示来创建真正具有包容性和适应性的体验，这些体验可以了解每个用户的设备功能以及他们所连接的网络。希望其他浏览器供应商将看到它们的价值并表现出实施的意图。

### 资源资源

- [具有客户提示的自动响应图像](https://cloudinary.com/blog/automatic_responsive_images_with_client_hints)
- [客户端提示和响应图像-Chrome 67中的更改](https://cloudinary.com/blog/client_hints_and_responsive_images_what_changed_in_chrome_67)
- [采取（客户）提示！](https://www.youtube.com/watch?v=md7Ua82fPe4) （[幻灯片](https://jlwagner.net/talks/take-a-client-hint)）
- [通过以下方式提供快速轻便的应用程序 `Save-Data`](https://developers.google.cn/web/fundamentals/performance/optimizing-content-efficiency/save-data)

*感谢[Ilya Grigorik](https://twitter.com/igrigorik)，[Eric Portis](https://twitter.com/etportis)，[Jeff Posnick](https://twitter.com/jeffposnick)，[Yoav Weiss](https://twitter.com/yoavweiss)和[Estelle Weyl](https://twitter.com/estellevw)对本文的宝贵反馈和修改。*