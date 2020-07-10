# 使用PRPL模式应用即时加载

PRPL是首字母缩略词，它描述一种用于使网页加载并变得交互式，更快的模式：

- **推送**（或**预加载**）最重要的资源。
- 尽快**渲染**初始路线。
- **预缓存**剩余资产。
- **延迟加载**其他路由和非关键资产。

在本指南中，了解这些技术如何融合在一起，但仍然可以独立使用以实现性能结果。

## 使用Lighthouse审核您的页面[＃](https://web.dev/apply-instant-loading-with-prpl/#audit-your-page-with-lighthouse)

运行Lighthouse以确定与PRPL技术保持一致的改进机会：

1. 按`Control+Shift+J`（或`Command+Option+J`在Mac上）按打开DevTools。
2. 单击**审核**选项卡。
3. 选中“ **性能**和**渐进式Web应用程序”**复选框。
4. 单击**运行审核**以生成报告。

有关更多信息，请参阅[通过Lighthouse发现性能机会](https://web.dev/discover-performance-opportunities-with-lighthouse)。

## 预紧关键资源[＃](https://web.dev/apply-instant-loading-with-prpl/#preload-critical-resources)

如果某些资源被解析并延迟获取，那么Lighthouse将显示以下失败的审核：

![Lighthouse：预加载关键请求审核](https://webdev.imgix.net/apply-instant-loading-with-prpl/preload-requests.png)

[**预加载**](https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content) 是声明性的获取请求，它告诉浏览器尽快请求资源。通过在HTML文档的开头添加``标记 `rel="preload"`来预加载关键资源：

``

浏览器为资源设置了一个更合适的优先级，以便尝试尽快下载资源而不延迟`window.onload`事件。

有关预加载关键资源的更多信息，请参阅“ [预加载关键资产”](https://web.dev/preload-critical-assets)指南。

## 渲染尽快初始路径[＃](https://web.dev/apply-instant-loading-with-prpl/#render-the-initial-route-as-soon-as-possible)

当某些资源延迟[**First Paint**](https://developers.google.com/web/fundamentals/performance/user-centric-performance-metrics#first_paint_and_first_contentful_paint)（网站在屏幕上渲染像素的那一刻）时，Lighthouse将发出警告：

![灯塔：消除渲染阻止资源审核](https://webdev.imgix.net/apply-instant-loading-with-prpl/eliminate-render-blocking.png)

为了改进First Paint，Lighthouse建议内嵌关键JavaScript并使用推迟其余部分 [`async`](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript)，以及内嵌在上面使用的关键CSS。通过消除往返服务器以获取渲染阻止资产的往返操作，可以提高性能。但是，从开发角度看，内联代码更难维护，并且无法由浏览器单独缓存。

改进First Paint的另一种方法是在**服务器端呈现**页面的初始HTML。当脚本仍在获取，解析和执行时，这将立即向用户显示内容。但是，这会大大增加HTML文件的有效负载，这可能会损害[**Time to Interactive**](https://web.dev/interactive)，或者损害您的应用程序变为交互式并响应用户输入所花费的时间。

没有任何一种正确的解决方案可以减少应用程序中的First Paint，并且只有在收益大于应用程序的权衡因素的情况下，才应考虑内联样式和服务器端渲染。您可以通过以下资源了解有关这两个概念的更多信息。

- [优化CSS交付](https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery)
- [什么是服务器端渲染？](https://www.youtube.com/watch?v=GQzn7XRdzxY)

![与服务人员的请求/响应](https://webdev.imgix.net/apply-instant-loading-with-prpl/service-workers.png)

## 预缓存资产[＃](https://web.dev/apply-instant-loading-with-prpl/#pre-cache-assets)

通过充当代理，**服务工作者**可以直接从缓存中获取资产，而无需在重复访问时从服务器获取资产。这不仅使用户可以在脱机时使用您的应用程序，还可以缩短重复访问时的页面加载时间。

除非您有比库所提供的缓存要求更复杂的缓存要求，否则请使用第三方库来简化生成服务工作者的过程。例如， [Workbox](https://web.dev/workbox)提供了一系列工具，使您可以创建和维护服务工作者以缓存资产。有关服务人员和脱机可靠性的更多信息，请参阅可靠性学习路径中的[服务人员指南](https://web.dev/service-workers-cache-storage)。

## 延迟加载[＃](https://web.dev/apply-instant-loading-with-prpl/#lazy-load)

如果您通过网络发送太多数据，那么Lighthouse将显示审核失败。

![灯塔：具有巨大的网络有效负载审核](https://webdev.imgix.net/apply-instant-loading-with-prpl/enormous-payloads.png)

这包括所有资产类型，但是由于浏览器需要很长时间才能解析和编译它们，因此大型JavaScript负载特别昂贵。适当时，灯塔也会为此提供警告。

![Lighthouse：JavaScript启动时间审核](https://webdev.imgix.net/apply-instant-loading-with-prpl/js-bootup-high.png)

要发送较小的JavaScript有效负载，其中仅包含用户最初加载应用程序时所需的代码，请按需拆分整个捆绑包和[延迟加载](https://web.dev/reduce-javascript-payloads-with-code-splitting)块。

在设法拆分捆绑包之后，请预加载更重要的块（请参阅“ [预加载重要资产”](https://web.dev/preload-critical-assets)指南）。预加载可确保浏览器更快地获取和下载更重要的资源。

除了按需拆分和加载不同的JavaScript块外，Lighthouse还提供了对延迟加载非关键图像的审核。

![灯塔：推迟屏幕外图像审核](https://webdev.imgix.net/apply-instant-loading-with-prpl/defer-offscreen-images.png)

如果您在网页上加载许多图像，请在加载页面时推迟所有折叠以下或设备视口之外的[图像](https://web.dev/use-lazysizes-to-lazyload-images)（请参阅[使用lazysize延迟](https://web.dev/use-lazysizes-to-lazyload-images)加载[图像](https://web.dev/use-lazysizes-to-lazyload-images)）。

## 下一步[＃](https://web.dev/apply-instant-loading-with-prpl/#next-steps)

现在您已经了解了PRPL模式背后的一些基本概念，请继续阅读本节的下一个指南以了解更多信息。重要的是要记住，并非所有技术都需要一起应用。以下任何方面的任何努力都将提供显着的性能改进。

- **推送**（或**预加载**）关键资源。
- 尽快**渲染**初始路线。
- **预缓存**剩余资产。
- **延迟加载**其他路由和非关键资产。