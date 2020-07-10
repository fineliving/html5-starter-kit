# 文字内容

文字：字母和数字，单词和短语，句子和段落。这就是我们在网页中传达大多数含义的方式。文字内容向读者（不仅仅是“访客”）提供信息，描述，解释概念和程序。这是网络交流的基础。

网络上的文本内容始终具有某种结构-即使仅是自上而下和某些格式-即使仅在默认情况下也是如此。它也可以根据读者的行为或作者的意图表现出行为，移动或变化，出现或消失。但是，就其本身而言，文本内容没有这些品质和能力。其结构，外观和行为会受到其他基于文本的资源（例如HTML，CSS和JavaScript代码）的实现和影响。

在网页中，必须从服务器获取该内容，结构，格式和行为的每个字符，并将其下载到浏览器，这绝对是不平凡的任务。在本节中，我们将介绍一些有效的方法来加速文本内容的加载。

## 将开发与部署分开

当您减少文本资源的大小并采取其他影响其可读性的操作时，请务必记住，一旦修改了一部分代码以进行部署，通常您将无法再读取它，更不用说对其进行维护了。始终将开发文件和部署文件分开，以避免将开发文件替换为部署版本。尽管，如果确实发生了这种情况，但是代码美化程序或“ unminifier”（例如，[http://unminify.com/](http://unminify.com/)）可能会节省一天的时间。

## 缩小代码

一种简单有效的方法是*minification*，它实质上是通过在不更改其有效性或功能的情况下删除其空白和不必要的字符来压缩文本资源。听起来没什么用，但是有用。例如，此小功能（表排序脚本的一部分）最初包含348个字符。

```js
function sortables_init() {
    // Find all tables with class sortable and make them sortable
    if (!document.getElementsByTagName) return;
    var tbls = document.getElementsByTagName("table");
    for (ti=0;ti<tbls.length;ti++) {
     thisTbl = tbls[ti];
     if (((' '+thisTbl.className+' ').indexOf("sortable") != -1) && (thisTbl.id)) {
         ts_makeSortable(thisTbl);
     }
    }
}
```

缩小后，看起来像这样，仅包含257个字符。

```js
function sortables_init(){if(!document.getElementsByTagName)return;var tbls=document.
getElementsByTagName("table");for(ti=0;ti<tbls.length;ti++){thisTbl=tbls[ti];
if(((''+thisTbl.className+'').indexOf("sortable")!=-1)&&(thisTbl.id)){ts_makeSortable(thisTbl)}}}
```

当然，我们现在无法阅读，但浏览器仍然可以。大小和所需的下载时间减少了26％；即使对于这个小样本也非常重要。

从更大的角度看，该片段所来自的整个脚本块超过10k，但是在缩小之后，它减少到了5,411个字符，减少了48％。

可以用相同的方式最小化HTML和CSS，以便您可以缩短格式设置和行为相关代码的加载时间。

许多（许多！）在线和桌面缩小工具都可用。由于其长久且稳定的特性，最受欢迎的在线工具之一是 [Kangax HTML Minifier](https://kangax.github.io/html-minifier/)，它为缩小的代码提供了广泛的输出自定义选项。

其他缩小工具包括：

- [Minifier](http://www.minifier.org/)：在线工具可通过复制和粘贴来最小化JavaScript或CSS。
- [HTML Minifier](http://www.willpeavy.com/minifier/)：此在线工具还可以处理HTML，并自动识别代码类型。
- [Node module for Grunt](https://www.npmjs.com/package/grunt-html-minify)：集成到Grunt工作流程中的NPM缩小软件包。
- [Node module for Gulp](https://www.npmjs.com/package/gulp-html-minifier)：一个集成到Gulp工作流程中的NPM缩小软件包。
- [Node module for HTML Minifier](https://www.npmjs.com/package/html-minifier)：一个NPM软件包，其中包括一个有用的图表，将其压缩结果与其他方法进行了比较。

### 构架

当然，您在编写时会（或将）使用框架，IDE或其他结构化环境的机会很大，而不是一次将代码复制/粘贴到Web应用程序中一个文件。大多数现代系统具有内置的功能，可在构建过程中使开发文件与部署分开，并能够在执行过程中执行各种转换，如缩小。

例如，包含HTML缩小的Gulp开发到部署任务可能看起来像这样。

```js
var gulp = require('gulp');
var htmlmin = require('gulp-html-minifier');
gulp.task('minify', function() {
  gulp.src('./src/*.html') //development location
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist')) //deployment location
});
```

该任务的执行命令将是：

```
gulp minify
```

（来源：[npmjs](https://www.npmjs.com/package/gulp-html-minifier)）

请注意，该任务将HTML文件从其原始位置传递到部署位置，从而在构建期间将它们最小化。这不仅防止了源文件的潜在不可逆修改，而且避免了在以后的开发和测试过程中污染生产环境。

## 压缩文字资源

到目前为止，我们已经讨论了有关单个图像和文本文件的压缩。但是，如果我们还可以让我们的服务器自动压缩整个文件集，那也将有所帮助，这就是Gzip的用处。

Gzip是用于压缩和解压缩文件的应用程序（及其文件格式）。与单独文件压缩一样，它通过减小资源大小来减少传递服务器响应所需的时间。可通过GNU Project网站获得。

https://www.gnu.org/software/gzip/

Gzip在文本资源上表现最佳，并且可以定期实现高达70％的压缩（对于大文件甚至更高）。但是，压缩已单独压缩的非文本资源（例如图像）通常不会显着减小大小。

与基于桌面或基于浏览器的本地压缩不同，Gzip在服务器上用于识别和处理您指定的某些文件类型。尽管所有现代浏览器都支持HTTP请求的Gzip压缩，但您必须正确配置服务器以在请求压缩资源时将其交付。当然，不同的服务器类型具有不同的设置要求。例如，您可以通过`.htaccess`文件配置Apache服务器，该文件将包含以下内容。

```
<IfModule deflate_module>
    # Enable compression for the following file types
    AddOutputFilterByType           \
     DEFLATE                        \
      application/javascript        \
      text/css                      \
      text/html                     \
      text/javascript               \
      text/plain                    \
      text/xml
</IfModule>
```

BetterExplained上有一篇有关[Gzip压缩](https://betterexplained.com/articles/how-to-optimize-your-site-with-gzip-compression/)的非常好的文章，包括背景信息，示例和警告。

因此，在服务器上启用GZip后，如何知道它实际上是否在提供压缩文件？一种简单的查找方法是在GIDNetwork的Gzip测试站点进行检查。

http://www.gidnetwork.com/tools/gzip-test.php

该报告包括有关站点压缩的一般信息，一个有趣的“假设条件”图表，该图表显示了在各种Gzip压缩级别下站点将获得多少压缩，以及响应标题和页面源。

在这里，我们对GIDNetwork自己的根URL进行了测试-有趣的是，它似乎没有被压缩。

![GIDNetwork](https://developers.google.cn/web/fundamentals/performance/get-started/images/image_303.png)

Gzip可以进一步压缩已经压缩的文件，这是一种有效的方法。实际上，要获得基于文本的资源的最大压缩率，请先在部署之前分别对其进行最小化，然后在交付时通过启用Gzip的服务器对其进行压缩。

## 减少Library使用

流行的CSS和JavaScript库会尽力减少和压缩其下载文件，但总的来说，它们仍然是相当严重的带宽消耗者。例如，jQuery（取决于版本和所应用的压缩算法）的范围可能从28k到250k以上。如果需要给定库的大多数功能，则可以；但是如果您只需要一两个特定的东西，则可以通过将这些功能替换为一次性功能或CSS规则来节省大量下载时间。

例如，一个网站可能使用jQuery的便捷`toggleClass`功能来翻转类，以执行特定的操作。

```
$(el).toggleClass(className);
```

是的，它很好用，并且很容易编写代码，但是jQuery的大量下载开销只是一种效果。您可能会考虑将庞大的库换成更小的单一用途函数（来源：[You Might Not Need jQuery](http://youmightnotneedjquery.com/#toggle_class) ）。

```js
if (el.classList) {
  el.classList.toggle(className);
} else {
  var classes = el.className.split(' ');
  var existingIndex = classes.indexOf(className);

  if (existingIndex >= 0)
    classes.splice(existingIndex, 1);
  else
    classes.push(className);

  el.className = classes.join(' ');
}
```

关键是，如果您不需要整个250k的库，请不要下载它。而是查找并使用仅满足您需要的小型单一用途例程。（并且不要忘记缩小它们！）

在[You Might Not Need jQuery](http://youmightnotneedjquery.com/)时，您可以找到jQuery代码的许多有趣且直截了当的替代方法 ，该指南探讨了现代Web的发展方式，以提供与以前使用jQuery相同的功能。

## 摘要

虽然像图像这样的大件物品往往会引起人们对速度提高的关注，但文本资源（无疑是大多数网站的主要内容）通常被忽略了。寻找加快网页浏览速度的方法时，请不要忽略可见的和幕后的基于文本的组件。