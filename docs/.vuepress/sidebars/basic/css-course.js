// CSS(3)的总结教程
module.exports = [
  '/basic/css-course/',
  {
    title: 'css性能——渲染',
    children: ['/basic/css-course/css样式的书写顺序及原理', '/basic/css-course/浏览器渲染原理及流程', '/basic/css-course/关键渲染路径'],
  },
  {
    title: 'order loading thoughtfully(精心安排加载)',
    children: [
      '/basic/css-course/critical-rendering-path',
      '/basic/css-course/constructing-the-object-model',
      '/basic/css-course/render-tree-construction',
      '/basic/css-course/render-blocking-css',
      '/basic/css-course/adding-interactivity-with-javascript',
      '/basic/css-course/measure-crp',
      '/basic/css-course/analyzing-crp',
      '/basic/css-course/page-speed-rules-and-recommendations',
      '/basic/css-course/http2',
    ],
  },
]
