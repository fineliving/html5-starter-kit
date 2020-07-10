# 如何看待速度工具

Google针对性能数据和性能工具发布了许多指南。此文目的是为营销人员与开发人员整合说明，以帮助他们了解如何考虑性能以及如何浏览Google的所有性能工具产品。

[下载PDF版本](https://developers.google.cn/web/fundamentals/performance/speed-tools/pdf/Infographic-How_To_Think_About_Speed_Tools.pdf)

## 关于性能的常见myths

<img src="https://developers.google.cn/web/fundamentals/performance/speed-tools/images/line-graph.svg" alt="一张纸上有一个折线图。" style="width: 128px;float: left;margin: 20px 40px 40px 0;" />

### myth1

**可以使用单个指标来捕获用户体验。**

单一的时间点无法获得良好的用户体验。它由用户旅程中的一系列关键里程碑组成。了解不同的指标并跟踪对您的用户体验很重要的指标。

<img src="https://developers.google.cn/web/fundamentals/performance/speed-tools/images/network-icons.svg" alt="代表不同设备和网络状况的网络图标的集合。" style="width: 128px;float: left;margin: 0px 40px 40px 0;" />

### myth2

**可以用一个“代表用户”来捕获用户体验。**

由于用户设备，网络连接和其他因素的差异，实际性能会有很大差异。校准您的实验室和开发环境，以测试各种这样的不同条件。使用现场数据来告知针对设备类型（即移动设备与台式机），网络连接（即3G或4G）以及其他关键变量的测试参数的选择。



<img src="https://developers.google.cn/web/fundamentals/performance/speed-tools/images/users.svg" alt="各种不同类型用户的描述。" style="width: 128px;float: left;margin: 0px 40px 40px 0;" />

### myth3

**我的网站对我来说加载速度很快，因此它对我的用户来说加载速度也很快。**

开发人员测试负载性能的设备和网络通常比用户实际体验的速度快得多。使用现场数据了解用户使用的设备和网络，并在测试性能时适当反映这些条件。

## 了解lab data与field data

### lab data

<img src="https://developers.google.cn/web/fundamentals/performance/speed-tools/images/tech.svg" alt="站立在一束的一个人的表示抽象技术概念和象前面。" style="width: 300px;float: right;margin: 0 0 40px 40px;" />

实验室数据是在受控环境中使用预定义的设备和网络设置收集的性能数据。这提供了可重现的结果和调试功能，以帮助识别，隔离和修复性能问题。

#### 长处

- 有助于调试性能问题
- 端到端和深入了解UX
- 可重现的测试和调试环境

#### 局限性

- 可能无法捕获现实世界的瓶颈
- 无法与真实页面的KPI相关

[Lighthouse](https://developers.google.cn/web/tools/lighthouse)和 [WebPageTest](https://www.webpagetest.org/)工具收集此类数据。

### field data

<img src="https://developers.google.cn/web/fundamentals/performance/speed-tools/images/on-the-street.svg" alt="在公共场所使用移动设备对人的描述。" style="width: 300px;float: right;margin: 0 0 40px 40px;" />

（也称为真实用户监视或RUM）
字段数据是从用户在野外经历的真实页面加载中收集的性能数据。

#### 长处

- 捕捉真实的真实用户体验
- 实现与业务关键绩效指标的关联

#### 局限性

- 限制指标集
- 有限的调试功能

[Chrome User Experience Report](https://developers.google.cn/web/tools/chrome-user-experience-report)公共数据集和[PageSpeed Insights](https://developers.google.cn/speed/pagespeed/insights)性能工具收集此类数据。

## 有哪些不同的性能工具？



<figure>
<img src="https://developers.google.cn/web/fundamentals/performance/speed-tools/images/tool-lighthouse.svg" alt="灯塔" style="width:128px;margin: 0 0 40px 40px;" />
<img src="https://developers.google.cn/web/fundamentals/performance/speed-tools/images/tool-webpagetest.svg" alt="WebPageTest" style="width:128px;margin: 0 0 40px 40px;" />
<img src="https://developers.google.cn/web/fundamentals/performance/speed-tools/images/tool-testmysite.svg" alt="TestMySite" style="width:128px;margin: 0 0 40px 40px;" />
<img src="https://developers.google.cn/web/fundamentals/performance/speed-tools/images/tool-psi.svg" alt="PageSpeed见解" style="width:128px;margin: 0 0 40px 40px;" />
<img src="https://developers.google.cn/web/fundamentals/performance/speed-tools/images/tool-speed-scorecard.svg" alt="速度记分卡" style="width:128px;margin: 0 0 40px 40px;" />
<img src="https://developers.google.cn/web/fundamentals/performance/speed-tools/images/tool-impact-calculator.svg" alt="影响力计算器" style="width:128px;margin: 0 0 40px 40px;" />
<img src="https://developers.google.cn/web/fundamentals/performance/speed-tools/images/tool-devtools.svg" alt="Chrome开发人员工具" style="width:128px;margin: 0 0 40px 40px;" />
</figure>

### [Lighthouse](https://developers.google.cn/web/tools/lighthouse)

提供有关如何在性能，可访问性，PWA，SEO和其他最佳实践方面改善网站的个性化建议。

### [WebPageTest](https://www.webpagetest.org/)

使您可以在受控实验室环境中比较一页或多页的性能，并深入研究性能统计信息并在真实设备上测试性能。您也可以在WebPageTest上运行Lighthouse。

### [TestMySite](https://testmysite.thinkwithgoogle.com/)

允许您诊断跨设备的网页性能，并提供修复列表，以改善Webpagetest和PageSpeed Insights的体验。

### [PageSpeed Insights](https://developers.google.cn/speed/pagespeed/insights)

显示您网站的速度字段数据，以及改善它的常见优化建议。

### [Speed Scorecard](https://www.thinkwithgoogle.com/feature/mobile/)

使您可以将移动网站的速度与10多个国家/地区的同行进行比较。移动网站的速度基于“ Chrome用户体验报告”中的真实数据。

### [Impact Calculator](https://www.thinkwithgoogle.com/feature/mobile/)

可让您根据Google Analytics（分析）中的基准数据估算提高移动网站速度的潜在收入机会。

### [Chrome Developer Tools](https://developers.google.cn/web/tools/chrome-devtools)

允许您分析页面的运行时，以及识别和调试性能瓶颈。

## 所以你是...

<img src="https://developers.google.cn/web/fundamentals/performance/speed-tools/images/icon-business.svg" alt="显示图表和图形的书的图标。" style="width: 128px;" />

**营销人员或开发人员试图建立业务案例以改善您网站的用户体验。您讲美元和美分，并且正在寻找可以帮助您量化机会成本和预期提升的货币数据。**

- 使用[Speed Scorecard](https://www.thinkwithgoogle.com/feature/mobile/) 可以查看您的移动网站速度与10多个国家/地区的同行相比。得分是基于“ Chrome用户体验报告”中的真实数据。
- 使用[Impact Calculator](https://www.thinkwithgoogle.com/feature/mobile/)估算提高移动网站速度的潜在收益机会。影响力来自Google Analytics（分析）的基准数据。
- 使用[TestMySite](https://testmysite.thinkwithgoogle.com/)与行业基准一起测试页面的移动加载时间，并了解简单的修补程序如何加快您的网站并减少访问者的流失；TestMySite当前由WebPageTest和PageSpeed Insights支持。

<img src="https://developers.google.cn/web/fundamentals/performance/speed-tools/images/icon-dev.svg" alt="带有Chrome徽标的笔记本电脑图标，位于其后方和上方。" style="width: 128px;" />

**开发人员试图了解实际的Chrome用户所体验到的网站当前性能，并根据行业最新趋势和指南寻求审计建议。**

[PageSpeed Insights](https://developers.google.cn/speed/pagespeed/insights)可帮助您了解Chrome用户所体验到的网站的真实性能，并推荐优化机会。

<img src="https://developers.google.cn/web/fundamentals/performance/speed-tools/images/icon-audit.svg" alt="Lighthouse审核结果页面的图标。" style="width: 128px;" />

**试图根据现代Web性能最佳实践理解和审核网站的开发人员。**

[Lighthouse](https://developers.google.cn/web/tools/lighthouse)包含一系列全面的性能机会；它为您提供了页面上缺少的性能机会的列表，以及通过实施每种优化节省的时间，这可以帮助您了解应该做什么。

<img src="https://developers.google.cn/web/fundamentals/performance/speed-tools/images/icon-debug.svg" alt="一个放大镜的象在臭虫的。" style="width: 128px;" />

**开发人员正在寻找有关如何调试/深入了解您网站性能的技术指导。**

[Chrome Developer Tools](https://developers.google.cn/web/tools/chrome-devtools)（CDT）包含一个“性能面板”，通过使用自定义配置对网站进行概要分析，您可以深入了解网站的性能问题，从而可以跟踪性能瓶颈。您可以在网站的生产或开发版本上使用CDT。

[WebPageTest](https://www.webpagetest.org/)包含一套高级的指标和跟踪查看器。它可以在网络条件下深入研究您的站点在实际移动硬件上的性能。

