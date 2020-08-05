# 第 2 章 CSS3 的变形：画多边形，心形

学习目的

通过第 1 章学习的**伪类选择器和伪元素**以及 CSS3 新增加的变形属性来画多边形，星形等。通过这一章的学习会画出种图形，也会学会画图形的**小套路**

## 2.1 CSS3 用 border-radius 画圆形

## 2.2 CSS3 画三角形和对话框

## 2.3 CSS3 画菱形和平行四边形

## 2.4 CSS3 画五角星和六角形

## 2.5 CSS3 画五边形和六边形

## 2.6 CSS3 画心形和蛋形

## 2.7 CSS3 画太极阴阳图

**Border-radius 的有点**

1. 减小网站的维护工作量
2. 提高网站性能（减少图片请求）
3. 增加了视觉美观性

简写写法：

左上角顺时针旋转

```css
border-radius: 100px 100px 0 0;
```

x 轴 y 轴写法：

```css
border-top-left-radius: 100px;
border-top-right-radius: 100px;
```

兼容性：

写不写前缀只差了 0.1%（93.46%-93.35%），所以不用写前缀

show all 可以看到所有浏览器的支持情况，注意点是 IE6-8 不支持

demo21
::: run {title:"css3 用户 border-radius 画图形",row:false,reverse:true}

```html
<template>
  <body>
    <div class="demo"></div>
  </body>
</template>
<style>
  .demo {
    width: 200px;
    height: 100px;
    border: 1px solid #ccc;
    background-color: #f66;
    /* border-top-left-radius: 100px;
    border-top-right-radius: 100px; */
    /* 值的排列顺序： 左上角 右上角 右下角 左下角*/
    border-radius: 100px 100px 0 0;
  }
</style>
```

:::

demo22
::: run {title:"css3 画三角形和对话框",row:false,reverse:true}

```html
<template>
  <body>
    <div class="dialog">Hello Everyone! I'm Panda.</div>
  </body>
</template>
<style>
  .dialog {
    background: #6a6;
    width: 330px;
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
    border-radius: 10px;
    margin: 40px auto;
    position: relative;
  }

  .dialog::before {
    content: "";
    display: block;
    position: absolute;
    border: 10px solid transparent;
    border-right-color: #6a6;
    left: -20px;
    top: 15px;
  }
</style>
```

:::

demo23
::: run {title:"transform",row:false,reverse:true}

```html
<template>
  <body>
    <div class="diamond"></div>
    <div class="rhomboid"></div>
  </body>
</template>
<style>
  /* transform适用于盒模型元素来倾斜（skew）、旋转（rotate）、缩放（transform-origin）、位移（transform-origin） */
  .rhomboid,
  .diamond {
    margin: 100px auto;
    background: #6a6;
    width: 200px;
  }

  .diamond {
    height: 200px;
    transform: rotate(45deg);
  }

  .rhomboid {
    height: 100px;
    transform: skew(30deg, 0);
  }
</style>
```

:::

demo24
::: run {title:"css3 画五角星和六角星",row:false,reverse:true}

```html
<template>
  <body>
    <div class="pentagram"></div>
    <div class="hexagram"></div>
  </body>
</template>
<style>
  /* 五角星 */
  /* 先绘制最顶部的三角形 */
  .pentagram {
    position: relative;
    border: 30px solid transparent;
    border-bottom: 80px solid #f00;
    width: 0px;
    margin: 50px auto;
  }

  /* 为三角形制定统一的样式 */
  .pentagram::before,
  .pentagram::after {
    content: "";
    display: block;
    border: 112px solid transparent;
    position: absolute;
    width: 0;
    height: 0;
    border-bottom: 80px solid #f00;
  }

  /* 绘制左边的三角形  */
  .pentagram::before {
    left: -75px;
    transform: rotate(35deg);
    top: -31px;
  }

  /* 绘制右边的三角形 */
  .pentagram::after {
    right: -75px;
    transform: rotate(-35deg);
    top: -31px;
  }

  /* 六角星 (两个等边三角形组合)*/
  .hexagram {
    margin: 200px auto;
    width: 0;
    height: 0;
    border: 60px solid transparent;
    border-bottom: 100px solid #f00;
    position: relative;
  }

  .hexagram::before {
    content: "";
    border: 60px solid transparent;
    border-bottom: 100px solid #f00;
    position: absolute;
    transform: rotate(180deg);
    left: -60px;
    top: 25px;
  }
</style>
```

:::

demo25
::: run {title:"css3 画五角形和六角形",row:false,reverse:true}

```html
<template>
  <body>
    <div class="pentagon"></div>
    <div class="hexagon"></div>
  </body>
</template>
<style>
  /* 清除border-box全局样式，我们项目一般都会直接设全局属性为border-box，为了让更改模块大小不会挤压其他模块，见项目 */
  /* https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-sizing */
  /* #vanilla-box div {
    box-sizing: content-box !important;
  } */
  .pentagon,
  .hexagon {
    margin: 120px auto;
  }

  /* 开始绘画五角形 */

  /* 绘制梯形(通过控制宽度来撑开内部x方向的长度) */
  .pentagon {
    width: 100px;
    border: 50px solid transparent;
    border-top: 100px solid #f00;
    position: relative;
  }

  /* 绘制三角形 */
  .pentagon::before {
    content: "";
    display: block;
    width: 0;
    height: 0;
    border: 100px solid transparent;
    border-bottom: 75px solid #f00;
    position: absolute;
    top: -275px;
    left: -50px;
  }

  /* 绘制六边形 */
  /* 通过控制高度来撑开内部y方向的长度 */
  .hexagon,
  .hexagon::after {
    width: 0;
    height: 100px;
    border: 50px solid transparent;
  }

  .hexagon {
    border-left: 100px solid #f00;
    position: relative;
  }

  .hexagon::after {
    content: "";
    border-right: 100px solid #f00;
    position: absolute;
    left: -250px;
    top: -50px;
  }
</style>
```

:::

demo27
::: run {title:"css3 画太极阴阳图",row:false,reverse:true}

```html
<template>
  <body>
    <div id="taiji"></div>
  </body>
</template>
<style>
  /* 太极图的主圆，一半黑一半白（边跨与宽度加起来必需相等于高度） */
  #taiji {
    margin: 90px auto;
    background-color: #fff;
    width: 100px;
    height: 200px;
    border-radius: 50%;
    border-left: 100px solid #000;
    position: relative;
  }

  /* 绘制白底黑框圆 */
  #taiji::before {
    content: "";
    width: 0;
    height: 0;
    padding: 15px;
    background-color: #fff;
    border: 35px solid #000;
    border-radius: 50%;
    position: absolute;
    left: -50px;
  }

  /* 绘制黑底白框圆 */
  #taiji::after {
    content: "";
    width: 0px;
    height: 0px;
    padding: 15px;
    background-color: #000;
    border: 35px solid #fff;
    position: absolute;
    border-radius: 50%;
    left: -50px;
    bottom: 0;
  }
</style>
```

:::
