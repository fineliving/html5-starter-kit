# 利用长期缓存

改善应用程序加载时间的下一件事（[优化应用程序大小之后](https://developers.google.cn/web/fundamentals/performance/webpack/decrease-frontend-size)）是缓存。使用它可以将部分应用程序保留在客户端上，并避免每次都重新下载它们。

## 使用捆绑软件版本控制和缓存头

进行缓存的常见方法是：

1. 告诉浏览器将文件缓存很长时间（例如一年）：

   ```
   ＃服务器头缓存- 控制：最大值- 年龄= 31536000
   ```

   注意：如果您不熟悉`Cache-Control`的功能，请参阅Jake Archibald 

   关于缓存最佳实践

   的出色文章。

2. 并在更改文件后重命名该文件以强制重新下载：

   ```
   <！-更改之前->
   <script src = “ 。/ index-v15 。js ” > </ script>   
   
   <！-更改后->
   <script src = “ 。/ index-v16 。js ” > </ script>   
   ```

这种方法告诉浏览器下载JS文件，对其进行缓存并使用缓存的副本。仅当文件名更改（或一年过去）时，浏览器才可以访问网络。

使用webpack，您可以执行相同的操作，但是可以指定文件哈希值，而不是版本号。要将哈希值包含到文件名中，请使用 [`[chunkhash\]`](https://webpack.js.org/configuration/output/#output-filename)：

```
// webpack.config.js
模块。出口= { 
  压缩：“ ./ index 。js ”， 
  输出：{
    档名：'bundle。[chunkhash] .js' ，
        //→bundle.8e0d62a03.js
  }，
};
```

**注意：**即使捆绑包保持不变，Webpack也会生成不同的哈希值-例如，即使您重命名文件或在其他操作系统下编译捆绑包。这是一个错误，目前尚无明确的解决方案。[查看GitHub上的讨论](https://github.com/webpack/webpack/issues/1479)

如果需要文件名将其发送到客户端，请使用`HtmlWebpackPlugin`或 `WebpackManifestPlugin`。

这[`HtmlWebpackPlugin`](https://github.com/jantimon/html-webpack-plugin)是一种简单但不太灵活的方法。在编译期间，此插件会生成一个HTML文件，其中包含所有已编译的资源。如果您的服务器逻辑并不复杂，那么对您来说应该足够了：

```
<!-- index.html -->
<!doctype html>
<!-- ... -->
<script src="bundle.8e0d62a03.js"></script>
```

这 [`WebpackManifestPlugin`](https://github.com/danethurber/webpack-manifest-plugin) 是一种更灵活的方法，如果您拥有复杂的服务器部件，则很有用。在构建期间，它将生成一个JSON文件，该文件具有无哈希文件名和具有哈希值的文件名之间的映射。在服务器上使用此JSON找出要使用的文件：

```
// manifest.json
{
  "bundle.js": "bundle.8e0d62a03.js"
}
```

### 进一步阅读

- 杰克·阿奇博尔德（Jake Archibald）[关于缓存最佳做法](https://jakearchibald.com/2016/caching-best-practices/)

## 将依赖项和运行时提取到单独的文件中

### 依存关系

应用程序依存关系的更改频率往往少于实际应用程序代码。如果将它们移动到单独的文件中，则浏览器将能够分别缓存它们-并且不会在应用程序代码每次更改时重新下载它们。

**关键术语：**在webpack术语中，带有应用程序代码的单独文件称为 *chunks*。我们稍后将使用该名称。

要将依赖项提取到单独的块中，请执行三个步骤：

1. 将输出文件名替换为

   ```
   [name].[chunkname].js
   ```

   ：

   ```
   // webpack.config.js
   模块。出口= { 
     输出：{ 
       //之前
       filename ：'bundle。[chunkhash] .js' ， 
       //之后
       filename ：'[name]。[chunkhash] .js' ， 
     }，
   };
   ```

   当webpack生成应用程序时，它将替换

   `[name]`

    为一个块的名称。如果我们不添加

   ```
   [name]
   ```

   零件，则必须通过散列对其进行区分，这非常困难！

2. 将

   ```
   entry
   ```

   字段转换为对象：

   ```
   // webpack.config.js
   模块。出口= { 
     //之前
     压缩：“ ./ index 。js ”， 
     //之后
     压缩：{
       main ：'./index.js' ，
     }，
   };
   ```

   在此代码段中，“ main”是块的名称。该名称将代替`[name]`步骤1中的名称。

   到目前为止，如果您构建应用程序，则该块将包含整个应用程序代码–就像我们尚未完成这些步骤一样。但这将在几秒钟内改变。

3. **在webpack 4中，**将该`optimization.splitChunks.chunks: 'all'`选项添加到您的webpack配置中：

   ```
   // webpack.config.js（适用于webpack 4）
   模块。出口= { 
     优化：{
       splitChunks ：{
         块：“全部”，
       }
     }，
   };
   ```

   此选项启用智能代码拆分。有了它，如果webpack大于30 kB（在压缩和gzip压缩之前），它将提取供应商代码。它还将提取通用代码-如果您的构建产生多个捆绑包（例如[，将您的应用拆分为路由](https://developers.google.cn/web/fundamentals/performance/webpack/use-long-term-caching#split-the-code-into-routes-and-pages)），这将非常有用 。

   **在webpack 3中，**添加[`CommonsChunkPlugin`](https://webpack.js.org/plugins/commons-chunk-plugin/)：

   ```
   // webpack.config.js（适用于webpack 3）
   模块。出口= { 
     插件：[
       新的webpack 。优化。CommonsChunkPlugin （{
         //包含依赖项的块的名称。
         //用此名称代替步骤1中的[name]
         名称：'vendor' ， 
   
         //一个函数，该函数确定要包含在此块中的模块
         minChunks ：模块=> 模块。上下文&&   
           模块。情境。包括（'node_modules' ），
       }），
     ]，
   };
   ```

   该插件获取路径包含的所有模块，`node_modules`并将其移至名为的单独文件中`vendor.[chunkhash].js`。

完成这些更改后，每个构建将生成两个文件，而不是一个：`main.[chunkhash].js`和 `vendor.[chunkhash].js`（`vendors~main.[chunkhash].js`对于webpack 4）。对于webpack 4，如果依赖性较小，则可能不会生成供应商捆绑包-很好：

```
$ webpack
哈希：ac01483e8fec1fa70676
版本：webpack 3.8 。1个
时间：3816ms
                           资产规模块名称
  ./ main 。00bab6fd3100008a42b0.js 82 kB 0 [ 发出] 主  
./ 供应商。d9e134771799ecdf9483 。js 47 kB 1 [发射]供应商 
```

浏览器将分别缓存这些文件-并仅重新下载更改的代码。

### Webpack运行时代码

不幸的是，仅提取供应商代码是不够的。如果您尝试更改应用程序代码中的某些内容：

```
// index.js
…
…

// E.g. add this:
console.log('Wat');
```

您会注意到`vendor`哈希值也发生了变化：

```
                           资产规模块名称
./ 供应商。d9e134771799ecdf9483 。js 47 kB 1 [发射]供应商 
```

↓

```
                            资产规模块名称
./ 供应商。e6ea4504d61a1cc1c60b 。js 47 kB 1 [发射]供应商 
```

发生这种情况的原因是，除了模块代码之外，Webpack捆绑包还[*具有运行时*](https://webpack.js.org/concepts/manifest/) -一小段代码，用于管理模块的执行。当您将代码拆分为多个文件时，这段代码开始包括块ID与相应文件之间的映射：

```
// vendor.e6ea4504d61a1cc1c60b.js
script.src = __webpack_require__.p + chunkId + "." + {
  "0": "2f2269c7f0a55a5c1871"
}[chunkId] + ".js";
```

Webpack将此运行时包含在最后一个生成的块中，`vendor` 在我们的例子中。每次任何块更改时，这段代码也会更改，从而导致整个`vendor`块都更改。

为了解决这个问题，让我们将运行时移到一个单独的文件中。**在webpack 4中，**这可以通过启用以下`optimization.runtimeChunk`选项来实现：

```
// webpack.config.js (for webpack 4)
module.exports = {
  optimization: {
    runtimeChunk: true,
  },
};
```

**在webpack 3中，**通过使用创建一个额外的空块来做到这一点`CommonsChunkPlugin`：

```
// webpack.config.js (for webpack 3)
module.exports = {
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',

      minChunks: module => module.context &&
        module.context.includes('node_modules'),
    }),

    // This plugin must come after the vendor one (because webpack
    // includes runtime into the last chunk)
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime',

      // minChunks: Infinity means that no app modules
      // will be included into this chunk
      minChunks: Infinity,
    }),
  ],
};
```

完成这些更改后，每个构建将生成三个文件：

```
$ webpack
哈希：ac01483e8fec1fa70676
版本：webpack 3.8 。1个
时间：3816ms
                            资产规模块名称
   ./ main 。00bab6fd3100008a42b0.js 82 kB 0 [ 发出] 主  
 ./ 供应商。26886caf15818fa82dfa 。js 46 kB 1 [发射]供应商 
./ 运行时。79f17c27b335abc7aaf4.js 1.45 kB 3 [发射]运行时  
```

`index.html`以相反的顺序将它们包括进来–完成了：

```
<!-- index.html -->
<script src="./runtime.79f17c27b335abc7aaf4.js"></script>
<script src="./vendor.26886caf15818fa82dfa.js"></script>
<script src="./main.00bab6fd3100008a42b0.js"></script>
```

### 进一步阅读

- Webpack [长期缓存](https://webpack.js.org/guides/caching/)指南
- Webpack [有关Webpack运行时和清单的](https://webpack.js.org/concepts/manifest/)文档
- [“充分利用CommonsChunkPlugin”](https://medium.com/webpack/webpack-bits-getting-the-most-out-of-the-commonschunkplugin-ab389e5f318)
- [如何`optimization.splitChunks`与`optimization.runtimeChunk`工作](https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693)

## 内联webpack运行时以保存额外的HTTP请求

为了使事情变得更好，请尝试将webpack运行时内联到HTML响应中。即，代替此：

```
<!-- index.html -->
<script src="./runtime.79f17c27b335abc7aaf4.js"></script>
```

做这个：

```
<!-- index.html -->
<script>
!function(e){function n(r){if(t[r])return t[r].exports;…}} ([]);
</script>
```

运行时很小，并且内联它可以帮助您保存HTTP请求（对于HTTP / 1非常重要；对于HTTP / 2不太重要，但可能仍会起作用）。

这是操作方法。

### 如果使用HtmlWebpackPlugin生成HTML

如果使用 [HtmlWebpackPlugin](https://github.com/jantimon/html-webpack-plugin)生成HTML文件， [则只](https://github.com/DustinJackson/html-webpack-inline-source-plugin) 需要[InlineSourcePlugin](https://github.com/DustinJackson/html-webpack-inline-source-plugin)：

```
// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineSourcePlugin = require('html-webpack-inline-source-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      // Inline all files which names start with “runtime~” and end with “.js”.
      // That’s the default naming of runtime chunks
      inlineSource: 'runtime~.+\\.js',
    }),
    // This plugin enables the “inlineSource” option
    new InlineSourcePlugin(),
  ],
};
```

### 如果使用自定义服务器逻辑生成HTML

**使用webpack 4：**

1. 添加 

   `WebpackManifestPlugin`

    即可知道运行时块的生成名称：

   ```
   // webpack.config.js（适用于webpack 4）
   const ManifestPlugin = require （'webpack-manifest-plugin' ）;   
   
   模块。出口= { 
     插件：[
       新的ManifestPlugin （），
     ]，
   };
   ```

   使用此插件进行构建将创建一个如下所示的文件：

   ```
   // manifest.json
   {
     “ 运行时〜主。JS “：” 运行时〜主。8e0d62a03.js ”
   }
   ```

2. 以方便的方式内联运行时块的内容。例如，使用Node.js和Express：

   ```
   // server.js
   const fs = require （'fs' ）; 
   const manifest = require （'./manifest.json' ）; 
   
   const runtimeContent = fs 。readFileSync （manifest [ 'runtime〜main.js' ]，'utf-8' ）; 
   
   应用程式。get （'/' ，（req ，res ）=> {   
     水库。发送（`
       …
       <script> $ {runtimeContent} </ script>
       …
     ` ）;
   }）;
   ```

**或使用webpack 3：**

1. 通过指定

   ```
   filename
   ```

   以下内容使运行时名称为静态：

   ```
   // webpack.config.js（适用于webpack 3）
   模块。出口= { 
     插件：[
       新的webpack 。优化。CommonsChunkPlugin （{
         名称：“运行时”，
         minChunks ：Infinity ，
         文件名：“ runtime 。js ”，
           //→现在将调用运行时文件
           //“ runtime.js”，而不是“ runtime.79f17c27b335abc7aaf4.js”
       }），
     ]，
   };
   ```

2. 

   ```
   runtime.js
   ```

   以方便的方式 内联内容。例如，使用Node.js和Express：

   ```
   // server.js
   const fs = require （“ fs” ）； 
   const runtimeContent = fs 。readFileSync （'./ runtime.js' ，'utf-8' ）;
   
   应用程式。得到（'/' ，（req ，res ）=> { 
     水库。发送（`
       …
       <script> $ {runtimeContent} </ script>
       …
     ` ）;
   }）；
   ```

## 现在不需要的延迟加载代码

有时，页面包含或多或少的重要部分：

- 如果您在YouTube上加载视频页面，则您更关心视频而不是评论。在这里，视频比评论更重要。
- 如果您在新闻网站上打开文章，则您更关心文章的文字而不是广告。在这里，文字比广告更重要。

在这种情况下，请先仅下载最重要的内容，然后再延迟加载其余部分，以提高初始加载性能。使用[的 `import()`功能](https://webpack.js.org/api/module-methods/#import-)和 [代码分割](https://webpack.js.org/guides/code-splitting/)为这样的：

```
// videoPlayer.js
export function renderVideoPlayer() { … }

// comments.js
export function renderComments() { … }

// index.js
import {renderVideoPlayer} from './videoPlayer';
renderVideoPlayer();

// …Custom event listener
onShowCommentsClick(() => {
  import('./comments').then((comments) => {
    comments.renderComments();
  });
});
```

`import()`指定要动态加载特定模块。当webpack看到时`import('./module.js')`，它将把该模块移动到单独的块中：

```
$ webpack
哈希：39b2a53cb4e73f0dc5b2
版本：webpack 3.8 。1个
时间：4273ms
                            资产规模块名称
      ./ 0.8ecaf182f5c85b7a8199.js 22.5 kB 0 [已发射]  
   ./ main 。f7e53d8e13e9a2745d6d 。js 60 kB 1 [ 发出] 主要 
 ./ 供应商。4f14b6326a80f4752a98.js 46 kB 2 [ 发出]供应商  
./ 运行时。79f17c27b335abc7aaf4.js 1.45 kB 3 [发射]运行时  
```

并仅在执行到达`import()`功能时下载。

这将使`main`捆束更小，从而缩短了初始装载时间。更重要的是，它将改善缓存–如果您更改主块中的代码，则注释块不会受到影响。

**注意：**如果您使用Babel编译此代码，则会出现语法错误，因为Babel无法立即使用`import()`。为避免该错误，请添加 [`syntax-dynamic-import`](https://www.npmjs.com/package/babel-plugin-syntax-dynamic-import) 插件。

### 进一步阅读

- [该](https://webpack.js.org/api/module-methods/#import-)[ 功能的](https://webpack.js.org/api/module-methods/#import-) Webpack文档[`import()`](https://webpack.js.org/api/module-methods/#import-)
- [用于实现](https://github.com/tc39/proposal-dynamic-import)[ 语法](https://github.com/tc39/proposal-dynamic-import)的JavaScript建议[`import()`](https://github.com/tc39/proposal-dynamic-import)

## 将代码分为路线和页面

如果您的应用程序具有多个路由或页面，但是只有一个带有代码的JS文件（单个代码`main`块），则很可能在每个请求中提供了额外的字节。例如，当用户访问您网站的主页时：

![WebFundamentals主页](https://developers.google.cn/web/fundamentals/performance/webpack/site-home-page.png)

他们不需要加载用于渲染位于不同页面上的文章的代码，但是他们会加载它。此外，如果用户始终只访问主页，而您在文章代码上进行了更改，则webpack将使整个捆绑软件无效-用户将不得不重新下载整个应用程序。

如果我们将应用分为页面（或路由，如果是单页应用），则用户将仅下载相关代码。另外，浏览器将更好地缓存应用程序代码：如果更改主页代码，则webpack将仅使相应的块无效。

### 对于单页应用

要按路线划分单页应用，请使用`import()`（请参阅[“您现在不需要的延迟加载代码”](https://developers.google.cn/web/fundamentals/performance/webpack/use-long-term-caching#lazy-loading)部分）。如果您使用框架，则它可能已有解决方案：

- [“代码分裂”](https://reacttraining.com/react-router/web/guides/code-splitting) 中`react-router`的文件（包括反应）
- [“延迟加载路线”](https://router.vuejs.org/en/advanced/lazy-loading.html)中 `vue-router`的文档（对于Vue.js）

### 对于传统的多页应用程序

要按页面拆分传统应用，请使用webpack的[入口点](https://webpack.js.org/concepts/entry-points/)。如果您的应用程序具有三种页面：主页，文章页面和用户帐户页面，则它应具有三个条目：

```
// webpack.config.js
module.exports = {
  entry: {
    home: './src/Home/index.js',
    article: './src/Article/index.js',
    profile: './src/Profile/index.js'
  },
};
```

对于每个条目文件，webpack将构建一个单独的依赖关系树并生成一个包，其中仅包含该条目使用的模块：

```
$ webpack
哈希：318d7b8490a7382bf23b
版本：webpack 3.8 。1个
时间：4273ms
                            资产规模大块大块的名称                     
      ./ 0.8ecaf182f5c85b7a8199.js 22.5 kB        0 [ 发出]    
   ./ home 。91b9ed27366fe7e33d6a 。js     18 kB        1 [ 发出]   主页  
./ 文章。87a128755b16ac3294fd 。js     32 kB        2 [ 发出]   文章  
./ profile 。de945dc02685f6166781 。js     24 kB        3 [ 发出]   配置文件  
 ./ 供应商。4f14b6326a80f4752a98.js 46 kB        4 [ 发出]   供应商      
./ 运行时。318d7b8490a7382bf23b 。js   1.45 kB        5 [ 发出]   运行时  
```

因此，如果仅文章页面使用Lodash，则`home`和`profile`捆绑包中将不包含它-并且用户在访问主页时不必下载此库。

但是，独立的依赖关系树有其缺点。如果两个入口点都使用Lodash，并且您尚未将依赖项移至供应商捆绑包中，则两个入口点都将包含Lodash副本。为了解决这个问题，**在webpack 4中，**将该`optimization.splitChunks.chunks: 'all'`选项添加 到您的webpack配置中：

```
// webpack.config.js（适用于webpack 4）
模块。出口= { 
  优化：{ 
    splitChunks ：{ 
      块：'全部' ， 
    }
  }，
};
```

此选项启用智能代码拆分。使用此选项，webpack会自动查找通用代码并将其提取到单独的文件中。

或者，**在webpack 3中，**使用[`CommonsChunkPlugin`](https://webpack.js.org/plugins/commons-chunk-plugin/) –将公共依赖项移动到新的指定文件中：

```
// webpack.config.js (for webpack 3)
module.exports = {
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      // A name of the chunk that will include the common dependencies
      name: 'common',

      // The plugin will move a module into a common file
      // only if it’s included into `minChunks` chunks
      // (Note that the plugin analyzes all chunks, not only entries)
      minChunks: 2,    // 2 is the default value
    }),
  ],
};
```

随意发挥`minChunks`价值，找到最好的之一。通常，您希望保持较小，但如果块数量增加，则增加。例如，对于3个块，`minChunks`可能为2，但对于30个块，可能为8 –因为如果将其保持为2，则太多模块将进入通用文件，从而使其膨胀过多。

### 进一步阅读

- Webpack [关于入口点概念的](https://webpack.js.org/concepts/entry-points/)文档
- Webpack [关于](https://webpack.js.org/plugins/commons-chunk-plugin/) CommonsChunkPlugin的文档
- [“充分利用CommonsChunkPlugin”](https://medium.com/webpack/webpack-bits-getting-the-most-out-of-the-commonschunkplugin-ab389e5f318)
- [如何`optimization.splitChunks`与`optimization.runtimeChunk`工作](https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693)

## 使模块ID更稳定

构建代码时，webpack为每个模块分配一个ID。以后，这些ID `require()`在包内的中使用。您通常会在模块路径之前的生成输出中看到ID：

```
$ webpack
哈希：df3474e4f76528e3bbc9
版本：webpack 3.8 。1个
时间：2150ms
                           资产规模块名称
      ./ 0.8ecaf182f5c85b7a8199.js 22.5 kB 0 [已发射]  
   ./ main 。4e50a16675574df6a9e9 。js 60 kB 1 [ 发出] 主要 
 ./ 供应商。26886caf15818fa82dfa 。js 46 kB 2 [发射]供应商 
./ 运行时。79f17c27b335abc7aaf4.js 1.45 kB 3 [发射]运行时  
```

​     ↓这里

```
   [ 0 ] ./ 索引。js 29 kB { 1 } [内置]  
   [ 2 ]（webpack ）/ buildin / 全局。js 488 字节{ 2 } [内置] 
   [ 3 ]（webpack ）/ buildin / 模块。js 495 字节{ 2 } [内置] 
   [ 4 ] ./ 评论。js 58 kB { 0 } [内置]  
   [ 5 ] ./ ads 。js 74 kB { 1 } [内置]  
    + 1 个隐藏模块 
```

默认情况下，使用计数器来计算ID（即第一个模块的ID为0，第二个模块的ID为1，依此类推）。问题在于，当您添加新模块时，它可能会出现在模块列表的中间，从而更改所有下一个模块的ID：

```
$ webpack
哈希：df3474e4f76528e3bbc9
版本：webpack 3.8 。1个
时间：2150ms 
                           资产规模大块大块的名称                      
      ./ 0.5c82c0f337fcb22672b5.js 22 kB        0 [ 发出]      
   ./ main 。0c8b617dfc40c2827ae3.js 82 kB        1 [ 发出]   主      
 ./ 供应商。26886caf15818fa82dfa 。js     46 kB        2 [ 发出]   供应商  
./ 运行时。79f17c27b335abc7aaf4.js 1.45 kB        3 [ 发出]   运行时    
   [ 0 ] ./ 索引。js 29 kB { 1 } [ 内置]  
   [ 2 ] （webpack ）/ buildin / global 。js 488 字节{ 2 } [ 内置]  
   [ 3 ] （webpack ）/ buildin / 模块。js 495 字节{ 2 } [ 内置]  
```

​     ↓我们添加了一个新模块...

```
   [ 4 ] ./ webPlayer 。js 24 kB { 1 } [ 内置]  
```

​     ↓看看它做了什么！`comments.js`现在具有ID 5而不是4

```
   [ 5 ] ./ 评论。js 58 kB { 0 } [内置]  
```

​     ↓ `ads.js`现在具有ID 6，而不是5

```
   [ 6 ] ./ ads 。js 74 kB { 1 } [内置]  
       + 1 个隐藏模块 
```

这会使所有包含或依赖于具有更改ID的模块的块无效-即使它们的实际代码没有更改。在我们的例子中，`0`大块（带有的块`comments.js`）和`main`大块（带有其他应用程序代码的块）无效-而只有那个`main`应该是无效的。

要解决此问题，请更改使用来计算模块ID的方式 [`HashedModuleIdsPlugin`](https://webpack.js.org/plugins/hashed-module-ids-plugin/)。它将基于计数器的ID替换为模块路径的哈希值：

```
$ webpack
哈希：df3474e4f76528e3bbc9
版本：webpack 3.8 。1个
时间：2150ms 
                           资产规模大块大块的名称                      
      ./ 0.6168aaac8461862eab7a 。js   22.5 kB        0 [ 发出]  
   ./ main 。a2e49a279552980e3b91 。js     60 kB        1 [ 发出]   主  
 ./ 供应商。ff9f7ea865884e6a84c8 。js     46 kB        2 [ 发出]   供应商  
./ 运行时。25f5d0204e4f77fa57a1.js 1.45 kB        3 [ 发出]   运行时    
```

  ↓这里

```
[ 3IRH ] ./ index 。js 29 kB { 1 } [内置]  
[ DuR2 ]（webpack ）/ buildin / 全局。js 488 字节{ 2 } [内置] 
[ JkW7 ]（webpack ）/ buildin / 模块。js 495 字节{ 2 } [内置] 
[ LbCc ] ./ webPlayer 。js 24 kB { 1 } [内置]  
[ lebJ ] ./ 评论。js 58 kB { 0 } [内置]  
[ 02Tr ] ./ ads 。js 74 kB { 1 } [内置]  
    + 1 个隐藏模块 
```

使用这种方法，仅当您重命名或移动该模块时，模块的ID才会更改。新模块不会影响其他模块的ID。

要启用该插件，请将其添加到`plugins`配置部分：

```
// webpack.config.js
module.exports = {
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
  ],
};
```

### 进一步阅读

- Webpack [关于](https://webpack.js.org/plugins/hashed-module-ids-plugin/) HashedModuleIdsPlugin的文档

## 加起来

- 缓存包并通过更改包名称来区分版本
- 将捆绑包分为应用程序代码，供应商代码和运行时
- 内联运行时以保存HTTP请求
- 延迟加载非关键代码 `import`
- 按路线/页面划分代码，以避免加载不必要的内容