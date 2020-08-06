# 检查网站安全

没有HTTPS，您将无法构建PWA。

通过HTTPS为您的网站提供服务是安全性的基础，没有它，许多API都无法使用。如果您需要证明实施成本的合理性，请找出[HTTPS为何重要](https://developers.google.cn/web/fundamentals/security/encrypt-in-transit/why-https)。

如果站点对任何资产使用HTTP，则会在URL栏中警告用户。Chrome显示如下警告。

![Chrome“不安全”警告](https://developers.google.cn/web/fundamentals/performance/audit/images/not-secure.png)*在Chrome 68中，如果不是所有资产都使用HTTPS，则地址栏会发出警告*

HTTPS应该在任何地方实现，而不仅仅是在登录或结帐页面上。任何不安全的页面或资产都可能成为攻击的载体，从而使您的网站对用户和企业负有责任。

使用[Chrome DevTools安全性面板](https://developers.google.cn/web/tools/chrome-devtools/security)可轻松检查站点安全性。记录任何问题。

以下示例中的站点不安全，因为某些资产是通过HTTP提供的。



![Chrome DevTools安全面板](https://developers.google.cn/web/fundamentals/performance/audit/images/devtools-security-1000.png)*Chrome DevTools安全面板*