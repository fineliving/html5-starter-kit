// 编程基础
module.exports = [
  // '/basic/',
  {
    title: 'HTML(5)', // 必要的
    path: '/basic/html/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    // collapsable: false, // 可选的, 默认值是 true,
    sidebarDepth: 1, // 可选的, 默认值是 1
    children: ['/basic/html/html代码规范', '/basic/html/html语义化'],
  },
  {
    title: 'CSS(3)',
    path: '/basic/css/',
    sidebarDepth: 1,
    children: ['/basic/css/css代码规范', '/basic/css/css样式的书写顺序及原理', '/basic/css/浏览器渲染原理及流程', '/basic/css/关键渲染路径'],
  },
  {
    title: 'JavaScript(ES6+)',
    path: '/basic/js/',
    sidebarDepth: 1,
    children: [],
  },
]
