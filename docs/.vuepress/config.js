const htmlSidebar = require('./sidebars/basic/html')
const htmlCourse1Sidebar = require('./sidebars/basic/html-course1')
const cssSidebar = require('./sidebars/basic/css')
const cssCourse1Sidebar = require('./sidebars/basic/css-course1')
const cssCourseSidebar = require('./sidebars/basic/css-course')
const jsSidebar = require('./sidebars/basic/js')
const jsCourse1Sidebar = require('./sidebars/basic/js-course1')
const jsBook1Sidebar = require('./sidebars/basic/js-book1')

const editorSidebar = require('./sidebars/software/editor')
const debugSidebar = require('./sidebars/software/debug')
const sliceSidebar = require('./sidebars/software/slice')

const toolsSidebar = require('./sidebars/libraries/tools')
const frameworksSidebar = require('./sidebars/libraries/frameworks')

const networkCommunicationSidebar = require('./sidebars/advance/network-communication')
const performanceSidebar = require('./sidebars/advance/performance')
const performanceCourse1Sidebar = require('./sidebars/advance/performance-course1')
const safetySidebar = require('./sidebars/advance/safety')
const browserSidebar = require('./sidebars/advance/browser')

const moduleSidebar = require('./sidebars/engineering/module')
const versionSidebar = require('./sidebars/engineering/version')
const dependenceSidebar = require('./sidebars/engineering/dependence')
const semanticEnhancementSidebar = require('./sidebars/engineering/semantic-enhancement')
const buildToolSidebar = require('./sidebars/engineering/build-tool')
const converterSidebar = require('./sidebars/engineering/converter')
const ciCdSidebar = require('./sidebars/engineering/ci-cd')
const codeQualitySidebar = require('./sidebars/engineering/code-quality')

const designSidebar = require('./sidebars/model/design')
const architectureSidebar = require('./sidebars/model/architecture')
const genericitySidebar = require('./sidebars/model/genericity')
const programmingSidebar = require('./sidebars/model/programming')

const visualizationSidebar = require('./sidebars/branch/visualization')
const mobileSidebar = require('./sidebars/branch/mobile')
const gameSidebar = require('./sidebars/branch/game')
const portableSidebar = require('./sidebars/branch/portable')

const compileSidebar = require('./sidebars/principle/compile')
const structureSidebar = require('./sidebars/principle/structure')
const algorithmSidebar = require('./sidebars/principle/algorithm')
const systemSidebar = require('./sidebars/principle/system')
const networkSidebar = require('./sidebars/principle/network')

const nodeSidebar = require('./sidebars/be-konwledge/node')
const languageSidebar = require('./sidebars/be-konwledge/language')
const webserverSidebar = require('./sidebars/be-konwledge/webserver')
const databaseSidebar = require('./sidebars/be-konwledge/database')
const cacheSidebar = require('./sidebars/be-konwledge/cache')

