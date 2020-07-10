# HTTP缓存

当有人访问网站时，该网站需要显示和操作的所有内容都必须来自某个地方。浏览器必须检索所有文本，图像，CSS样式，脚本，媒体文件等，以进行显示或执行。您可以给浏览器选择可以从何处检索资源的选择，这可以极大地提高页面的加载速度。

浏览器第一次加载网页时，会将页面资源存储在 [HTTP Cache](https://developers.google.cn/web/fundamentals/performance/optimizing-content-efficiency/http-caching) 中。下次浏览器访问该页面时，它可以在高速缓存中查找以前获取的资源，然后从磁盘检索它们，其速度通常比从网络上下载它们的速度快。

虽然HTTP缓存是根据[Internet工程任务组（IETF）规范进行](https://tools.ietf.org/html/rfc7234)标准化的 ，但浏览器可能具有多个缓存，这些缓存在获取，存储和保留内容的方式上有所不同。您可以在这篇出色的文章[《四个缓存的故事》中](https://calendar.perfplanet.com/2016/a-tale-of-four-caches/)了解这些缓存的变化方式 。

当然，您页面的每个首次访问者都不会为该页面缓存任何内容。即使是重复访问者，HTTP缓存中的资源也可能很少。他们可能已经手动清除了该文件，或者将其浏览器设置为自动清除，或者使用控制键组合强制重新加载了新页面。尽管如此，您的大量用户仍可以使用至少一些已缓存的组件来重新访问您的站点，这可能会大大缩短加载时间。最大化缓存使用率对于加快回访至关重要。

## 启用缓存

缓存通过根据某些页面资源的更改频率或不频繁程度对它们进行分类来工作。例如，您网站的徽标图像可能几乎永远不会更改，但是您网站的脚本可能每隔几天就更改一次。确定哪些类型的内容更静态和哪些更动态对您和您的用户有益。

同样重要的是要记住，我们所认为的浏览器缓存实际上可能发生在原始服务器和客户端浏览器之间的任何中间站点，例如代理缓存或内容交付网络（CDN）缓存。

## 缓存头

缓存头的两种主要类型分别是cache [-control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control) 和 [expires](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Expires)，它们定义资源的缓存特征。通常，缓存控制被认为是一种比到期更为现代和灵活的方法，但是两个标头可以同时使用。

缓存标头应用于服务器级别的资源（例如，在`.htaccess` Apache服务器上的文件中，几乎所有活动网站的一半都在使用该文件）来设置其缓存特征。通过标识资源或资源类型（例如图像或CSS文件），然后使用所需的缓存选项指定资源的标头来启用缓存。

### 缓存控制

您可以使用逗号分隔列表中的各种选项来启用缓存控制。这是一个Apache `.htaccess`配置示例，该示例将与扩展列表匹配的各种图像文件类型的缓存设置为一个月并具有公共访问权限（一些可用选项在下面讨论）。

```
<filesMatch ".(ico|jpg|jpeg|png|gif)$">
 Header set Cache-Control "max-age=2592000, public"
</filesMatch>
```

本示例将样式和脚本（可能比图像更可能更改的资源）的缓存设置为一日和公众访问。

```
<filesMatch ".(css|js)$">
 Header set Cache-Control "max-age=86400, public"
</filesMatch>
```

缓存控制具有许多选项，通常称为*指令*，可以设置这些选项以专门确定如何处理缓存请求。下面解释一些常见的指令；您可以在“ [性能优化”部分](http://tinyurl.com/ljgcqp3)和 [Mozilla开发人员网络中](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)找到更多信息 。

- **no-cache**：有点用词不当，它指定可以缓存内容，但是，如果这样，则必须在每个请求上重新验证内容，然后才将其提供给客户端。这迫使客户端检查新鲜度，但允许客户端避免在资源未更改的情况下再次下载资源。与**无商店**互斥。
- **no-store**：指示实际上任何主缓存或中间缓存都不能以任何方式缓存内容。对于可能包含敏感数据的资源，或几乎每次访问都会改变的资源，这是一个很好的选择。与**no-cache**互斥。
- **public**：指示内容可以由浏览器和任何中间缓存缓存。覆盖使用HTTP身份验证的请求的默认**专用**设置。与**私人**互斥。
- **private**：指定可以由用户的浏览器存储但不能由任何中间缓存缓存的内容。通常用于特定于用户的但不是特别敏感的数据。与**公众**互斥。
- **max-age**：定义在必须重新验证内容或再次从原始服务器下载之前，内容可以缓存的最长时间。此选项通常替换expires标头（请参见下文），并以秒为单位取一个值，最大有效期限为一年（31536000秒）。

### 过期缓存

您还可以通过为某些类型的文件指定过期时间来启用缓存，该时间告诉浏览器在向服务器请求新副本之前使用缓存资源的时间。expires标头只是设置内容应在将来的时间。此后，对内容的请求必须返回到原始服务器。使用更新和更灵活的高速缓存控制标头，expires标头通常用作备用。

这是一个示例，说明如何`.htaccess`在Apache服务器上的文件中设置缓存。

```
## EXPIRES CACHING ##
ExpiresActive On
ExpiresByType image/jpg "access plus 1 year"
ExpiresByType image/jpeg "access plus 1 year"
ExpiresByType image/gif "access plus 1 year"
ExpiresByType image/png "access plus 1 year"
ExpiresByType text/css "access plus 1 month"
ExpiresByType application/pdf "access plus 1 month"
ExpiresByType text/x-javascript "access plus 1 month"
ExpiresByType application/x-shockwave-flash "access plus 1 month"
ExpiresByType image/x-icon "access plus 1 year"
ExpiresDefault "access plus 2 days"
## EXPIRES CACHING ##
```

（来源：[GTmetrix](https://gtmetrix.com/leverage-browser-caching.html)）

如您所见，在此示例中，不同类型的文件具有不同的到期日期：访问/缓存后图像不会过期一年，而脚本，PDF和CSS样式在一个月后过期，并且任何未明确列出的文件类型两天后过期。保留期限取决于您，应根据文件类型及其更新频率选择保留期限。例如，如果您定期更改CSS，则可能要使用较短的有效期，甚至根本不使用，并将其默认设置为最少两天。相反，如果您链接到几乎从未更改过的静态PDF表单，则可能要对它们使用更长的到期时间。

**提示：**有效期不要超过一年；如上所述，这是`max-age`缓存控制下的最大值，是互联网上永远有效的。

## 摘要

缓存是提高页面加载速度，从而提高用户体验的可靠且省力的方法。它足够强大，可以为特定的内容类型提供细微差别，但是足够灵活，可以在网站内容更改时轻松进行更新。

对缓存要有主见，但也要注意，如果以后更改具有较长保留期的资源，可能会无意间使一些重复访问者失去较新的内容。您可以在“ [缓存最佳实践”和“最大寿命”中](https://jakearchibald.com/2016/caching-best-practices/)找到有关缓存模式，选项和潜在陷阱的精彩讨论 。