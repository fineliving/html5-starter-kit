# 上班前

在收集用于站点审核的性能指标之前，您可以执行多项检查来确定简单的修复程序和需要关注的领域。

## 完整性检查：架构和代码

[偿还技术债务！](http://wiki.c2.com/?TechnicalDebt)

**在** 评估性能**之前，**尽可能修复简单的错误并删除不需要的资产和代码**，**但请确保保留问题和修复的前后记录。这些改进仍然可以作为审核工作的一部分。

**网站的体系结构和资产是否**
可以轻松地从代码库和网站中删除任何内容，例如未使用的旧页面，内容或其他资产？检查孤立页面，冗余模板，未使用的图像以及[未使用的代码和库](https://developers.google.cn/web/updates/2017/04/devtools-release-notes#coverage)。

**运行时错误**
检查浏览器控制台中报告的错误。不应有任何:)。

**Linting**
HTML，CSS或JavaScript代码是否存在错误？在您的工作流程中使用linting可以帮助保持代码质量并避免退化。我们建议使用 [HTMLHint](http://htmlhint.com/)，[StyleLint](https://stylelint.io/)和 [ESLint](http://eslint.org/)，它们可用作代码编辑器插件，或者在工作流流程和[Travis之](https://travis-ci.org/)类的持续集成工具中从命令行运行 。


断开的**链接和图像**有很多工具可以在构建时和运行时测试断开的链接，包括Chrome扩展程序（[这个](https://chrome.google.com/webstore/detail/check-my-links/ojkcdipcgfaekbeaelaapakgnjflfglf) 很好）和Node工具（例如 [Broken Link Checker）](https://github.com/stevenvachon/broken-link-checker)。

**插件**
诸如Flash和Silverlight之类的插件可能会带来安全隐患，[不建议使用](https://blog.chromium.org/2014/11/the-final-countdown-for-npapi.html)它们的支持 ，并且它们无法在移动设备上使用。[使用Lighthouse检查插件](https://developers.google.cn/web/tools/lighthouse/audits/plugins)。

## 使用各种设备和环境进行测试

没有什么比让真正的人使用真实的设备，多个浏览器和不同的连接上下文来测试您的站点更好的了。

其中一些检查是相对主观的，但是它们可以识别影响感知性能的问题。例如，断开的链接会浪费时间并感到“无响应”。文字难以理解。

**跨设备测试**
尝试不同的视口和窗口大小。至少使用一台移动设备和一台台式设备。如果可能，请在屏幕较小的低规格移动设备上尝试您的网站。文字可读吗？是否有图像损坏？可以放大吗？触摸目标足够大吗？慢吗？是否有任何功能没有响应？屏幕截图或视频结果。

**跨平台测试**
您瞄准**的平台**是什么？您需要在用户现在和将来使用的浏览器和操作系统上进行测试。


[对多种目标网络类型进行](https://developers.google.cn/web/fundamentals/performance/poor-connectivity#testing)**连通性**[测试](https://developers.google.cn/web/fundamentals/performance/poor-connectivity#testing)：已连接，WiFi和蜂窝网络。您可以使用浏览器工具来[模拟各种网络状况](https://developers.google.cn/web/tools/chrome-devtools/network-performance/network-conditions)。

**设备**
确保在与用户相同的设备上试用您的网站。下图显示了两个不同手机上的同一页面。

![在高规格和低规格手机上运行的博客文章页面](https://developers.google.cn/web/fundamentals/performance/audit/images/two-devices.jpg)

在较大的屏幕上，文本较小，但可读。在较小的屏幕上，浏览器可以正确呈现布局，但是即使放大也无法阅读文本。显示内容模糊并且具有“色偏”（白色看上去不是白色），因此内容难以辨认。

诸如此类的简单发现可能比模糊的性能数据更重要！

## 试用UI和UX

**可访问性，可用性和可读性**
为了确保每个人都可以访问您网站的内容和功能，您需要了解用户的多样性。 [Lighthouse](https://developers.google.cn/web/tools/lighthouse)和其他工具会测试特定的可访问性问题，但是没有什么能比真实世界的测试更好。尝试在各种情况下读取，浏览和输入数据：例如，户外在阳光下或火车上。让一系列的朋友，家人和同事尝试您的网站。尝试通过屏幕阅读器（例如 Mac 上的[VoiceOver](https://www.youtube.com/watch?v=5R-6WvAihms&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g&index=6)或Windows 上的 [NVDA）](https://www.youtube.com/watch?v=Jao3s_CwdRU&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g&index=4)消费内容。

您可以在[Udacity有关辅助功能的课程](https://developers.google.cn/web/fundamentals/accessibility)和Web基础知识文章[如何进行辅助功能检查中](https://developers.google.cn/web/fundamentals/accessibility/how-to-review)找到有关实现和检查辅助功能的更多信息。

记录您的可访问性审核。很有可能您将能够进行对所有用户都有益的简单改进。

**基本的UI和UX问题**
交互无法正常进行，较小的窗口和视口上的元素溢出，点击目标太小，内容不可读，滚动不稳定...在网站上打开多个页面，尝试导航和所有核心功能功能。保持纪录。

**图像，音频和视频**
测试内容是否溢出，[宽高比不正确](https://chrome.google.com/webstore/detail/image-checker/bacnicogfgpigmmenfiplfiofpkocpii)，裁剪不佳以及质量问题。

**主观的UI测试**
这些可能并非全部相关，但是简单的更改可以使重构更容易：

- 是“我在这里可以做什么？打开网站时立即清除？
- 您是否被吸引去消费内容并关注链接？
- 是否存在视觉层次结构或途径-或所有事物都具有相同的视觉分量？
- 布局是否混乱？
- 字体太多吗？
- 是否有可以删除的图像或其他内容？
- 内容设计与界面设计同等重要。您网站上的文本和图像内容是否适合移动和桌面环境？可以消除任何东西吗？ [写手机](https://developers.google.cn/web/fundamentals/design-and-ui/responsive/content)。