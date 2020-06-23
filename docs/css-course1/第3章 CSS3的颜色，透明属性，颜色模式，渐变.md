# 第 3 章 CSS3 的颜色，透明属性，颜色模式，渐变

学习目的

通过 CSS3 的颜色属性，包括透明属性、渐变和颜色模式，会把页面绘制的**丰富多彩**，不再是简单的线条

## 3.1 CSS3 制作透明背景层

## 3.2 CSS3 的颜色模式 1

## 3.3 CSS3 的颜色模式 2-实例仿天猫商品展示效果

## 3.4 CSS3 线性渐变

## 3.5 CSS3 径向渐变 radial-gradient

## 3.6 CSS3 重复性渐变

## 3.7 CSS3 盒子阴影效果 box-shadow

demo31
::: run {title:"css3 制作透明背景层",row:false,reverse:true}

```html
<template>
  <body>
    <div id="background">
      <div id="content">
        hello everyone!I'm Panda.<br />
        hello everyone!I'm Panda.<br />
        hello everyone!I'm Panda.<br />
        hello everyone!I'm Panda.<br />
        hello everyone!I'm Panda.<br />
        hello everyone!I'm Panda.<br />
        hello everyone!I'm Panda.<br />
      </div>
    </div>
  </body>
</template>
<style>
  #background {
    background: url(./rectangle.jpg) center;
    width: 1300px;
    height: 500px;
    margin: 80px auto;
    position: relative;
  }

  /* box-shadow值的说明 x、y、阴影宽度、阴影颜色 */
  #content {
    padding: 20px;
    position: absolute;
    top: 50px;
    left: 400px;
    width: 500px;
    height: 300px;
    margin: 50px auto;
    background: #fff;
    border-radius: 10px;
    box-shadow: 3px 3px 5px #888;
    opacity: 0.8;
    text-align: center;
  }
</style>
```

:::

demo32
::: run {title:"css3 的颜色模式（1）",row:false,reverse:true}

```html
<template>
  <body>
    <div class="content opacity">
      <ul>
        <li>1</li>
        <li>0.8</li>
        <li>0.6</li>
        <li>0.4</li>
        <li>0.2</li>
      </ul>
    </div>
    <div class="content rgba">
      <ul>
        <li>1</li>
        <li>0.8</li>
        <li>0.6</li>
        <li>0.4</li>
        <li>0.2</li>
      </ul>
    </div>
  </body>
</template>
<style>
  /* 有如下几种颜色模式,颜色模式基本适用于所有css颜色的地方 */
  /* rgba 
R:红色（取值范围0-255）
G:绿色（取值范围0-255）
B:蓝色（取值范围0-255）
A:透明度（取值范围0-1）
使用：rgba(255,0,0,1)
*/
  /* hsla 
H：Hue(色调)。0(或360)表示红色，120表示绿色，240表示蓝色，也可取其他数值来指定颜色。取值为：0 - 360
S：Saturation(饱和度)。取值为：0.0% - 100.0%
L：Lightness(亮度)。取值为：0.0% - 100.0%
A：Alpha透明度。取值0~1之间。
直白点讲，H就是来控制颜色的变化（这个最好理解），S就是控制颜色的浓淡，L来控制亮度，100%是白色，0%是黑色，不论是那种颜色或者饱和度，A是透明度。
使用：hsla(0,30%,20%,0.3)
*/
  .content {
    margin: 80px auto;
  }

  .content ul {
    clear: both;
  }

  .content li {
    list-style: none;
    margin: 10px;
    text-align: center;
    line-height: 50px;
    width: 50px;
    height: 50px;
    float: left;
  }

  /* opacity */
  .opacity li {
    background: red;
  }

  .opacity li:nth-child(1) {
    opacity: 1;
  }

  .opacity li:nth-child(2) {
    opacity: 0.8;
  }

  .opacity li:nth-child(3) {
    opacity: 0.6;
  }

  .opacity li:nth-child(4) {
    opacity: 0.4;
  }

  .opacity li:nth-child(5) {
    opacity: 0.2;
  }

  /* rgba */
  .rgba li:nth-child(1) {
    background: rgba(255, 0, 0, 1);
  }

  .rgba li:nth-child(2) {
    background: rgba(255, 0, 0, 0.8);
  }

  .rgba li:nth-child(3) {
    background: rgba(255, 0, 0, 0.6);
  }

  .rgba li:nth-child(4) {
    background: rgba(255, 0, 0, 0.4);
  }

  .rgba li:nth-child(5) {
    background: rgba(255, 0, 0, 0.2);
  }
</style>
```

:::

demo33
::: run {title:"3.3 css3 的颜色模式（2）-实例仿天猫商品",row:false,reverse:true}

```html
<template>
  <body>
    <div class="main">
      <ul>
        <li>
          <div class="img">
            <img src="./goods.jpg" alt="新品九阳不用手洗破壁机静音料理全自动" />
          </div>
          <div class="goods_title">新品九阳不用手洗破壁机静音料理全自动</div>
          <div class="price">3599.0</div>
        </li>
        <li>
          <div class="img">
            <img src="./goods.jpg" alt="新品九阳不用手洗破壁机静音料理全自动" />
          </div>
          <div class="goods_title">新品九阳不用手洗破壁机静音料理全自动</div>
          <div class="price">3599.0</div>
        </li>
      </ul>
    </div>
  </body>
</template>
<style>
  body {
    background: #ddd;
  }

  .main {
    width: 900px;
    height: auto;
    margin: 90px auto;
  }

  .main ul {
    clear: both;
  }

  .main li {
    list-style: none;
    float: left;
    margin-right: 10px;
    width: 240px;
    padding: 1px;
    border: 1px solid rgba(255, 0, 0, 0);
    background: #fff;
  }

  .main li:hover {
    border: 1px solid rgba(255, 0, 0, 1);
  }

  .img img {
    width: 240px;
    transition: all 0.6s;
  }

  .main li:hover img {
    opacity: 0.7;
  }

  .goods_title {
    font-size: 14px;
    color: #666;
    line-height: 18px;
    margin: 10px;
    height: 35px;
    overflow: hidden;
  }

  .price {
    font-size: 18px;
    color: #ff0036;
  }

  .price::before {
    content: "￥";
  }
</style>
```

