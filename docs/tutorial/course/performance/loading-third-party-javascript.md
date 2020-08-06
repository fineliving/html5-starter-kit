# 加载第三方JavaScript

您已经优化了所有代码，但是网站加载仍然太慢。谁是罪魁祸首？

通常，导致网页变慢的性能问题是由于第三方脚本引起的：广告，分析，跟踪器，社交媒体按钮等。

第三方脚本提供了广泛的有用功能，使Web更具动态性，交互性和互连性。这些脚本可能对您网站的功能或收入来源至关重要。但是第三方脚本还带有**许多风险**，应在**最大程度地降低其影响的**同时仍提供价值。

为什么您需要 [注意](https://css-tricks.com/potential-dangers-of-third-party-javascript/) 第三方脚本？

- 它们可能是**性能**问题
- 它们可能是**隐私**问题
- 它们可能是**安全**问题
- 它们可能无法**预测**并且会在您不知情的情况下发生变化
- 他们可能会产生**意想不到的后果**

理想情况下，您将要确保第三方脚本不会影响[关键的渲染路径](https://developers.google.cn/web/fundamentals/performance/critical-rendering-path)。在本指南中，我们将逐步介绍如何查找和修复与加载第三方JavaScript有关的问题。

## 第三方脚本是什么意思？

第三方JavaScript通常是指可以直接从第三方供应商嵌入任何站点的脚本。这些脚本可以包括广告，分析，小部件和其他脚本，这些脚本可以使网络更加动态和交互式。

第三方脚本的示例包括：

- 社交分享按钮（例如Twitter，Facebook，G +）
- 嵌入视频播放器（例如YouTube，Vimeo）
- 广告iframe
- 分析和指标脚本
- 用于实验的A / B测试脚本
- 助手库（例如日期格式，动画，功能库等）

![嵌入youtube视频的示例](https://developers.google.cn/web/fundamentals/performance/optimizing-content-efficiency/loading-third-party-javascript/images/image_0.jpg)

```html
<iframe
  width="560" height="315" src="https://www.youtube.com/embed/mo8thg5XGV0"
  frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
</iframe>
```

YouTube视频播放器的嵌入脚本就是其中的一个示例，该脚本可让您将视频嵌入页面中。

不幸的是，嵌入第三方脚本意味着我们经常依靠它们来快速运行，以避免减慢页面速度。第三方脚本是导致性能下降的主要原因，并且通常是由您无法控制的资源引起的。

这些问题可能包括：

- 向多个服务器发出过多的网络请求。网站提出的请求越多，加载时间就越长。
- 发送[太多的JavaScript](https://developers.google.cn/web/fundamentals/performance/optimizing-content-efficiency/javascript-startup-optimization) ，使主线程忙。太多的JavaScript会阻止DOM的构建，从而延迟了页面呈现的速度。占用大量CPU的脚本的解析和执行可能会延迟用户交互并导致电池消耗。
- 发送[未经优化的](https://developers.google.cn/web/tools/lighthouse/audits/unoptimized-images)大型[图像文件](https://developers.google.cn/web/tools/lighthouse/audits/unoptimized-images)或视频。这会消耗数据并花费用户金钱。
- 随意加载第三方脚本可能是[单点故障](http://blog.patrickmeenan.com/2011/10/testing-for-frontend-spof.html) （SPOF）
- [HTTP缓存](https://developers.google.cn/web/fundamentals/performance/optimizing-content-efficiency/http-caching)不足，经常迫使从网络中获取资源
- 缺乏足够的[服务器](https://developers.google.cn/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer) 资源[压缩](https://developers.google.cn/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer)
- 阻止内容显示，直到它们完成处理。对于异步A / B测试脚本也是如此。
- 使用已知对用户体验[有害](https://developers.google.cn/web/tools/lighthouse/audits/document-write)的旧版API（例如 [document.write（）](https://developers.google.cn/web/updates/2016/08/removing-document-write)）
- 过多的DOM元素或昂贵的CSS选择器。
- 包括多个第三方嵌入会导致多个框架和库被拉多次。这是浪费的，并且加剧了性能问题。
- 第三方脚本通常使用嵌入技术， 即使它们的服务器响应缓慢，即使它们使用的是异步或延迟，它们也会阻止 [window.onload](https://developer.mozilla.org/en/docs/Web/API/GlobalEventHandlers/onload)。

上下文很重要，而代价高昂的第三方的解决方案可能取决于您的站点以及配置如何加载第三方代码的能力。值得庆幸的是，存在许多解决方案和工具来查找和修复第三方资源的问题。

## 您如何识别页面上的第三方脚本？

除非您知道站点加载了哪些第三方脚本及其对性能的影响，否则无法知道如何对其进行优化。许多免费的网络速度测试工具可以突出显示昂贵的第三方，包括[Chrome DevTools](https://developer.chrome.com/devtools)，[PageSpeed Insights](https://developers.google.cn/speed/pagespeed/insights)和 [WebPageTest](https://www.webpagetest.org/)。这些工具显示丰富的诊断信息，这些信息可以告诉您您的站点加载*了多少*个第三方脚本，并且执行时间最多。

WebPageTest的瀑布视图可以突出显示大量使用第三方脚本的影响。以下是加载网站主要内容所需的请求与跟踪和营销脚本的关系的示例（来源：[Tags Gone Wild](https://nystudio107.com/blog/tags-gone-wild)）。

![来自webpagetest的瀑布视图，显示了实际的网站与加载跟踪脚本所花费的时间](https://developers.google.cn/web/fundamentals/performance/optimizing-content-efficiency/loading-third-party-javascript/images/image_2.jpg)

WebPageTest的[域细分](https://www.google.com/url?q=https://www.webpagetest.org/result/180222_J4_8fee6855d6f45719e4f37d8d89ecbc20/1/domains/&sa=D&ust=1519325015196000&usg=AFQjCNGrRivilJS9yqqpombsUMQZQJx2nw) 对于可视化来自第三方来源的内容也很有用。它按总字节数和请求数将其细分：

![内容按域细分（第一个视图）。 显示每个第三方的请求数和字节数](https://developers.google.cn/web/fundamentals/performance/optimizing-content-efficiency/loading-third-party-javascript/images/image_3.png)

当您看到有问题的脚本时，请弄清楚该脚本的作用，并问自己脚本是否真的必要。进行A / B测试，以平衡感知到的价值及其对关键用户参与或绩效指标的影响。

### Chrome DevTools第三方脚本标记

[Chrome DevTools](https://developers.google.cn/web/tools/chrome-devtools)支持在“ [网络”面板中](https://developers.google.cn/web/tools/chrome-devtools/network-performance/resource-loading)突出显示第三方（按产品名称）。这使您可以更深入地了解第三方在页面上发出请求，登录到控制台并在页面上执行昂贵的JavaScript。

要显示第三方徽章，请导航至Chrome DevTools中的任何面板，然后按CMD + Shift + P弹出命令菜单。接下来，输入“显示第三方徽章”。这将启用该功能：

![从DevTools命令菜单启用对第三方徽章功能的支持](https://developers.google.cn/web/fundamentals/performance/optimizing-content-efficiency/loading-third-party-javascript/images/image_4.png)

现在，当您使用“网络”面板记录页面加载时，它将包含第三方标志，例如下面以绿色显示的“ AOL广告”标志。将鼠标悬停在“网络”面板中的第三方徽章上将显示有关该脚本的更多信息，从而帮助您确定其作用。

![网络面板中的DevTools第三方徽章](https://developers.google.cn/web/fundamentals/performance/optimizing-content-efficiency/loading-third-party-javascript/images/image_5.png)

## 如何衡量第三方脚本对页面的影响？

### 灯塔启动时间审核

Lighthouse [JavaScript启动时间审核](https://developers.google.cn/web/tools/lighthouse/audits/bootup)突出显示了具有昂贵的脚本解析，编译或评估时间的脚本。这对于发现占用大量CPU的第三方脚本很有用。

![Lighthouse显示了对脚本评估和解析的支持](https://developers.google.cn/web/fundamentals/performance/optimizing-content-efficiency/loading-third-party-javascript/images/image_6.png)

### 灯塔网络有效负载审计

Lighthouse [Network有效](https://developers.google.cn/web/tools/lighthouse/audits/network-payloads)负载[审核可](https://developers.google.cn/web/tools/lighthouse/audits/network-payloads)识别可能会减慢页面加载时间的网络请求（包括来自第三方的请求）。避免这些请求或突出其对广告网络的成本，可以为用户节省本应花在蜂窝数据上的钱。

![灯塔显示对大型网络有效负载的支持](https://developers.google.cn/web/fundamentals/performance/optimizing-content-efficiency/loading-third-party-javascript/images/image_18.png)

### Chrome DevTools网络请求阻止

Chrome DevTools可让您查看在没有特定脚本，样式表或其他资源时页面的行为。这是通过[网络请求阻止完成的](https://developers.google.cn/web/updates/2017/04/devtools-release-notes#block-requests)，该功能可以帮助衡量阻止（丢弃）页面中特定第三方资源的影响。

要启用请求阻止，请右键单击“网络”面板中的任何请求，然后选择“阻止请求URL”。“请求阻止”选项卡将显示在DevTools抽屉中，让您管理哪些请求已被阻止。

![从DevTools网络面板阻止请求URL](https://developers.google.cn/web/fundamentals/performance/optimizing-content-efficiency/loading-third-party-javascript/images/image_7.png)

### Chrome DevTools性能面板

Chrome DevTools中的“效果[”面板](https://developers.google.cn/web/tools/chrome-devtools/evaluate-performance/reference)可帮助您确定网页的网络性能问题。单击“记录”按钮并加载页面，将向您展示一个瀑布，代表您的网站在哪里花费时间。在“性能”面板的底部，您将看到一个以“ [摘要](https://developers.google.cn/web/tools/chrome-devtools/evaluate-performance/reference#record-load) ” 开头的抽屉。导航到“自下而上”选项卡。

在这里，您可以使用“自下而上”选项卡中的“按产品分组”选项将第三方花费的时间进行分组。这有助于确定哪些第三方产品成本最高。“ [网络”面板](https://umaar.com/dev-tips/143-network-products/)还支持按产品突出显示请求的选项。

![DevTools Performance面板显示了按（第三方）产品分组的自下而上视图](https://developers.google.cn/web/fundamentals/performance/optimizing-content-efficiency/loading-third-party-javascript/images/image_8.png)

要了解有关如何使用Chrome DevTools分析页面加载性能的更多信息，请参阅[分析运行时性能入门](https://developers.google.cn/web/tools/chrome-devtools/evaluate-performance)。

衡量第三方脚本影响的良好**工作流程**是：

- 使用“网络”面板测量加载页面所需的时间。
  - 为了模拟实际情况，我们建议打开[网络限制](https://developers.google.cn/web/tools/chrome-devtools/network-performance#emulate)和 [CPU限制](https://developers.google.cn/web/updates/2017/07/devtools-release-notes#throttling)。在更快的连接速度和桌面硬件上，昂贵的脚本的影响可能不像在手机上那样具有代表性。
- 阻止负责您认为是问题的第三方脚本的URL或域（请参阅*Chrome DevTools性能面板*以识别昂贵的脚本）。
- 重新加载页面并重新测量页面花费的时间，而无需加载这些被阻止的第三方脚本。希望您会看到改善。
  - 进行3次或更多次测量并查看中位数以获得更稳定的数字可能会有价值。由于第三方内容偶尔会在每次页面加载时提取不同的资源，因此这可能使您的传播更为现实。[现在，DevTools](https://twitter.com/ChromeDevTools/status/963820146388221952) 在性能面板中[支持多个录制](https://twitter.com/ChromeDevTools/status/963820146388221952)，这使操作变得更加简单。

### 使用WebPageTest测量第三方标签的影响

[WebPageTest](https://www.webpagetest.org/)支持阻止单个请求的加载（这对于阻止广告和第三方嵌入之类的内容很有用）以衡量其影响。

在“高级设置”下是“阻止”选项卡。这可以用来指定要阻止的域的列表，模拟根本不加载的情况。

![WebPageTest高级设置<阻止。 显示用于指定要阻止的域的文本区域。](https://developers.google.cn/web/fundamentals/performance/optimizing-content-efficiency/loading-third-party-javascript/images/image_9.png)

使用此功能的工作流程是：

- 正常测试页面
- 在某些第三方被阻止的情况下重复测试
- 比较两个结果（注意胶片）。可以通过从“ [测试历史记录](https://www.webpagetest.org/testlog/1/) ”中选择结果并单击“比较”来比较结果。

![WebPageTest显示比较选项，使您可以比较两个报告](https://developers.google.cn/web/fundamentals/performance/optimizing-content-efficiency/loading-third-party-javascript/images/image_10.png)

在下面，我们可以看到在有和没有第三方资源被阻止的情况下，幻灯片之间的区别。尝试对各个第三方来源进行尝试，以确定哪些对您的页面加载性能影响最大：

![WebPageTest幻灯片显示了在加载和禁用第三方的情况下加载网站的影响](https://developers.google.cn/web/fundamentals/performance/optimizing-content-efficiency/loading-third-party-javascript/images/image_11.png)

安迪·戴维斯（Andy Davies）的“ [使用WebPageTest来衡量第三方标签的影响](https://goo.gl/jwGg6X) ”中[使用](https://goo.gl/jwGg6X) WPT的“阻止请求”功能阻止页面上第三方资源[的影响](https://goo.gl/jwGg6X)

**注意：**WebPageTest还支持在DNS级别运行的两个命令来阻止域。 [blockDomains-](https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/scripting#TOC-blockDomains) 接受要阻止的域的列表，而[blockDomainsExcept-](https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/scripting#TOC-blockDomainsExcept) 接受要阻止的域 的列表，并阻止列表中没有的任何内容。

WebPageTest还具有单点故障（SPOF）选项卡。这使您可以模拟超时或完全失败以加载资源。

“ SPOF”和“块”之间的区别是SPOF缓慢超时。这对于测试第三方内容的网络弹性很有用，它可以确定当服务处于高负载或暂时不可用时页面保持的状态。

![WebPageTest高级设置> SPOF>主机失败](https://developers.google.cn/web/fundamentals/performance/optimizing-content-efficiency/loading-third-party-javascript/images/image_12.png)

### 使用“长任务”检测昂贵的iframe

当第三方iframe中的脚本需要很长时间才能运行时，它们会阻塞主线程，从而延迟其他任务的运行。这些漫长的任务可能导致不良的用户体验，从而导致事件处理程序缓慢或丢帧。

为了检测长期任务的[真实用户监控](https://en.wikipedia.org/wiki/Real_user_monitoring)（RUM），我们可以使用JavaScript [PerformanceObserver](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver) API和观察 [longtask](https://developers.google.cn/web/fundamentals/performance/user-centric-performance-metrics#long_tasks) 条目。由于这些条目包含归因属性，因此我们可以跟踪哪个帧上下文负责该任务。

下面是一个示例，该示例会将`longtask`条目记录到控制台，包括一个用于“昂贵” iframe的条目：

```html
<script>
    const observer = new PerformanceObserver((list) => {

        for (const entry of list.getEntries()) {

            // Attribution entry including "containerSrc":"https://example.com"
            console.log(JSON.stringify(entry.attribution));

        }

    });

    observer.observe({ entryTypes: ['longtask'] });
</script>

<!-- Imagine this is an iframe with expensive long tasks -->
<iframe src="https://example.com"></iframe>
```

要了解有关监视长任务的更多信息，请阅读Phil Walton的以[用户为中心的性能指标](https://developers.google.cn/web/fundamentals/performance/user-centric-performance-metrics#long_tasks)。

## 您如何有效地加载第三方脚本？

如果第三方脚本正在减慢页面加载速度，则可以使用以下几种方法来提高性能：

- 使用async或defer属性加载脚本，以避免阻止文档解析。
- 如果第三方服务器运行缓慢，请考虑自托管脚本。
- 如果脚本没有为您的网站增加明显的价值，请考虑删除该脚本。
- 考虑使用[资源提示](https://developers.google.cn/web/fundamentals/performance/resource-prioritization#preconnect)， ``或``为托管第三方脚本的域执行DNS查找。

### 使用异步或延迟

JavaScript执行是解析器阻止。这意味着当浏览器遇到脚本时，它必须暂停DOM构建，将其移交给JavaScript引擎并允许脚本执行，然后再进行DOM构建。

异步和延迟属性更改此行为。

- 使用异步，浏览器将在继续解析HTML文档的同时异步下载脚本。脚本完成下载后，脚本执行时将阻止解析。
- 使用defer，浏览器在继续解析HTML文档的同时异步下载脚本。该脚本在解析完成之前不会运行。

如果话太多，这是一张漂亮的图片：

![可视化比较使用脚本与脚本异步与脚本延迟的影响。 在脚本提取和HTML解析完成之后，Defer显示为正在执行。](https://developers.google.cn/web/fundamentals/performance/optimizing-content-efficiency/loading-third-party-javascript/images/image_13.png)

*信用：随着网络发展*

通常，您应始终对第三方脚本使用`async`或`defer`（除非脚本对关键渲染路径执行必要的操作）：

- `async`如果在加载过程中较早运行脚本很重要，请使用。例如，这可能包括一些分析脚本。
- 使用`defer`更少的关键资源。例如，视频播放器在售。

**注意：**如果主要考虑性能，则可以等到页面达到关键的用户时刻（例如，加载关键内容之后），然后再添加异步脚本。您还应注意不要`async`仅因为它们来自第三方CDN 而加载jQuery之类的库。

**注：**在闪烁为基础的浏览器，`async`而`defer`目前[降低网络请求的优先级](https://docs.google.com/document/d/1bCDuq9H1ih9iNjgzyAL0gpwNFiEP4TZS-YLRp_RuMlc/edit) 的资源，因此它可以导致其显著晚于它会为阻止脚本加载。特别是对于分析脚本，这很有用。

您是否应该不带`async`或加载第三方脚本`defer`？如果脚本是站点功能的关键部分，那么您可以为此做一个案例。例如，如果要从CDN加载主UI库或框架，则在DevTools中将其标记为“第三方脚本”，但应将其视为网站的重要组成部分，而不是附加组件。

请注意，并非所有脚本都可以异步加载。在文档中查看您正在使用的任何第三方脚本。如果您使用的脚本无法异步加载，则可能需要考虑替代方法，或者尽可能删除该脚本。某些第三方可能*强烈建议*加载其脚本同步（以领先其他脚本），即使它们可以很好地异步工作，评估评估加载第三方脚本的策略时的尽职调查也是如此。

**注意：**不是灵丹妙药。如果市场营销团队希望在页面上加载大量跟踪脚本，则该数量仍会引入瓶颈，从而影响用户在加载页面上投入互动的时间。 `async`

### 使用资源提示减少连接建立时间

建立与第三方来源的连接可能会花费大量时间-特别是在速度较慢的网络上。许多步骤可能会加总延迟，包括DNS查找，重定向以及到每个第三方服务器来处理请求的潜在往返行程。

您可以使用[资源提示，](https://developers.google.cn/web/fundamentals/performance/resource-prioritization#preconnect)例如 对托管第三方脚本的域执行DNS查找。最终提出请求后，由于已经进行了DNS查找，因此可以节省时间。

```
<link rel="dns-prefetch" href="http://example.com">
```

如果您引用的第三方域使用HTTPS，则您可能还会考虑 这样做，因为这将执行DNS查找*并*解析TCP往返并处理TLS协商。这些其他步骤可能会很慢，因为它们涉及查看SSL证书进行验证，因此如果发现第三方设置时间是一个问题，请认真考虑“资源提示”。

```
<link rel="preconnect" href="https://cdn.example.com">
```

### 具有iframe的“沙盒”脚本

在某些情况下，可以将第三方脚本直接加载到iframe中。通过将此类脚本限制为iframe，它们将不会阻止主页的执行。这与 [AMP](https://www.ampproject.org/learn/about-how/)将JavaScript排除在[关键路径之外的方法相同](https://developers.google.cn/web/fundamentals/performance/critical-rendering-path)。请注意，这种方法仍然会阻止`onload`事件，因此请不要将关键功能附加到`onload`。

**注意：**Chrome浏览器也在探索对[功能策略的](https://www.chromestatus.com/feature/5694225681219584)支持- [功能策略](https://www.chromestatus.com/feature/5694225681219584)集，允许开发人员有选择地禁用对某些浏览器功能的访问。这样可以防止第三方内容将有害行为引入网站。

### 自托管第三方脚本

如果您想进一步控制脚本的加载过程，则可以选择自托管第三方脚本。例如，如果您想减少DNS或往返时间，请改进HTTP缓存标头或利用HTTP / 2服务器推送等高级技术。如果脚本很重要，那么自我托管可能是一个可行的考虑因素。

自托管可能会带来很多警告：

- 脚本可能会过时。这可能是一个大问题，因为它使您无法手动更新就无法获取重要的安全修复程序。
- 由于API的更改，自托管脚本不会获得自动更新。一个示例：一个拥有90％的广告收入的发布商发现，由于API更改（自托管脚本未解释）导致广告没有投放半天，从而导致收入损失。

自托管脚本的替代方法是使用[Service Workers对其](https://developers.google.cn/web/fundamentals/primers/service-workers)进行缓存。这样可以更好地控制从网络重新提取它们的频率。这也可以用于创建加载策略，在该策略中，对非必要第三方的请求将被限制，直到页面到达关键用户时刻为止。

### A / B测试较小的用户样本

[A / B测试](https://www.optimizely.com/optimization-glossary/ab-testing/)（或拆分测试）是一种用于测试页面的两个版本以确定哪个版本效果最好的技术。这是通过为网站流量的不同样本启用两种变体（A和B）来完成的。转换率更高的页面将获胜。

A / B测试是用于分析用户体验和行为的非常有用的工具。

但是，根据设计，A / B测试会延迟渲染，以找出需要激活的实验。JavaScript通常用于检查您的用户是否属于A / B测试实验，然后启用正确的变体。这种模式可能导致您的用户100％被发送到昂贵的大型脚本中，即使他们不属于接受实验的样本。

在这种情况下，一个很好的选择是仅针对您的一部分用户群发送A / B测试脚本（例如10％对100％），理想情况下尝试确定它们是否属于服务器端的测试样本。这改善了大多数用户的加载体验，同时仍然使拆分测试成为可能。

### 延迟加载第三方资源

嵌入的第三方资源（例如广告或视频）在构建质量不佳时可能会导致页面速度降低。延迟加载只能用于在必要时加载嵌入式资源。例如，仅当用户向下滚动页面时才在页脚中投放广告。另一种模式是在加载主页内容之后但在用户可能与该页面进行交互之前延迟加载内容。

![该图显示了对于上述折页体验至关重要的资产，而对于那些次要的折旧资产却可以延迟加载的资产。](https://developers.google.cn/web/fundamentals/performance/optimizing-content-efficiency/loading-third-party-javascript/images/image_15.png)

**注意：**[LazySizes](https://github.com/aFarkas/lazysizes)是一个流行的JavaScript库，用于延迟加载图像和[ iframe](http://afarkas.github.io/lazysizes/#examples)。它支持YouTube嵌入和[ 窗口小部件](https://github.com/aFarkas/lazysizes/tree/gh-pages/plugins/unveilhooks)。延迟加载任何资源时，务必要小心，因为此技术通常由JavaScript支持，并且可能会遇到不稳定的网络连接问题。

DoubleClick在其[官方文档中](https://support.google.com/dfp_premium/answer/4578089#lazyloading)提供了有关如何延迟加载广告的指南。如果使用得当，延迟加载可以增加广告的整体可见度百分比。例如，MediaVine切换到[延迟加载广告](https://www.mediavine.com/lazy-loading-ads-mediavine-ads-load-200-faster/) ，页面加载速度提高了200％。

#### 使用交叉观察器进行有效的延迟加载

从历史上看，用于检测元素是否在视口中可见（以便延迟加载其内容）的解决方案容易出错，通常会导致浏览器变慢。解决方案经常监听 [滚动](https://developer.mozilla.org/en-US/docs/Web/Events/scroll)或 [调整大小](https://developer.mozilla.org/en-US/docs/Web/Events/resize)事件，然后使用诸如[getBoundingClientRect（）之](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)类的DOM API 计算元素相对于视口的位置。这可行，但效率不高。

[IntersectionObserver](https://developers.google.cn/web/updates/2016/04/intersectionobserver)是一种浏览器API，使我们能够有效地检测观察到的元素何时进入或退出浏览器的视口。了解有关如何将其用于[延迟加载资源的更多信息](http://deanhume.com/home/blogpost/lazy-loading-images-using-intersection-observer/10163)。LazySizes还具有 对IntersectionObserver的[可选支持](https://github.com/aFarkas/lazysizes/blob/097a9878817dd17be3366633e555f3929a7eaaf1/src/lazysizes-intersection.js)。

### 分析可能很复杂

Analytics脚本绝不应减慢页面加载体验，但是如果您将加载延迟太长时间，则可能会丢失有价值的分析数据。幸运的是，有一些众所周知的模式可用于延迟初始化分析同时保留早期页面加载数据。

菲尔·沃尔顿（Phil Walton）的博客文章[“我在我建立的每个网站上使用的Google Analytics（分析）设置”](https://philipwalton.com/articles/the-google-analytics-setup-i-use-on-every-site-i-build/) 涵盖了一种此类Google Analytics（分析）模式。

## 我应该避免使用第三方脚本的哪些模式？

### 避免document.write（）

第三方脚本有时会使用 [document.write（）](https://developer.mozilla.org/en-US/docs/Web/API/Document/write) 来注入和加载脚本。对于某些时间未更新的旧服务尤其如此。值得庆幸的是，许多第三方都提供了一种异步加载自身的选项，该选项允许加载第三方脚本而不会阻止页面上其余内容的显示。

解决document.write（）的方法是根本不使用它注入脚本。从Chrome 53开始，Chrome DevTools会将警告记录在控制台中，提示您对document.write（）的使用有问题：

![DevTools控制台警告突出显示了使用document.write（）对第三方嵌入的违规](https://developers.google.cn/web/fundamentals/performance/optimizing-content-efficiency/loading-third-party-javascript/images/image_16.png)

要发现大规模使用document.write（）的情况，您可以检查Chrome发生这种干预时是否发送到浏览器的[HTTP标头](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)。 [Lighthouse](https://developers.google.cn/web/tools/lighthouse)还可以在Lighthouse报告中突出显示[仍在使用document.write（）的](https://developers.google.cn/web/tools/lighthouse/audits/document-write)任何第三方脚本 ：

![Lighthouse Best Practices审核标记document.write（）的使用](https://developers.google.cn/web/fundamentals/performance/optimizing-content-efficiency/loading-third-party-javascript/images/image_17.png)

### 使用标签管理器，但要明智地使用它们

**注意：**使用GTM时要格外小心。尽管它可以最大程度地减少第三方标签的开销，但对于拥有凭据的任何人来说，添加昂贵的标签也变得微不足道。

“标签”是一段代码，可让数字营销团队收集数据，设置Cookie或将第三方内容（例如社交媒体小部件）集成到网站中。这些标记会影响您页面的加载性能-其他网络请求，严重的JavaScript依赖关系，标记本身可能会占用的图像和资源。

随着时间的推移，管理这些标签可能会变成一团糟，因为营销团队希望增加了解用户的方式，并且工程人员试图将标签对用户体验的影响降至最低。为了保持快速体验，我们建议使用标签管理器。标签管理器：

- 允许从单个位置（通常是用户界面）管理许多第三方嵌入代码
- 尝试最小化需要在站点中部署多少第三方标签。

**注意：**即使可以异步加载单个标签，仍然需要分别读取和执行它们。这可能意味着在页面仍在加载时请求更多数据。标记管理器通过将浏览器需要进行的调用次数减少到一个来解决此问题。

[Google](https://www.google.com/analytics/tag-manager/)跟踪[代码管理器](https://www.google.com/analytics/tag-manager/)（GTM）就是这样一种流行的跟踪代码管理器：

“ Google跟踪代码管理器是一个异步代码，这意味着它执行时不会阻止其他元素在页面上呈现。它还会导致通过Google跟踪代码管理器部署的其他代码被异步部署，这意味着加载缓慢标签不会阻止其他跟踪标签。”

标记管理器可以通过减少所需的对外部资源的调用次数来提高页面加载性能-只要您**不**获取大量标记即可。它们还允许标签在单个唯一位置收集值的方式。对于GTM，这是[数据层](https://developers.google.cn/tag-manager/devguide)。如果多个第三方希望触发转化跟踪数据，则可以通过从数据层提取数据来实现。

**使用标签管理器的风险**

使用标签管理器时，需要格外小心，以免减慢页面加载的速度。这是因为：

- 具有凭证和访问权限的任何人都可以轻松地不仅添加更多标签，还可以添加 他们想要的*任何* JavaScript。尽管标签管理器可以异步加载标签，但这仍可能导致产生和执行过多的昂贵HTTP请求。通过仅允许一个用户发布版本，可以将其最小化。
- 任何人都可以配置太多的标签管理器[自动事件监听器](https://support.google.com/analytics/answer/6164470)。每个自动事件侦听器都需要执行，并且代码和网络请求越多，页面完全加载所花费的时间就越长。通过我们的性能指导，鼓励您[在50毫秒内响应事件](https://developers.google.cn/web/fundamentals/performance/rail)，添加的每个标签管理器事件监听器都会吃掉该目标。

### 避免使用脚本污染全局范围

注入到未知脚本中的第三方脚本有时可以加载许多自己的JavaScript依赖项。这可能会污染全局范围并导致页面意外损坏。

也不能保证从第三方加载的代码将保持与您在测试期间看到的相同。第三方可以随时推出新功能，这可能会破坏您的页面。自检，[子资源完整性](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) 以及安全地传输第三方代码（以减少在途修改的风险）可以在这里起到帮助作用。

确保对加载的第三方脚本进行仔细的审核，以确保它们是好的角色。

## 缓解策略

在页面上添加第三方脚本意味着对来源的信任程度。您可以采取一些策略来最小化它们对性能和安全性的影响：

- **[HTTPS](https://developers.google.cn/web/fundamentals/security/encrypt-in-transit/why-https)**是必须的。使用HTTPS的网站不应让第三方使用HTTP。包含使用HTTP提取的内容的HTTPS页面称为混合内容页面，并且会遇到[混合内容](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content) 警告。
- 考虑iframe上的**[sandbox属性](https://developer.mozilla.org/en/docs/Web/HTML/Element/iframe)**。从安全角度来看，这使您可以限制iframe可用的操作。限制包括`allow-scripts`控制上下文是否可以运行脚本。
- 考虑**[内容安全策略](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)**（CSP）。通过服务器响应中的HTTP标头，您可以定义页面中受信任的行为。CSP可用于检测和缓解某些攻击的影响，例如[跨站点脚本](https://en.wikipedia.org/wiki/Cross-site_scripting)（XSS）。

CSP的功能特别强大，因为它包含诸如[script-src之类的](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src)指令，这些指令 指定了有效的JavaScript允许源。下面是如何在实践中使用此示例：

```
// Given this CSP header

Content-Security-Policy: script-src https://example.com/

// The following third-party script will not be loaded or executed

<script src="https://not-example.com/js/library.js"></script>
```

## 结论

由于网站比以往任何时候都依赖于第三方脚本，因此至关重要的是不要忽略第三方脚本的性能。您可以做的好事：

- 熟悉一些最有效的第三方脚本优化方法，例如仅加载支持异步加载模式的标记。
- 了解如何识别和修复第三方脚本加载问题。这可以帮助您收回对页面加载性能的控制。

在第三方脚本优化之后，应进行脚本的实时性能监视以及与第三方提供商的通信。Web的发展日新月异，脚本在本地观察到的性能并不能保证它在将来或在野外都能正常运行。

## 进一步阅读

[性能和弹性：对第三方进行压力测试](https://csswizardry.com/2017/07/performance-and-resilience-stress-testing-third-parties/)

[添加与JavaScript的交互性](https://developers.google.cn/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript)

[第三方脚本的潜在危险](https://css-tricks.com/potential-dangers-of-third-party-javascript/)

[第三方脚本如何成为网络上的表演公民](https://www.twnsnd.com/posts/performant_third_party_scripts.html)

[为什么要紧-CSS向导](https://speakerdeck.com/csswizardry/why-fast-matters)

[JavaScript供应链悖论：SRI，CSP和第三方库中的信任](https://www.troyhunt.com/the-javascript-supply-chain-paradox-sri-csp-and-trust-in-third-party-libraries/)

[第三方CSS不安全](https://jakearchibald.com/2018/third-party-css-is-not-safe/)

*感谢Kenji Baheux，Jeremy Wagner，Pat Meenan，Philip Walton，Jeff Posnick和Cheney Tsai的评论。*