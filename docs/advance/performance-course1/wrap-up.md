# 总结和演示

现在，我们探索了各种方法来缩短页面加载时间。这些技术是“垂头丧气的果实”，即简单的努力就能获得巨大的性能胜利。但是谈话很便宜。我们还没有真正看到实际的技术，因此请完成此操作。

为了证明该技术的有效性，我们将在不同的网页版本上进行各种速度测试，从没有进行优化开始，一直到我们已经讨论过的一些加速技术进行，特别是文本资源优化，图形资源优化和HTTP请求减少。

最初的目标是一个简单的单一HTML页面，其中包含文本，图像，CSS和JavaScript，位于Firebase上，[网址为](https://page-load-speed-demo.firebaseapp.com/pageload0.html)：[https](https://page-load-speed-demo.firebaseapp.com/pageload0.html) ://page-load-speed-demo.firebaseapp.com/pageload0.html 。快速浏览一下，然后我们就可以对其进行改进。

**注意：**本文档中引用的所有版本的演示页面的源代码都可以在[此GitHub存储库中](https://github.com/GoogleChromeLabs/FastPageLoadDemo)找到。

页面速度的主要考虑因素之一是First Meanfulful Paint（FMP），它是衡量用户对页面性能的感知程度的指标。FMP是指页面主要内容显示在屏幕上所花费的时间。当然，“主要内容”的定义可以根据页面类型而有所不同。对于新闻报道，主要内容可能是标题和“首屈一指”的文字；对于搜索引擎页面，主要内容将是其搜索结果；对于美术馆页面，主要内容可能是一系列缩略图和简短说明。

另一个主要因素是原始加载速度，它是从第一个下载字节到页面完全加载所花费的时间的度量。尽管这是一项经验性观察，但可能无法准确反映用户对可用内容的感知。即，在页面加载在技术上完成之前很长时间，可见内容就可能在屏幕上并被认为是可用的。

显然，“页面加载速度”的感知与其字面量度是用户体验的某种主观方面，并且受许多因素影响。感知性能是页面加载速度以及用户满意度的主要指标。尽管完全客观的测量最终可能是不可能的，但这并不意味着我们只是猜测。

## 测试工具

有很多工具可用来帮助确定页面的加载速度，此处未列出太多工具。对于本文，我们将使用三种在线服务来帮助我们查看改进工作的结果。

- [Google PageSpeed见解](http://tinyurl.com/m65jex6)
- [WebPageTest](https://www.webpagetest.org/)
- [平度](https://tools.pingdom.com/)

为什么要使用三种工具？因为不同的测试服务使用不同的方法和算法来测试速度；他们在不同位置的不同机器和浏览器上运行测试；他们报告不同的结果，并以不同的方式报告它们。您可能会发现，使同一页面在各种工具之间进行完全不同的测试令人感到不安，但这就是测试的现实。

与其认为这是负面的，不如将其视为获取更多更好数据的一种简单方法。没有任何一个测试工具可以为您提供完整的信息。不必依赖一种工具，而是使用多种工具并多次运行测试，以获取关于页面特定焦点的最佳和多数信息，然后进行相应调整。

## 原始页面

让我们通过查看原始页面上的各种性能审核来获得基准。公认它很草率-原始文本，渲染阻止程序，大图像，太多外部文件-但最终它会按需加载并显示。我们的工作是使用可用的工具，根据我们在前面的文章中看到的内容，确定一些可以改进的特定方面。这是页面的一部分。

![今日启示录首页](https://developers.google.cn/web/fundamentals/performance/get-started/images/image_700.png) *今日启示录首页*

让我们通过测试服务来运行它。

**注意：**您可以通过相同的服务运行同一页面，并获得不同的结果。同样，这就是测试的现实。

**PageSpeed Insights**对网页的评分很差，分别为移动设备和桌面设备分别提供了48/100和50/100的评分，但没有给我们一个原始的加载时间。在其观察结果中，它正确地指出该页面的HTML，CSS和JavaScript没有缩小。

![PageSpeed Insights，原始页面](https://developers.google.cn/web/fundamentals/performance/get-started/images/image_701.png) *PageSpeed Insights，原始页面*

**Pingdom**将页面评为“ B”级，得分为81/100，这听起来还不错。但是，更有用的是，它报告的加载时间低于4.73秒钟，并在经过测试的其他网站中排名该页面，仅将其排在第33个百分点。

![Pingdom，原始页面](https://developers.google.cn/web/fundamentals/performance/get-started/images/image_702.png) *Pingdom，原始页面*

默认情况下，**WebPageTest**运行三个连续的测试并取平均结果，这是测试服务中的一项独特功能。结果包括文档完成加载时间为2.743秒，总加载时间为2.831秒，两者均大大低于Pingdom的报告。

![WebPageTest，原始页面](https://developers.google.cn/web/fundamentals/performance/get-started/images/image_703.png) *WebPageTest，原始页面*

WebPageTest还包括许多图形报告，包括幻灯片和视频视图（两者都很不错），以及这些方便的内容分解饼图。

![WebPageTest，原始页面](https://developers.google.cn/web/fundamentals/performance/get-started/images/image_704.png) *WebPageTest，原始页面*

如您所见，原始页面的负载特性不是很好。应当立即显而易见的是，各种工具并未对它的特性进行相同的测量和报告。因此，最好的方法是着眼于一些主要的改进途径，并在每次更改后进行重新测试以确定其是否达到了预期的效果。

## 文字内容

我们的演示页面主要由基于文本的资源组成：主要的HTML页面内容和结构，以及一个或多个层叠样式表和JavaScript文件。该文本可能不是该页面的主要障碍，但它是一个开始的地方，因为可以将其全部压缩以节省下载时间。

使用“ **文本内容”**文章中提到的一些工具，我们缩小了HTML，CSS和JavaScript的位置，并将站点重新部署到了服务器上。

**PageSpeed Insights**提供了一份适度但有趣的报告，正确指出已修改页面的HTML，CSS和JavaScript最小。

![PageSpeed Insights，文本资源减少了](https://developers.google.cn/web/fundamentals/performance/get-started/images/image_705.png) *PageSpeed Insights，文本资源减少了*

移动和台式机分数均仅提高了1％（分别为49和52），这表明缩小效果很小。但实际上，减少文本资源导致实际字符数减少了32％。因为这是一个很小的页面，所以速度提高的幅度并不大，但是尺寸减小的*百分比*却非常可观。

和以前一样，没有原始速度数字，但是即使该报告也表明，删除空格可以加快页面速度。

**Pingdom**的整体评分没有变化，但是页面的加载时间减少了1.3秒，其百分位排名跃升至47。

![Pingdom，文本资源已减少](https://developers.google.cn/web/fundamentals/performance/get-started/images/image_706.png) *Pingdom，文本资源已减少*

与PageSpeed Insights报告相比，此处加载时间的改善更为明显，而毫不费力地加快速度超过一秒肯定是值得的。

有趣的是，**WebPageTest**报告文档完成时间或总加载时间没有明显变化。

![WebPageTest，缩小了文本资源](https://developers.google.cn/web/fundamentals/performance/get-started/images/image_707.png) *WebPageTest，缩小了文本资源*

但是，将鼠标悬停在内容细目图中的（小）饼图上，显示了字符数和文本组件相对比例的显着减少：HTML（以前是11,886 / 0.9％，现在是9,237 / 0.7％），CSS（以前是4,443 / 0.4％，现在是3,295 / 0.3％）和JavaScript（以前是14,471 / 1.2％，现在是8,060 / 0.6％）。个人人数似乎很少，但事实是，压缩使文本资源总体减少了近三分之一。

![WebPageTest，缩小了文本资源](https://developers.google.cn/web/fundamentals/performance/get-started/images/image_708.png) *WebPageTest，缩小了文本资源*

有趣的是，尽管没有整体提高原始速度，但WebPageTest的报告显示其内部算法的两个结果朝不同的方向发展。该页面的“速度指数”从1699年增加到1797年（慢了5％），其“首次互动”时间（测试版功能）从1.266秒减少到1.133秒（快了10％）。尽管这些测量值有些主观，但它们仍会影响用户对网站的感知速度。并始终记住，*用户感知*是性能的最终仲裁者。

**更新：**即将弃用的“首次互动时间”指标将采用更准确的“持续互动时间”。我们鼓励您使用 [WebPageTest Easy模式](https://webpagetest.org/easy)并选择Mobile复选框，这将生成Lighthouse报告。然后，单击页面顶部的*Lighthouse PWA分数*以查看完整的Lighthouse Progressive Web App报告，包括新的“持续交互”指标。

这是文本最小化的版本：[https](https://page-load-speed-demo.firebaseapp.com/pageload1.html) ://page-load-speed-demo.firebaseapp.com/pageload1.html 。

## 图形内容

该页面上另一个值得改进的方面是图形的过度/滥用。这并不是说图像对页面并不重要，只是可以更好地处理它们。再看一下上面的WebPageTest饼图；该页面的图像包含53.3％的HTTP请求和98.3％的下载字节。

原始页面中有八张图片：五张主要文章图片，老式的Luckies广告以及拉式报价周围的开和关报价图形。Pingdom的其他图表之一说明了等待和下载图像所花费的时间。

![Pingdom，原始页面](https://developers.google.cn/web/fundamentals/performance/get-started/images/image_709.png) *Pingdom，原始页面*

这里有很大的改进空间。

基于“ **图形内容”**文章中讨论的技术，我们对图像（包括小图像）进行了各种改进，包括：

- 物理调整大小，
- 建立最佳格式，
- 降低质量，
- 压缩，以及
- 删除元数据。

**注意：**对于本文中的此测试和所有后续测试，我们始终从原始的未经修改的页面开始，并制作所有资源的新副本，以防止任何一个测试的过程或结果污染另一个测试。

这是每个图像改进的结果。

| 原始图片           | 最佳档案类型 | 起始尺寸 | 最终尺寸 | 减少 |
| :----------------- | :----------- | :------- | :------- | :--- |
| Climatechange.jpg  | jpg          | 256k     | 16k      | 94％ |
| globalepidemic.jpg | jpg          | 256k     | 20k      | 92％ |
| luckies.jpg        | jpg          | 26k      | 11k      | 57％ |
| mayanpyramid.jpg   | jpg          | 22.8万   | 15k      | 93％ |
| quoteend.png       | png          | 3k       | 2k       | 33％ |
| quotestart.png     | png          | 3k       | 2k       | 33％ |
| robotrebellion.jpg | jpg          | 264k     | 20k      | 92％ |
| singularity.jpg    | jpg          | 15.8万   | 10k      | 94％ |

在这里值得报告一些有关改进过程的意见。

1. 当另存为gif图像时，某些jpg图像会稍小一些，但其质量明显受损。因此，在每种情况下，即使“最佳”文件类型比最小的“另存为”文件类型稍大，结果仍是原始文件类型。
2. 目视检查导致的任何尺寸保留都通过物理尺寸（宽度/高度）的减小和图像压缩得到了完全补偿。文章的英雄图片尺寸从900x500px减少到600x333px减少了三分之一。有趣的是，减少33％通常会导致文件大小相差50％。
3. 尽管在默认设置下对大图像进行压缩（无特殊调整）的结果出人意料地低（3％）和令人满意的高（50％），但最大的改善因素是*jpg品质的下降*。所有jpg均以50％的质量保存，但仍保持其视觉清晰度，从而以较小的文件大小提供了免费的视觉感知成本。（我们本可以以更低的质量保存它们，但以50％的比例停止。）

现在，让我们看看图像改进如何影响页面加载时间。请记住，该版本基于原始页面，而不是文本资源较少的版本，因此这些结果仅反映与图像优化直接相关的改进。

**PageSpeed Insights**报告了针对移动和桌面环境的重大改进。尽管图像加载肯定更快，但它们可能仍然太大（宽度/高度），无法舒适地放在某些移动屏幕上。

![PageSpeed Insights，优化的图像](https://developers.google.cn/web/fundamentals/performance/get-started/images/image_710.png) *PageSpeed Insights，优化的图像*

**Pingdom**尚未提升网站的整体性能等级，但确实显示了比原版更快的加载时间和更好的百分位排名。

![优化的图像](https://developers.google.cn/web/fundamentals/performance/get-started/images/image_711.png) *优化的图像*

Pingdom的时间轴报告还显示了图像的等待/加载时间的显着改善。他们进入浏览器的速度比以前快得多。

![优化的图像](https://developers.google.cn/web/fundamentals/performance/get-started/images/image_712.png) *优化的图像*

对于“文档完成”和“完全加载”状态，**WebPageTest**还报告了比原始加载时间快得多的加载时间。

![WebPageTest，优化图像](https://developers.google.cn/web/fundamentals/performance/get-started/images/image_713.png) *WebPageTest，优化图像*

并且，在其内容细分图表上，请注意，虽然图像请求数在总请求数中所占的比例当然没有变化（接下来我们将处理HTTP请求），但图像字节数在已下载的总字节数中所占比例却有所变化大幅下降，从98.3％降至75.8％。也就是说，浏览器下载图像的时间比以前减少了22.5％，这是一个很大的改进。

![WebPageTest，优化图像](https://developers.google.cn/web/fundamentals/performance/get-started/images/image_714.png) *WebPageTest，优化图像*

这是经过图像优化的版本：[https](https://page-load-speed-demo.firebaseapp.com/pageload2.html) : [//page-load-speed-demo.firebaseapp.com/pageload2.html](https://page-load-speed-demo.firebaseapp.com/pageload2.html)。

## HTTP请求

回想一下，页面的加载速度不仅取决于它必须下载的资源大小，还取决于它必须下载的资源*数量*。因此，HTTP请求的数量（每个资源一个）成为负载速度的重要因素。但是，如果站点确实需要一组特定的资源来正确显示和操作（CSS，JavaScript，图像），我们如何在不忽略必要资源的情况下减少HTTP请求的数量？答：通过结合资源。

原始的HTML页面（我们一直用于新测试）具有14个外部资源：3个CSS，3个JavaScript和8个图像。使用**HTTP Requests**文章中概述的技术 ，我们首先将CSS资源组合到一个文件中，将JavaScript资源组合到一个文件中，立即消除了四个HTTP请求。

接下来，我们将主要的JavaScript标记从阻止页面呈现的页面头部移至页面的末端，在呈现内容之后可以在页面末尾加载。尽管这不会删除HTTP请求，但会从根本上更改请求的时间，从而带来明显的速度提升。

我们采用的另一种JavaScript技术是“内联推送”，其中少量代码直接在HTML页面中被插入，意在修改页面内容。为此，我们在``修改后立即将“早上好/下午/晚上”问候语脚本内联。因此，它是通过页面加载的，而不是通过外部HTTP请求加载的，并且它在DOM中的标题可用时立即执行，以可视方式更新内容，并再次带来明显的速度提升。

最后，我们尽可能合并图像。Luckies广告本身是独立的，但是拉引号上的开和闭引号图像是不错的选择，页面主要文章中的五个英雄图像也是不错的选择。通过将两个拉引号图像合并到一个文件中，将五个英雄图像合并到一个文件中，我们消除了另外五个HTTP请求。

这项技术需要添加一些简单的CSS来移动图像，并对HTML进行一些小的更改以容纳组合的图形，但是所有这些操作都用不到一千个字节（即将缩小）的代码完成，这是一个很好的折衷方案。

总体而言，我们在不牺牲单个字节内容的情况下将HTTP资源请求的数量从14个减少到5个（不计算HTML页面本身）。让我们看一下测试服务的结果。

**PageSpeed Insights**再次报告了移动和桌面环境的改进。它仍然认识到该页面具有未缩小的文本和未优化的图像，但是回想起我们正在使用原始页面，并且在此测试中仅测量HTTP请求的效果。

![PageSpeed Insights，减少了HTTP请求](https://developers.google.cn/web/fundamentals/performance/get-started/images/image_715.png) *PageSpeed Insights，减少了HTTP请求*

**Pingdom**报告的加载时间为1.18秒，百分位数排名为86，与原始的4.73秒和第33个百分位数相比有很大的提高。

![Pingdom，减少了HTTP请求](https://developers.google.cn/web/fundamentals/performance/get-started/images/image_716.png) *Pingdom，减少了HTTP请求*

在报告的另一部分中，Pingdom确认HTTP资源请求从原始页面中的14个减少到该版本中的5个（再次对HTML页面进行打折）：3个图像，1个CSS和1个JavaScript。

![Pingdom，减少了HTTP请求](https://developers.google.cn/web/fundamentals/performance/get-started/images/image_717.png) *Pingdom，减少了HTTP请求*

**WebPageTest**不仅报告文档完成和完全加载的加载时间有显着差异，而且还显示HTTP请求的差异-原始页面中为16，此版本中为7。（为什么此测试服务报告的HTTP请求比其他服务多，在撰写本文时尚未确定，HTTP请求的原始请求为15，此版本报告的请求为6。如果有可用的解释，则本文将进行更新。）尽管如此，总体差异的9是准确的。

![WebPageTest，减少了HTTP请求](https://developers.google.cn/web/fundamentals/performance/get-started/images/image_718.png) *WebPageTest，减少了HTTP请求*

该服务的内容分类饼图也很有用。请注意，“字节数”图表中的图像编号较高；这实际上是可以预期的，因为虽然图像字节数没有增加，但是图像字节数*占总字节*数的*百分比* 却有所增加。这是由于将多个文本资源组合到一个文件中，以及内联了一些JavaScript。

![WebPageTest，减少了HTTP请求](https://developers.google.cn/web/fundamentals/performance/get-started/images/image_719.png) *WebPageTest，减少了HTTP请求*

更有趣的是“请求”图表。同样，虽然图像请求的数量实际上减少了63％，但图像请求的数量*在总请求中所占的比例* 却仅比原始*请求*少（从53.3％降至50.0％）。为什么？因为HTML，CSS和JavaScript请求（现在已经合并了它们的资源，并且减少了请求数）在总请求中所占的比例更大，这表明HTTP请求的总体减少已使竞争环境趋于公平。图像不再那么沉重。换句话说，在此版本中，浏览器加载图像的服务器命中次数不会超过加载*所有其他资源的总和*。

这是简化的HTTP请求版本：[https](https://page-load-speed-demo.firebaseapp.com/pageload3.html) : [//page-load-speed-demo.firebaseapp.com/pageload3.html](https://page-load-speed-demo.firebaseapp.com/pageload3.html)。

## 现在都在一起了

既然我们已经看到了一些独立技术带来的速度改进，那么让我们看看在一个版本中应用所有技术时会发生什么。对于此测试，我们采取了以下步骤：

- 像测试1一样压缩HTML，CSS和JavaScript文件
- 如测试2中一样优化图像
- 结合了CSS和JavaScript文件，以及引号和英雄图片，如测试3所示

我们是怎么做的？

**PageSpeed Insights**为移动和桌面环境提供了良好的页面编号。如前所述，由于（仍然）相当大的图像，移动得分可能会受到影响。

![PageSpeed Insights，所有技术](https://developers.google.cn/web/fundamentals/performance/get-started/images/image_720.png) *PageSpeed Insights，所有技术*

**Pingdom**报告的结果是最好的-加载时间不到半秒，在测试页的第97个百分点中。

![平凡，所有技巧](https://developers.google.cn/web/fundamentals/performance/get-started/images/image_721.png) *平凡，所有技巧*

**WebPageTest**还显示出在“文档完成”和“ **满载”**评分上均取得了显着改善，并且其“第一互动”时间（测试版）不到一秒钟。

![WebPageTest，所有技术](https://developers.google.cn/web/fundamentals/performance/get-started/images/image_722.png) *WebPageTest，所有技术*

这是所有技术的版本：[https](https://page-load-speed-demo.firebaseapp.com/pageload4.html) : [//page-load-speed-demo.firebaseapp.com/pageload4.html](https://page-load-speed-demo.firebaseapp.com/pageload4.html)。

## 摘要

我们可以从所有这些技术，测试和报告中获得什么？让我们看一下各种测试运行中的一些基本数字。

| 改良技术     | 平均分 | 加载时间     | 百分位 | 第一次互动时间 |
| :----------- | :----- | :----------- | :----- | :------------- |
| 无（原始页） | 49     | 4.7秒，2.8秒 | 33     | 2.7秒          |
| 文字缩小     | 51     | 3.4秒，2.1秒 | 47     | 1.8秒          |
| 图像优化     | 81     | .57秒，1.3秒 | 96     | 1.0秒          |
| HTTP请求减少 | 88     | 1.2秒，1.2秒 | 88     | 1.3秒          |
| 所有         | 88     | .47秒，1.1秒 | 97     | .96秒          |

一个明显的确定性是，不同的测试工具可以对同一页进行不同的评分。这正确地意味着您使用的工具越多，就可以使用更多的数据来做出明智的优化决策。

另一个有用的观察结果是，似乎已实现最佳单速提升的技术是图像优化。这并不奇怪，因为对于我们的页面（对于许多典型的网页），图像在总下载内容中所占的比例不成比例。

最后，尽管各种技术的数字趋于跳跃，但令人欣慰的是，当我们应用所有技术时，我们在其他测试页面上实现了整体上最快的加载和交互时间以及最高的百分位排名立刻。

从这些测试中可以清楚地看出，在缓慢加载的页面上可以采用的改进技术越多，则完成速度越快，用户体验就越好。