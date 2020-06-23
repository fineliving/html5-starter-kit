# 第 4 章 CSS3 的过度属性，简单的过度动画

学习目的

过度属性，其实就是简单的过度动画，比动画简单但比动画渲染速度快，所以各大网站会**大量使用过度动画**。

## 4.1 CSS3 制作缓慢边长的方形（transion 特效）

## 4.2 CSS3 过渡的 timing-function 属性详解

## 4.3 CSS3 仿天猫专题过渡效果实例

## 4.4 CSS3 仿天猫类别过渡效果制作

Demo41
::: run {title:"Document",row:false,reverse:true}

```html
<template>
  <body>
    <div class="ceng"></div>
  </body>
</template>
<style>
  /* 
transition是以下属性的简写属性
transition-property:过度属性（默认值all） 可填写其他属性例如background、width、height
transition-duration:过渡持续时间(默认值为0)
transition-delay:过渡延迟时间（默认值为0）
transition-timing-function:过度函数（默认值为ease函数）
*/

  .ceng {
    width: 100px;
    height: 100px;
    background: pink;
    cursor: pointer;
    /* transition: all 1s .2s ease; */
    transition-property: all;
    transition-duration: 3s;
    transition-delay: 0.2s;
  }

  .ceng:hover {
    width: 300px;
    height: 150px;
    background-color: red;
    border-radius: 40px;
  }
</style>
```

:::

Demo42
::: run {title:"Document",row:false,reverse:true}

```html
<template>
  <body>
    <div class="ceng"></div>
  </body>
</template>
<style>
  /* 
transition-timing-function:过度函数（默认值为ease函数）
timing-function属性有如下参数可选:
ease 前期加速，中期附近减速至后期
ease-in 前期缓慢，逐渐加速，至最终状态，动画突然停止
ease-out 前期快速，接近最终状态时逐渐减速
ease-in-out 前期缓慢，中期加速，后期减速
linear 以恒定速度执行动画
cubic-bezier(x1,y1,x2,y2) 贝塞尔曲线函数
step-start 立即跳转到结束状态并保持在该位置知道动画结束
step-end 动画将保持初始状态，直到结束，直接跳转到最终位置
steps(4,end) 一个阶梯函数除于输出值的域在等距离的步骤。
steps(start,end)  一个阶梯函数除于输出值的域在等距离的步骤。

***以上总结参考了mdn官方文档***
*/

  .ceng {
    width: 100px;
    height: 100px;
    background: pink;
    cursor: pointer;
    /* transition: all 1s .2s ease; */
    transition-property: all;
    transition-duration: 3s;
    transition-delay: 0.2s;
    transition-timing-function: ease-in;
  }

  .ceng:hover {
    width: 300px;
    height: 150px;
    background-color: red;
    border-radius: 40px;
  }
</style>
```

:::

Demo43
::: run {title:"仿天猫专题过渡效果",row:false,reverse:true}

```html
<template>
  <body>
    <div class="main">
      <ul>
        <li>
          <div class="m_title">手机馆</div>
          <div class="m_content">iphoneXR 全球首发</div>
          <div class="m_img"><img src="./searchpng.com-apple.png" alt="" /></div>
        </li>
      </ul>
    </div>
  </body>
</template>
<style>
  * {
    margin: 0;
    padding: 0;
    font-family: "Microsoft YaHei";
  }

  .main {
    text-align: center;
    border: 1px solid #c4c3c5;
    width: 230px;
    height: 210px;
    margin: 30px auto;
  }

  .main li {
    list-style: none;
    cursor: pointer;
  }

  .m_title {
    font-size: 20px;
    font-weight: bold;
    margin: 5px;
  }

  .m_content {
    font-size: 14px;
    font-weight: 100;
    color: #666;
    margin-bottom: 5px;
  }

  .m_img img {
    width: 130px;
    transition: all 0.5s;
  }

  .m_img {
    position: relative;
    padding: 10px;
  }

  .m_img::before {
    content: "";
    width: 100px;
    height: 100px;
    background: #eee;
    position: absolute;
    z-index: -1;
    border-radius: 50%;
    left: 65px;
    top: 25px;
  }

  .main li:hover img {
    transform: scale(1.1);
  }
</style>
```

:::

Demo44
::: run {title:"天猫类别过渡效果",row:false,reverse:true}

```html
<template>
  <body>
    <div class="main">
      <div class="m_title">好车特卖一口价</div>
      <div class="m_content">好车 新车 开回家</div>
      <div class="m_img"><img src="./ferrari-italia-548.png" alt="新车特卖" /></div>
    </div>
  </body>
</template>
<style>
  * {
    margin: 0;
    padding: 0;
  }

  .main {
    margin: 60px auto;
    width: 260px;
    height: 270px;
    border: 1px solid #cccccc;
    font-family: "Microsoft YaHei";
  }

  .m_title {
    text-align: left;
    font-size: 20px;
    padding: 20px 10px 10px 10px;
  }

  .m_content {
    color: #11ccaa;
    padding: 0 10px 10px 10px;
    font-size: 14px;
  }

  .m_img {
    text-align: right;
    position: relative;
  }

  .m_img img {
    position: absolute;
    width: 220px;
    right: -5px;
    top: 40px;
    /* 方法一 */
    transition: transform 0.2s;
    /* 方法二 */
    /* transition: right .2s; */
  }

  .main:hover img {
    /* 方法一 */
    transform: translate(-10px);
    /* 方法二 */
    /* right: 10px; */
  }

  /* 关于transition的bug(我自己测试了chrome、edge均是这个bug)，
在填写属性时需要在填写属性的样式里面把要变化的样式写一下，
否则没有效果 */
</style>
```

:::
