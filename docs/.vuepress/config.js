const path = require("path")
const fs = require("fs")
const htmlFolder = path.join(__dirname, "../html/")
const cssFolder = path.join(__dirname, "../css/")
const jsFolder = path.join(__dirname, "../js/")

const html = fs.readdirSync(htmlFolder).filter((c) => c !== "README.md")
const css = fs.readdirSync(cssFolder).filter((c) => c !== "README.md")
const js = fs.readdirSync(jsFolder).filter((c) => c !== "README.md")

module.exports = {
  title: "ReTiNA GIS",
  description: "ReTiNA GIS 组件 开发文档",
  themeConfig: {
    nav: [
      {
        text: "HTML",
        link: "/html/",
      },
      {
        text: "CSS",
        link: "/css/",
      },
      {
        text: "JS",
        link: "/js/",
      },
    ],
    sidebar: {
      "/html/": html,
      "/css/": css,
      "/js/": js,
    },
  },
}
