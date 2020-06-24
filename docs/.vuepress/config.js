// const path = require("path")
// const fs = require("fs")
// const htmlFolder = path.join(__dirname, "../html/")
// const html = fs.readdirSync(htmlFolder).filter((c) => c !== "README.md")
const htmlSidebar = require("./sidebars/html")
const htmlCourse1Sidebar = require("./sidebars/html-course1")
const cssSidebar = require("./sidebars/css")
const cssCourse1Sidebar = require("./sidebars/css-course1")
const jsSidebar = require("./sidebars/js")
const jsCourse1Sidebar = require("./sidebars/js-course1")
const jsBook1Sidebar = require("./sidebars/js-book1")

module.exports = {
  title: "编程基础",
  description: "前端编程基础",
  head: [
    ["script", { src: "https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" }],
    ["script", { src: "https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js" }],
    ["script", { src: "https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js" }],
    ["script", { src: "https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js" }],
  ],
  plugins: [
    "@vuepress/back-to-top",
    "demo-block",
    [
      "run",
      {
        jsLabs: ["https://unpkg.com/element-ui/lib/index.js"],
        cssLabs: ["https://unpkg.com/element-ui/lib/theme-chalk/index.css"],
        reverse: false,
      },
    ],
  ],
  themeConfig: {
    nav: [
      {
        text: "HTML(5)",
        items: [
          {
            text: "知识图谱",
            link: "/html/",
          },
          {
            text: "教程/书籍",
            items: [{ text: "javascript高级程序设计", link: "/html-course1/" }],
          },
        ],
      },
      {
        text: "CSS(3)",
        items: [
          {
            text: "知识图谱",
            link: "/css/",
          },
          {
            text: "教程",
            items: [{ text: "技术胖CSS3", link: "/css-course1/" }],
          },
        ],
      },
      {
        text: "JavaScript(ES6+)",
        items: [
          {
            text: "知识图谱",
            link: "/js/",
          },
          {
            text: "教程",
            items: [{ text: "技术胖ES6", link: "/js-course1/" }],
          },
          {
            text: "书籍",
            items: [{ text: "javascript高级程序设计", link: "/js-book1/" }],
          },
        ],
      },
    ],
    sidebarDepth: 3,
    sidebar: {
      "/html/": htmlSidebar,
      "/html-course1/": htmlCourse1Sidebar,
      "/css/": cssSidebar,
      "/css-course1/": cssCourse1Sidebar,
      "/js/": jsSidebar,
      "/js-course1/": jsCourse1Sidebar,
      "/js-book1/": jsBook1Sidebar,
    },
  },
}
