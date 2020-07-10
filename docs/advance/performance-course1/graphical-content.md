# 图形内容

网络用户是一群视觉用户，我们依靠图像来支持网络内容。与文本一样，图形内容也是在网页或应用程序中传达信息的关键组成部分。各种图像，从图表和图形到图标和箭头，再到面部照片和地图，都可以提供即时数据并提高读者的理解力和保留率。但是，与文本不同，图像需要大量时间和带宽来下载和渲染。图形内容很容易占典型网站总带宽的60％-85％（来源：取决于您要求的人）。 例如，[HTTPArchive](http://httparchive.org/interesting.php)指出，图像大约占平均网站内容的50％。

显然，获得显着性能提升的主要方法之一是减少图像加载所需的时间。让我们研究一些解决此问题的方法。

## 删除不必要的图像

要问的第一个问题是您是否真的需要图像，而且这个问题显然还不够。太多种类的网站都放置了大片的图像，这些图像大多是“无用的”。这减慢了页面加载速度，并使读者在进入有意义的内容之前向下滚动了一半。

考虑是否确实需要每个图像，如果需要，请立即考虑是否需要。可以在更重要的内容之后再加载吗？如果不是，是否可以对其进行优化，以使其对页面加载的影响最小？请记住，下载内容（尤其是图形内容）所需的时间应该花在交换图像提供的信息上。

是的，图像可以真正支持文本内容，或者只是带来视觉趣味，但是如果图像没有为用户增加信息价值或澄清其含义，则将其删除。最快的映像是您不必下载的映像。删除的每个图像都会加快页面加载时间。

## 选择适当的图像类型

根据经验，将PNG用于剪贴画，线条图或需要透明度的地方，将JPG用于照片，将GIF用于需要动画的地方。如有疑问，请进行简单但确定的测试：以多种格式保存图像并进行比较！

它常常假定的PNG（一个 [无损压缩](https://en.wikipedia.org/wiki/Lossless_compression)格式）产生了JPG文件（一个可视化的优势 [有损压缩](https://en.wikipedia.org/wiki/Lossy_compression)格式），用于照片图像，但是这往往并非如此。例如，下面的两个图像都很棒。它们之间没有明显的视觉差异。动物的眼睛清晰，毛皮清晰，阴影光滑。

![dog + cat.png](https://developers.google.cn/web/fundamentals/performance/get-started/images/image_403.png) *dog + cat.png-232k*

![狗+猫.jpg](https://developers.google.cn/web/fundamentals/performance/get-started/images/image_404.jpg) *dog + cat.jpg-42k*

但是PNG图片为232k，而JPG仅为42k！下载时间缩短了81％，质量没有明显损失。判决：JPG FTW。

## 删除图像元数据

元数据或“有关数据的数据”存在于大多数图像中，并且可能包括（例如，在照相机照片上）有关照相机/电话型号，日期和时间戳，照片应用设置，文件格式，高度和宽度，地理位置坐标等。图像编辑器可能在其保存的文件中包含元数据，例如作者名称，分辨率，色彩空间，版权和关键字。

对于大多数网站图像而言，元数据并不重要，因此明智的做法是将其删除。正如您肯定猜到的那样，有很多方法可以做到这一点。首先，看看您喜欢的图像编辑器；它可能已经具有查看和编辑元数据的功能。（例如，Gimp会这样做。）如果没有，则只需使用一种在线可用的工具，例如VerExif：[http://www.verexif.com/en/](http://www.verexif.com/en/) 。

例如，这张JPG图片（最初为1280 x 720，已调整大小以在此处显示）是2015年在澳大利亚用手机相机拍摄的。

![bonniedoon.jpg，原始，363k](https://developers.google.cn/web/fundamentals/performance/get-started/images/image_412.jpg) *bonniedoon.jpg，原始，363k*

VerExif的在线工具用于上传图像并标识要删除的元数据。

![VerExif的上传对话框](https://developers.google.cn/web/fundamentals/performance/get-started/images/image_413.png) *VerExif的上传对话框*

如下面的表格所示，该图像具有相当多的元数据（38k！）。（请注意，地理位置数据为空，可能是因为该美国电话在该位置没有服务。）

| 元数据类型 | 元数据值            |
| :--------- | :------------------ |
| 相机制造   | 三星                |
| 相机型号   | SCH-1535            |
| 约会时间   | 2015/10/25 12:07:24 |
| 解析度     | 1280 x 720          |
| 使用闪光灯 | 没有                |
| 焦距       | 3.7毫米             |
| 接触时间   | 0.0024秒（1/420）   |
| 光圈       | f / 2.6             |
| 相当于ISO  | 80                  |
| 白平衡     | 汽车                |
| 测光模式   | 平均                |
| 接触       | 光圈优先（半自动）  |
| GPS纬度    | ？o                 |
| GPS经度    | ？o                 |

删除元数据后，文件大小从363k减少到325k，相差10.5％。当然不像缩小或压缩实际尺寸那样引人注目，但百分之十的价格实在不容小nee，尤其是当您拍摄多张照片时。

元数据删除工具很多，在MakeUseOf上有一篇很好的文章介绍了Exif删除的原因和方式。

http://www.makeuseof.com/tag/3-ways-to-remove-exif-metadata-from-photos-and-why-you-might-want-to/

## 调整图像大小

### 根据预期用途调整图像尺寸

大图像比小图像需要更长的下载时间。您所有图像的大小均应根据其预期用途进行适当调整，并且不应依赖浏览器来调整其大小以进行渲染。

通常，从服务器检索大图像，然后在浏览器中使用CSS调整其大小。这可能是出于完全合乎逻辑的原因-例如仅将一个图像用于在悬停时扩展的缩略图-或可能只是粗心的编码。无论是什么原因，都会浪费带宽。

例如，您可能有一个1200 x 600像素的图像，以60 x 30的比例呈现（作为5％的缩略图），并使用CSS过渡在悬停时将其放大到完整尺寸。它工作正常且看起来不错，但是如果用户从未真正将鼠标悬停在缩略图上，则浪费了图像下载时间的95％。最好花一些时间制作单独的，适当大小的缩略图，仅在实际需要时才显示完整大小的图像。

### 裁剪图像以仅显示重要内容

减少所有图像文件大小的一项非常有效的技术是简单裁剪：忽略对信息传递不重要的图像部分。

额外的背景和空白，不必要的边框以及意外的对象不仅使图像在视觉上而且在物理上都变得混乱，从而影响了图像的大小及其下载效率。

坦率地说，上面显示的澳大利亚旅行者的照片在水平和垂直方向都太大。可以将其裁剪以更有效地关注人，栅栏上的标牌和房屋的主要部分。

![bonniedoon.jpg，裁剪，115k](https://developers.google.cn/web/fundamentals/performance/get-started/images/image_414.jpg) *bonniedoon.jpg，裁剪，115k*

在这里，我们从已调整大小的版本开始，开始于220k，然后裁剪它，将其保存到上述的115k版本。减少了52％，照片现在聚焦在重要部分（是的，狗窝很重要！），文件大小减半。所有必需的信息都在那里，可以更高效地呈现出来。

### 降低图像质量

当然，我们希望图像在合理范围内看起来尽可能好，这样就意味着可以100％的质量保存JPG，对吗？不必要。在大多数情况（即几乎所有情况）下，您可以降低JPG的质量，从而降低文件的大小，而不会遇到任何可见的质量差异。

确定了图像的实际大小后，如何将其调整为该大小，同时又保留其所需的质量和特征？您需要的第一件事是一个好的图像处理工具。对于这些修改，我们使用了流行的Windows桌面产品 [paint.net](https://www.getpaint.net/)。

请查看以下照片类型的JPG，这些照片的质量会逐渐降低，并注意文件大小会减小。快速计算发现，100％质量的图像和25％质量的图像之间的大小差为90％！但是您能看到差异吗？也许更重要的是，即使您*可以*看到任何区别，它是否足以保证更大的文件，从而也可以降低下载速度？

![burger100.jpg](https://developers.google.cn/web/fundamentals/performance/get-started/images/image_405.jpg) *burger100.jpg-100％原始图像227k*

![paint.net屏幕截图](https://developers.google.cn/web/fundamentals/performance/get-started/images/image_400.png) *使用paint.net以较低的质量保存*

![burger80.jpg](https://developers.google.cn/web/fundamentals/performance/get-started/images/image_406.jpg) *burger80.jpg-80％，60k*

![burger50.jpg](https://developers.google.cn/web/fundamentals/performance/get-started/images/image_407.jpg) *burger50.jpg-50％，34k*

![burger25.jpg](https://developers.google.cn/web/fundamentals/performance/get-started/images/image_408.jpg) *burger25.jpg-25％，20k*

要点很明显：一定要尝试使用质量较低的JPG，然后才能看到差异，然后使用最小的JPG来保持照片的清晰度。不太明显的是，文件大小可能是一种诱人的简单修复方法，但并非没有缺点。同样，在确定降低质量作为一种全面解决方案之前，必须进行一些试验。有关更多详细信息，请参见这篇出色的文章“ [如何公平比较图像”](https://kornel.ski/en/faircomparison)。

其他图像处理工具：

- [XNConvert](https://www.xnview.com/en/xnconvert/)：这个免费的跨平台工具可以处理批量图像，并执行调整大小，优化和其他转换。
- [ImageOptim](https://imageoptim.com/mac)：此免费工具可在Mac上作为在线服务使用，并且专门用于优化图像以提高速度，包括删除元数据（如上所述）。
- [ResizeIt](https://itunes.apple.com/us/app/resizeit/id416280139?mt=12)：仅Mac的台式机产品，使您可以同时更改多个图像的大小，并可以同时转换文件格式。
- [PicResize](http://www.picresize.com/)：基于浏览器的几种出色工具之一，它为您提供了很多用于裁剪，旋转，调整大小，向图像添加效果以及转换图像的选项。
- [Gimp](https://www.gimp.org/)：这个日益流行的跨平台工具随着年龄的增长而变得越来越好。Gimp强大而灵活，可以让您执行各种图像处理任务，包括调整大小。

这只是少量可用工具。尽管CrazyEgg在这里有一篇综合文章，但我们这里不是要对图像编辑器进行比较性的评论：

https://www.crazyegg.com/blog/image-editing-tools/

## 压缩影像

使用压缩工具可以进一步压缩PNG和JPG图像，从而减小文件大小，而不会影响图像尺寸或视觉质量。例如，这是使用免费的在线压缩工具TinyPng完成的图像压缩。

https://tinypng.com/

您可以`resizeitscreenshot.png`在下面的屏幕快照中看到图像的巨大压缩结果（TinyPng上传但不显示正在压缩的图像）。TinyPng报告说，图像大小从551k减少到133k，提高了76％。

![TinyPng](https://developers.google.cn/web/fundamentals/performance/get-started/images/image_411.png) *TinyPng*

是的，TinyPng用于该TinyPng屏幕截图本身，节省了57％。

不要以为PNG是无损的，就无法进一步压缩它们。他们能。而且TinyPng当然不是唯一可用的工具。这是一堆图像压缩产品的一大败笔。

http://enviragallery.com/9-best-free-image-optimization-tools-for-image-compression/

## 摘要

尽管本节中的技术并不全面，但它们代表了一组可用于减少图像大小以及传输速度的良好过程。图形内容的大小是一个很容易解决的主要领域，但可以使您的网站在加快页面加载速度方面获得显着提升。

您可以在此处找到有关图像优化的出色深度文章：

[https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization](http://tinyurl.com/pmy5d9f)

并参见“ [总结和演示”](https://developers.google.cn/web/fundamentals/performance/get-started/wrapup-7) 页面，以直接应用这套文章中讨论的这些技术和其他技术。

