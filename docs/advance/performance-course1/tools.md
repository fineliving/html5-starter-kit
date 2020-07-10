# 使用工具衡量绩效

建立具有低成本数据的高性能，弹性站点有几个核心目标。

对于每个目标，您都需要进行审核。



| **目的**                                          | **为什么？**                                                 | **要测试什么？**                                             |
| :------------------------------------------------ | :----------------------------------------------------------- | :----------------------------------------------------------- |
| 确保隐私，安全性和数据完整性，并支持强大的API使用 | [为什么HTTPS很重要](https://developers.google.cn/web/fundamentals/security/encrypt-in-transit/why-https) | 为所有站点页面/路由和资产实施HTTPS。                         |
| 改善负载性能                                      | [53％的用户放弃](https://www.doubleclickbygoogle.com/articles/mobile-speed-matters/)了加载时间超过三秒钟的[网站](https://www.doubleclickbygoogle.com/articles/mobile-speed-matters/) | 可以异步加载或延迟加载的JavaScript和CSS。为互动和有效负载大小设置时间目标：例如3G上的TTI。[设定绩效预算](https://infrequently.org/2017/10/can-you-afford-it-real-world-web-performance-budgets/)。 |
| 减轻页面重量                                      | •为具有上限数据计划的用户降低数据成本  •降低Web应用程序存储需求-对使用低规格设备的用户尤为重要  •降低托管和服务成本  •改善服务性能，可靠性和弹性 | 设置页面权重预算：例如，首次加载低于400 kB。检查是否有大量JavaScript。检查文件大小以查找肿的图像，媒体，HTML，CSS和JavaScript。查找可能会延迟加载的图像，并使用[coverage工具](https://developers.google.cn/web/updates/2017/04/devtools-release-notes#coverage)检查未使用的代码 。 |
| 减少资源需求                                      | •减少 [延迟问题](https://www.igvita.com/2012/07/19/latency-the-new-web-performance-bottleneck/)  •降低服务成本  •改善服务性能，可靠性和弹性 | 查找对任何类型资源的过多或不必要的请求。例如：反复加载的文件，以多个版本加载的JavaScript，从不使用的CSS，从不查看（或可以延迟加载）的图像。 |
| 优化内存使用                                      | [内存可能成为新的瓶颈](https://timkadlec.com/2013/11/why-we-need-responsive-images-part-deux/)，尤其是在移动设备上 | 加载首页和使用其他网站功能时，请使用Chrome任务管理器将您的网站与其他网站进行比较，以了解内存使用情况。 |
| 减少CPU负载                                       | 移动设备的CPU有限，尤其是低规格设备                          | 检查是否有大量JavaScript。使用[覆盖工具](https://developers.google.cn/web/updates/2017/04/devtools-release-notes#coverage)查找未使用的JavaScript和CSS 。检查是否有[过多的DOM大小](https://developers.google.cn/web/tools/lighthouse/audits/dom-size)以及在首次加载时不必要地运行的脚本。寻找加载有多个版本的JavaScript或通过较小的重构可以避免的库。 |

有多种工具和技术可用于审核网站：

- 系统工具
- 内置浏览器工具
- 浏览器扩展
- 在线测试应用
- 仿真工具
- 分析工具
- 服务器和业务系统提供的指标
- 屏幕和录像
- 手动测试

您将在下面了解与每种审核类型相关的方法。



**图片构成迄今为止 [最重](http://httparchive.org/interesting.php#bytesperpage)和 [最请求](http://httparchive.org/trends.php#bytesImg&reqImg)对于大多数网页。**





[随着连接性的恶化，延迟](https://www.igvita.com/2012/07/19/latency-the-new-web-performance-bottleneck/)也会越来越严重，因此随着网络的移动，过多的图像文件请求成为一个日益严重的问题。图像还会消耗功率：更多图像请求，更多无线电使用，更多电量耗尽的电池。[即使只是渲染图像也要消耗能量](http://httparchive.org/trends.php#bytesImg&reqImg) -这与图像的大小和数量成正比。





同样对于内存：像素尺寸的微小增加会导致内存使用量的大幅增加。在移动设备上（尤其是在低规格设备上）使用图像时， [内存可能成为新的瓶颈](https://timkadlec.com/2013/11/why-we-need-responsive-images-part-deux/)。膨胀的图像对于使用上限数据计划的用户也有问题。





[删除多余的图像](https://developers.google.cn/web/fundamentals/design-and-ui/responsive/content#viewport)！如果无法摆脱它们，请进行优化：尽可能提高压缩率，减小像素尺寸，并使用能为您提供最小文件大小的格式。优化诸如横幅和背景之类的“英雄形象”是一次轻松的一次性胜利。







## 记录资源请求：数量，大小，类型和时间

审核站点时，一个不错的起点是使用浏览器的网络工具检查页面。如果您不确定如何执行此操作，请浏览Chrome DevTools网络面板 [入门指南](https://developers.google.cn/web/tools/chrome-devtools/network-performance)。类似的工具可用于 [Firefox](https://developer.mozilla.org/en-US/docs/Tools/Network_Monitor)， [Safari](https://developer.apple.com/library/content/documentation/AppleApplications/Conceptual/Safari_Developer_Guide/Instruments/Instruments.html#//apple_ref/doc/uid/TP40007874-CH4-SW1)， [Internet Explorer](https://msdn.microsoft.com/en-us/library/gg130952(v=vs.85).aspx)和 [Edge](https://docs.microsoft.com/en-us/microsoft-edge/f12-devtools-guide/network)。

进行更改之前，请记住记录结果。对于网络请求，就像截图一样简单-您还可以 [将配置文件数据另存](https://developers.google.cn/web/tools/chrome-devtools/evaluate-performance/timeline-tool#save_and_load_recordings)为JSON文件。以下是有关[如何保存和共享测试结果](https://developers.google.cn/web/fundamentals/performance/audit/tools#save_the_results)的更多信息。

在开始审核网络使用情况之前，请确保 [禁用浏览器缓存，](https://developers.google.cn/web/tools/chrome-devtools/network-performance#emulate) 以确保获得有关首次加载性能的准确统计信息。如果您已经通过服务工作者进行缓存，请 [清除“缓存API存储”](https://developers.google.cn/web/tools/chrome-devtools/progressive-web-apps)。您可能要使用隐身（私人）窗口，这样就不必担心禁用浏览器缓存或删除以前缓存的条目。

以下是一些应使用浏览器工具检查的核心功能和指标：

- 负载性能：[Lighthouse](https://developers.google.cn/web/tools/lighthouse#devtools) 提供负载指标的摘要。阿迪·奥斯曼（Addy Osmani）撰写了 有关页面加载[关键用户时刻](https://medium.com/@addyosmani/progressive-web-apps-with-react-js-part-2-page-load-performance-33b932d97cf2)的精彩摘要。
- 用于加载和解析资源以及内存使用情况的[时间轴事件](https://developers.google.cn/web/tools/chrome-devtools/evaluate-performance/timeline-tool)。如果您想更深入一点，请运行内存和JavaScript [分析](https://developers.google.cn/web/tools/chrome-devtools/evaluate-performance/timeline-tool#profile-js)。
- 页面总重量和文件数。
- JavaScript文件的数量和重量。
- 任何特别大的单个JavaScript文件（例如，超过100KB）。
- 未使用的JavaScript。您可以使用Chrome [Coverage工具](https://developers.google.cn/web/updates/2017/04/devtools-release-notes)进行检查 。
- 图像文件的总数和权重。
- 任何特别大的单个图像文件。
- 图像格式：是否有 [可能是JPEG或SVG的PNG](https://developers.google.cn/web/fundamentals/performance/optimizing-content-efficiency/image-optimization)？WebP是否与后备一起使用？
- 是否使用响应式图像技术（例如 [srcset](https://css-tricks.com/responsive-images-youre-just-changing-resolutions-use-srcset/)）。
- HTML文件大小。
- CSS文件的总数和重量。
- 未使用的CSS。（在Chrome浏览器中，使用 [覆盖面板](https://umaar.com/dev-tips/121-css-coverage/)。）
- 检查其他资产（例如Web字体（包括图标字体））的使用是否有问题。
- 检查DevTools时间轴是否有任何阻碍页面加载的内容。

如果您使用的是快速WiFi或快速的蜂窝连接，请使用[低带宽和高延迟仿真进行测试](https://developers.google.cn/web/tools/chrome-devtools/network-performance/network-conditions)。记住要在移动设备和台式机上进行测试-有些站点使用UA嗅探为不同的设备提供不同的资产和布局。您可能需要使用[远程调试](https://developers.google.cn/web/tools/chrome-devtools/remote-debugging)在实际硬件上进行测试 ，而不仅仅是使用设备仿真。

**您通常可以使用浏览器工具来发现问题，只需检查网络响应并按大小排序即可。**

例如：此处的349KB PNG看起来可能是一个问题：

![Chrome DevTools网络面板显示一个大文件](https://developers.google.cn/web/fundamentals/performance/audit/images/devtools-349KB.png)

果然，结果是图像为1600px宽，而元素的最大显示宽度仅为400px。解压缩后，图像需要超过4MB的内存，这在手机上是很大的。

将图像重新保存为800px宽的JPEG（以应付2x屏幕上400px的显示宽度）并使用[ImageOptim](https://imageoptim.com/)进行优化后，结果为17KB：将[原始PNG](https://drive.google.com/open?id=0B9xlQg9Xpugsb0VpQldsN3YwSEE)与[优化的JPEG](https://drive.google.com/open?id=0B9xlQg9XpugsTlBVNlQ1bUdQa0U)进行比较。

改善了95％！

## 检查内存和CPU负载

进行更改之前，请记录内存和CPU使用率。

在Chrome中，您可以从“窗口”菜单访问任务管理器。这是检查网页要求的简单方法。

![Chrome Task Manager显示四个打开的浏览器选项卡的内存和CPU使用情况](https://developers.google.cn/web/fundamentals/performance/audit/images/task-manager.png)*Chrome的任务管理器-注意内存和CPU消耗！*

## 测试第一个和后续负载性能

[Lighthouse](https://developers.google.cn/web/tools/lighthouse)， [WebPagetest](https://www.webpagetest.org/easy)和 [Pagespeed Insights](https://developers.google.cn/speed/pagespeed/insights)可用于分析速度，数据成本和资源使用情况。WebPagetest还将检查静态内容缓存，到第一个字节的时间以及您的站点是否有效利用了CDN。

**启用静态内容缓存非常简单，因此浏览器可以在第一次请求资产时通过配置服务器以包括适当的标头来缓存资产。**

如果浏览器可以缓存资源，则在以后的访问中无需从网络检索资源。即使对于不支持通过服务工作者进行缓存的浏览器，这也可以提高加载速度，降低数据成本并减少网络和服务器负载。 [即使您使用的是Cache API](https://jakearchibald.com/2016/caching-best-practices/)，启用浏览器缓存也很重要。

要了解更多信息，请查看 [PageSpeed工具](https://developers.google.cn/speed/docs/insights/LeverageBrowserCaching)和[Web基础知识](https://developers.google.cn/web/fundamentals/performance/optimizing-content-efficiency/http-caching)上的资源 （特别是“无效和更新缓存的响应”部分）。

## 保存结果

- **WebPagetest**：[每个测试结果都有自己的URL](https://www.webpagetest.org/result/170428_NW_cc5afd75a2041f7e09984f33e4a4ae14/)。

- **Pagespeed Insights**：[在线](https://developers.google.cn/speed/pagespeed/insights) Pagespeed Insights工具[现在包括Chrome User Experience报告数据，](https://webmasters.googleblog.com/2018/01/real-world-data-in-pagespeed-insights.html?m=1) 突出显示了实际的性能统计信息。

- Lighthouse

  ：单击下载按钮，从“ Chrome DevTools审核”面板保存报告：

  ![Chrome Lighthouse按钮用于下载报告](https://developers.google.cn/web/fundamentals/performance/audit/images/lighthouse-download-1000.png)

## 测试核心渐进式Web App要求

[Lighthouse](https://developers.google.cn/web/tools/lighthouse)可帮助您测试安全性，功能性，可访问性，性能和搜索引擎性能。特别是，Lighthouse会检查您的站点是否成功实现了PWA功能，例如服务工作者和Web App清单。

Lighthouse还测试您的站点是否可以提供可接受的脱机体验。

您可以以JSON格式下载Lighthouse报告，或者，如果您使用 [Lighthouse Chrome Extension](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk)，则以GitHub Gist的形式共享报告：单击共享按钮，选择在Viewer中打开，然后在新窗口中再次单击共享按钮和另存为要点。

![屏幕截图显示了如何将要点的Chrome Lighthouse报告导出](https://developers.google.cn/web/fundamentals/performance/audit/images/lighthouse-gist-1000.png)*将报告从Lighthouse Chrome扩展程序导出到要点-单击“共享”按钮*

## 使用分析，事件跟踪和业务指标来跟踪实际绩效

如果可以，请在实施更改之前记录分析数据：跳出率，页面停留时间，退出页面：与业务需求相关的任何内容。

如果可能，记录可能受到影响的业务和技术指标，以便您可以在进行更改后比较结果。例如：一个电子商务站点可能会跟踪每分钟的订单或记录统计数据以进行压力和耐力测试。如果减少页面重量和资源请求，则后端存储成本，CPU需求，服务成本和弹性可能会提高。

如果没有实施分析，现在是时候了！业务指标和分析是决定您的网站是否正常运行的最终决定因素。如果合适，请结合 [事件跟踪](https://developers.google.cn/analytics/devguides/collection/analyticsjs/events) 来执行用户操作，例如按钮单击和视频播放。您可能还需要实施 [目标流分析](https://support.google.com/analytics/answer/2520139?ref_topic=1649581)：用户导航到“转化”所依据的路径。

您可以随时关注Google Analytics（分析） [网站的速度，](https://support.google.com/analytics/answer/1205784)以检查效果指标与业务指标之间的关系。例如：“首页加载速度有多快？” 与“通过首页输入是否产生销售？”相比



![屏幕快照显示了Google Analytics（分析）网站的速度](https://developers.google.cn/web/fundamentals/performance/audit/images/site-speed.png)


Google Analytics（分析）使用[Navigation Timing API中的](https://developer.mozilla.org/en-US/docs/Web/API/Navigation_timing_API)数据 。



您可能想要使用[JavaScript性能API之一](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver) 或您自己的指标来记录数据 ，例如：

```
const subscribeBtn = document.querySelector('#subscribe');

subscribeBtn.addEventListener('click', (event) => {
 // Event listener logic goes here...

 const lag = performance.now() - event.timeStamp;
 if (lag > 100) {
  ga('send', 'event', {
   eventCategory: 'Performance Metric'
   eventAction: 'input-latency',
   eventLabel: '#subscribe:click',
   eventValue: Math.round(lag),
   nonInteraction: true,
  });
 }
});
```

您还可以使用ReportingObserver来检查浏览器过时和干预警告。这是[从实际用户那里获取真实，实时测量结果](https://developers.google.cn/web/updates/2018/07/reportingobserver)的[众多API](https://developers.google.cn/web/updates/2018/07/reportingobserver)之一。

## 真实体验：屏幕和视频录制

对移动设备和台式机上的页面加载进行录像。如果添加了计时器显示，则在高帧频下效果更好。

您可能还想保存截屏视频。有许多适用于Android，iOS和桌面平台的截屏录制应用程序（和 [脚本也可以这样做](https://paul.kinlan.me/android-screen-recording/)）。

视频记录页面加载的工作[方式](http://www.webpagetest.org/video/compare.php?tests=170427_61_14ZR-r:1-c:0)与WebPagetest中的 [幻灯片视图](http://www.webpagetest.org/video/compare.php?tests=170427_61_14ZR-r:1-c:0)或 Chrome DevTools中的[Capture屏幕截图](https://developers.google.cn/web/updates/2015/07/devtools-digest-film-strip-and-a-new-home-for-throttling)非常相似。您将获得页面组件加载速度的真实记录：快和慢。保存视频记录和屏幕录像，以与以后的改进进行比较。

前后比较可以很好地证明改进！

## 还有什么？

如果相关，请获取[Web膨胀分数](http://www.webbloatscore.com/)。这是一个有趣的测试，但它也可能是证明代码膨胀或表明您已进行改进的一种令人信服的方法。

[我的网站费用是多少？](https://whatdoesmysitecost.com/test/170427_KK_6aecf8c8a21c22e9f59b2b65e8371569#gniCost)，如下所示，它为在不同区域加载您的网站的财务成本提供了粗略的指导。

![来自whatdoesmysitecost.com的屏幕截图](https://developers.google.cn/web/fundamentals/performance/audit/images/site-cost.png)

还有许多其他的独立和在线工具：请查看 [perf.rocks/tools](http://perf.rocks/tools)。