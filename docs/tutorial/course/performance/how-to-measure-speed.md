# 如何测量速度？

由于用户设备，网络连接和其他因素的差异，实际性能会有很大差异。例如，如果您在办公室中使用有线网络连接来加载网站，并在咖啡厅中使用WiFi将其与负载进行比较，则体验可能会大不相同。市场上有许多工具可以帮助您收集实验室或现场数据来评估页面性能。

## Lab data vs Field data 

![测速工具图形](https://webdev.imgix.net/how-to-measure-speed/measure-speed-cover.png)

**实验室数据**是在具有预定义设备和网络设置的受控环境中收集的性能数据，而**现场数据**是从用户在野外经历的实际页面加载中收集的性能数据。每种类型都有其自身的优势和局限性。

**实验室数据**可提供可重现的结果和调试环境，但可能无法捕获现实世界的瓶颈，也无法与现实世界页面的KPI相关联。使用实验室数据，您需要了解用户的典型设备和网络，并在测试性能时适当地反映这些条件。请记住，即使在具有4G的区域中，在电梯中，通勤时或在类似环境中，用户仍可能会遇到速度较慢或断断续续的连接。

**现场数据**（也称为“真实用户监视”或“ RUM”）可以捕获真实的真实用户体验，并能够与业务KPI相关联，但指标集有限，调试功能也有限。

## 工具

### Lab data

[Lighthouse](https://developers.google.com/web/tools/lighthouse/)获取URL，并对页面进行一系列审核，从而生成有关页面效果的报告。运行Lighthouse的方法有多种，其中包括一个选项，可以从Chrome DevTools中轻松审核页面。

### Field data 

[Chrome User Experience Report (CrUX)](https://developers.google.cn/web/tools/chrome-user-experience-report/)提供的指标可显示现实世界中的Chrome用户如何体验网络上的热门目的地。

### 其他工具

[PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/)提供有关页面的实验室数据和现场数据。它使用Lighthouse收集和分析有关页面的实验室数据，而真实的现场数据则基于Chrome用户体验报告数据集。

[Chrome Developer Tools](https://developers.google.cn/web/tools/chrome-devtools/)是一组直接内置在Google Chrome浏览器中的网络开发者工具。它使您能够分析页面的运行时，以及识别和调试性能瓶颈。

