# CSS3学习笔记(技术胖)

https://www.tuicool.com/articles/An2uumR

## 面试题

### 渐进增强和优雅降级

答：渐进增强是先满足大部分浏览器；优雅降级是先满足大部分用户，比如目前Chrome的用户最多，那么就把Chrome端做到最好，其它的浏览器再进行适配。

## 1. 工具、网站

这个网站可以查看每个浏览器的CSS属性应该加什么样的前缀

[caniuse.com/](https://caniuse.com/)

查看各浏览器的市场份额

[tongji.baidu.com/research/](https://tongji.baidu.com/research/)

前缀工具packagecontrol，仅支持sublime

[packagecontrol.io/installatio…](https://packagecontrol.io/installation)

贝塞尔曲线：用于调节动画效果

[cubic-bezier.com/#.17,.67,.8…](https://cubic-bezier.com/#.17,.67,.83,.67)

## 2. CSS3新特性简介和浏览器支持情况

### 2.1 新特性简介

1、强大的CSS3选择器 2、抛弃图片的视觉效果 3、盒模型变化（多列布局和弹性盒模型） 4、阴影效果 5、Web字体和Web Font图标 6、CSS3过渡与动画交互效果 7、媒体查询

### 2.2 浏览器支持情况

[tongji.baidu.com/research/](https://tongji.baidu.com/research/)

## 3. 伪类

### 3.1 动态伪类选择器

```css
a:link {
    color: #666;
}
a:visited {
    color: #f00;
}
a:hover {
    color: #000;
}
a:active {
    color: #0f0;
}
```

### 3.2 状态伪类选择器

```css
input:enabled {
    background-color: #0f0;
}
input:disabled {
    background-color: #f00;
}
```

### 3.3 结构伪类选择器

- :first-child：选择某个元素的第一个子元素
- :last-child：选择某个元素最后一个子元素
- :nth-child()：选择某个元素的一个或多个特定的子元素
  - n：选中所有子元素
  - 2n：选中所有偶数的子元素。也可以even
  - 2n+1：选中所有奇数的子元素。也可以odd
  - 3：选中某个子元素
  - n+5：从5开始后面所有子元素
  - 4n+1：每隔三个选中一个子元素
  - 注意：从1开始
- :nth-last-child()：选择某个元素的一个或多个特定的子元素，从这个元素的最后一个子元素开始算
- :nth-of-type()：选择指定的元素。就是只选择 `:` 前的那个类型
- :nth-last-of-type()：选择指定的元素，从元素的最后一个开始计算
- :first-of-type：选择一个上级元素下的第一个同类子元素
- :last-of-type：选择一个上级元素下的最后一个同类子元素
- :only-child：选择的元素是它的父元素的唯一一个子元素
- :only-of-type：选择一个元素是它的上级元素的唯一一个相同类型的子元素
- :empty：选择的元素里面没有任何内容

## 4. 伪元素

CSS伪元素用于向某些选择器设置特殊效果

- ::first-letter：将特殊的样式添加到文本的首字母
- ::first-line：将特殊的样式添加到文本的首行
- ::before：在某元素之前插入某些内容
- ::after：在某元素之后插入某些内容

## 5. 透明

opacity：文字也会跟着透明；只能作用于让图片背景透明 rgba：文字并不会跟着透明；可以放在背景、边框上，任何用到色值的地方都可以使用

## 6. 动画

- animation-name：动画名称
- animation-duration：持续时间
- animation-timing-function
  - ease：慢快慢
  - linear：匀速
  - ease-in：慢快
  - ease-out：快慢
  - ease-in-out：慢快慢
  - step-start：没有过渡
  - step-end：等duration时间后，瞬间变化
- animation-delay：延迟
- animation-iteration-count：执行次数
  - infinite：无限循环
- animation-direction
  - normal：正常
  - alternate：正着走，然后反着走，如此循环

## 7. 文字阴影(text-shadow)

text-shadow：h-shadow v-shadow blur color;

- h-shadow：必需。水平阴影的位置。允许负值。
- v-shadow：必需。垂直阴影的位置。允许负值。
- blur：可选。模糊的距离。
- color：可选。阴影的颜色。

## 课程Demo

### Demo1：缩放动画

效果：

- 图片居中
- 圆角
- 进入之后鼠标编程点击的形状
- 进入之后图片缩放1.1倍

```css
<img src="./images/panda.jpeg" alt="">
复制代码
img {
    border-radius: 50%;
    transition: 0.5s;
    cursor: pointer;
}

body {
    text-align: center;
}
img:hover {
    transform: scale(1.1);
}
```

### Demo2：三角形

将该属性设置在一个div上面。 主要是通过将宽度和高度都设置为0，然后给一个大的boder，留下需要保留的三角形一遍。对面的一边宽度设置为0，其余两遍宽度一致，但是颜色设置为透明

```html
<div class="sanjiao"></div>
```



```css
border-top: 50px  solid transparent;
border-left: 0px solid #f00;
border-bottom: 50px solid transparent;
border-right: 50px solid #00f;

width: 0px;
height: 0px;
margin: 50px auto;
```

### Demo3：对话框

将下列属性作用于一个div即可 主要就是做出一个三角形，然后使用子绝父相的定位方式移动到父元素的左边。

```html
<div class="dialog">
    Hello Everyone! I'm Panda.
</div>
```

```css
.dialog {
    background-color: #6a6;
    margin-top: 50px auto;
    width: 300px;
    height: 25px;
    line-height: 25px;
    padding: 10px;
    border-radius: 6px;
    color: #fff;
    position: relative;
    margin: 50px auto;
}
.dialog::before {
    content: '';
    border-left: 0px solid #6a6;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid #6a6;
    position: absolute;
    left: -10px;
    top: 14px;
}
```

### Demo4：画菱形

将该属性应用于某个div即可 其实就是将一个正方形旋转45度角，需要注意的是transform这个属性最好加前缀，考虑到很多浏览器的兼容性

```html
<div class="diamond"></div>
```

```css
.diamond {
    width: 200px;
    height: 200px;
    background-color: #6a6;
    margin: 100px auto;
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
}
```

### Demo5：平行四边形

将该属性应用于一个div上 其实就是一个skew倾斜属性，同样需要考虑从兼容性加前缀，然后注意skew的第一个参数是x轴倾斜，第二个参数是y轴倾斜

```html
<div class="parallel"></div>
```



```css
.parallel {
    width: 200px;
    height: 100px;
    background-color: #6a6;
    margin: 100px auto;
    -webkit-transform: skew(20deg);
    -moz-transform: skew(20deg);
    -ms-transform: skew(20deg);
    -o-transform: skew(20deg);
    transform: skew(20deg);
}
```

### Demo6：五角星

将这些属性设置在一个空的div上即可。其实就是三个三角形通过旋转、定位最后组合出来的形状

```html
<div class="star"></div>
```



```css
.star {
    width: 0px;
    height: 0px;
    border-bottom: 70px solid red;
    border-left: 100px solid transparent;
    border-right: 100px solid transparent;
    margin: 150px auto;
    -webkit-transform: rotate(35deg);
    -moz-transform: rotate(35deg);
    -ms-transform: rotate(35deg);
    -o-transform: rotate(35deg);
    transform: rotate(35deg);
    position: relative;
}
.star::before {
    content: '';
    width: 0px;
    height: 0px;
    border-bottom: 80px solid red;
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
    position: absolute;
    -webkit-transform: rotate(-35deg);
    -moz-transform: rotate(-35deg);
    -ms-transform: rotate(-35deg);
    -o-transform: rotate(-35deg);
    transform: rotate(-35deg);
    top: -45px;
    left: -65px;
}
.star::after {
    content: '';
    width: 0px;
    height: 0px;
    border-bottom: 70px solid red;
    border-left: 100px solid transparent;
    border-right: 100px solid transparent;
    position: absolute;
    -webkit-transform: rotate(-70deg);
    -moz-transform: rotate(-70deg);
    -ms-transform: rotate(-70deg);
    -o-transform: rotate(-70deg);
    transform: rotate(-70deg);
    top: -3px;
    left: -105px;
}
```

### Demo7：六角星

将下面的属性应用于一个空的div即可。其实就是一个向上的三角形，一个向下的三角形的组合。

```html
<div class="star"></div>
```



```css
.star {
    width: 0px;
    height: 0px;
    border-bottom: 100px solid red;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    position: relative;
}
.star::after {
    content: '';
    width: 0px;
    height: 0px;
    border-top: 100px solid red;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    position: absolute;
    top: 30px;
    left: -50px;
}
```

### Demo8：五边形

将下面的属性应用于一个div上即可。五边形其实就是一个三角形加一个梯形，梯形其实就是在画三角形的时候设置一下宽度或者高度。

```html
<div class="wubian"></div>
```

```css
.wubian {
    width: 54px;
    height: 0px;
    margin: 100px auto;
    border-top: 50px solid red;
    border-left: 18px solid transparent;
    border-right: 18px solid transparent;
    position: relative;
}
.wubian::after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-bottom: 35px solid red;
    border-left: 45px solid transparent;
    border-right: 45px solid transparent;
    top: -85px;
    left: -18px;
}
```

### Demo9：六边形

将下面的代码应用于一个空的div即可。其实就是两个三角形和一个矩形的组合。

```html
<div class="six"></div>
```

```css
.six {
    width: 100px;
    height: 55px;
    margin: 100px auto;
    background-color: red;
    position: relative;
}
.six::before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-bottom: 25px solid red;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    top: -25px;
}
.six::after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-top: 25px solid red;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    top: 55px;
}
```

### Demo10：心形

将下面的属性应用于一个div即可。其实就是两个矩形，每个矩形的一端变成圆弧。然后向左和向右旋转一定的角度，然后组合在一起。

```html
<div class="heart"></div>
```

```css
.heart {
    width: 100px;
    height: 90px;
    position: relative;
    margin: 100px auto;
    /* background-color: #ff0; */
}
.heart::before {
    content: '';
    position: absolute;
    width: 50px;
    height: 80px;
    background-color: red;
    border-radius: 50px 40px 0 0;
    -webkit-transform-origin: 0 100%;
    -moz-transform-origin: 0 100%;
    -ms-transform-origin: 0 100%;
    -o-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
    left: 50px;
}
.heart::after {
    content: '';
    position: absolute;
    width: 50px;
    height: 80px;
    background-color: red;
    border-radius: 50px 40px 0 0;
    -webkit-transform-origin: 100% 100%;
    -moz-transform-origin: 100% 100%;
    -ms-transform-origin: 100% 100%;
    -o-transform-origin: 100% 100%;
    transform-origin: 100% 100%;
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
    left: 0px;
}
```

### Demo11：蛋形

将该属性应用于一个空的div上，其实就是给矩形画不同的圆角。border-radius中/前表示四个角的x轴，/后表示四个角的y轴。

```html
<div class="egg"></div>
```

```css
.egg{
    width: 126px;
    height: 180px;
    background-color: #fa3;
    margin: 100px auto;
    border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
}
```

### Demo12：太极阴阳图

将下面的属性设置在一个空的div即可。其实就是一个圆，一半黑，一半白。然后分别一个中心黑外边白和一个中心白外边黑的圆分别放到上面和下面。

```html
<div class="taiji"></div>
```

```css
body {
    background-color: #ccc;
}
.taiji {
    width: 150px;
    height: 300px;
    margin: 100px auto;
    border-radius: 50%;
    background-color: white;
    border-left: 150px solid black;
    position: relative;
}
.taiji::before {
    content: '';
    position: absolute;
    width: 0px;
    height: 0px;
    padding: 25px;
    border-radius: 50%;
    border: 50px solid black;
    background-color: #fff;
    left: -75px;
    top: 0px;
}
.taiji::after {
    content: '';
    position: absolute;
    width: 0px;
    height: 0px;
    padding: 25px;
    border-radius: 50%;
    border: 50px solid white;
    background-color: #000;
    left: -75px;
    bottom: 0;
}
```

### Demo13：透明

效果

- 透明文字层在图片上面
- 有阴影
- 居中

```html
<div class="background">
    <div class="content">
        Hello everyone! I'm Panda.<br/>
        Hello everyone! I'm Panda.<br/>
        Hello everyone! I'm Panda.<br/>
        Hello everyone! I'm Panda.<br/>
        Hello everyone! I'm Panda.<br/>
        Hello everyone! I'm Panda.<br/>
    </div>
</div>
```

```css
.background {
    margin: 100px auto;
    width: 800px;
    height: 291px;
    background-image: url('./img/aa.jpg');
    position: relative;
}
.content {
    position: absolute;
    width: 400px;
    height: 200px;
    background-color: #fff;
    opacity: 0.8;
    top: 45px;
    left: 200px;
    border-radius: 10px;
    padding: 10px;
    text-align: center;
    -webkit-box-shadow: 3px 3px 5px #888;
    box-shadow: 3px 3px 5px #888;
}
```

### Demo14：天猫案例——mouseover高亮

效果：

- 天猫的产品展示卡片
- 鼠标移入的时候，显示红色边框、图片逐渐变透明

```html
<div class="main">
    <ul>
        <li>
            <div class="img">
                <img src="./img/danta.png" alt="">
            </div>
            <div class="goods_title">
                展艺葡式蛋挞皮102个装 烘焙家用材料套餐带锡底半成品酥皮塔壳液
            </div>
            <div class="price">$499</div>
        </li>
        <li>
            <div class="img">
                <img src="./img/huangtao.png" alt="">
            </div>
            <div class="goods_title">
                砀山锦绣黄桃10斤桃子新鲜水果包邮应季黄金毛蜜桃当季整箱时令甜
            </div>
            <div class="price">$499</div>
        </li>
    </ul>
</div>
```

```css
body {
    background-color: #ddd;
}
.main {
    margin: 100px auto;
    width: 800px;
    clear: both;
}
.main li {
    background-color: #fff;
    list-style: none;
    width: 240px;
    padding: 1px;
    border: 1px solid rgba(255,0,0,0);
    cursor: pointer;
    float: left;
    margin: 3px;
}
.main li:hover {
    border: 1px solid rgba(255,0,0,1)
}
.main li:hover .img img{
    opacity: 0.7;
}
.img img {
    width: 240px;
    transition: all 0.5s;
}
.goods_title {
    margin: 10px;
    color: #666;
    height: 41px;
    overflow: hidden;
}
.price {
    margin: 10px;
    color: red;
}
```

### Demo15：线性渐变

将该属性应用于一个空的div即可，其实和PS的线性渐变是完全一样的。 效果就是渐变是按照一条直线进行的。

```html
<div class="ceng"></div>
```

```css
.ceng {
    width: 260px;
    height: 200px;
    border: 1px solid black;
    background-image: linear-gradient(to right,orange, green, red);
    background-image: -webkit-linear-gradient(to right,orange, green, red);
    background-image: -o-linear-gradient(to right,orange, green, red);
}
```

### Demo16：径向渐变

效果就是一个圆形，按照半径的方向进行渐变。其实就是在属性前面加上repeating，然后设定一个色标值就可以了。

```html
<div class="ceng circle"></div>
<div class="ceng ellipse"></div>
```

```css
.ceng {
    width: 100px;
    height: 100px;
    border: 1px solid black;
    border-radius: 50%;
    margin: 10px;
    float: left;
}
.circle {
    background-image: radial-gradient(20px circle at center, orange, green, red);
}
.ellipse {
    background-image: radial-gradient(20px 30px ellipse at center,orange, green, red);
}
```

### Demo17：重复性渐变

即将一定的渐变色标，多次重复。其实就是

```html
<div class="ceng"></div>
<div class="cicle"></div>
```

```css
.ceng {
    width: 300px;
    height: 300px;
    margin: 20px auto;
    background-image: repeating-linear-gradient(red 0px, green 40px, orange 80px);
}
.cicle {
    width: 300px;
    height: 300px;
    margin: 20px auto;
    border-radius: 50%;
    background-image: repeating-radial-gradient(red 0px, green 30px, orange 40px);
}
```

### Demo18：盒子阴影

```css
box-shadow: h-shadow v-shadow blur spread color inset;
```

- h-shadow：必需。水平阴影的位置。允许负值。
- v-shadow：必需。垂直阴影的位置。允许负值。
- blur：可选。模糊距离。建议设置得大一点。
- spread：可选。阴影的尺寸。
- color：可选。阴影的颜色。
- inset：可选。将外部阴影（outset）改为内部阴影。

```html
<div class="ceng rotate_left">
    <img src="./img/a1.jpg" alt="">
    <p>fafafafaf     fafafafafafafafefae</p>
</div>
<div class="ceng rotate_right">
    <img src="./img/a2.jpg" alt="">
    <p>fafafafaf     fafafafafafafafefae</p>
</div>
```

```css
body {
    background-color: white;
}
.ceng {
    width: 294px;
    padding: 10px 10px 20px 10px;
    border: 1px solid #BFBFBF;
    background-color: white;
    box-shadow: 2px 3px 20px #aaa;
}
.ceng img{
    width: 294px;
}
.rotate_left {
    float: left;
    -webkit-transform: rotate(7deg);
    -ms-transform: rotate(7deg);
    -o-transform: rotate(7deg);
    transform: rotate(7deg);
}
.rotate_right {
    float: left;
    -webkit-transform: rotate(-8deg);
    -ms-transform: rotate(-8deg);
    -o-transform: rotate(-8deg);
    transform: rotate(-8deg);
}
```

### Demo19：过渡效果

效果：

- 让一个正方形缓慢过渡变成长方形

```css
transition
```

- transition-property：过渡属性（默认值all）
- transition-duration：过渡持续时间（默认值0s）
- transition-timing-function：过渡函数（默认值为ease函数）
  - ease：慢快慢
  - linear：匀速
  - ease-in：慢快
  - ease-out：快慢
  - ease-in-out：慢快慢
  - step-start：没有过渡
  - step-end：等duration时间后，瞬间变化
- transition-delay：过渡延迟时间（默认值0s）

```html
<div class="ceng"></div>
```

```css
.ceng {
    width: 100px;
    height: 100px;
    background-color: pink;
    cursor: pointer;
    transition-duration: 1s;
    transition-property: width height;
    transition-delay: 0.2s;
    transition-timing-function: ease;
}
.ceng:hover {
    width: 300px;
    height: 150px;
    background-color: red;
    border-radius: 40px;
}
```

### Demo20：仿天猫专题过渡效果

效果

- 图片为透明背景
- 鼠标放上去会自动缩放变大，并且有过渡动画
- 背景是一个用纯灰色制成的圆形

```html
<div class="main">
    <ul>
        <li>
            <div class="m_title">手机馆</div>
            <div class="m_content">R9s Plus 黑色版首发</div>
            <div class="m_img"><img src="./img/a1.jpg" alt=""></div>
        </li>
    </ul>
</div>
```

```css
* {
    padding: 0px;
    margin: 0px;
    font-family: 'Microsoft YaHei';
}
.main {
    margin: 10px auto;
    width: 260px;
    border: 1px solid #ccc;
    text-align: center;

}
.main img {
    width: 260px;
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
    color: #666;
    margin-bottom: 15px;
}
.m_img {
    position: relative;
    padding: 30px;
}
.m_img::before {
    content: '';
    position: absolute;
    width: 160px;
    height: 160px;
    background-color: #eee;
    border-radius: 50%;
    z-index: -1;
    left: 35px;
    top: 10px;
}
.m_img img {
    transform: scale(1);
    transition: all 1s;
}
.main li:hover .m_img img {
    transform: scale(1.1);
}
```

### Demo21：仿天猫类别过渡效果

效果

- 鼠标移入，鼠标变成手指
- 图片向左移动，并且有动画效果

```html
<div class="main">
    <div class="m_title">好车特卖一口价</div>
    <div class="m_content">新年 新车 开回家</div>
    <div class="m_img"><img src="./img/aa.png" alt=""></div>
</div>
```

```css
.main {
    width: 260px;
    height: 270px;
    border: 1px solid #ccc;
    margin: 50px auto;
    font-family: 'Macrosoft YaHei';
    cursor: pointer;
}
.m_title {
    text-align: left;
    font-weight: bold;
    font-size: 20px;
    padding: 20px 10px 10px 10px;
}
.m_content {
    color: #11ccaa;
    padding: 0px 10px 10px 10px;
}
.m_img {
    text-align: right;
    position: relative;
}
.m_img img {
    position: absolute;
    width: 180px;
    top: 0px;
    right: 0px;
    transition: all 0.3s;
}
.main:hover img {
    right: 15px;
}
```

### Demo22：动画-口字循环

```html
<div class="rect"></div>
```

```css
.rect {
    width: 100px;
    height: 100px;
    background-color: red;
    position: fixed;
    animation: mymove 2s infinite;
}
@keyframes mymove {
    0% { top: 0; left: 20%; background-color: red; }
    25% { top: 0; left: 80%; background-color: blue; }
    50% { top: 80%; left: 80%; background-color: green; }
    75% { top: 80%; left: 20%; background-color: black; }
    100% { top: 0; left: 20%; background-color: red; }
}
```

### Demo23：Loading-波浪长条条

效果

- 每一根竖条一次变长

```html
<div class="spinner">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
</div>
```

```css
.spinner {
    margin: 100px auto;
    width: 60px;
    height: 60px;
    text-align: center;
    font-size: 10px;
}
.spinner > div {
    background-color: #67cf22;
    height: 100%;
    width: 6px;
    height: 100%;
    display: inline-block;
    animation: mymove 1.2s infinite ease-in-out;
}
.spinner >div:nth-child(2){
    animation-delay: -1.1s;
}
.spinner >div:nth-child(3){
    animation-delay: -1.0s;
}
.spinner >div:nth-child(4){
    animation-delay: -0.9s;
}
.spinner >div:nth-child(5){
    animation-delay: -0.8s;
}
@keyframes mymove {
    0%,40%,100% {transform: scaleY(0.4);}
    20% {transform: scaleY(1);}
}
```

### Demo24：Loading-圆圈冒冒冒

效果：

- 两个绿色的小圆圈，不停地变大缩小
- 它们之间有一个小小的时差，所以，可以错开放大和缩小

```css
<div class="spinner">
    <div></div>
    <div></div>
</div>
```

```css
.spinner {
    width: 60px;
    height: 60px;
    position: relative;
    margin: 100px auto;
}
.spinner > div {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #67cf22;
    opacity: 0.6;
    position: absolute;
    top: 0px;
    left: 0px;
    animation: mya 2.0s infinite ease-in-out;
}
.spinner > div:nth-child(2){
    animation-delay: -1s;
}
@keyframes mya {
    0%,100% { transform: scale(0.0); }
    50% { transform: scale(1.0); }
}
```

### Demo25：文字阴影做特殊字体

效果

- font1：文字外发光
- font2：苹果内嵌字体
- font3：3D字体

```html
<div class="font1">Panda</div>
<div class="font2">APPLE SYSTEM</div>
<div class="font3">3D TEXT EFFECT</div>
```

```css
body {
    background-color: #666;
    text-align: center;
    font: bold 55px "Microsoft YaHei";
}
.font1 {
    color: #fff;
    text-shadow: 0px 0px 20px red;
}
.font2 {
    color: #000;
    text-shadow: 0px 1px 1px #fff;
}
.font3 {
    color: #fff;
    text-shadow: 1px 1px rgba(197, 223, 248, 0.8),
                 2px 2px rgba(197, 223, 248, 0.8),
                 3px 3px rgba(197, 223, 248, 0.8),
                 4px 4px rgba(197, 223, 248, 0.8),
                 5px 5px rgba(197, 223, 248, 0.8),
                 6px 6px rgba(197, 223, 248, 0.8);
}
```

### Demo26：文字溢出(text-overflow)

效果

- 文字多于显示区域的情况下，可以在最后用...代替后面所有内容。

注意

- text-overflow: clip;overflow: hidden; 需要一起使用，并且效果和overflow: hiden;完全相同
- text-overflow: ellipsis; overflow: hidden;white-space: nowrap;需要一起使用

```html
<div class="demo">
    香港特别行政区行政长官林郑月娥7日宣布免费为全港市民进行自愿性新冠病毒检测，最快在两周后实施。这本是为切断病毒传播链而做出的举措，但黄之锋等乱港分子们却借此“碰瓷”，兜售起阴谋论。
</div>
<div class="demo1">
    香港特别行政区行政长官林郑月娥7日宣布免费为全港市民进行自愿性新冠病毒检测，最快在两周后实施。这本是为切断病毒传播链而做出的举措，但黄之锋等乱港分子们却借此“碰瓷”，兜售起阴谋论。
</div>
```

```css
.demo {
    margin: 30px auto;
    width: 100px;
    padding: 10px;
    border: 1px solid #ccc;
    height: 50px;
    text-overflow: clip;
    overflow: hidden;
}
.demo1 {
    margin: 30px auto;
    width: 100px;
    padding: 10px;
    border: 1px solid #ccc;
    -webkit-text-overflow: ellipsis;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
```

### Demo27：长度单位

```html
<div>Hello Panda!</div>
<h1>Hello Panda!</h1>
```

```css
html {
    font-size: 62.5%;
}
body {
    font-size: 1.4rem; /* 14px */
}
h1 {
    font-size: 2.4rem; /* 24px */
}
```