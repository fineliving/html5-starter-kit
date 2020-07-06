# 以用户为中心的性能指标

你可能不止一次地听大家讨论性能的话题、一个速度飞快的 web 应用是多么重要。

我的网站快吗？当你试图回答这个问题的时候，你会发现快是个很模糊的概念。我们在说快的时候，我们到底指的哪些方面？是在什么场景下？对谁而言？

谈论性能的时候务必要准确，不要使用错误的概念，以免开发人员一直在错误的事情上做优化——结果没有得到优化反而损害到用户体验。

看一个具体的例子，我们经常会听到有人说：我的 app 测过了，加载时间是 XX 秒。

上述的说法并不是说它是错误的，而是它歪曲了现实。加载时间因用户而异，取决于他们的设备能力和网络环境。将**只关注加载时间单一数据指标会遗漏那些加载时间长的用户**。

实际上，您应用的加载时间是每个用户所有加载时间的汇总，而全面表示加载时间的唯一方法是使用以下直方图所示的分布方法：

![](/advance/performance/perf-metrics-histogram.png)

X 轴上的数字显示加载时间，而 Y 轴上条的高度显示体验到特定时间段中加载时间的用户相对数量。 正如此图表所示，虽然最大的用户群体验到的加载时间不到 1 或 2 秒，但仍有很多用户体验到相当长的加载时间。

之所以说“我网站的加载时间为 X.XX 秒”是谬见的另一个原因是，加载并非单一的时刻，而是一种任何单一指标都无法全面衡量的体验。 在加载过程中，有多个时刻都会影响到用户对速度的感知，如果只关注其中某个时刻，就可能会遗漏其余时间内用户感受到的不良体验。

例如，假定某应用针对快速初始渲染进行优化，以便立刻将内容传递给用户。 然后，如果该应用加载一个需要花费数秒来解析和执行的大型 JavaScript 软件包，那么只有在 JavaScript 运行之后，页面上的内容才可供交互。

如果用户可以看到页面上的链接但无法点击，或者可以看到文本框但无法在其中输入内容，他们可能就不会关心页面渲染的速度有多快。

因此，**我们不应该只使用一个指标来衡量加载，而应该衡量整个体验过程中可能影响用户对加载的感知的每个时刻**。

性能谬见的另一个示例是性能只是加载时间的问题。

作为一个团队，我们对曾经犯过这个错感到内疚，而大部分性能工具仅衡量加载性能也会将这个错误放大。

但事实是，随时都有可能发生性能不佳的情况，不只限于加载期间。 应用无法迅速响应点按或点击操作，以及无法平滑滚动或产生动画效果的问题与加载缓慢一样，都会导致糟糕的用户体验。 用户关心的是总体体验，我们开发者也应如此。

