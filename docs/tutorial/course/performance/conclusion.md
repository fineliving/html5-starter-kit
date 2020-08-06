# 结论

加起来：

- **削减不必要的字节。**压缩所有内容，剥离未使用的代码，添加依赖项时要明智
- **按路线拆分代码。**现在只加载真正必要的内容，然后再延迟加载其他内容
- **缓存代码。**应用程序的某些部分更新的频率低于其他部分。将这些部分分成文件，以便仅在必要时重新下载
- **跟踪大小。**使用诸如 [webpack-dashboard](https://github.com/FormidableLabs/webpack-dashboard/)和 [webpack-bundle-analyzer之类的工具](https://github.com/webpack-contrib/webpack-bundle-analyzer) 来了解您的应用程序的大小。每隔几个月查看一下您应用的整体性能

Webpack并不是唯一可以帮助您加快应用程序速度的工具。考虑使您的应用程序[成为渐进式Web应用程序](https://developers.google.cn/web/progressive-web-apps)，以获得更好的体验，并使用自动配置工具（例如[Lighthouse）](https://developers.google.cn/web/tools/lighthouse)获得改进建议。

不要忘记阅读[webpack文档](https://webpack.js.org/guides/) -它们还有许多其他有用的信息。

并确保[使用培训应用程序](https://github.com/GoogleChromeLabs/webpack-training-project)！

