---
layout: post
title: bootstrap源码阅读——浅谈栅格系统
image: /img/hello_world.png
---

### bootstrap4栅格系统分析


#### 一、栅格系统概述  

bootstrap的grid system由3部分组成：

* container
* row
* columns   

container有2种。container: 固定宽度且水平居中; container-fluid: 满屏。  
row占满整个container, 一行可以包括12个column。  
column有4种类型：lg, md, sm, xs，分别对应着4种设备屏幕大小。

#### 二、栅格系统分析

#### 准备
我们目前是从bootstrap的sass源码来分析栅格系统。该系统主要涉及5个文件：
`_grid.scss`,`_variables.scss`, `mixin/_grid.scss`,`mixin/_gridframework.scss`,`css/mixins/_breakpoints.scss`
#### 分析
bootstrap栅格系统使用一系列的的containers，rows以及columns来呈现内容以及设置内容的边距。它基于弹性盒子并且完全是自适应的。下面我们从一个简单的例子入手，来深入分析他。
```html
<div class="container">
  <div class="row">
    <div class="col-sm">
      One of three columns
    </div>
    <div class="col-sm">
      One of three columns
    </div>
    <div class="col-sm">
      One of three columns
    </div>
  </div>
</div>
```          
上述例子使用我们的预定义类可以在small,medium,large,extra large设备上创建三个宽度相等的columns。这些columns在父级的.container中间。 

细拆一下，接下来我们将从container、row、column这三块逐一进行分析：
#### container  
```css
.container {
    @include make-container();
    @include make-container-max-widths();
  }
```
`@include` 引入了一个`mixin make-container()`,和一个`make-container-max-widths()`:  
(关于这两个mixin的定义可以在`scss/mixins/_grid.scss`中找到)
```css
@mixin make-container() {
  width: 100%;
  padding-right: ($grid-gutter-width / 2);
  padding-left: ($grid-gutter-width / 2);
  margin-right: auto;
  margin-left: auto;
}
```
设置了`margin-left`和`margin-right`都为`auto`。
```css
@mixin make-container-max-widths($max-widths: $container-max-widths, $breakpoints: $grid-breakpoints) {
  @each $breakpoint, $container-max-width in $max-widths {
    @include media-breakpoint-up($breakpoint, $breakpoints) {
      max-width: $container-max-width;
    }
   }
}
```
这个mixin接受两个参数：    
1）$max-widths：表示容器的最大宽度，这是一个全局变量，为map类型
2）$breakpoints：表示断点设置，这是一个全局变量，为map类型。    
(以下两个变量可以在_variables.scss)
```css
$grid-breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px
) !default;

$container-max-widths: (
  sm: 540px,
  md: 720px,
  lg: 960px,
  xl: 1140px
) !default;
```
通过对每一个断点进行遍历，在媒体查询中定义容器的最大宽度。

通过以上，使得`.container`水平居中了，并设置了不同屏幕宽度下的宽度最大值。

#### row

```css
.row {
  @include make-row;
}
```
```css
@mixin make-row() {
  display: flex;
  flex-wrap: wrap;
  margin-right: ($grid-gutter-width / -2);
  margin-left: ($grid-gutter-width / -2);
}
```
make-row，将行容器指定为flex布局，flex-wrap属性设置为换行。     
并把margin-left/right为负值：Rows用来包裹columns。每个column都有水平的padding，用来控制他们之间的距离。这个水平padding抵消了row的负margins。这样一来，所有的columns中的内容看起来在左边是有距离的。

#### Columns

##### 创建column的公共样式

.col-sm-是如何生成的

我们深入其scss目录下，scss/_grid.scss文件：

```css
@if $enable-grid-classes {
  @include make-grid-columns();
}
```
在enable-grid-classes变量为true的情况下（默认为true），调用make-grid-columns()

make-grid-columns()这个mixin定义scss/mixins/_grid-reamework.scss文件中：

```css
@mixin make-grid-columns($columns: $grid-columns, $gutter: $grid-gutter-width, $breakpoints: $grid-breakpoints){
    ...
}
```
这个mixin接受三个参数：
1）$columns表示栅格数目默认为12
2）$gutters默认为30
3）$breakpoints表示断点设置，这是一个全局变量，为map类型。
这些可以在scss/mixins/_breakpoints.scss文件中和scss/_variables.scss文件中找到。

认识了这些参数，我们看.col-sm-具体实现，下面代码我已经进行过大范围精简，只保留col-sm-相关部分，并且搬了注释：

```js
@each $breakpoint in map-keys($breakpoints) {
    // Returns a blank string if smallest breakpoint, otherwise returns the name with a dash infront.
    $infix: breakpoint-infix($breakpoint, $breakpoints);
    // Media of at least the minimum breakpoint width. No query for the smallest breakpoint.
    // Makes the @content apply to the given breakpoint and wider.
    @include media-breakpoint-up($breakpoint, $breakpoints) {
        @for $i from 1 through $columns {
            .col#{$infix}-#{$i} {
                @include make-col($i, $columns);
            }
        }
    }
}
```
我们一步一步来分析：
1）`@each $breakpoint in map-keys($breakpoints)`，对每一个断点进行遍历；        
2）`breakpoint-infix`是一个函数，它定义在`css/mixins/_breakpoints.scss`文件当中， 返回一个带破折号的断点标识字符串，比如这里我们关系的就是“-sm”；           
3）`media-breakpoint-up`是一个mixin：
```css
@mixin media-breakpoint-up($name, $breakpoints: $grid-breakpoints) {
  $min: breakpoint-min($name, $breakpoints);
  @if $min {
    @media (min-width: $min) {
      @content;
    }
  } @else {
    @content;
  }
}
```
4）`breakpoint-min`又是一个函数，它返回了断点的具体数值。这里是用来拼媒体查询条件的。     
5）最后最关键样式的生成又使用了另外一个定义在`css/mixins/_grid.scss`文件当中的mixin:
```css
@mixin make-col($size, $columns: $grid-columns) {
  flex: 0 0 percentage($size / $columns);
  max-width: percentage($size / $columns);
}
```

到此为止，深入了Bootstrap V4的scss/目录下关于栅格系统的源码。