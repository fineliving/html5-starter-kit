// const path = require("path")
// const fs = require("fs")
// const htmlFolder = path.join(__dirname, "../html/")
// const html = fs.readdirSync(htmlFolder).filter((c) => c !== "README.md")
const htmlSidebar = require("./sidebars/html")
const htmlCourseSidebar = require("./sidebars/html-course")
const cssSidebar = require("./sidebars/css")
const cssCourseSidebar = require("./sidebars/css-course1")
const jsSidebar = require("./sidebars/js")
const jsCourseSidebar = require("./sidebars/js-book1")

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
            items: [{ text: "javascript高级程序设计", link: "/html-course/" }],
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
            text: "书籍",
            items: [{ text: "javascript高级程序设计", link: "/js-book1/" }],
          },
        ],
      },
    ],
    sidebarDepth: 3,
    sidebar: {
      "/html/": htmlSidebar,
      "/html-course/": htmlCourseSidebar,
      "/css/": cssSidebar,
      "/css-course1/": cssCourseSidebar,
      "/js/": jsSidebar,
      "/js-book1/": jsCourseSidebar,
    },
  },
}
