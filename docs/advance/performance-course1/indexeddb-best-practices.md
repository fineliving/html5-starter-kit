# 使用IndexedDB的最佳实践

当用户首次加载网站或应用程序时，在构造用于呈现UI的初始应用程序状态时通常会涉及大量工作。例如，有时应用程序需要对用户客户端进行身份验证，然后发出多个API请求，然后才能拥有需要在页面上显示的所有数据。

将应用程序状态存储在 [IndexedDB中](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) 可能是加快重复访问的加载时间的好方法。然后，该应用程序可以使用[陈旧的重新验证](https://www.mnot.net/blog/2007/12/12/stale)策略，在后台与任何API服务进行同步，并用新数据懒惰地更新UI 。

IndexedDB的另一个好用法是存储用户生成的内容，既可以将其存储为上载到服务器之前的临时存储，也可以存储为远程数据的客户端高速缓存，或者当然也可以存储两者。

但是，在使用IndexedDB时，要考虑许多重要的事情，对于刚接触API的开发人员来说可能不是立即显而易见的。本文回答了常见问题，并讨论了在IndexedDB中持久存储数据时要记住的一些最重要的事情。

## 使您的应用程序可预测

关于IndexedDB的许多复杂性源于您（开发人员）无法控制的众多因素。本节探讨使用IndexedDB时必须记住的许多问题。

### 并非所有内容都可以存储在所有平台上的IndexedDB中

如果要存储用户生成的大文件，例如图像或视频，则可以尝试将它们存储为`File`或`Blob`对象。这将在某些平台上有效，但在其他平台上则会失败。尤其是iOS上的Safari无法将`Blob`s 存储在IndexedDB中。

幸运的是，将a `Blob`转换为`ArrayBuffer`，反之亦然并不困难。`ArrayBuffer`很好地支持将s 存储 在IndexedDB中。

但是请记住，a `Blob`具有MIME类型，而a `ArrayBuffer`没有。您需要将类型存储在缓冲区旁边，以便正确进行转换。

要将转换为`ArrayBuffer`，`Blob`您只需使用`Blob`构造函数。

```
function arrayBufferToBlob(buffer, type) {
  return new Blob([buffer], {type: type});
}
```

另一个方向稍微复杂一些，并且是一个异步过程。您可以使用 `FileReader`对象将blob读取为`ArrayBuffer`。读取完成后`loadend` ，将在读取器上触发一个事件。您可以`Promise`像这样包装此过程：

```
function blobToArrayBuffer(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('loadend', (e) => {
      resolve(reader.result);
    });
    reader.addEventListener('error', reject);
    reader.readAsArrayBuffer(blob);
  });
}
```

### 写入存储可能失败

写入IndexedDB时可能由于多种原因而发生错误，在某些情况下，这些原因是开发人员无法控制的。例如，[在私有浏览模式下](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API#Browser_compatibility)，某些浏览器当前不允许[写入IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API#Browser_compatibility)。用户还有可能在几乎磁盘空间不足的设备上使用，浏览器将限制您完全不存储任何内容。

**注意：**目前正在开发 新的[存储API](https://storage.spec.whatwg.org/)，这将使开发人员能够在写入之前[估算](https://storage.spec.whatwg.org/#usage-and-quota)出可用的存储空间，并请求更大的存储配额甚至[永久存储](https://storage.spec.whatwg.org/#persistence)，这意味着用户可以选择保留来自一些网站，即使执行标准的[清除缓存/ cookie](https://support.google.com/accounts/answer/32050)操作也是如此。

因此，始终在IndexedDB代码中实施正确的错误处理至关重要。这也意味着通常将应用程序状态保存在内存中（除了存储状态）是一个好主意，因此在私有浏览模式下运行或存储空间不可用时，UI不会中断（即使其他一些状态）需要存储的应用程序功能将无法使用）。

您可以通过添加一个事件处理程序赶上IndexedDB的操作错误，`error`当你创建一个事件`IDBDatabase`，`IDBTransaction`或`IDBRequest`对象。

```
const request = db.open('example-db', 1);
request.addEventListener('error', (event) => {
  console.log('Request error:', request.error);
};
```

### 用户可能已修改或删除了存储的数据

与可以限制未经授权访问的服务器端数据库不同，浏览器扩展和开发人员工具可以访问客户端数据库，并且用户可以清除它们。

尽管用户修改其本地存储的数据并不常见，但用户清除它们却很普遍。重要的是您的应用程序可以处理这两种情况而不会出错。

### 存储的数据可能已过期

与上一节类似，即使用户自己没有修改数据，存储在数据库中的数据也可能是由旧版本的代码编写的，可能是其中包含错误的版本。

IndexedDB通过其[`IDBOpenDBRequest.onupgradeneeded()`](https://developer.mozilla.org/en-US/docs/Web/API/IDBOpenDBRequest/onupgradeneeded) 方法内置了对模式版本和升级的支持 。但是，您仍然需要编写升级代码，使其可以处理来自先前版本（包括带有错误的版本）的用户。

单元测试在这里非常有用，因为手动测试所有可能的升级路径和案例通常是不可行的。

## 保持应用性能

IndexedDB的主要功能之一是它的异步API，但是不要让您自欺欺人以为您在使用它时不必担心性能。在许多情况下，使用不当仍会阻塞主线程，这可能导致混乱和无响应。

通常，对IndexedDB的读取和写入不应大于正在访问的数据所需的大小。

虽然IndexedDB可以将大型嵌套对象存储为单个记录（从开发人员的角度来看这样做确实很方便），但应避免这种做法。究其原因是因为当IndexedDB的存储对象，它必须首先创建一个[结构化的克隆](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm) 那个对象，而结构化克隆的过程发生在主线程。物体越大，遮挡时间越长。

在计划如何将应用程序状态持久化到IndexedDB时，这带来了一些挑战，因为大多数流行的状态管理库（例如 [Redux](http://redux.js.org/)）都通过将整个状态树作为一个JavaScript对象进行管理来工作。

尽管以这种方式管理状态有很多好处（例如，它使您的代码易于推理和调试），并且虽然将整个状态树作为单个记录存储在IndexedDB中可能很诱人和方便，但在每次更改后都这样做（即使如果进行了节流/去抖动），将导致不必要的主线程阻塞，这将增加写入错误的可能性，在某些情况下，甚至会导致浏览器选项卡崩溃或变得无响应。

不应将整个状态树存储在单个记录中，而应将其分解为单个记录，而仅更新实际更改的记录。

如果在IndexedDB中存储图像，音乐或视频等大型项目，情况也是如此。将每个项目使用其自己的密钥而不是存储在更大的对象中，这样您就可以检索结构化数据，而无需支付还检索二进制文件的费用。

与大多数最佳做法一样，这不是一无所有的规则。在无法分解状态对象并仅写入最小变更集的情况下，将数据分解为子树并仅写入子树比始终写入整个状态树仍然可取。几乎没有改善总比没有改善好。

最后，您应该始终[衡量所](https://developers.google.cn/web/updates/2017/06/user-centric-performance-metrics)编写代码[对性能的影响](https://developers.google.cn/web/updates/2017/06/user-centric-performance-metrics)。确实，对IndexedDB的小写操作要比大写的性能好，但这仅在您的应用程序对IndexedDB的写操作实际上导致[长时间的任务](https://developers.google.cn/web/updates/2017/06/user-centric-performance-metrics#long_tasks) 阻塞主线程并降低用户体验时才有意义 。测量很重要，这样您才能了解要优化的内容。

## 结论

开发人员可以利用IndexedDB之类的客户端存储机制来改善应用程序的用户体验，不仅可以在会话之间保持状态，还可以减少重复访问时加载初始状态所需的时间。

正确使用IndexedDB可以极大地改善用户体验，但是错误地使用它或处理错误情况将导致应用程序损坏和用户不满意。

由于客户端存储涉及许多无法控制的因素，因此至关重要的是，您的代码必须经过良好的测试，并能够正确处理错误，即使最初看来不太可能发生的错误也是如此。