:::

demo34
::: run {title:"css3 线性渐变",row:false,reverse:true}

```html
<template>
  <body>
    <div class="ceng"></div>
  </body>
</template>
<style>
  /* 渐变适用于list-style-image、border-image、background-image、
::before、::after、cursor */

  /* 这是线性渐变的用法 */
  /* linear-gradient(方向或度数(可以省略)，颜色 开始渐变的百分比或像素，颜色n ) */
  .ceng {
    margin: 80px auto;
    width: 400px;
    height: 200px;
    border: 1px solid #f00;
    background-image: linear-gradient(to bottom, red, blue);
    /* 控制颜色梯度 */
    background-image: linear-gradient(red, 20%, blue);
    /* 渐变范围 */
    background-image: linear-gradient(to left, red 30%, blue 10px);
    /* 使用不同的颜色标准 */
    background-image: linear-gradient(to left, #f00 200px, blue 100px);
    /* 堆积渐变和累积效果 */
    background-image: linear-gradient(to right, rgba(255, 0, 0, 0.3), mistyrose), url("https://mdn.mozillademos.org/files/15525/critters.png");
  }
</style>
```

:::

demo35
::: run {title:"css3 径向渐变",row:false,reverse:true}

```html
<template>
  <body>
    <div class="ceng circle"></div>
    <div class="ceng ellipse"></div>
  </body>
</template>
<style>
  /* 径向渐变 */

  .ceng {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    float: left;
    margin: 30px;
    border: 1px solid black;
  }

  /* radial-gradient(确定渐变圆心,颜色 开始渐变的百分比或像素，颜色n ) */

  .circle {
    /* 以圆形渐变  默认以圆形渐变为准*/
    background: radial-gradient(rgba(255, 0, 0, 1), blue);
    background: radial-gradient(circle at center, orange, green);
    background: radial-gradient(circle at right, orange, green);
    background: radial-gradient(circle at top, orange, green);
    background: radial-gradient(circle at top left, orange, green);
    /* 圆心渐变的大小 */
    background: radial-gradient(20px circle at center, orange, green);
    background: radial-gradient(20px at center, orange, green, red);
  }

  .ellipse {
    /* 以椭圆形渐变 */
    background: radial-gradient(ellipse at center, orange, green);
    background: radial-gradient(ellipse at right, orange, green);
    background: radial-gradient(ellipse at top, orange, green);
    background: radial-gradient(ellipse at top left, orange, green);
    /* 圆心渐变的大小 椭圆渐变需要填充 x,y坐标 */
    background: radial-gradient(20px 30px ellipse at center, orange, green);
    background: radial-gradient(20px 30px ellipse at center, orange, green, red);
  }
</style>
```

:::

demo36
::: run {title:"css3 重复性渐变",row:false,reverse:true}

```html
<template>
  <body>
    <div class="ceng circle"></div>
    <div class="ceng ellipse"></div>
  </body>
</template>
<style>
  /*css 渐变 */
  .ceng {
    width: 300px;
    height: 300px;
    float: left;
    margin: 30px;
    border: 1px solid black;
  }

  /* 要点详记： */
  /* 1.只需要在线性渐变或径向渐变的前面加上repeating单词即可 */
  /* 2.颜色的后面一定要跟上色标值，否则没有作用 */
  .circle {
    background: repeating-linear-gradient(red 0px, green 40px, orange 80px);
  }

  .ellipse {
    border-radius: 50%;
    background: repeating-radial-gradient(red 0px, green 30px, orange 40px);
  }
</style>
```

:::

demo37
::: run {title:"扔在桌子上的图片",row:false,reverse:true}

```html
<template>
  <body>
    <div class="ceng rotate_left">
      <img src="./ballade_dream.jpg" alt="" />
      <p>世界上最好的风景就是在你的身旁，现在我告诉你了</p>
    </div>
    <div class="ceng rotate_right">
      <img src="./china_pavilion.jpg" alt="" />
      <p>9102年了，你还是个单身狗一个人看风景</p>
    </div>
  </body>
</template>
<style>
  /* 
box-shadow:h-shadow v-shadow blur spread color inset
h-shadow：必选，水平阴影位置，允许负值
v-shadow：必选，垂直阴影位置，允许负值
*/
  /* 以下参数为可选 */
  /* 
blur：模糊距离
spread：阴影尺寸
color：阴影颜色
inset：将外部阴影改为内部阴影
*/
  body {
    background: #e9e9e9;
  }

  .ceng {
    width: 294px;
    padding: 10px 10px 20px 10px;
    border: 1px solid #bfbfbf;
    background: white;
    box-shadow: 2px 2px 3px #aaa;
  }

  .rotate_left {
    float: left;
    transform: rotate(8deg);
  }

  .rotate_right {
    float: left;
    transform: rotate(-8deg);
  }
</style>
```

:::
