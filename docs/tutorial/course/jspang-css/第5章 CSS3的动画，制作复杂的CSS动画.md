# 第 5 章 CSS3 的动画，制作复杂的 CSS 动画

学习目的

动画，是比较复杂的 CSS 动画，学会它甚至可以制作和 flash 一样的**帧动画**（一帧一帧的动画），还可以用 CSS3 各种动画属性做出各种**动画效果**。

## 5.1 CSS3 动画中的@keyframes 关键帧讲解

## 5.2 CSS3 动画 animation 复合属性讲解

## 5.3 CSS3 动画综合实例制作-内容加载 loading 动画实现

## 5.4 CSS3 Loading 动画效果实例 2

Demo51 css3
::: run {title:"css3 伪元素",row:false,reverse:true}

```html
<template>
  <body>
    <div class="rect"></div>
  </body>
</template>
<style>
  /* keyframes有两种方式 */
  /* 1：for to */
  /* 2：百分比 */

  .rect {
    width: 100px;
    height: 100px;
    position: fixed;
    animation: mymove 10s infinite;
    background: #f00;
  }

  @keyframes mymove {
    0% {
      left: 0;
      top: 0;
      background: #f00;
    }

    25% {
      left: 95%;
      top: 0;
      background: #0f0;
    }

    50% {
      top: 90%;
      left: 95%;
      background: #00f;
    }

    75% {
      left: 0;
      top: 90%;
      background: #ff0;
    }

    100% {
      left: 0;
      top: 0;
      background: #f00;
    }
  }
</style>
```

:::

Demo52
::: run {title:"css3",row:false,reverse:true}

```html
<template>
  <body>
    <div class="rect"></div>
  </body>
</template>
<style>
  /* keyframes有两种方式 */
  /* 1：for to */
  /* 2：百分比 */

  /* CSS种的animation是复合属性 */
  /* animation是以下所有符合属性的简写，使用时只需要把值顺序填入即可 */

  /* animation-name 需要执行的动画，值为关键帧名字由@keysfamts定义 */
  /* animation-duration 执行动画的总时间，值为number类型*/
  /* animation-timing-function  */
  /*(timing-function)是css数据类型表示一个数学函数（又称缓动函数），他描述了一个过渡或动画中一维数值的改变速度。（加速度曲线） */
  /* 值：case、case-in、case-in-out、step-end、step-start、steps()、cubic-bezier(x1,y1,x2,y2)、linear、 */
  /* animation-delay 延时执行动画，值为number*/
  /* animation-iteration-count 执行动画的次数，值可为number或infinite(重复执行)*/
  /* animation-direction 指示动画是否反向播放，值：normal | reverse | alternate | alternate-reverse*/
  /* animation-fill-mode 设置css样式再执行之前和执行之后如何将样式应用于目标，值：none | forwards | backwards | both */
  /* animation-play-state 查询或设置动画的播放状态，值：running | paused */

  .rect {
    width: 100px;
    height: 100px;
    position: fixed;
    background: #f00;
    animation: mymove 3s ease 2s 1 alternate both running;

    /* animation-name: mymove;
    animation-duration: 3s;
    animation-timing-function: ease;
    animation-delay: 2s;
    animation-iteration-count: 1;
    animation-direction: alternate;
    animation-fill-mode: both;
    animation-play-state: running */
  }

  @keyframes mymove {
    0% {
      left: 0;
      top: 0;
      background: #f00;
    }

    25% {
      left: 95%;
      top: 0;
      background: #0f0;
    }

    50% {
      top: 90%;
      left: 95%;
      background: #00f;
    }

    75% {
      left: 0;
      top: 90%;
      background: #ff0;
    }

    100% {
      left: 0;
      top: 0;
      background: #f00;
    }
  }
</style>
```

:::

Demo53
::: run {title:"loading 内容加载动画",row:false,reverse:true}

```html
<template>
  <body>
    <div class="spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </body>
</template>
<style>
  .spinner {
    width: 300px;
    height: 50px;
    margin: 200px auto;
  }

  .spinner > div {
    height: 50px;
    width: 8px;
    margin: 1px;
    background: #67cf22;
    display: inline-block;
    animation: rectScale 1.3s ease infinite;
  }

  /* 利用animation-delay延时执行动画 */
  .spinner > div:nth-of-type(1) {
    animation-delay: -1.1s;
  }

  .spinner > div:nth-of-type(2) {
    animation-delay: -0.9s;
  }

  .spinner > div:nth-of-type(3) {
    animation-delay: -0.8s;
  }

  .spinner > div:nth-of-type(4) {
    animation-delay: -0.7s;
  }

  .spinner > div:nth-of-type(5) {
    animation-delay: -0.6s;
  }

  @keyframes rectScale {
    0%,
    50%,
    100% {
      transform: scale(1, 1);
    }

    25% {
      transform: scale(1, 2);
    }
  }
</style>
```

:::

Demo54
::: run {title:"Loading",row:false,reverse:true}

```html
<template>
  <body>
    <div class="cilcle"></div>
  </body>
</template>
<style>
  .cilcle {
    margin: 300px auto;
    position: relative;
    width: 1px;
    height: 1px;
  }

  .cilcle::before {
    content: "";
    width: 60px;
    height: 60px;
    background: #a1d679;
    border-radius: 50%;
    animation: cilcleScale 1s infinite;
    position: absolute;
    left: 0;
    top: 0;
  }

  .cilcle::after {
    content: "";
    width: 30px;
    height: 30px;
    background: #82c04a;
    border-radius: 50%;
    position: absolute;
    top: 15px;
    left: 15px;
    animation: cilcleScale 1s infinite;
    animation-delay: -0.5s;
  }

  @keyframes cilcleScale {
    0%,
    100% {
      transform: scale(0);
    }

    50% {
      transform: scale(1);
    }
  }
</style>
```

:::
