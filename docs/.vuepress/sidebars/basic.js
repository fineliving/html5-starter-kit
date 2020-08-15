// 编程基础
module.exports = [
  // '/basic/',
  {
    title: 'HTML(5)', // 必要的
    path: '/basic/html/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    // collapsable: false, // 可选的, 默认值是 true,
    sidebarDepth: 1, // 可选的, 默认值是 1
    children: [
      {
        title: '元素',
        path: '/basic/html/元素',
        children: ['/basic/html/块元素列表', '/basic/html/行内元素列表', '/basic/html/可变元素列表', '/basic/html/空元素列表', '/basic/html/行内元素&块状元素&行内块状元素'],
      },
      {
        title: 'DOM',
        path: '/basic/html/元素',
        children: ['/basic/html/语义化'],
      },
      {
        title: '语义化',
        path: '/basic/html/元素',
        children: ['/basic/html/语义化'],
      },
      '/basic/html/代码规范',
    ],
  },
  {
    title: 'CSS(3)',
    path: '/basic/css/',
    sidebarDepth: 1,
    children: [
      {
        title: 'CSSOM',
        children: [],
      },
      {
        title: '选择器',
        children: [],
      },
      {
        title: '布局',
        children: ['/basic/css/居中', '/basic/css/垂直居中'],
      },
      {
        title: '交互',
        children: [],
      },
      {
        title: '代码规范',
        children: ['/basic/css/代码规范', '/basic/css/代码书写顺序', '/basic/css/代码命名规范'],
      },
      '/basic/css/伪类',
    ],
  },
  {
    title: 'JavaScript(ES6+)',
    path: '/basic/js/',
    sidebarDepth: 1,
    children: [
      {
        title: '类型',
        children: [],
      },
      {
        title: '原型链',
        children: [],
      },
      {
        title: '作用域',
        children: [],
      },
      {
        title: '闭包',
        children: [],
      },
      {
        title: '事件',
        children: [],
      },
      {
        title: '异步',
        children: [],
      },
      {
        title: '正则表达式',
        children: [],
      },
    ],
  },
]
