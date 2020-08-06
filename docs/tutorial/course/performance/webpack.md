# 介绍

现代的Web应用程序经常使用**捆绑工具**来创建文件（脚本，样式表等）的生产“捆绑包”，该**捆绑**包 [经过优化](https://developers.google.cn/web/fundamentals/performance/optimizing-content-efficiency/javascript-startup-optimization)， [最小化](https://developers.google.cn/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer) ，用户可以在较短的时间内下载。在**使用webpack进行Web性能优化中**，我们将**逐步**介绍如何使用[webpack](https://webpack.js.org/)有效地优化站点资源。这可以帮助用户更快地加载您的网站并与您的网站进行交互。

![webpack徽标](https://developers.google.cn/web/fundamentals/performance/webpack/webpack-logo.png)

webpack是当今使用的最受欢迎的捆绑工具之一。利用其功能优化现代代码， [将](https://developers.google.cn/web/fundamentals/performance/webpack/use-long-term-caching#lazy-loading) 脚本分为关键和非关键部分，并剥离未使用的代码（仅举几例优化），可以确保您的应用具有最小的网络和处理成本。

![在应用JavaScript优化之前和之后。 缩短了互动时间](https://developers.google.cn/web/fundamentals/performance/webpack/code-splitting.png) 

灵感来自[ 捆绑伙伴中](http://www.susielu.com/data-viz/bundle-buddy)的[代码拆分，](http://www.susielu.com/data-viz/bundle-buddy)作者：Susie Lu

**注意：**我们创建了一个训练应用程序，以实现本文所述的优化功能。尝试从中获得最大收益以练习提示： [`webpack-training-project`](https://github.com/GoogleChromeLabs/webpack-training-project)

让我们开始研究如何优化现代应用程序中最昂贵的资源之一-JavaScript。

- [减小前端大小](https://developers.google.cn/web/fundamentals/performance/webpack/decrease-frontend-size)
- [利用长期缓存](https://developers.google.cn/web/fundamentals/performance/webpack/use-long-term-caching)
- [监控和分析应用](https://developers.google.cn/web/fundamentals/performance/webpack/monitor-and-analyze)
- [结论](https://developers.google.cn/web/fundamentals/performance/webpack/conclusion)