所有这些性能误解有一个共同的主题，即开发者都将注意力集中在对于用户体验帮助不大甚至全无帮助的事情上。 同样地，[加载](https://developer.mozilla.org/en-US/docs/Web/Events/load)时间或 [DOMContentLoaded](https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded) 时间等传统性能指标极不可靠，因为加载发生的时间可能与用户认为的应用加载时间对应，也可能不对应。

因此，为确保不重复这个错误，我们必须回答下列问题：

**1.哪些指标能够最准确地衡量人所感受到的性能？**

**2.如何针对实际用户来衡量这些指标？**

**3.如何解读衡量结果以确定应用是否“速度快”？**

**4.了解应用的实际用户性能之后，如何避免性能下降并在未来提高性能？**

## 以用户为中心的性能指标

当用户导航到网页时，通常会寻找视觉反馈，以确信一切符合预期。

|   是否发生？   | 导航是否成功启动？服务器是否有响应？       |
| :------------: | ------------------------------------------ |
|   是否有用？   | 是否已渲染可以与用户互动的足够内容？       |
|   是否可用？   | 用户可以与页面交互，还是页面仍在忙于加载？ |
| 是否令人愉快？ | 交互是否顺畅而自然，没有滞后和卡顿？       |

为了解页面何时为用户提供这样的反馈，我们定义了多个新指标：

### 首次绘制与首次内容绘制

[Paint Timing](https://github.com/WICG/paint-timing) API 定义两个指标：首次绘制 (FP) 和 首次内容绘制 (FCP)。 这些指标用于标记导航之后浏览器在屏幕上渲染像素的时间点。 这对于用户来说十分重要，因为它回答了以下问题： 是否发生？

这两个指标之间的主要差别在于，FP 标记浏览器渲染任何在视觉上不同于导航前屏幕内容之内容的时间点。 相比而言，FCP 标记的是浏览器渲染来自 DOM 第一位内容的时间点，该内容可能是文本、图像、SVG 甚至 `<canvas>` 元素。

### 首次有效绘制和主角元素计时

首次有效绘制 (FMP) 指标能够回答“是否有用？”这一问题。 虽然“有用”这一概念很难以通用于所有网页的方式规范化（因此尚不存在任何规范），但是网页开发者自己很清楚其页面的哪些部分对用户最为有用。

![](/advance/performance/perf-metrics-hero-elements.png)

网页的这些“最重要部分”通常称为主角元素。 例如，在 YouTube 观看页面上，主视频就是主角元素。 在 Twitter 上，主角元素可能是通知标志和第一篇推文。 在天气应用上，主角元素是指定地点的天气预测。 在新闻网站上，主角元素可能是重大新闻和置顶大图。

在网页上，几乎总有一部分内容比其他部分更重要。 如果页面最重要的部分能迅速加载，用户可能不会注意到其余部分是否加载。

### 长任务

浏览器通过向主线程上的队列添加任务并逐一执行来响应用户输入。这也是浏览器执行 JavaScript 的地方，所以在这个意义上说浏览器是单线程的。

在某些情况下，这些任务可能需要很长时间才能运行完，这样的话主线程将被阻塞，并且队列中的所有其他任务都必须等待。

![](/advance/performance/perf-metrics-long-tasks.png)

对用户而言这表现为卡顿不流畅，这也是当前页面性能差的主要原因。

[Long Tasks API](https://w3c.github.io/longtasks/) 能识别任何长于 50 毫秒的任务，它认为这存在性能隐患。通过长任务 API，开发者能获取到页面中存在的长任务。 选择 50 毫秒的时间是为了让应用满足在 100 毫秒内响应用户输入的 [RAIL 指导原则](https://developers.google.cn/web/fundamentals/performance/rail?hl=zh-cn)。

### 可交互时间

可交互时间（TTI）意味着页面渲染完成并且可以正常响应用户的输入了，可能有以下几个原因导致页面不能响应用户输入：

- 确保页面可交互的 js 没有下载完成
- 存在长任务（上节所述）

TTI 表示页面的初始 JavaScript 加载完成且主线程空闲（没有长任务）的点。

### 将指标关联到用户体验

回到我们以前认为对用户体验最重要的问题，本表概述了我们刚刚列出的每个指标如何映射到我们希望优化的用户体验：

| 体验        | 指标                                  |
| ----------- | ------------------------------------- |
| 发生了吗？  | 首次绘制(FP) / 首次内容绘制 (FCP)     |
| 内容重要吗? | 首次有用绘制 (FMP) / 关键元素渲染时间 |
| 可以使用吗? | 可交互时间(TTI)                       |
| 体验好吗？  | 长任务                                |

页面加载时间线的截图可以帮助你更好地确认这些指标处于加载过程的什么位置。

![](/advance/performance/perf-metrics-load-timeline.png)

下一节将详细介绍如何在真实用户的设备上测量这些指标。

## 在真实用户的设备上衡量这些指标

我们历来为`load`和`DOMContentLoaded`等指标进行优化的主要原因之一是，它们作为浏览器中的事件，易于在真实用户上进行测量。

相比之下，很多其他指标历来很难测量。例如，我们经常看到开发人员用这段折中的代码来测量长任务：

```js
;(function detectLongFrame() {
  var lastFrameTime = Date.now()
  requestAnimationFrame(function() {
    var currentFrameTime = Date.now()

    if (currentFrameTime - lastFrameTime > 50) {
      // Report long frame here...
    }

    detectLongFrame(currentFrameTime)
  })
})()
```

此代码使用`requestAnimationFrame`循环记录每次迭代的时间。如果当前时间比前一次超过 50 毫秒，则认为这是长任务。 虽然这些代码起作用，但它有很多缺点：

- 增加了每一帧的开销。
- 阻止空闲时间块的出现。
- 影响电池寿命。 性能检测代码最重要的原则是不能使性能变得更差。

[Lighthouse](https://developers.google.cn/web/tools/lighthouse?hl=zh-cn) 和 [Web Page Test](https://www.webpagetest.org/) 虽然提供这些新的性能指标已经有一段时间了（他们是项目发布前进行性能测试的绝佳工具），但是毕竟他们不是运行在用户设备上，还是没办法衡量 web 项目在用户设备上的实际性能表现。

幸运的是，浏览器提供了一些新 API，这些新 API 使得统计真实用户设备的性能指标变得很简单，不需要再使用一些影响页面性能的变通方法。

这些新增的 API 是 [`PerformanceObserver`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver)、[`PerformanceEntry`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceEntry) 和 [`DOMHighResTimeStamp`](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp)。接下来我们通过一个例子，来了解一下怎么通过 PerformanceObserver 来统计绘制相关的性能（例如，FP，FCP）以及可能出现的导致页面阻塞的 js 长任务。

```js
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    // `entry` is a PerformanceEntry instance.
    console.log(entry.entryType)
    console.log(entry.startTime) // DOMHighResTimeStamp
    console.log(entry.duration) // DOMHighResTimeStamp
  }
})

// Start observing the entry types you care about.
observer.observe({ entryTypes: ['resource', 'paint'] })
```

通过`PerformanceObserver`我们可以订阅性能事件，当事件发生的时候得到相应的数据。相比老的 [PerformanceTiming](https://www.w3.org/TR/navigation-timing/#sec-navigation-timing-interface)接口，它的好处是以异步的方式获取数据，而不是通过不断的轮询。

### 统计 FP / FCP

获取到某个性能数据后，可以将该用户的设备的性能数据发送到任意的数据分析服务。比如我们将首次绘制的指标发送到谷歌统计。

```html
<head>
  <!-- Add the async Google Analytics snippet first. -->
  <script>
    window.ga =
      window.ga ||
      function() {
        ;(ga.q = ga.q || []).push(arguments)
      }
    ga.l = +new Date()
    ga('create', 'UA-XXXXX-Y', 'auto')
    ga('send', 'pageview')
  </script>
  <script async src="https://www.google-analytics.com/analytics.js"></script>

  <!-- Register the PerformanceObserver to track paint timing. -->
  <script>
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // `name` will be either 'first-paint' or 'first-contentful-paint'.
        const metricName = entry.name
        const time = Math.round(entry.startTime + entry.duration)

        ga('send', 'event', {
          eventCategory: 'Performance Metrics',
          eventAction: metricName,
          eventValue: time,
          nonInteraction: true,
        })
      }
    })
    observer.observe({ entryTypes: ['paint'] })
  </script>

  <!-- Include any stylesheets after creating the PerformanceObserver. -->
  <link rel="stylesheet" href="..." />
</head>
```

### 基于关键关键元素统计 FMP

我们还没有 FMP 的标准化定义（因此也没有对应的性能类型）。这部分是因为很难有一个通用的指标来表示所有页面是“有意义的”。

但是，在单页面应用的场景下，我们可以用关键元素的显示的时间点来表示 FMP。

Steve Souders 撰写了一篇精彩的文章，名为[用户计时与自定义指标](https://speedcurve.com/blog/user-timing-and-custom-metrics/)，其中详细说明使用浏览器性能 API 来确定代码中各类媒体呈现时间的技术。

### 统计 TTI

从长远来看，我们希望通过`PerformanceObserver`在浏览器中对 TTI 指标提供标准化的支持。 与此同时，我们开发了一种可用于检测`TTI`的 polyfill，并可在任何支持 [Long Tasks API](https://w3c.github.io/longtasks/) 的浏览器中工作。

这个 polyfill 暴露了一个`getFirstConsistentlyInteractive（）`方法，该方法返回一个以 TTI 值解析的`promise`对象。 你可以使用 Google Analytics 统计 TTI，如下所示：

```js
import ttiPolyfill from './path/to/tti-polyfill.js'

ttiPolyfill.getFirstConsistentlyInteractive().then((tti) => {
  ga('send', 'event', {
    eventCategory: 'Performance Metrics',
    eventAction: 'TTI',
    eventValue: tti,
    nonInteraction: true,
  })
})
```

`getFirstConsistentlyInteractive（）`方法接受一个可选的`startTime`配置选项，用以指定一个时间表示 web 应用在此时间以前不能进行交互。默认情况下，polyfill 使用`DOMContentLoaded`作为开始时间，但使用类似于关键元素可见的时刻或当获知已添加所有事件侦听器时的时刻，通常会更准确。

完整的安装和使用说明，请参阅 [TTI polyfill 文档](https://github.com/GoogleChrome/tti-polyfill)。

### 统计长任务

我前面提到长任务会导致一些负面的用户体验（例如，缓慢的事件处理函数，丢帧）。我们最好留意一下长任务发生的频率，以将其影响最小化。

要在 JavaScript 中检测长任务，请创建一个`PerformanceObserver`对象并观察 `longtask`类型。耗时较长的任务条目的一个有点是包含[提供方属性](https://w3c.github.io/longtasks/#sec-TaskAttributionTiming)，因此可以更轻松地追踪哪些代码导致了长任务：

```js
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    ga('send', 'event', {
      eventCategory: 'Performance Metrics',
      eventAction: 'longtask',
      eventValue: Math.round(entry.startTime + entry.duration),
      eventLabel: JSON.stringify(entry.attribution),
    })
  }
})

observer.observe({ entryTypes: ['longtask'] })
```

`attribution`属性会告诉你什么代码导致了长任务，这有助于确定第三方`iframe`脚本是否导致问题。该规范未来版本正计划添加更多粒度，并提供脚本 URL，行和列号，这对确定自己的脚本是否导致缓慢很有帮助。

## 统计输入延迟

阻塞主线程的长任务会阻止您的事件侦听器及时执行。 [RAIL 性能模型](https://developers.google.cn/web/fundamentals/performance/rail?hl=zh-cn)告诉我们，为了使用户界面感觉平滑，应该在用户输入的 100 毫秒内做出响应，否则，应该分析是什么原因。

要检测代码中的输入延迟，可以将事件的时间戳与当前时间进行比较，如果差异大于 100 毫秒，则可以（也应该）上报异常。

```js
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

由于事件延迟通常是长任务的结果，因此你可以将事件延迟检测逻辑与长任务检测逻辑相结合：如果长任务与`event.timeStamp`同时阻塞主线程，则也可以上报该长任务 `attribution`值。 这可以确定导致性能体验差的的代码是什么。

虽然这种技术并不完美（它在冒泡阶段不处理长事件监听器，并且它不适用于不在主线程上运行的滚动或合成动画），但却是更好地理解长时间运行的 JavaScript 代码会影响用户体验的第一步。

## 数据解释

一旦开始收集真实用户的性能指标，你需要将这些数据付诸实践。真实用户性能数据之所以重要主要是由于以下几个原因：

- 验证你的应用是否按预期执行。
- 找出性能差对转化率的影响（无论转化率对你的应用而言意味着什么）。
- 寻求改善用户体验的措施。 你的应用在移动设备和桌面设备上的表现绝对是值得比较的一件事。下图显示了桌面（蓝色）和移动（橙色）的 TTI 分布。从这个例子可以看出，手机上的 TTI 值比桌面上的要长很多：

![](/advance/performance/perf-metrics-tti-mobile-v-desktop.png)

虽然这里的数据是特定于应用的（你应该自己测试一下自己应用的数据），下面的例子是一个基于性能指标生成的分析报告：

桌面端

| Percentile | TTI (seconds) |
| ---------- | ------------- |
| 50%        | 2.3           |
| 75%        | 4.7           |
| 90%        | 8.3           |

移动端

| Percentile | TTI (seconds) |
| ---------- | ------------- |
| 50%        | 3.9           |
| 75%        | 8.0           |
| 90%        | 12.6          |

通过将数据分解成移动和桌面，并将各个终端的数据采用分布图展示，可以快速洞察真实用户的体验。 例如，看上面的表格，可以很容易看到对于这个应用，10％的移动用户花费了超过 12 秒的时间来交互！

### 性能如何影响业务

### 加载过程用户跳出

我们知道，如果页面加载时间过长，用户通常会离开。这意味着我们所有的性能指标都存在[幸存者偏差](https://en.wikipedia.org/wiki/Survivorship_bias)的问题，其中的数据并不包括那些没有等待页面完成加载的用户的指标。

虽然不能获取这些用户滞留的数据，但可以获取这种情况发生的频率以及每个用户停留的时间。

这对于使用`Google Analytics`来说有点棘手，因为`analytics.js`库通常是异步加载的，并且在用户决定离开时可能不可用。 不过，在向`Google Analytics`发送数据之前，您无需等待`analytics.js`加载。 您可以通过[Measurement Protocol](https://developers.google.cn/analytics/devguides/collection/protocol/v1?hl=zh-cn) 直接发送它。

此代码监听一个 [`visibilitychange`](https://developer.mozilla.org/en-US/docs/Web/Events/visibilitychange) 事件（如果当前页面进入后台运行或者页面关闭触发该事件），当事件触发时发送`performance.now()`的值。

```html
<script>
  window.__trackAbandons = () => {
    // Remove the listener so it only runs once.
    document.removeEventListener('visibilitychange', window.__trackAbandons)
    const ANALYTICS_URL = 'https://www.google-analytics.com/collect'
    const GA_COOKIE = document.cookie.replace(/(?:(?:^|.*;)\s*_ga\s*\=\s*(?:\w+\.\d\.)([^;]*).*$)|^.*$/, '$1')
    const TRACKING_ID = 'UA-XXXXX-Y'
    const CLIENT_ID = GA_COOKIE || Math.random() * Math.pow(2, 52)

    // Send the data to Google Analytics via the Measurement Protocol.
    navigator.sendBeacon &&
      navigator.sendBeacon(
        ANALYTICS_URL,
        [
          'v=1',
          't=event',
          'ec=Load',
          'ea=abandon',
          'ni=1',
          'dl=' + encodeURIComponent(location.href),
          'dt=' + encodeURIComponent(document.title),
          'tid=' + TRACKING_ID,
          'cid=' + CLIENT_ID,
          'ev=' + Math.round(performance.now()),
        ].join('&')
      )
  }
  document.addEventListener('visibilitychange', window.__trackAbandons)
</script>
```

要使用此代码，请将其复制到文档的 `<head>` 中，并将 `UA-XXXXX-Y` 占位符替换为您的[跟踪 ID](https://support.google.com/analytics/answer/1008080)。

你还需要确保在页面变为可交互时删除此监听器，否则你上报 TTI 的时候会误将放弃加载等待业上报。

```js
document.removeEventListener('visibilitychange', window.__trackAbandons)
```

## 性能优化和防性能退化

定义以用户为中心的指标的好处是，当针对它们进行优化时，必然会促进用户体验的提升。

提高性能的最简单方法之一就是只向客户端发送较少的`JavaScript`代码，但在不能减少代码大小的情况下，关键是要考虑如何交付`JavaScript`。

### 优化 FP/FCP

从文档的 `<head>` 中移除任何阻塞渲染的脚本或样式表，可以减少首次绘制和首次内容绘制前的等待时间。

花时间确定向用户指出“正在发生”所需的最小样式集，并将其内联到 `<head>` 中(或者使用 [HTTP/2 服务器推送](https://developers.google.cn/web/fundamentals/performance/http2?hl=zh-cn#server_push))，即可实现极短的首次绘制时间。

[应用 shell 模式](https://developers.google.cn/web/updates/2015/11/app-shell?hl=zh-cn)可以很好地说明如何针对[渐进式网页应用](https://developers.google.cn/web/progressive-web-apps?hl=zh-cn)实现这一点。

### 优化 FMP/TTI

一旦确定了页面上最关键的 UI 元素，你应该确保加载的初始脚本仅包含使这些元素正常渲染和交互的代码。

任何与关键元素无关的代码包含在初始 js 模块中都会拖慢可交互时间。我们没有理由强制用户下载和解析暂时不需要的 js 代码。

通用的做法是，你应该尽可能的压缩 FMP 和 TTI 之间的时间间隔。如果不能压缩的话，清楚地提示用户当前用户还不能交互是很必要的。

最让用户烦躁的体验就是点击一个元素，然而什么也没发生。

### 防止长任务

js 代码分割，优化 js 的加载顺序，不仅可以让页面可交互时间变快，还能减少长任务，减少由于长任务导致的输入延迟和慢帧。

除了将代码拆分为单独的文件之外，还可以将同步的大代码块拆分为异步执行的小代码块，或者推迟到下一个空闲点。通过以较小代码块的方式异步执行该逻辑，你可以在主线程上留出空间，让浏览器响应用户输入。

最后，应该确保引用的第三方代码进行了长任务相关的测试。导致大量长任务的第三方广告或者统计脚本最终会损害你的业务。

## 防止性能退化

本文主要关注真实用户的性能测量，虽然真实用户数据是最终关注的性能数据，但测试环境数据对于确保您的应用在发布新功能之前表现良好（并且不会退化）至关重要。测试阶段对于退化检测非常理想，因为它们在受控环境下运行，并且不易受真实用户环境的随机变异性影响。

像[Lighthouse](https://developers.google.cn/web/tools/lighthouse?hl=zh-cn) 和 [Web Page Test](https://www.webpagetest.org/) 等工具可以集成到持续集成服务器中，并且如果关键指标退化或下降到特定阈值以下，可以让构建失败。

对于已经发布的代码，可以添加[自定义提醒](https://support.google.com/analytics/answer/1033021?hl=zh-cn)，当性能指标变差时及时通知你。例如，如果第三方发布了新代码，并且你的用户突然出现了很多的长任务，会警报通知你。

要成功防止性能退化，你需要在每个新功能版本中，都进行测试和真实用户环境下的性能测试。

![](/advance/performance/perf-metrics-test-cycle.png)

## 总结和展望

去年，我们在浏览器上向开发人员开放以用户为中心的指标方面取得了重大进展，但还没有完成，并且还有更多已规划的事情要做。

我们非常希望将可交互时间和关键元素显示时间统计标准化，因此开发人员无需自己计算这些内容，也不需要依赖 polyfills 去实现。我们还希望让开发人员更容易定位导致丢帧和输入延迟的长任务和具体的代码位置。

虽然我们有更多的工作要做，但我们对取得的进展感到兴奋。有了像`PerformanceObserver`这样的新 API 以及浏览器本身支持的长任务，开发人员可以使用 js 原生的 API 来测量真实用户的性能而不会降低用户体验。

最重要的指标是那些代表真实用户体验的指标，我们希望开发人员尽可能轻松地使用户满意并创建出色的应用程序。
