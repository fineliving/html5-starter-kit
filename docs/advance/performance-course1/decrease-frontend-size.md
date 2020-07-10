# 减小前端大小

优化应用程序时，要做的第一件事就是使其尽可能小。这是使用webpack的方法。

## 使用生产模式（仅适用于webpack 4）

Webpack 4引入[了新`mode`标志](https://webpack.js.org/concepts/mode/)。您可以将此标志设置为`'development'`或`'production'`暗示webpack您正在针对特定环境构建应用程序：

```
// webpack.config.js
module.exports = {
  mode: 'production',
};
```

`production`在构建用于生产的应用程序时，请确保启用该模式。这将使webpack应用优化，如最小化，删除库中仅开发代码[等](https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a)。

### 进一步阅读

- [`mode`标志配置的具体内容](https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a)

## 启用缩小

**注意：**大多数仅适用于webpack 3。如果您[在生产模式下](https://developers.google.cn/web/fundamentals/performance/webpack/decrease-frontend-size#enable-the-production-mode)使用 [webpack 4](https://developers.google.cn/web/fundamentals/performance/webpack/decrease-frontend-size#enable-the-production-mode)，则捆绑级别的缩小已启用-您仅需启用[特定](https://developers.google.cn/web/fundamentals/performance/webpack/decrease-frontend-size#loader-specific-options)于 [加载程序的选项](https://developers.google.cn/web/fundamentals/performance/webpack/decrease-frontend-size#loader-specific-options)。

缩小是指通过删除多余的空格，缩短变量名等方式压缩代码。像这样：

```
// Original code
function map(array, iteratee) {
  let index = -1;
  const length = array == null ? 0 : array.length;
  const result = new Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}
```

↓

```
// Minified code
function map(n,r){let t=-1;for(const a=null==n?0:n.length,l=Array(a);++t<a;)l[t]=r(n[t],t,n);return l}
```

Webpack支持两种减少代码的方式：*捆绑包级别的减少*和 *特定于加载程序的options*。它们应同时使用。

### 捆绑级别的缩小

捆绑包级别的压缩会在编译后压缩整个捆绑包。运作方式如下：

1. 您编写如下代码：

   ```
   // comments.js import './comments.css' ; 导出功能渲染（数据，目标）{   控制台。日志（'Rendered！' ）; }
    
     
   ```

2. Webpack将其编译为以下内容：

   ```
   // bundle.js（部分）“使用严格”；Object 。defineProperty （__ webpack_exports__ ，“ __esModule ”，{ value ：true }）；/ *和声导出（不可变）* / __webpack_exports __ [“ render ”] =渲染；/ *和谐引入* / var __WEBPACK_IMPORTED_MODULE_0__comments_css__ = __webpack_require __ （1 ）；/ *和谐导入* / var __WEBPACK_IMPORTED_MODULE_0__comments_css_js___default = __webpack_require __ 。n
   
    
      
       
       
   （__ WEBPACK_IMPORTED_MODULE_0__comments_css__ ）； 函数渲染（数据，目标）{   控制台。日志（“已渲染！” ）；}
   
    
    
   ```

3. 压缩器将其压缩为以下内容：

   ```
   //缩小了bundle.js（的一部分）“ use strict” ；功能t （e ，n ）{ 控制台。log （“ Rendered！” ）} 对象。defineProperty （n ，“ __esModule” ，{ value ：！0 }），n 。渲染= t ; var o = r （1 ）; [R 。n （o ）
   ```

**在webpack 4中，**在生产模式下和不使用生产模式下，都自动启用了捆绑包级别的缩小。它[在后台](https://github.com/mishoo/UglifyJS2)使用[UglifyJS缩小程序](https://github.com/mishoo/UglifyJS2) 。（如果您需要禁用缩小功能，只需使用开发模式或将其传递`false`给该`optimization.minimize`选项即可。）

**在webpack 3中，**您需要 直接使用[UglifyJS插件](https://github.com/webpack-contrib/uglifyjs-webpack-plugin)。该插件与webpack捆绑在一起；要启用它，请将其添加到`plugins` 配置部分：

```
// webpack.config.js
const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
  ],
};
```

**注意：**在webpack 3中，UglifyJS插件无法编译ES2015 +（ES6 +）代码。这意味着，如果您的代码使用类，箭头函数或其他新语言功能，而您没有将它们编译到ES5中，则插件将引发错误。

如果需要编译新语法，请使用 [uglifyjs-webpack-plugin](https://github.com/webpack-contrib/uglifyjs-webpack-plugin)软件包。这是与webpack捆绑在一起的插件，但是更新，并且可以编译ES2015 +代码。

### 加载程序特定的选项

减少代码的第二种方法是特定于加载程序的选项（[什么是加载程序](https://webpack.js.org/concepts/loaders/)）。使用加载程序选项，您可以压缩压缩器无法压缩的内容。例如，当您使用导入CSS文件时 [`css-loader`](https://github.com/webpack-contrib/css-loader)，该文件将被编译为字符串：

```
/* comments.css */
.comment {
  color: black;
}
```

↓

```
//缩小的bundle.js（部分）
exports = module 。出口= __webpack_require__ （1 ）（），
出口。推（[ 模块。我，“的.comment {\ r \ n颜色：黑色; \ r \ N}” ， “” ]）;
```

压缩程序无法压缩此代码，因为它是一个字符串。为了减少文件内容，我们需要配置加载器来做到这一点：

```
// webpack.config.js 模块。出口= { 模块：{     规则：[ {         测试：/ \.css$/ ，使用：[ 'style-loader' ，{ 加载器：'css-loader' ，选项：{ 最小化：真} }，]，}，]，}，};
 
   
 
      
 
         
          
               
        
      
    
  
```

### 进一步阅读

- [UglifyJsPlugin文档](https://github.com/webpack-contrib/uglifyjs-webpack-plugin)
- 其他受欢迎的缩小器：[Babel Minify](https://github.com/webpack-contrib/babel-minify-webpack-plugin)，[Google Closure编译器](https://github.com/roman01la/webpack-closure-compiler)

## 指定 `NODE_ENV=production`

**注意：**这仅是webpack 3。如果您[在生产模式下](https://developers.google.cn/web/fundamentals/performance/webpack/decrease-frontend-size#enable-the-production-mode)使用 [webpack 4](https://developers.google.cn/web/fundamentals/performance/webpack/decrease-frontend-size#enable-the-production-mode)，则`NODE_ENV=production` 优化已启用-随时跳过本节。

减小前端大小的另一种方法是将 代码中的`NODE_ENV` [环境变量](https://superuser.com/questions/284342/what-are-path-and-other-environment-variables-and-how-can-i-set-or-use-them)设置为value `production`。

图书馆读取`NODE_ENV`变量以检测在开发或生产中应该以哪种模式工作。一些库基于此变量的行为会有所不同。例如，当`NODE_ENV`未设置`production`为时，Vue.js会进行其他检查并显示警告：

```
// vue/dist/vue.runtime.esm.js
// …
if (process.env.NODE_ENV !== 'production') {
  warn('props must be strings when using array syntax.');
}
// …
```

React的工作原理类似–它加载了包含警告的开发版本：

```
// react/index.js
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/react.production.min.js');
} else {
  module.exports = require('./cjs/react.development.js');
}

// react/cjs/react.development.js
// …
warning$3(
  componentClass.getDefaultProps.isReactClassApproved,
  'getDefaultProps is only used on classic React.createClass ' +
  'definitions. Use a static property named `defaultProps` instead.'
);
// …
```

这种检查和警告通常在生产中是不必要的，但是它们保留在代码中并增加了库的大小。**在webpack 4中，**通过添加以下`optimization.nodeEnv: 'production'`选项将其删除：

```
// webpack.config.js (for webpack 4)
module.exports = {
  optimization: {
    nodeEnv: 'production',
    minimize: true,
  },
};
```

**在webpack 3中，**使用[`DefinePlugin`](https://webpack.js.org/plugins/define-plugin/)代替：

```
// webpack.config.js (for webpack 3)
const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    new webpack.optimize.UglifyJsPlugin(),
  ],
};
```

这两个`optimization.nodeEnv`选项和`DefinePlugin`工作方式相同-它们取代所有出现的`process.env.NODE_ENV`与指定的值。通过上面的配置：

1. 的WebPack将取代所有出现的

   ```
   process.env.NODE_ENV
   ```

   有 

   ```
   "production"
   ```

   ：

   ```
    // vue / dist / vue.runtime.esm.js if （typeof val === 'string' ）{   name = camelize （val ）;   res [ name ] = { type ：null }; } 否则如果（过程。ENV 。NODE_ENV ==！'生产'）{   警告（'使用数组语法道具时必须是字符串。' ）; }
      
   
       
        
   ```

   ↓

   ```
   // vue / dist / vue.runtime.esm.js if （typeof val === 'string' ）{   name = camelize （val ）;   res [ name ] = { type ：null }; } else if （“ production” ！== 'production' ）{   警告（“使用数组语法时，props必须是字符串。” ）；}
      
   
       
         
   ```

2. 然后

   ，minifier

   将删除所有此类 

   ```
   if
   ```

   分支–因为

   ```
   "production" !== 'production'
   ```

   始终为false，并且插件了解这些分支内的代码将永远不会执行：

   ```
   // vue / dist / vue.runtime.esm.js if （typeof val === 'string' ）{   name = camelize （val ）;   res [ name ] = { type ：null }; } else if （“ production” ！== 'production' ）{   警告（“使用数组语法时，props必须是字符串。” ）；}
      
   
       
         
   ```

   ↓

   ```
   // vue / dist / vue.runtime.esm.js（不缩小）if （typeof val === 'string' ）{   name = camelize （val ）;   res [ name ] = { type ：null }; }
      
   
       
   ```

### 进一步阅读

- [什么是“环境变量”](https://superuser.com/questions/284342/what-are-path-and-other-environment-variables-and-how-can-i-set-or-use-them)
- 的WebPack文档有关：[`DefinePlugin`](https://webpack.js.org/plugins/define-plugin/)， [`EnvironmentPlugin`](https://webpack.js.org/plugins/environment-plugin/)

## 使用ES模块

减小前端大小的另一种方法是使用[ES模块](https://ponyfoo.com/articles/es6-modules-in-depth)。

使用ES模块时，webpack可以进行树状摇动。摇树是指捆绑器遍历整个依赖关系树，检查使用了哪些依赖关系，并删除未使用的依赖关系。因此，如果您使用ES模块语法，则webpack可以消除未使用的代码：

1. 您编写的文件具有多个导出，但是该应用仅使用其中一个：

   ```
   // comment.js export const render = （）=> { 返回“已渲染！” ; }; 导出const commentRestEndpoint = '/ rest / comments' ; // index.js 进口{ 呈现} 从” ./comments.js' ; 渲染（）;
          
     
   
   
      
   ```

2. Webpack知道

   ```
   commentRestEndpoint
   ```

   不使用它，并且不会在捆绑包中生成单独的导出点：

   ```
   // bundle.js（部分对应于comments.js） （功能（模块，__webpack_exports__ ，__webpack_require__ ）{ “使用严格” ; const的渲染= （）=> { 返回'渲染！' ; }; / *和谐出口（不可变）* / __webpack_exports__ [ “ a” ] = 渲染; const commentRestEndpoint = '/ rest / comments' ; / *未使用的和声导出commentRestEndpoint * / }）
    
     
           
      
   
      
     
   ```

3. 压缩器

   删除未使用的变量：

   ```
   // bundle.js（与comment.js对应的部分）
   （function（n，e）{“使用严格”; var r = function（）{返回“ Rendered！”}; eb = r}）
   ```

即使它们是用ES模块编写的，这也适用于库。

**注意：**在webpack中，没有缩小器就无法摇树。Webpack只是删除未使用的导出的导出语句；是删除器删除未使用的代码。因此，如果您在没有压缩程序的情况下编译捆绑软件，捆绑软件将不会变得更小。

不过，您不需要完全使用webpack的内置minifier（`UglifyJsPlugin`）。任何支持清除死代码的压缩程序（例如[Babel Minify插件](https://github.com/webpack-contrib/babel-minify-webpack-plugin) 或[Google Closure Compiler插件](https://github.com/roman01la/webpack-closure-compiler)）都可以解决问题。

**警告：**不要将ES模块意外编译成CommonJS模块。

如果将Babel与`babel-preset-env`或结合使用`babel-preset-es2015`，请检查这些预设的设置。默认情况下，他们transpile ES“ `import`并`export`以CommonJS的” `require`和 `module.exports`。[传递`{ modules: false }` 选项](https://github.com/babel/babel/tree/master/packages/babel-preset-env)以禁用此功能。

以打字稿一样：记得设置`{ "compilerOptions": { "module": "es2015" } }` 你的`tsconfig.json`。

### 进一步阅读

- [“ ES6深度模块”](https://ponyfoo.com/articles/es6-modules-in-depth)
- Webpack [关于摇树的](https://webpack.js.org/guides/tree-shaking/)文档

## 优化图像

图片占页面大小[的一半以上](http://httparchive.org/interesting.php?a=All&l=Oct 16 2017)。尽管它们不像JavaScript那样重要（例如，它们不阻止渲染），但它们仍然占用了很大一部分带宽。使用`url-loader`，`svg-url-loader`并`image-webpack-loader`给他们优化的WebPack。

[`url-loader`](https://github.com/webpack-contrib/url-loader)将小型静态文件内联到应用程序中。如果不进行配置，它将获取一个传递的文件，将其放在已编译的包旁边，然后返回该文件的url。但是，如果指定该`limit`选项，它将把小于此限制的文件编码为[Base64数据URL，](https://css-tricks.com/data-uris/)并返回此URL。这会将图像内联到JavaScript代码中并保存HTTP请求：

```
// webpack.config.js 模块。出口= { 模块：{     规则：[ {         测试：/ \.(jpe?g|png|gif)$/ ，        加载器：'url-loader' ，        选项：{ //内联文件小于10 kB（10240字节）          限制：10 * 1024 ，}，}，]，} };
 
   
 
      
 
 
 
          
   
        
      
    
  
// index.js 从'./image.png' 导入imageUrl ; //→如果image.png小于10 kB，则`imageUrl`将包含//编码后的图像：'data：image / png; base64，iVBORw0KGg…' // //如果image.png大于10 kB，则加载程序将创建一个新文件，//和`imageUrl`将包含其网址：`/ 2fcd56a1920be.png`
 
```

**注意：内**联图像减少了单独请求的数量，这很好（[即使使用HTTP / 2](https://blog.octo.com/en/http2-arrives-but-sprite-sets-aint-no-dead/)），但是会增加捆绑软件的下载/解析时间和内存消耗。确保不要嵌入大图或大图–否则捆绑时间的增加将超过内联的好处。

[`svg-url-loader`](https://github.com/bhovhannes/svg-url-loader)的工作原理与`url-loader`– 一样，只是它使用[URL编码](https://developer.mozilla.org/en-US/docs/Glossary/percent-encoding)而不是Base64 编码文件。这对于SVG图像很有用-因为SVG文件只是纯文本，所以这种编码更有效：

```
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/,
        loader: 'svg-url-loader',
        options: {
          // Inline files smaller than 10 kB (10240 bytes)
          limit: 10 * 1024,
          // Remove the quotes from the url
          // (they’re unnecessary in most cases)
          noquotes: true,
        },
      },
    ],
  },
};
```

**注意：**svg-url-loader具有改善Internet Explorer支持的选项，但会恶化其他浏览器的内联。如果需要支持此浏览器，请[应用`iesafe: true` 选项](https://github.com/bhovhannes/svg-url-loader#iesafe)。

[`image-webpack-loader`](https://github.com/tcoopman/image-webpack-loader)压缩通过它的图像。它支持JPG，PNG，GIF和SVG图像，因此我们将在所有这些类型中使用它。

该加载程序不会将图像嵌入到应用程序中，因此它必须与`url-loader`和 配对使用`svg-url-loader`。为避免将其复制粘贴到两个规则中（一个用于JPG / PNG / GIF图像，另一个用于SVG图像），我们将将此加载器作为单独的规则包括在内[`enforce: 'pre'`](https://webpack.js.org/configuration/module/#rule-enforce)：

```
 // webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'image-webpack-loader',
        // This will apply the loader before the other ones
        enforce: 'pre',
      },
    ],
  },
};
```

加载程序的默认设置已经可以使用了-但是如果您想进一步配置它，请参阅[插件选项](https://github.com/tcoopman/image-webpack-loader#options)。要选择要指定的选项，请查看Addy Osmani出色的[图像优化指南](https://images.guide/)。

### 进一步阅读

- [“ base64编码用于什么？”](https://stackoverflow.com/questions/201479/what-is-base-64-encoding-used-for)
- Addy Osmani的[图像优化指南](https://images.guide/)

## 优化依赖关系

JavaScript平均大小的一半以上来自于依赖关系，而该大小的一部分可能就不必要了。

例如，Lodash（从v4.17.4版本开始）向捆绑包添加了72 KB的缩小代码。但是，如果仅使用20种方法，那么大约65 KB的缩小代码将无济于事。

另一个示例是Moment.js。其2.19.1版本需要223 KB的精简代码，这是巨大的– [2017年10月，](http://httparchive.org/interesting.php?a=All&l=Oct 16 2017)页面上JavaScript的平均大小[为452 KB](http://httparchive.org/interesting.php?a=All&l=Oct 16 2017)。但是，该大小的170 KB是[本地化文件](https://github.com/moment/moment/tree/4caa268356434f3ae9b5041985d62a0e8c246c78/locale)。如果您不使用多种语言的Moment.js，这些文件将毫无目的地膨胀。

所有这些依赖关系都可以轻松优化。我们已经在GitHub存储库中收集了优化方法- 快来[查看](https://github.com/GoogleChromeLabs/webpack-libs-optimizations)！

## 为ES模块启用模块串联（又名示波器吊装）

**注意：**如果您在[生产模式下](https://developers.google.cn/web/fundamentals/performance/webpack/decrease-frontend-size#enable-the-production-mode)使用[webpack 4，则](https://developers.google.cn/web/fundamentals/performance/webpack/decrease-frontend-size#enable-the-production-mode)模块连接已启用。随时跳过此部分。

构建包时，webpack会将每个模块包装为一个函数：

```
// index.js
import {render} from './comments.js';
render();

// comments.js
export function render(data, target) {
  console.log('Rendered!');
}
```

↓

```
// bundle.js (part  of)
/* 0 */
(function(module, __webpack_exports__, __webpack_require__) {

  "use strict";
  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  var __WEBPACK_IMPORTED_MODULE_0__comments_js__ = __webpack_require__(1);
  Object(__WEBPACK_IMPORTED_MODULE_0__comments_js__["a" /* render */])();

}),
/* 1 */
(function(module, __webpack_exports__, __webpack_require__) {

  "use strict";
  __webpack_exports__["a"] = render;
  function render(data, target) {
    console.log('Rendered!');
  }

})
```

过去，将CommonJS / AMD模块彼此隔离是必需的。但是，这增加了每个模块的大小和性能开销。

Webpack 2引入了对ES模块的支持，与CommonJS和AMD模块不同，该ES模块可以捆绑在一起而无需将每个函数包装在一起。webpack 3通过[模块串联](https://webpack.js.org/plugins/module-concatenation-plugin/)使这种捆绑成为可能 。以下是模块串联的作用：

```
// index.js
import {render} from './comments.js';
render();

// comments.js
export function render(data, target) {
  console.log('Rendered!');
}
```

↓

```
// Unlike the previous snippet, this bundle has only one module
// which includes the code from both files

// bundle.js (part of; compiled with ModuleConcatenationPlugin)
/* 0 */
(function(module, __webpack_exports__, __webpack_require__) {

  "use strict";
  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

  // CONCATENATED MODULE: ./comments.js
  function render(data, target) {
    console.log('Rendered!');
  }

  // CONCATENATED MODULE: ./index.js
  render();

})
```

看到不同？在普通捆绑中，模块0是`render`模块1 所需要的。通过模块串联，`require`只需将其替换为所需的功能，然后删除模块1。该捆绑软件具有更少的模块，并且模块开销也更少！

要打开此行为，请**在webpack 4**中启用以下`optimization.concatenateModules`选项：

```
// webpack.config.js (for webpack 4)
module.exports = {
  optimization: {
    concatenateModules: true,
  },
};
```

**在webpack 3中，**使用`ModuleConcatenationPlugin`：

```
// webpack.config.js (for webpack 3)
const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
};
```

**注意：不**知道为什么默认情况下不启用此行为？串联模块很酷，[但是增加了构建时间，并且中断了热模块的更换](https://twitter.com/TheLarkInn/status/925800563144454144)。这就是为什么只能在生产中启用它的原因。

### 进一步阅读

- [用于](https://webpack.js.org/plugins/module-concatenation-plugin/) ModuleConcatenationPlugin的Webpack文档
- [“示波器吊装简介”](https://medium.com/webpack/brief-introduction-to-scope-hoisting-in-webpack-8435084c171f)
- [此插件功能的](https://medium.com/webpack/webpack-freelancing-log-book-week-5-7-4764be3266f5)详细说明

## 使用`externals`，如果你同时拥有的WebPack和非的WebPack码

您可能有一个大型项目，其中某些代码是使用webpack编译的，而有些则不是。就像视频托管网站一样，播放器小部件可能是使用webpack构建的，而周围的页面可能不是：

![视频托管网站的屏幕截图](https://developers.google.cn/web/fundamentals/performance/webpack/video-hosting.png)（完全随机的视频托管网站）

如果这两段代码都具有共同的依赖性，则可以共享它们，以避免多次下载它们的代码。这是通过[webpack的`externals` 选项](https://webpack.js.org/configuration/externals/)完成[的](https://webpack.js.org/configuration/externals/) -用变量或其他外部导入替换模块。

### 如果依赖项在 `window`

如果您的非webpack代码依赖于，可以将其作为变量中的依赖项，则将`window`别名依赖项名称别名为变量名：

```
// webpack.config.js
module.exports = {
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
};
```

使用此配置，webpack将不会捆绑`react`和`react-dom`打包。相反，它们将被替换为以下内容：

```
// bundle.js (part of)
(function(module, exports) {
  // A module that exports `window.React`. Without `externals`,
  // this module would include the whole React bundle
  module.exports = React;
}),
(function(module, exports) {
  // A module that exports `window.ReactDOM`. Without `externals`,
  // this module would include the whole ReactDOM bundle
  module.exports = ReactDOM;
})
```

### 如果依赖项作为AMD软件包加载

如果您的非Webpack代码没有将依赖项公开给`window`，则情况会更加复杂。但是，如果非webpack代码将这些依赖项作为[AMD软件包使用](http://requirejs.org/docs/whyamd.html#amd)，则仍然可以避免两次加载相同的代码。

为此，请将webpack代码作为AMD捆绑包和别名模块编译为库URL：

```
// webpack.config.js
module.exports = {
  output: { libraryTarget: 'amd' },

  externals: {
    'react': { amd: '/libraries/react.min.js' },
    'react-dom': { amd: '/libraries/react-dom.min.js' },
  },
};
```

Webpack将把捆绑包包装起来`define()`并使其依赖于以下URL：

```
// bundle.js (beginning)
define(["/libraries/react.min.js", "/libraries/react-dom.min.js"], function () { … });
```

如果非webpack代码使用相同的URL来加载其依赖项，则这些文件将仅被加载一次-其他请求将使用加载器缓存。

**注意：**Webpack仅替换与`externals`对象键完全匹配的那些导入。这意味着，如果您编写`import React from 'react/umd/react.production.min.js'`，则该库不会从捆绑软件中排除。这是合理的-的WebPack不知道，如果`import 'react'`和 `import 'react/umd/react.production.min.js'`是相同的东西-所以请小心。

### 进一步阅读

- 的WebPack文档[上`externals`](https://webpack.js.org/configuration/externals/)

## 加起来

- 如果使用webpack 4，请启用生产模式
- 使用捆绑包级别的压缩器和加载器选项将代码最小化
- 通过替换`NODE_ENV`为删除仅开发代码`production`
- 使用ES模块启用摇树
- 压缩影像
- 应用特定于依赖项的优化
- 启用模块串联
- 使用`externals`，如果这是有道理的，你