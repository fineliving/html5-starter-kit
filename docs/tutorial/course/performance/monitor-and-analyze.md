# 监控和分析应用

即使将webpack配置为使应用程序尽可能小，跟踪并了解其包含的内容仍然很重要。否则，您可以安装一个依赖项，使该应用程序的大小增加一倍–甚至不会注意到它！

本节介绍可帮助您了解捆绑软件的工具。

## 跟踪捆绑包的大小

要监视您的应用程序大小，请在开发过程中使用 [webpack-dashboard](https://github.com/FormidableLabs/webpack-dashboard/)并 在CI上[捆绑](https://github.com/siddharthkp/bundlesize)使用。

### webpack仪表板

[webpack-dashboard](https://github.com/FormidableLabs/webpack-dashboard/)通过依赖项，进度和其他详细信息的大小增强了webpack的输出。外观如下：

![webpack-dashboard输出的屏幕截图](https://developers.google.cn/web/fundamentals/performance/webpack/webpack-dashboard.png)

此仪表板有助于跟踪较大的依赖关系-如果添加一个依赖关系，则将立即在“ *模块”*部分中看到它！

要启用它，请安装`webpack-dashboard`软件包：

```
npm install webpack-dashboard --save-dev
```

并将插件添加到`plugins`配置部分：

```
// webpack.config.js
const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = {
  plugins: [
    new DashboardPlugin(),
  ],
};
```

或使用（`compiler.apply()`如果您使用的是基于Express的开发服务器）：

```
compiler.apply(new DashboardPlugin());
```

随意使用仪表板查找可能需要改进的地方！例如，在“ *模块”*部分中滚动查找哪些库太大，可以用较小的替代库替换。

### 捆束大小

[bundlesize](https://github.com/siddharthkp/bundlesize)验证webpack资产是否不超过指定的大小。将其与CI集成，以在应用变得太大时得到通知：

![屏幕快照，是GitHub上pull请求的CI部分。 在CI工具中，有Bundlesize输出](https://developers.google.cn/web/fundamentals/performance/webpack/bundlesize.jpg)

要配置它：

**找出最大尺寸**

1. 优化应用以使其尽可能小。运行生产版本。

2. 将本

   ```
   bundlesize
   ```

   节添加

   ```
   package.json
   ```

   以下内容：

   ```
   // package.json { “ bundlesize ”：[ { “ path ”：“ ./ dist / *”     }   ] }
    
      
        
          
   ```

3. 

   ```
   bundlesize
   ```

   用

   npx

   执行：

   ```
   npx bundlesize
   ```

   这将打印每个文件的压缩大小：

   ```
   PASS ./ DIST / icon256 。6168aaac8461862eab7a 。png ：10.89KB  
   PASS ./ dist / icon512 。c3e073a4100bd0c28a86 。PNG ：13.1KB  
   PASS ./ DIST / 主。0c8b617dfc40c2827ae3.js ：16.28KB  
   PASS ./ DIST / 供应商。ff9f7ea865 31.49KB
   ```

4. 将每种尺寸加10-20％，即可获得最大尺寸。这10％到20％的利润将让您照常开发应用程序，同时在尺寸太大时警告您。

**启用 `bundlesize`**

1. 将`bundlesize`软件包安装为开发依赖项：

2. ```
   NPM安装bundlesize - 保存- 开发
   ```

3. 在中的

   ```
   bundlesize
   ```

   部分中

   ```
   package.json
   ```

   ，指定具体的最大尺寸。对于某些文件（例如图像），您可能需要指定每种文件类型的最大大小，而不是每个文件：

   ```
   // package.json { “ bundlesize” ：[ { “ path” ：“ ./dist/*.png” ，“ maxSize” ：“ 16 kB” ，}，{ “ path” ：“ ./dist/main.* .js“ ，” maxSize“ ：” 20 kB“ ，}，{ ” path“ ：” ./dist/vendor.*.js“ ，” maxSize“ ：” 35 kB“ ，} ] }
   
      
       
          
          
       
       
          
          
       
       
          
          
       
     
   ```

4. 添加一个npm脚本来运行检查：

   ```
   // package.json { “ scripts” ：{ “ check-size” ：“ bundlesize” } }
   
      
        
     
   ```

5. 配置CI以`npm run check-size`在每次推送时执行。（如果要在其上开发项目，请[ 与GitHub ](https://github.com/siddharthkp/bundlesize#2-build-status)[集成`bundlesize`](https://github.com/siddharthkp/bundlesize#2-build-status)。）

而已！现在，如果您运行`npm run check-size`或推送代码，您将看到输出文件是否足够小：

![bundlesize输出的屏幕截图。 所有构建结果均标有“通过”](https://developers.google.cn/web/fundamentals/performance/webpack/bundlesize-output-success.png)

或者，如果发生故障：

![bundlesize输出的屏幕截图。 一些构建结果标记为“失败”](https://developers.google.cn/web/fundamentals/performance/webpack/bundlesize-output-failure.png)

### 进一步阅读

- Alex Russell [关于我们应该针对的实际加载时间](https://infrequently.org/2017/10/can-you-afford-it-real-world-web-performance-budgets/)

## 分析捆绑包为何如此之大

您可能想更深入地了解捆绑软件，以了解其中包含哪些模块。认识 [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)：

<video src="https://developers.google.cn/web/fundamentals/performance/webpack/webpack-bundle-analyzer.mp4" alt="webpack捆绑分析器页面的屏幕录像" autoplay="" controls="" loop="" style="box-sizing: inherit; border: 0px; height: auto; max-width: 100%;"></video>

（截屏来自[github.com/webpack-contrib/webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)）

webpack-bundle-analyzer扫描捆绑软件并对其内部内容进行可视化。使用此可视化来查找较大或不必要的依赖项。

要使用分析仪，请安装`webpack-bundle-analyzer`软件包：

```
npm install webpack-bundle-analyzer --save-dev
```

将插件添加到webpack配置中：

```
// webpack.config.js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin(),
  ],
};
```

并运行生产版本。该插件将在浏览器中打开统计信息页面。

默认情况下，“统计信息”页面显示已分析文件（即，文件包中显示的文件）的大小。您可能需要比较gzip的大小，因为这更接近实际用户的体验。使用左侧的侧边栏切换尺寸。

**注意：**如果使用 [ModuleConcatenationPlugin](https://webpack.js.org/plugins/module-concatenation-plugin/)，它可能会合并webpack-bundle-analyzer输出中的部分模块，从而使报告不太详细。如果您使用此插件，请在分析过程中将其禁用。

在报告中查找的内容如下：

- **大的依赖关系。**为什么这么大？是否有较小的替代方案（例如，Preact代替React）？您是否使用了它包含的所有代码（例如，Moment.js包含很多[经常不使用并且可能会被删除](https://github.com/GoogleChromeLabs/webpack-libs-optimizations#moment)的语言环境 ）？
- **重复的依赖项。**您看到同一个库在多个文件中重复吗？（例如，使用`optimization.splitChunks.chunks`– webpack 4中的选项–或`CommonsChunkPlugin`–webpack 3中的选项- 将其移动到一个公共文件中。）该捆绑包是否具有同一库的多个版本？
- **类似的依赖关系。**是否有类似的库可以完成大约相同的工作？（例如 `moment`和`date-fns`，或`lodash`和`lodash-es`。）尝试使用单个工具粘贴。

另外，请查看Sean Larkin [对webpack捆绑软件](https://medium.com/webpack/webpack-bits-getting-the-most-out-of-the-commonschunkplugin-ab389e5f318)的[出色分析](https://medium.com/webpack/webpack-bits-getting-the-most-out-of-the-commonschunkplugin-ab389e5f318)。

## 加起来

- 使用`webpack-dashboard`并`bundlesize`随时了解您的应用程序的大小
- 挖掘一下如何建立规模 `webpack-bundle-analyzer`