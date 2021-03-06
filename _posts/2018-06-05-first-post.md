---
layout: post
title: vue 新学者入门
image: /img/hello_world.jpeg
---

#### vue 新学者入门

首先列出使用 vue 的几个前提

*  node.js 环境  

*  vue-cli 脚手架构建工具  

*  cnpm  npm 的淘宝镜像  


#### 一、安装 node.js  
从 node.js 官网下载并安装 node，安装过程很简单，一路“下一步”就可以了（傻瓜式安装）。  
安装完成之后，打开命令行工具，输入 node -v，如下图，如果出现相应的版本号，则说明安装成功。 
 
 <img src="/img/images/node.png">

#### 二、安装 cnpm

在命令行中输入 npm install -g cnpm --registry=http://registry.npm.taobao.org 然后等待，安装完成如下图。   
(不完全一样，没有报错，跳到下面可以继续输命令就可以了)
 
 <img src="/img/images/cnpm.png">

完成之后，我们就可以用 cnpm 代替 npm 来安装依赖包了。如果想进一步了解 cnpm 的，查看淘宝 npm 镜像官网。

#### 三、安装 vue-cli 脚手架构建工具

在命令行中运行命令 npm install -g vue-cli ，然后等待安装完成。  
通过以上三部，我们需要准备的环境和工具都准备好了，接下来就开始使用 vue-cli 来构建项目。


#### 使用 vue-cli 构建项目

要创建项目，首先我们要选定目录，然后再命令行中把目录转到选定的目录。在这里，我选择在 F 盘的 vue 文件夹下来存放新建的项目，则我们需要先把目录 cd 到该目录。

1、首先输入 f:，然后回车，进入到F盘中。  
2、然后输入 cd vue（指定路径），回车，就可以进入F盘的指定文件夹，如下图。  
（也可以直接进入该目录下，按住 shift 键，同时鼠标点击右键，选择“在此处打开命令窗口”）

<img src="/img/images/cd.png">


在桌面目录下，在命令行中运行命令 vue init airyland/vux2 firstvue 。解释一下这个命令，这个命令的意思是初始化一个项目，因为我们是基于vux2来建立的，所以中间是这样。其中 firstvue 是整个项目文件夹的名称，这个文件夹会自动生成在你指定的目录中（我的实例中，会在桌面生成该文件夹），如下图。

<img src="/img/images/newvue.png">

运行初始化命令的时候回让用户输入几个基本的选项，如项目名称，描述，作者等信息，如果不想填直接回车默认就好。


打开firstvue文件夹，项目文件如下所示。


<img src="/img/images/firstvue.png">


这就是整个项目的目录结构，其中，我们主要在 src 目录中做修改。这个项目现在还只是一个结构框架，整个项目需要的依赖资源都还没有安装，如下图。

<img src="/img/images/package.jpg">

#### 安装项目所需的依赖  

要安装依赖包，首先进入我们的 vue 项目目录（ firstvue 文件夹），然后运行命令 cnpm install，等到安装。

<img src="/img/images/install.jpg">

安装完成之后，会在我们的项目目录firstvue文件夹中多出一个 node_modules 文件夹，这里边就是我们项目需要的依赖包资源。

<img src="/img/images/node_modules.jpg">

安装完依赖包之后，就可以运行整个项目了。

#### 运行项目

在项目目录中，运行命令 npm run dev ，会用热加载的方式运行我们的应用，热加载可以让我们在修改完代码后不用手动刷新浏览器就能实时看到修改后的效果。

<img src="/img/images/rundev.jpg">

这里简单介绍下 npm run dev 命令，其中的 “run” 对应的是 package.json 文件中，scripts 字段中的 dev，也就是 node build/dev-server.js命令的一个快捷方式。

项目运行成功后，浏览器会自动打开 localhost:8080（我是因为 8080 端口已被占用，所以是8081.如果浏览器没有自动打开，可以手动输入）。  
运行成功后，会看到如下所示的界面。

<img src="/img/images/runhtml.png">

如果看到这个页面，恭喜你，项目运行成功了。你可以开启你的 vue 之旅了~~~








