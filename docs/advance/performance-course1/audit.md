# 审计绩效

## 为什么和什么？

您可能已经听说过渐进式Web应用程序技术可以为您的网站带来的所有好处。您可能会很想直接加入PWA功能。这是可能的，但是如果您首先获得“ PWA就绪”的准备，您的情况就会更好。

大量的PWA魔术不会解决诸如阻止JavaScript或图像过大之类的问题。PWA需要坚实的基础。

那么，如何检查网站的运行状况呢？第一步是进行现场审核：客观评估哪些方面行之有效，以及在哪些方面（以及如何进行）改进。

审核您的网站或应用程序将帮助您建立弹性，高效的体验-并突出显示可以以最少的签收即可实现的快速胜利。审核还为您提供了数据驱动开发的基准。变更使事情变得更好了吗？您的网站与竞争对手相比如何？您将获得度量标准来确定工作的优先级，并获得具体的证据以夸耀您进行了改进。

## 如果只有5分钟...

在主页上运行[Lighthouse](https://developers.google.cn/web/tools/lighthouse)并[保存报告数据](https://developers.google.cn/web/tools/lighthouse#gists)。您将获得量化的基准和待办事项清单，以改善性能，可访问性，安全性和SEO。

## 如果只有30分钟...

[Lighthouse](https://developers.google.cn/web/tools/lighthouse)可能仍然是最好的起点，但是再花一点时间，您还可以记录其他工具的结果：

- [Chrome DevTools“安全”面板](https://developers.google.cn/web/tools/chrome-devtools/security)：HTTPS使用情况。
- [Chrome DevTools网络面板](https://developers.google.cn/web/tools/chrome-devtools/network-performance)：加载时间；资源大小以及对HTML，CSS，JavaScript，图像，字体和其他文件的请求数量。
- Chrome Task Manager：如果您的站点持续使用大量CPU或比其他应用程序占用更多内存，则可能需要修复内存泄漏，任务运行或资源加载问题。确保在代表用户的设备上测试您的网站。
- [WebPagetest](https://www.webpagetest.org/easy)：不同位置和连接类型，缓存，到第一个字节的时间，CDN使用情况的性能。
- [Pagespeed Insights](https://developers.google.cn/speed/pagespeed/insights)：负载性能，数据成本和资源使用情况，包括突出显示实际性能统计信息的Chrome用户体验报告数据。
- [速度记分卡和影响计算器](https://www.thinkwithgoogle.com/feature/mobile/)：将网站速度与同业进行比较，并估计提高网站速度的潜在收益机会。

确保以首次访问者的身份测试您的网站。使用隐身（专用）窗口打开该站点，或使用浏览器工具禁用缓存并清除存储。这样可以确保从网络而不是从本地缓存中检索每项资产，因此您可以准确了解首次加载的性能。

[WebPagetest](https://www.webpagetest.org/)是一项免费服务，可使用具有真实连接的真实浏览器在全球多个位置运行性能测试，以提供详细的指标和优化建议。

- 利用[webpagetest.org/easy轻松](https://developers.google.cn/web/fundamentals/performance/audit/(https:/www.webpagetest.org/easy)模拟移动设备上网络连接类型之间的差异
- 生成一个Lighthouse审计并报告每个WebPagetest跟踪。
-  在首次访问时以及重复访问时测量站点-例如：查看服务工作者缓存有多少帮助。
- 可视地比较多个站点，并获得幻灯片和瀑布比较。

没有什么能比真实世界的测试更好-在与您的用户相同的设备和连接性下试用您的网站，并记录您的主观体验。

## 如果您发现令人困惑的工具范围...

看看我们的指南：[如何思考调速工具](https://developers.google.cn/web/fundamentals/performance/speed-tools)。

如果没有其他问题，只需使用[Lighthouse](https://developers.google.cn/web/tools/lighthouse)进行检查：

- HTTPS：[每个站点都应通过HTTPS交付所有资产](https://developers.google.cn/web/fundamentals/security/encrypt-in-transit/why-https)。
- 服务器设置：您的Web服务器或CDN应该 [正确使用压缩](https://developers.google.cn/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer)， [使用HTTP / 2](https://developers.google.cn/web/fundamentals/performance/http2)并[包括适当的标头，](https://developers.google.cn/web/fundamentals/performance/optimizing-content-efficiency/http-caching) 以使您的浏览器能够缓存资源。
- 可以移动到页面底部和/或具有[异步或延迟](http://peter.sh/experiments/asynchronous-and-deferred-javascript-execution-explained/) 属性的脚本元素 。
- 可以删除的JavaScript和库。
- [未使用的CSS](https://umaar.com/dev-tips/121-css-coverage/) 和[未使用的JavaScript](https://developers.google.cn/web/updates/2017/04/devtools-release-notes)。
- 可以以更高压缩率或较小像素尺寸保存的图像。
- 较小的图像文件将使用其他格式保存，例如，照片另存为PNG。

## 受众，利益相关者，环境

重构的优先级取决于您的受众，内容和功能。谁访问您的网站？他们为什么以及如何使用它？您的 [绩效预算是](https://www.performancebudget.io/)多少？如果您不确定这些问题的答案，请尝试从我们的PWA培训资源中收集需求练习：[您的听众，您的内容](https://developers.google.cn/web/ilt/pwa/your-audience-your-content) 和[适用于所有用户的设计](https://developers.google.cn/web/ilt/pwa/design-for-all-your-users)。

谁是您的利益相关者，他们的优先事项是什么？这将影响您构造，呈现和共享审核数据的方式。

如果您无法审核整个网站，请检查页面分析以了解重点关注的地方。高跳出率，低页面停留时间和意外退出页面可以很好地指示从哪里开始。同样，业务指标，例如托管费用，广告点击次数和转化次数。从利益相关者那里了解什么数据对他们重要。

## 测试，记录，修复，重复

进行任何更改**之前**，请记录您的网站状态，以发现问题并为改进或回归设置起点。这为您提供了证明和奖励开发工作的数据。

确保测试站点内的多种页面类型，而不仅仅是首页。对于单页应用程序，请测试不同的组件，路由和UX流，而不仅仅是首次加载体验。