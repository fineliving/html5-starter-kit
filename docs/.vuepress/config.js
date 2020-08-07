const basicSidebar = require('./sidebars/basic')
const softwareSidebar = require('./sidebars/software')
const librarySidebar = require('./sidebars/library')
const advanceSidebar = require('./sidebars/advance')
const engineeringSidebar = require('./sidebars/engineering')
const thoughtSidebar = require('./sidebars/thought')
const branchSidebar = require('./sidebars/branch')
const communitySidebar = require('./sidebars/community')
const principleSidebar = require('./sidebars/principle')
const backEndSidebar = require('./sidebars/backEnd')
const otherSidebar = require('./sidebars/other')
const tutorialSidebar = require('./sidebars/tutorial')

module.exports = {
  title: 'Leo',
  description: '我的前端知识体系',
  head: [
    ['script', { src: 'https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js' }],
    ['script', { src: 'https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js' }],
    ['script', { src: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js' }],
    ['script', { src: 'https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js' }],
  ],
  plugins: [
    '@vuepress/back-to-top',
    'demo-block',
    [
      'run',
      {
        jsLabs: ['https://unpkg.com/element-ui/lib/index.js'],
        cssLabs: ['https://unpkg.com/element-ui/lib/theme-chalk/index.css'],
        reverse: false,
      },
    ],
  ],
  themeConfig: {
    nav: [
      {
        text: '知识·图谱',
        items: [
          { text: '编程基础', link: '/basic/' },
          { text: '开发软件', link: '/software/' },
          { text: '类库框架', link: '/library/' },
          { text: '知识进阶', link: '/advance/' },
          { text: '工程开发', link: '/engineering/' },
          { text: '编程思想', link: '/thought/' },
          { text: '领域分支', link: '/branch/' },
          { text: '社区发展', link: '/community/' },
          { text: '计算机基础', link: '/principle/' },
          { text: '后端知识', link: '/backEnd/' },
          { text: '软技能', link: '/other/' },
        ],
      },
      {
        text: '书籍·教程',
        link: '/tutorial/',
      },
    ],
    sidebarDepth: 3,
    sidebar: {
      '/basic/': basicSidebar,
      '/software/': softwareSidebar,
      '/library/': librarySidebar,
      '/advance/': advanceSidebar,
      '/engineering/': engineeringSidebar,
      '/thought/': thoughtSidebar,
      '/branch/': branchSidebar,
      '/community/': communitySidebar,
      '/principle/': principleSidebar,
      '/backEnd/': backEndSidebar,
      '/other/': otherSidebar,
      '/tutorial/': tutorialSidebar,
    },
  },
}
