# 通过导航和资源定时评估现实生活中的加载性能

您很有可能在某个时候打开了浏览器的开发工具，[使用了网络面板](https://developers.google.cn/web/tools/chrome-devtools/network-performance)（甚至可能是 [Lighthouse](https://developers.google.cn/web/tools/lighthouse)）来评估性能，并发现了改进的机会。然后，您重构了代码，提高了性能，观看了指标的改进，并向自己表示了祝贺。做得好！

只有您还*没有*完成，因为问题仍然存在：您执行的测试是[*综合*](https://developers.google.cn/web/fundamentals/performance/speed-tools#lab_data)测试 。他们没有告诉您您的网站[在该领域](https://developers.google.cn/web/fundamentals/performance/speed-tools#field_data)对[真实用户的](https://developers.google.cn/web/fundamentals/performance/speed-tools#field_data)表现如何。

并不是说综合测试很*糟糕*，而是它只是更大的加载性能图的一部分。不管您使用多少个综合测试工具，它们都只能从一个角度提供数据：从任何设备和网络连接运行测试。当然，基于综合测试建议所做的改进将对所有用户有所帮助，但是只要综合测试仍然是您唯一的性能衡量策略，您在*多大程度上*都不了解。

这是真正用户监视（RUM）的地方。RUM依靠浏览器中的JavaScript API来收集有关网站对*真实用户的*表现的统计信息。两种特定的API通过捕获 可测量资源加载各个阶段的[高分辨率时序](https://developers.google.cn/web/updates/2012/08/When-milliseconds-are-not-enough-performance-now)来衡量用户如何快速加载文档和资源。这些是网络和资源定时API，本指南将帮助您理解它们提供的数据。

## 简单的API可帮助您了解浏览器中的网络请求

导航和资源计时相互之间有很大的重叠，但是它们各自收集不同方面的指标：

- [**导航计时**](https://w3c.github.io/navigation-timing/)收集HTML文档的性能指标。
- [**资源计时**](https://w3c.github.io/resource-timing/)收集文档相关资源的性能指标。东西像样式表，脚本，图片，*等等*。

如果您对这两个API一无所知，您可能会因为过于复杂或不必要而将其清除。事实是，从这些API中*获取*数据很容易，并且该数据对于衡量实际用户的加载性能*至关重要*。该*硬*的部分是他们提供的数据的意义，但我们会覆盖所有的很快。现在，让我们在控制台中进行一些实验。

导航和资源计时（以及其他相关API）将*性能条目*存储 在*性能条目缓冲区中*。简单来说，这意味着它们将页面和资源的性能指标存储到JavaScript可访问的列表中。这些方法存在于`window.performance` 名称空间中，它们以不同的方式帮助我们查询此列表。不过，现在让我们保持简单并坚持使用[`getEntriesByType` method](https://developer.mozilla.org/en-US/docs/Web/API/Performance/getEntriesByType)。首先，在浏览器中加载任何页面，打开控制台，然后输入以下两个命令之一（或两个都输入）：

```javascript
// Get Navigation Timing entries:
performance.getEntriesByType("navigation");

// Get Resource Timing entries:
performance.getEntriesByType("resource");
```

`getEntriesByType`接受描述所需条目类型的字符串。要获取导航时间条目，请使用`"navigation"`。对于资源计时条目，使用`"resource"`。运行此命令后，您将看到一个数组，其中包含当前页面的性能计时对象，如下所示：

```javascript
{
  "connectEnd": 152.20000001136214,
  "connectStart": 85.00000007916242,
  "decodedBodySize": 1270,
  "domComplete": 377.90000007953495,
  "domContentLoadedEventEnd": 236.4000000525266,
  "domContentLoadedEventStart": 236.4000000525266,
  "domInteractive": 236.2999999895692,
  "domainLookupEnd": 85.00000007916242,
  "domainLookupStart": 64.4000000320375,
  "duration": 377.90000007953495,
  "encodedBodySize": 606,
  "entryType": "navigation",
  "fetchStart": 61.600000015459955,
  "initiatorType": "navigation",
  "loadEventEnd": 377.90000007953495,
  "loadEventStart": 377.90000007953495,
  "name": "https://example.com/",
  "nextHopProtocol": "h2",
  "redirectCount": 0,
  "redirectEnd": 0,
  "redirectStart": 0,
  "requestStart": 152.50000008381903,
  "responseEnd": 197.80000008177012,
  "responseStart": 170.00000004190952,
  "secureConnectionStart": 105.80000001937151,
  "startTime": 0,
  "transferSize": 789,
  "type": "navigate",
  "unloadEventEnd": 0,
  "unloadEventStart": 0,
  "workerStart": 0
}
```

这些信息的密度可能令人不知所措，但请记住一件事：每当您看到瀑布图时，您都在查看这些API提供的数据的直观表示！实际上，可以使用此数据生成自己的视觉效果。例如[安迪·戴维斯](https://twitter.com/AndyDavies)（[Andy Davies）的](https://twitter.com/AndyDavies)[Waterfall（瀑布](https://github.com/andydavies/waterfall)[）](https://twitter.com/AndyDavies)或 [Michael Mrowetz](https://twitter.com/micmro)（ [Michael Mrowetz）的](https://twitter.com/micmro)[Performance-Bookmarklet](https://github.com/micmro/performance-bookmarklet)等脚本就是很好的例子 。

![由安迪·戴维斯（Andy Davies）创建的Waterfall（瀑布）小书签可视化的资源时间列表。](https://developers.google.cn/web/fundamentals/performance/navigation-and-resource-timing/images/figure-1-1x.png)**图1**。显示页面及其资源计时的Waterfall小书签。

导航和资源定时是可以帮助您衡量加载内容所需时间的API。由于这些API是JavaScript的一部分，因此您可以使用它们来收集用户访问页面时的重要性能统计信息。那是强大的东西！

## 网络请求的寿命和时间

当您收集页面导航和资源下载的时间时，您扮演的是考古学家的角色，即您要在事后重建网络请求的短暂生命。有时，它有助于可视化一个概念，并且在涉及网络请求时，没有比浏览器的开发工具更好的可视化工具。

![Chrome的开发者工具可视化的网络请求时间列表。](https://developers.google.cn/web/fundamentals/performance/navigation-and-resource-timing/images/figure-2-1x.png)**图2**。在Chrome开发人员工具的网络面板中如何可视化网络请求。

如您所见，此请求具有您期望的所有有趣的东西：DNS查找，连接，TLS协商等等。让我们一起来看一下导航和资源定时中的重要（不是那么重要）位，并演示哪些属性和指标可以帮助您衡量对应用程序性能至关重要的活动！让我们开始吧！

**注意：**本指南对哪些指标最重要有些看法。如果您想同时看到这两个API的鸟瞰图，并在其中显示确切的订单指标，那么[此Timing处理模型图](https://www.w3.org/TR/navigation-timing-2/#processing-model)将非常有用。

### DNS查询

当用户请求URL时，将查询域名系统（DNS）以将域转换为IP地址。根据许多因素（尤其是DNS缓存），此过程可能会花费大量时间。也许不是，但是无论如何，这都是您想要测量的东西。导航和资源计时都公开了两个与DNS相关的指标：

- `domainLookupStart` DNS查找开始时标记。
- `domainLookupEnd` DNS查找结束时标记。

真的很简单！当网络请求阶段是线性的时，测量其持续时间就像从终止度量中减去起始度量一样容易：

```javascript
// Measuring DNS lookup time
var pageNav = performance.getEntriesByType("navigation")[0];
var dnsTime = pageNav.domainLookupEnd - pageNav.domainLookupStart;
```

现在有一些坏消息：您不能*总是*依靠某些指标来填充。这两个API中的某些属性将`0`在特定条件下使用。例如，如果主机未设置适当的 响应头，则`domainLookupStart`和`domainLookupEnd`（及其他）都可以`0`用于第三方提供的资源 [`Timing-Allow-Origin`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Timing-Allow-Origin)。我们暂时还不会涉足杂草，但是[稍后我们会讨论](https://developers.google.cn/web/fundamentals/performance/navigation-and-resource-timing#cross-origins_and_the_timing-allow-origin_header)。现在，让我们继续前进。

### 连接协商

与服务器建立连接后，由于客户端和服务器在将资源发送到客户端之前先进行整理，因此会发生延迟。如果使用HTTPS（[这越来越普遍](https://httparchive.org/reports/state-of-the-web#pctHttps)），则此过程还包括TLS协商时间。连接阶段包含三个指标：

- `connectStart` 客户端打开与服务器的连接时标记。
- `secureConnectionStart` 当客户端开始TLS协商时标记。
- `connectEnd` 在连接协商结束时标记（包括TLS时间）。

这些*几乎*和DNS指标一样简单，但是却`secureConnectionStart`改变了一切。您可能会问：“为什么没有`secureConnectionEnd`财产？” 答案是TLS协商与协商同时结束`connectEnd`。如果未使用HTTPS（或[HTTP连接仍然存在](https://en.wikipedia.org/wiki/HTTP_persistent_connection)），则此值为`0`，因此您需要执行适当的检查，而不是假定始终填充该值：

```javascript
// Quantifying total connection time
var pageNav = performance.getEntriesByType("navigation")[0];
var connectionTime = pageNav.connectEnd - pageNav.connectStart;
var tlsTime = 0; // <-- Assume 0 by default

// Did any TLS stuff happen?
if (pageNav.secureConnectionStart > 0) {
  // Awesome! Calculate it!
  tlsTime = pageNav.connectEnd - pageNav.secureConnectionStart;
}
```

查找域的IP并建立连接后，*真正的*乐趣就开始了。

### 要求和回应

当我们考虑影响页面速度的因素时，我们正在考虑两个因素：

- **外在因素：**这是诸如连接延迟和带宽之类的东西。作为开发人员，他们（大部分）是我们无法控制的。
- **内在因素：**这些是我们可以更好地控制的事情，例如服务器和客户端架构以及资源大小。

两种类型的因素都会影响请求和响应速度。与该过程相关的指标可以说是最重要的指标，因为它们讲述了每种资源花费多长时间的故事。导航和资源定时都使用以下度量来描述请求和响应：

- `fetchStart`在浏览器开始获取资源时标记。这与请求不同，因为它不标记浏览器何时对资源发出网络请求，而是标记它何时开始检查缓存（例如HTTP和服务工作者缓存）以查看是否甚至需要网络请求。
- `workerStart`在[事件处理程序](https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent)（如果适用）中从[服务工作者](https://developers.google.cn/web/fundamentals/primers/service-workers)获取请求时进行标记。如果当前页面未安装服务人员，则总是这样。[`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent)`0`
- `requestStart` 当浏览器发出网络请求时。
- `responseStart` 是响应的第一个字节到达时。
- `responseEnd` 是响应的最后一个字节到达的时间。

您可以使用这些指标来衡量加载性能的许多方面。例如，您可以在考虑缓存查找时间的同时测量资源下载时间：

```javascript
// Cache seek plus response time
var pageNav = performance.getEntriesByType("navigation")[0];
var fetchTime = pageNav.responseEnd - pageNav.fetchStart;

// Service worker time plus response time
var workerTime = 0;

if (pageNav.workerStart > 0) {
  workerTime = pageNav.responseEnd - pageNav.workerStart;
}
```

您还可以测量其他有用的东西，如下面的代码所示：

```javascript
// Request time only (excluding unload, redirects, DNS, and connection time)
var requestTime = pageNav.responseStart - pageNav.requestStart;

// Response time only (download)
var responseTime = pageNav.responseEnd - pageNav.responseStart;

// Request + response time
var requestResponseTime = pageNav.responseEnd - pageNav.requestStart;
```

### 其他的东西

现在，我们已经介绍了导航和资源定时提供的最重要的指标，让我们简要地看一下其中一些不太重要的指标。

#### 文件卸载

卸载是指浏览器在加载新页面之前进行一些整理工作。这不是典型的情况下，一个大问题，但它*可能*是值得定量，如果你有一些代码（特别是第三方）在运行的 [`unload`事件处理程序](https://developer.mozilla.org/en-US/docs/Web/Events/unload)，从渲染扬起了下一个页面。如果这描述了您的情况，则需要注意 [`unloadEventStart`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming/unloadEventStart) 和 [`unloadEventEnd`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming/unloadEventEnd) 指标。

**注意：**卸载指标是“导航定时”所独有的。

#### 重新导向

好的，页面重定向并不是*完全*无关紧要的，但是它们可能不是您经常遇到的问题。重定向仍然会增加请求的延迟，因此对它们进行测量可能是值得的。

![在Chrome开发人员工具中可视化的重定向链。](https://developers.google.cn/web/fundamentals/performance/navigation-and-resource-timing/images/figure-3-1x.png)**图3**。Chrome开发人员工具中显示的重定向链。

如果您担心重定向，则两个API都提供 [`redirectStart`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming/redirectStart) 和 [`redirectEnd`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming/redirectEnd) 指标，这使得衡量重定向时间成为一项琐碎的任务。

#### 文件处理

加载HTML文档时，浏览器会花一些时间来处理它们。导航计时自曝指标来衡量这一点，但除非它们通常不是间接*也许*你在提供巨大的文件。如果你有兴趣在文档处理指标，它们是 [`domInteractive`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming/domInteractive)， [`domContentLoadedEventStart`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming/domContentLoadedEventStart)， [`domContentLoadedEventEnd`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming/domContentLoadedEventEnd)，和 [`domComplete`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming/domComplete)。

**注意：**文档处理指标是“导航定时”所独有的。

#### 载入中

文档及其资源完全完成加载后，浏览器将触发一个[`load` 事件](https://developer.mozilla.org/en-US/docs/Web/Events/load)。一些人强调加载时间是度量的最高标准，但是 已经发生了重点[转移，](https://www.stevesouders.com/blog/2013/05/13/moving-beyond-window-onload/)以将感知度量（例如[Speed Index](https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/metrics/speed-index)）优先于加载时间。

不过，测量加载时间可能对您有所帮助。 [`loadEventStart`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming/loadEventStart) 并 [`loadEventEnd`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming/loadEventEnd) 可以在文档方面为您提供帮助，但是使用该`duration`属性可能最简单。

**注意：**和指标是导航计时所独有的。 `loadEventStart``loadEventEnd`

#### 文件和资源大小

文档或资源的*大小*无疑对加载性能有影响。幸运的是，两个API都公开了用于量化资源有效载荷的属性：

- `transferSize`是资源的*总大小*，包括HTTP标头。
- `encodedBodySize`是资源的*压缩大小*，*不包括* HTTP标头。
- `decodedBodySize`是资源的*解压缩大小*（再次，不包括HTTP标头）。

使用简单的算法，很容易找出响应的多少由HTTP标头或什至压缩率组成：

```javascript
// HTTP header size
var pageNav = performance.getEntriesByType("navigation")[0];
var headerSize = pageNav.transferSize - pageNav.encodedBodySize;

// Compression ratio
var compressionRatio = pageNav.decodedBodySize / pageNav.encodedBodySize;
```

您可能已经意识到资源的大小，并且您实际上并不需要API来告诉您这些信息，因为任何浏览器的开发工具中的网络面板都可以传达这些信息。但是，如果需要，信息*就*在那里。

## 在应用程序代码中获取时间

现在您已经知道了这些API提供的一些指标，下面让我们介绍如何在应用程序代码中收集这些数据。

### 其他手动获取时间的方法

在本指南的前面，您已经涉足了`getEntriesByType`，这对于获取特定类型的性能条目非常有用。但是，还有两个其他相关方法值得一提。

#### `getEntriesByName`

[`getEntriesByName`](https://developer.mozilla.org/en-US/docs/Web/API/Performance/getEntriesByName) 通过其名称获得一个表演条目。对于导航和资源计时，这是文档或资源的URL：

```javascript
// Get timing data for an important hero image
var heroImageTime = performance.getEntriesByName("https://somesite.com/images/hero-image.jpg");
```

如果您需要获取单个资源的性能条目，这将*非常*有用。与通过其他方式过滤掉数组相比，这也是一种性能更好的替代方法。

#### getEntries

与`getEntriesByName`和不同`getEntriesByType`，[`getEntries`](https://developer.mozilla.org/en-US/docs/Web/API/Performance/getEntries) 默认情况下， 所有内容都在性能条目缓冲区中获取：

```javascript
// Get timing data for all entries in the performance entry buffer
var allTheTimings = performance.getEntries();
```

如果`initiatorType`您觉得新手，那是因为我在这里没有介绍。 [在MDN ](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming/initiatorType)[了解更多信息`initiatorType`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming/initiatorType)。

### 使用PerformanceObserver收听性能条目

因为像`getEntriesByType`返回数组这样的方法，您可能很想使用循环来处理它们并说“足够好”，但是由于以下原因，这种方法存在问题：

- 循环（尤其是在具有许多条目的数组上）占用了主线程。
- 循环仅捕获运行循环时可用的性能条目。通过计时器定期轮询性能条目缓冲区非常昂贵，并且会与渲染器竞争，这可能会导致垃圾邮件。

[`PerformanceObserver`](https://developers.google.cn/web/updates/2016/06/performance-observer)旨在解决此类烦恼。使用类似于[Mutation](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)或 [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver)的观察者模式 ，您可以分配一个回调，该回调在记录新的性能条目时运行：

```javascript
// Instantiate the performance observer
var perfObserver = new PerformanceObserver(function(list, obj) {
  // Get all the resource entries collected so far
  // (You can also use getEntriesByType/getEntriesByName here)
  var entries = list.getEntries();

  // Iterate over entries
  for (var i = 0; i < entries.length; i++) {
    // Do the work!
  }
});

// Run the observer
perfObserver.observe({
  // Polls for Navigation and Resource Timing entries
  entryTypes: ["navigation", "resource"]
});
```

如果您没有与观察员的经验，这种模式最初可能会感到尴尬，但很快就会成为第二天性。明智的选择： `PerformanceObserver`并非在所有浏览器中都可用，导航和资源定时都可用！实际上，Internet Explorer和Edge都不支持 `PerformanceObserver`，因此请进行功能检查以避免怪异：

```javascript
// Should we even be doing anything with perf APIs?
if ("performance" in window) {
  // OK, yes. Check PerformanceObserver support
  if ("PerformanceObserver" in window) {
    // Observe ALL the performance entries!
  } else {
    // WOMP WOMP. Find another way. Or not.
  }
}
```

使用这样的代码，您可以自己决定如何收集性能计时（如果有的话）。您可能会决定，如果`PerformanceObserver`没有收集时间，则不值得为此烦恼。这完全取决于您！

### 陷阱

使用计时并非总是那么简单。您可能还记得过，我们提出了如何在某些情况下以您期望的方式填充某些时间安排，以及可能存在其他棘手的情况。

#### 跨域和Timing-Allow-Origin标头

收集跨域资源的指标很奇怪，因为如果 未设置[`Timing-Allow-Origin` 标头，](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Timing-Allow-Origin)则并非所有性能计时都可以访问。要了解哪些指标受此影响，请查看“资源时序”规范的[这一部分](https://www.w3.org/TR/resource-timing-2/#cross-origin-resources)。

如果您在多个域上运行应用程序，或者将公共资产作为第三方提供，则应设置适当的`Timing-Allow-Origin`标头，以便开发人员可以捕获托管在它们上的资源的时间安排。查看[MDN文档 `Timing-Allow-Origin`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Timing-Allow-Origin) 以了解更多信息。

#### 持续的连接会影响时序

持久HTTP连接是指重新使用连接以传输其他资源时。使用[`Connection: Keep-Alive` 标头](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Keep-Alive)时，这会在HTTP / 1中发生。通过HTTP / 2提供内容时，将使用单个连接流式传输 该源的*所有*资源。此行为会影响时间。您不必显式地检查它，而稍后使用度量时则需要注意。

#### 这些API并非随处可用

如果在网络上工作可以教给您任何知识，那就是您不能依赖于随处可用的API。导航和资源定时也是如此。像这样的方法最大的优点`getEntriesByType`是，如果有可用的方法，则找不到任何东西也不会抛出错误。

一切都很好，但这可能会引起一些混乱。在Safari的奇怪情况下（从11.2版开始），支持资源定时，但不支持导航定时。这导致如下情况：

```javascript
// This returns stuff!
performance.getEntriesByType("resource");

// Not so much. :\
performance.getEntriesByType("navigation");
```

虽然这很痛苦，但这不是世界末日。使用这些方法获取条目时，只需检查是否返回了任何内容：

```javascript
if (performance.getEntriesByType("navigation").length > 0) {
  // Yay, we have Navigation Timing stuff!
}
```

无论浏览器是否支持这些API，这都是一项明智的选择。您永远不要对可用数据进行假设，因为在某些情况下，假设可能适得其反。

## 给家里打电话

因此，我们现在知道如何使用这些API并从它们中获取数据，但是如何将这些数据获取到可以使用它们的地方？尽管这绝不是RUM数据收集的详尽参考，但它是一个起点。

### 使用 `navigator.sendBeacon`

您已经收集了性能条目，现在可以将它们发送到某个地方以供以后分析了。但是最好的方法是什么？

诸如[`navigator.sendBeacon`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon) （或更近期的[获取`keepalive` 标志](https://www.chromestatus.com/feature/5760375567941632)）之类的API 可以以非阻塞方式发送请求，这对于RUM分析或不需要等待响应的其他类型的请求非常理想。

```javascript
// Caution: If you have a _lot_ of performance entries, don't send _everything_ via getEntries. This is just an example.
let rumData = JSON.stringify(performance.getEntries()));

// Check for sendBeacon support:
if ('sendBeacon' in navigator) {
  // Beacon the requested
  if (navigator.sendBeacon('/analytics', rumData)) {
    // sendBeacon worked! We're good!
  } else {
    // sendBeacon failed! Use XHR or fetch instead
  }
} else {
  // sendBeacon not available! Use XHR or fetch instead
}
```

在另一端将是一些后端代码，这些代码查看POST表单数据并从那里决定如何处理它。如何执行此操作取决于您的应用程序后端。

**注意：**仅在调用时将请求*排队*，而不能立即完成。另外，用户代理对可以发送多少数据施加了限制，并且如果超出该限制，则可以拒绝该请求。 `navigator.sendBeacon`

## 包起来

总结一下，这里有一些自以为是的观点：如果您不确定这些计时的工作方式，请不要在前端计算指标，而将计算的数据发送到后端。存储原始指标，以后再使用。出于多种原因，这是有优势的，但主要是因为它很灵活。如果存储原始指标，则以后总是可以在出现测量错误时进行更正。

最后，您不需要存储这些API提供的*每个*指标。例如，如果你知道一个事实，你不需要来衡量DOM处理时间，不觉得你*有*来存储这些指标。

当然，本指南并不是要成为这些API的详尽资源，而是要帮助您放心使用它们。如果您想要有关此主题的其他观点，请阅读以下其他内容：

- [导航计时2级规格](https://www.w3.org/TR/navigation-timing-2/)
- [资源时序2级规范。](https://www.w3.org/TR/resource-timing-2/)
- [了解资源计时。](https://developers.google.cn/web/tools/chrome-devtools/network-performance/understanding-resource-timing)
- [实践中的资源计时。](https://nicj.net/resourcetiming-in-practice/)
- [使用导航计时API来了解您的网页。](https://community.akamai.com/community/web-performance/blog/2016/08/25/using-navigation-timing-apis-to-understand-your-webpage)

即使您通常避开深入的技术性阅读，对于导航和资源时序的官方规范也很容易理解。他们还以一种非常有益的方式打破了陷阱。如果你问自己“当问题*是* `secureConnectionStart` `0`？”，规格说明一切怪事相当不错。

使用这些API，您将可以更好地了解实际用户如何体验加载性能。这意味着您将有能力更好地诊断和解决野外性能问题，并且该知识真正强大。

*特别感谢[Paul Irish](https://developers.google.cn/web/resources/contributors/paulirish)，Gray Norton，[Addy Osmani](https://developers.google.cn/web/resources/contributors/addyosmani)和[Philip Walton](https://developers.google.cn/web/resources/contributors/philipwalton)的宝贵反馈，这些反馈显着提高了本文的质量。*