const communitySidebar = require('./sidebars/other/community')
const softSkillSidebar = require('./sidebars/other/soft-skill')

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
        text: '编程基础',
        items: [
          {
            text: 'HTML(5)',
            items: [
              { text: '知识图谱', link: '/basic/html/' },
              { text: '教程', link: '/basic/html-course1/' },
            ],
          },
          {
            text: 'CSS(3)',
            items: [
              { text: '知识图谱', link: '/basic/css/' },
              { text: '教程', link: '/basic/css-course/' },
              { text: '教程——技术胖CSS3', link: '/basic/css-course1/' },
            ],
          },
          {
            text: 'JavaScript(ES6+)',
            items: [
              { text: '知识图谱', link: '/basic/js/' },
              { text: '教程——技术胖ES6', link: '/basic/js-course1/' },
              { text: '书籍——javascript高级程序设计', link: '/basic/js-book1/' },
            ],
          },
        ],
      },
      {
        text: '开发软件',
        items: [
          {
            text: '编辑器和IDE',
            items: [{ text: '知识图谱', link: '/software/editor/' }],
          },
          {
            text: '调试工具',
            items: [{ text: '知识图谱', link: '/software/debug/' }],
          },
          {
            text: '切图',
            items: [{ text: '知识图谱', link: '/software/slice/' }],
          },
        ],
      },
      {
        text: '类库框架',
        items: [
          {
            text: '工具库',
            items: [{ text: '知识图谱', link: '/libraries/tools/' }],
          },
          {
            text: '开发库/框架',
            items: [{ text: '知识图谱', link: '/libraries/frameworks/' }],
          },
        ],
      },
      {
        text: '知识进阶',
        items: [
          {
            text: '网络通信',
            items: [{ text: '知识图谱', link: '/advance/network-communication/' }],
          },
          {
            text: '性能',
            items: [
              { text: '知识图谱', link: '/advance/performance/' },
              { text: 'Google Developers文档', link: '/advance/performance-course1/' },
            ],
          },
          {
            text: '安全',
            items: [{ text: '知识图谱', link: '/advance/safety/' }],
          },
          {
            text: '浏览器',
            items: [{ text: '知识图谱', link: '/advance/browser/' }],
          },
        ],
      },
      {
        text: '工程开发',
        items: [
          {
            text: '模块化',
            items: [{ text: '知识图谱', link: '/engineering/module/' }],
          },
          {
            text: '版本管理',
            items: [{ text: '知识图谱', link: '/engineering/version/' }],
          },
          {
            text: '依赖管理',
            items: [{ text: '知识图谱', link: '/engineering/dependence/' }],
          },
          {
            text: '语言增强',
            items: [{ text: '知识图谱', link: '/engineering/semantic-enhancement/' }],
          },
          {
            text: '构建工具',
            items: [{ text: '知识图谱', link: '/engineering/build-tool/' }],
          },
          {
            text: '转换器',
            items: [{ text: '知识图谱', link: '/engineering/converter/' }],
          },
          {
            text: 'CI/CD',
            items: [{ text: '知识图谱', link: '/engineering/ci-cd/' }],
          },
          {
            text: '代码质量',
            items: [{ text: '知识图谱', link: '/engineering/code-quality/' }],
          },
        ],
      },
      {
        text: '编程思想',
        items: [
          {
            text: '设计模式',
            items: [{ text: '知识图谱', link: '/model/design/' }],
          },
          {
            text: '架构模式',
            items: [{ text: '知识图谱', link: '/model/architecture/' }],
          },
          {
            text: '编程泛型',
            items: [{ text: '知识图谱', link: '/model/genericity/' }],
          },
          {
            text: '程序设计',
            items: [{ text: '知识图谱', link: '/model/programming/' }],
          },
        ],
      },
      {
        text: '领域分支',
        items: [
          {
            text: '可视化',
            items: [{ text: '知识图谱', link: '/branch/visualization/' }],
          },
          {
            text: '移动Web',
            items: [{ text: '知识图谱', link: '/branch/mobile/' }],
          },
          {
            text: '游戏开发',
            items: [{ text: '知识图谱', link: '/branch/game/' }],
          },
          {
            text: '便携式设备',
            items: [{ text: '知识图谱', link: '/branch/portable/' }],
          },
        ],
      },
      {
        text: '计算机基础',
        items: [
          {
            text: '编译原理',
            items: [{ text: '知识图谱', link: '/principle/compile/' }],
          },
          {
            text: '数据结构',
            items: [{ text: '知识图谱', link: '/principle/structure/' }],
          },
          {
            text: '算法',
            items: [{ text: '知识图谱', link: '/principle/algorithm/' }],
          },
          {
            text: '操作系统',
            items: [{ text: '知识图谱', link: '/principle/system/' }],
          },
          {
            text: '计算机网络',
            items: [{ text: '知识图谱', link: '/principle/network/' }],
          },
        ],
      },
      {
        text: '后端知识',
        items: [
          {
            text: 'Node',
            items: [{ text: '知识图谱', link: '/be-konwledge/node/' }],
          },
          {
            text: '编程语言',
            items: [{ text: '知识图谱', link: '/be-konwledge/language/' }],
          },
          {
            text: '网页服务器',
            items: [{ text: '知识图谱', link: '/be-konwledge/webserver/' }],
          },
          {
            text: '数据库',
            items: [{ text: '知识图谱', link: '/be-konwledge/database/' }],
          },
          {
            text: '数据缓存',
            items: [{ text: '知识图谱', link: '/be-konwledge/cache/' }],
          },
        ],
      },
      {
        text: '其他',
        items: [
          {
            text: ' 社区发展',
            items: [{ text: '知识图谱', link: '/other/community/' }],
          },
          {
            text: '软技能',
            items: [{ text: '知识图谱', link: '/other/soft-skill/' }],
          },
        ],
      },
    ],
    sidebarDepth: 3,
    sidebar: {
      '/basic/html/': htmlSidebar,
      '/basic/html-course1/': htmlCourse1Sidebar,
      '/basic/css/': cssSidebar,
      '/basic/css-course1/': cssCourse1Sidebar,
      '/basic/css-course/': cssCourseSidebar,
      '/basic/js/': jsSidebar,
      '/basic/js-course1/': jsCourse1Sidebar,
      '/basic/js-book1/': jsBook1Sidebar,
      '/software/editor/': editorSidebar,
      '/software/debug/': debugSidebar,
      '/software/slice/': sliceSidebar,
      '/libraries/tools/': toolsSidebar,
      '/libraries/frameworks/': frameworksSidebar,
      '/advance/network-communication/': networkCommunicationSidebar,
      '/advance/performance/': performanceSidebar,
      '/advance/performance-course1': performanceCourse1Sidebar,
      '/advance/safety/': safetySidebar,
      '/advance/browser/': browserSidebar,
      '/engineering/module/': moduleSidebar,
      '/engineering/version/': versionSidebar,
      '/engineering/dependence/': dependenceSidebar,
      '/engineering/semantic-enhancement/': semanticEnhancementSidebar,
      '/engineering/build-tool/': buildToolSidebar,
      '/engineering/converter/': converterSidebar,
      '/engineering/ci-cd/': ciCdSidebar,
      '/engineering/code-quality/': codeQualitySidebar,
      '/model/design/': designSidebar,
      '/model/architecture/': architectureSidebar,
      '/model/genericity/': genericitySidebar,
      '/model/programming/': programmingSidebar,
      '/branch/visualization/': visualizationSidebar,
      '/branch/mobile/': mobileSidebar,
      '/branch/game/': gameSidebar,
      '/branch/portable/': portableSidebar,
      '/principle/compile/': compileSidebar,
      '/principle/structure/': structureSidebar,
      '/principle/algorithm/': algorithmSidebar,
      '/principle/system/': systemSidebar,
      '/principle/network/': networkSidebar,
      '/be-konwledge/node/': nodeSidebar,
      '/be-konwledge/language/': languageSidebar,
      '/be-konwledge/webserver/': webserverSidebar,
      '/be-konwledge/database/': databaseSidebar,
      '/be-konwledge/cache/': cacheSidebar,
      '/other/community/': communitySidebar,
      '/other/soft-skill/': softSkillSidebar,
    },
  },
}
