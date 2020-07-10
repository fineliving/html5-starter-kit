# 通过摇树来减少JavaScript负载

当今的Web应用程序可能会变得很大，尤其是其中的JavaScript部分。截至2018年中，HTTP Archive 估计[移动设备](https://httparchive.org/reports/state-of-javascript#bytesJs)上[JavaScript](https://httparchive.org/reports/state-of-javascript#bytesJs)的[平均传输大小](https://httparchive.org/reports/state-of-javascript#bytesJs)约为350 KB。这只是传输大小！当通过网络发送JavaScript时，通常会对其进行压缩，这意味着在浏览器解压缩后，JavaScript 的*实际*数量要多得多。指出这一点很重要，因为就资源*处理*而言，压缩是无关紧要的。900 KB的解压缩JavaScript仍然对解析器和编译器900 KB，即使压缩后可能约为300 KB。

![该图说明了下载，解压缩，解析，编译和执行JavaScript的过程。](https://developers.google.cn/web/fundamentals/performance/optimizing-javascript/tree-shaking/images/figure-1.svg)**图1**。下载和运行JavaScript的过程。请注意，即使脚本的传输大小是300 KB压缩的，仍然必须解析，编译和执行的仍然是900 KB的JavaScript。

JavaScript是需要处理的昂贵资源。与下载后仅花费相对较少的解码时间的图像不同，必须先解析，编译然后最终执行JavaScript。逐字节，这使得JavaScript比其他类型的资源昂贵。

![该图将170 KB的JavaScript与同等大小的JPEG图像的处理时间进行了比较。 JavaScript资源比JPEG要占用更多的字节资源。](https://developers.google.cn/web/fundamentals/performance/optimizing-javascript/tree-shaking/images/figure-2-1x.png)**图2**。解析/编译170 KB JavaScript的处理成本与同等大小JPEG的解码时间相比。（[来源](https://medium.com/dev-channel/the-cost-of-javascript-84009f51e99e)）。

[尽管不断进行改进](https://v8.dev/blog/background-compilation)以 [提高JavaScript引擎的效率](https://blog.mozilla.org/javascript/2017/12/12/javascript-startup-bytecode-cache/)，但提高JavaScript性能与以往一样是适合开发人员的任务。毕竟，有谁比架构师本身更好地改善应用程序体系结构？

为此，存在提高JavaScript性能的技术。[代码拆分](https://webpack.js.org/guides/code-splitting/)是一种这样的技术，它通过将应用程序JavaScript划分为多个块并将这些块仅提供给需要它们的应用程序的路由来提高性能。该技术有效，但不能解决JavaScript繁多的应用程序的常见问题，即包含从未使用过的代码。为了解决这个问题，我们依靠摇树。

## 什么是摇树？

[摇树](https://en.wikipedia.org/wiki/Tree_shaking)是消除死代码的一种形式。[该术语由Rollup推广](https://github.com/rollup/rollup#tree-shaking)，但消除无效代码的概念已经存在了一段时间。该概念还可以在[webpack中](https://webpack.js.org/guides/tree-shaking/)找到，在本文中通过示例应用程序进行了演示。

术语“摇树”来自您应用程序的思维模型及其作为树状结构的依赖关系。树中的每个节点都代表一个依赖项，该依赖项为您的应用程序提供了不同的功能。在现代应用程序中，这些依赖项是通过[静态`import` 语句](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)引入的， 如下所示：

```javascript
// Import all the array utilities!
import arrayUtils from "array-utils";
```

**注意：**如果您不确定什么是ES6模块，我强烈建议[在Pony Foo上](https://ponyfoo.com/articles/es6-modules-in-depth)使用[这个出色的解释器](https://ponyfoo.com/articles/es6-modules-in-depth)。本指南假定您具有ES6模块的工作知识，因此，如果您不了解ES6模块，请阅读该文章！

当您的应用还很年轻时（如果您愿意的话，可以是树苗），您的依赖项可能相对较少。您还将使用添加的大多数（如果不是全部）依赖项。但是，随着您的应用程序老化，可以添加更多依赖项。更为复杂的是，较旧的依赖项已不再使用，但可能不会从您的代码库中删除。最终结果是，应用程序最终会附带大量[未使用的JavaScript](https://developers.google.cn/web/updates/2018/05/lighthouse#unused_javascript)。摇树通过利用我们如何使用静态`import`语句引入ES6模块的特定部分来解决此问题：

```javascript
// Import only some of the utilities!
import { unique, implode, explode } from "array-utils";
```

本`import`示例与上一个示例之间的区别在于，本示例仅导入模块的特定部分，而不是从模块中导入*所有内容*`"array-utils"`（可能很多东西！）。在开发版本中，这实际上并没有任何改变，因为整个模块都可以导入。在产品构建，但是，我们可以配置的WebPack“换血”关 [`export`小号](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export) 从ES6模块没有明确的进口，使这些产品构建更小。在本指南中，您将学习如何做到这一点！

## 寻找机会摇一棵树

出于说明目的，我创建[了一个样本单页应用程序](https://github.com/malchata/webpack-tree-shaking-example)，该[应用程序](https://github.com/malchata/webpack-tree-shaking-example)使用webpack演示摇树的工作原理。您可以克隆它并按照自己的意愿进行操作，但是在本指南中我们将一起介绍每一个步骤，因此不需要克隆（除非您需要动手学习）。

示例应用程序是吉他效果踏板的超级简单可搜索数据库。您输入一个查询，并弹出效果踏板列表。

![用于搜索吉他效果踏板数据库的示例一页应用程序的屏幕快照。](https://developers.google.cn/web/fundamentals/performance/optimizing-javascript/tree-shaking/images/figure-3-1x.png)**图3**。示例应用程序的屏幕截图。

可以预见，驱动此应用程序的行为分为供应商（即 [Preact](https://preactjs.com/)和[Emotion](https://emotion.sh/)）和特定于应用程序的代码束（或webpack称为“块”）：

![Chrome的DevTools的网络面板中显示的两个应用程序代码包（或代码块）的屏幕快照。](https://developers.google.cn/web/fundamentals/performance/optimizing-javascript/tree-shaking/images/figure-4-1x.png)**图4**。该应用程序的两个JavaScript捆绑包。这些是未压缩的大小。

上图中显示的JavaScript捆绑包是生产版本，这意味着它们通过[uglification](http://lisperator.net/uglifyjs/)进行了优化。21.1 KB为应用程序特定的束不差（象*在所有*）。但！应该注意的是，没有任何树木在摇晃。让我们看一下应用程序代码，看看我们可以做些什么来解决这个问题。

**注意：**如果您不关心冗长的解释，而只是想深入研究代码，则可以继续并查看 应用程序的GitHub存储库中[的`tree-shake` 分支](https://github.com/malchata/webpack-tree-shaking-example/tree/tree-shake)。您还可以[比较该分支， `master`](https://github.com/malchata/webpack-tree-shaking-example/compare/tree-shake) 以查看为使摇树工作而进行的更改！

在任何应用程序中，寻找摇树的机会都将涉及寻找静态`import`语句。[在主要组件文件顶部附近](https://github.com/malchata/webpack-tree-shaking-example/blob/master/src/components/FilterablePedalList/FilterablePedalList.js#L4)，您将看到如下一行：

```javascript
import * as utils from "../../utils/utils";
```

也许您以前看过类似的东西。ES6模块导出的导入方法很多，但是类似的方法应该引起您的注意。这种特殊的线说：“嘿，`import` *一切*从 `utils`模块，并把它放在一个叫做命名空间`utils`。” 这里要问的最大问题是：“ 该模块中到底有多少*东西*？”

好吧，如果你看一下[该`utils`模块的源代码](https://github.com/malchata/webpack-tree-shaking-example/blob/master/src/utils/utils.js)，你会发现有一个*很大*。就像大约1,300行代码。

好的，不用担心。也许所有这些东西都被使用了，对吧？*难道*我们需要所有的东西？让我们通过搜索 导入模块[的主要组件文件进行](https://github.com/malchata/webpack-tree-shaking-example/blob/master/src/components/FilterablePedalList/FilterablePedalList.js)仔细检查`utils`，看看出现了多少个命名空间实例。当然，我们必须将所有这些东西用于*某种东西*。

![在文本编辑器中搜索“ utils。”的屏幕快照，仅返回3个结果。](https://developers.google.cn/web/fundamentals/performance/optimizing-javascript/tree-shaking/images/figure-5-1x.png)**图5**。我们从中导入了大量模块的utils名称空间在主组件文件中仅被调用了3次。

好吧，*那*不好。我们仅`utils`在应用程序代码的三个位置使用名称空间。但是对于什么功能呢？如果我们再次看一下主要组件文件，它似乎只是一个函数，它是 `utils.simpleSort`，当更改下拉列表时，该函数用于根据许多条件对搜索结果列表进行排序：

```javascript
if (this.state.sortBy === "model") {
  // Simple sort gets used here...
  json = utils.simpleSort(json, "model", this.state.sortOrder);
} else if (this.state.sortBy === "type") {
  // ..and here...
  json = utils.simpleSort(json, "type", this.state.sortOrder);
} else {
  // ..and here.
  json = utils.simpleSort(json, "manufacturer", this.state.sortOrder);
}
```

所以，那太好了。在具有一堆出口的1,300行文件中，我仅使用其中一个。事实证明，我对webperfs相当不满意。

**注意：**该项目有意保持简单，因此在这种情况下很容易找出膨胀的来源。但是，在具有许多模块的大型项目中，很难找出捆绑包中有多少由进口构成。等工具[的WebPack包分析器](https://www.npmjs.com/package/webpack-bundle-analyzer)和 [源地图的探险家](https://www.npmjs.com/package/source-map-explorer)仍处于开发阶段会有所帮助，但辅助工具，以填补这方面的需求。

当然，现在是承认这个例子是一个时间*位*为这篇文章的利益制造。尽管在这里绝对是这种情况，但这并不能改变这种综合场景类似于您在自己非常真实的应用程序中可能遇到的实际优化机会的事实。因此，既然您已经确定了摇树有用的机会，那么我们实际上*该如何做*呢？

## 防止Babel将ES6模块转换为CommonJS模块

[Babel](https://babeljs.io/)是大多数应用程序必不可少的工具。不幸的是，正是*由于*它为我们所做的事情，它也会使诸如摇树这样的简单任务变得更加困难。如果您使用 [`babel-preset-env`](https://babeljs.io/docs/plugins/preset-env/)，它会自动为您完成的一件事情就是将您的漂亮的ES6模块转换为更广泛兼容的CommonJS模块（即，您使用`require`而不是的模块`import`）。一切都很棒，直到我们要开始摇树。

问题在于，对于CommonJS模块而言，摇树要困难得多，如果您决定使用它们，webpack将不知道从捆绑软件中删除什么。解决方案很简单：我们配置`babel-preset-env`为不使用ES6模块。无论您在何处配置Babel（位于`.babelrc`或中 `package.json`），都意味着要添加一些额外的内容：

```json
{
  "presets": [
    ["env", {
      "modules": false
    }]
  ]
}
```

只需`"modules": false`在您的`babel-preset-env`配置中指定即可使Babel表现出我们想要的行为，这使webpack可以分析您的依赖关系树并摆脱那些未使用的依赖关系。此外，此过程不会引起兼容性问题，因为webpack最终会将您的代码转换为广泛兼容的格式。

## 注意副作用

从应用程序摆脱依赖关系时要考虑的另一个方面是项目的模块是否有副作用。一个副作用的例子是当一个函数在其自身作用域之外修改某些东西时，这是 其执行的*副作用*：

```javascript
let fruits = ["apple", "orange", "pear"];

console.log(fruits); // (3) ["apple", "orange", "pear"]

const addFruit = function(fruit) {
  fruits.push(fruit);
};

addFruit("kiwi");

console.log(fruits); // (4) ["apple", "orange", "pear", "kiwi"]
```

在这个非常基本的示例中，`addFruit`修改`fruits`数组会产生副作用，这超出了`addFruit`函数的范围。

副作用也适用于ES6模块，这在摇树的情况下很重要。采取可预测的输入并吐出相等可预测的输出而不修改其自身范围之外的任何内容的模块是依赖项，如果不使用它们，我们可以放心地摇晃它们。它们是独立的*模块化* 代码段。因此，“模块”。

在涉及webpack的地方，我们可以通过`"sideEffects": false`在项目的 `package.json`文件中指定来暗示软件包及其依赖项没有副作用：

```json
{
  "name": "webpack-tree-shaking-example",
  "version": "1.0.0",
  "sideEffects": false
}
```

或者，您可以告诉webpack哪些特定文件不是没有副作用的：

```json
{
  "name": "webpack-tree-shaking-example",
  "version": "1.0.0",
  "sideEffects": [
    "./src/utils/utils.js"
  ]
}
```

在后一个示例中，未指定的任何文件都将被认为没有副作用。如果您不想将其添加到`package.json`文件中，[也可以通过以下方式在webpack配置中指定此标志： `module.rules`](https://github.com/webpack/webpack/issues/6065#issuecomment-351060570)

## 仅导入我们需要的

因此，我们告诉Babel保留我们的ES6模块，但是现在我们需要对`import`语法进行一些调整，以仅引入`utils`模块中需要的功能。在本指南的示例中，我们需要做的是`simpleSort`：

```javascript
import { simpleSort } from "../../utils/utils";
```

使用这种语法，我们说的是“嘿，只让我`simpleSort`从`utils`模块导出。” 因为我们仅将`simpleSort`而不是整个`utils`模块引入全局范围，所以我们需要将每个实例更改 `utils.simpleSort`为`simpleSort`：

```javascript
if (this.state.sortBy === "model") {
  json = simpleSort(json, "model", this.state.sortOrder);
} else if (this.state.sortBy === "type") {
  json = simpleSort(json, "type", this.state.sortOrder);
} else {
  json = simpleSort(json, "manufacturer", this.state.sortOrder);
}
```

现在我们已经完成了摇树工作所需的一切，让我们退后一步。这是摇动依赖关系树*之前*的webpack输出：

```shell
                 Asset      Size  Chunks             Chunk Names
js/vendors.16262743.js  37.1 KiB       0  [emitted]  vendors
   js/main.797ebb8b.js  20.8 KiB       1  [emitted]  main
```

这是树木摇晃到位*后*的输出：

```shell
                 Asset      Size  Chunks             Chunk Names
js/vendors.45ce9b64.js  36.9 KiB       0  [emitted]  vendors
   js/main.559652be.js  8.46 KiB       1  [emitted]  main
```

虽然这两个捆绑包都缩水了，但实际上`main`这是最大的捆绑包。通过淘汰`utils`模块中未使用的部分，我们设法从该捆绑包中砍掉了大约60％的代码。这不仅减少了脚本下载所需的时间，还缩短了处理时间。

## 当事情不是那么简单时

在大多数情况下，如果您进行了一些细微的更改，摇晃树就可以在最新版本的webpack中工作，但是总有一些例外情况会让您抓狂。例如，[Lodash](https://lodash.com/)在摇树时有点奇怪，因为本指南中描述的方法不起作用。由于Lodash的架构方式，您必须a）安装 [`lodash-es`](https://www.npmjs.com/package/lodash-es)软件包以代替常规old，[`lodash`](https://www.npmjs.com/package/lodash)并b）使用略有不同的语法（称为“樱桃采摘”）摆脱其他依赖项：

```javascript
// This still pulls in all of lodash even if everything is configured right.
import { sortBy } from "lodash";

// This will only pull in the sortBy routine.
import sortBy from "lodash-es/sortBy";
```

如果您希望`import`语法保持一致，则*可以*使用标准`lodash`软件包，然后安装 [`babel-plugin-lodash`](http://babel-plugin-lodash/)。将插件添加到Babel配置中后，就可以使用典型的`import`语法来震动未使用的导出。

如果遇到无法响应树抖动的顽固库，请查看它是否使用ES6语法导出其方法。如果它以CommonJS格式（例如`module.exports`）导出内容，则该代码不会被webpack摇晃。有些插件为CommonJS模块提供了摇树功能（例如 [`webpack-common-shake`](https://github.com/indutny/webpack-common-shake)），但这只能达到[某些您无法摇晃的CommonJS模式的程度](https://github.com/indutny/webpack-common-shake#limitations)。如果要可靠地摆脱应用程序中未使用的依赖项，则应继续使用ES6模块。

## 去摇一些树！

无论您摆脱摇摇欲坠的里程数，都取决于您的应用程序及其特定的依赖项和体系结构。试试吧！如果您知道没有设置模块捆绑程序来执行此优化的事实，那么尝试看看对应用程序有什么好处就没有什么害处。您可以从捆绑软件中删除的任何未使用的代码都是值得进行的优化。

您可能会从摇树中意识到很多收获，或者根本没有收获。但是，通过将构建系统配置为在生产构建中利用此优化优势，并有选择地仅导入应用程序需要的内容，您将主动保持应用程序尽可能的薄。这对于性能以及扩展您的用户都是有好处的。

*特别感谢Kristofer Baxter，Jason Miller，[Addy Osmani](https://developers.google.cn/web/resources/contributors/addyosmani)，[Jeff Posnick](https://developers.google.cn/web/resources/contributors/jeffposnick)，Sam Saccone和[Philip Walton](https://developers.google.cn/web/resources/contributors/philipwalton)的宝贵反馈，这些反馈显着提高了本文的质量。*