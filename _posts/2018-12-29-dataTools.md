---
layout: post
title: 安装配置包失败案例
image: /img/dataTools/img1.png
---

#### 安装配置包失败案例


##### 一、安装配置包失败案例  
在运行别人写的项目的时候失败了，也弄的挺久的，现在就是写下中间的历程，希望能够吸取教训，提升经验。

##### 二、问题的出现和解决过程

该项目文件夹下打开PowerShell命令窗口

![](/img/dataTools/img7.png)    

执行 `yarn install`命令：

![](/img/dataTools/img1.png)

发现有很多乱码，项目无法运行。找到其中的一条

![](/img/dataTools/img2.png)

发现是sass环境没编译过。sass依赖于Python环境。  
运行命令 `python -v` 有出现相关Python的版本信息，说明python环境有了。应该是缺少vc++编译环境组件。

使用cmd运行 `chcp 65001`，解决乱码的问题。然后去执行
```js
npm install --global --production windows-build-tools
```
，安装`windows-bulid-tools`，一开始执行的时候报错权限不足，改成cmd以管理员身份运行。才最终成功。

一开始，安装的时候出现了下面的界面，我以为是安装成功了
![](/img/dataTools/img3.png)

然后到项目目录底下重新执行 `yarn install`,结果发现一样的问题，并没有安装成功。
因为不知道具体的原因，中间我使用了yarn cnpm npm 都进行了尝试。  

下面贴上我用的几条命令：  
yarn 命令：
```js
 安装:
yarn global add windows-build-tools
 卸载:
yarn global remove windows-build-tools
```
npm 命令：  
```js
安装:
npm install --global --production windows-build-tools
卸载:
npm uninstall --g windows-bulid-tools
清除缓存:
npm cache clean -force -g
```
总之，我卸载完又重新安装之后，使用cmd命令，没有再出现乱码，但是又出现了如下的错误：

![](/img/dataTools/img4.png)

根据提示，应该没有安装成功。 

我打开控制面板 -> 程序与功能，找如下几个：

![](/img/dataTools/img5.jpg)

并没有找到，所以，确认没有安装成功。此时电脑还是缺少编译C++的环境。

于是，我尝试下载`visualstudio`，进行安装，但是也没成功。
![](/img/dataTools/img6.jpg)

网络一直停留不动，让人不得不怀疑，是不是我电脑网络有问题。想起了我之前改过我电脑上的host文件。

于是我找到我电脑上的host文件，把里面的内容清空了。

然后我再次尝试这3条命令：
```js
卸载
npm uninstall --g windows-bulid-tools

清除缓存
npm cache clean -force -g

安装
npm install --global --production windows-build-tools

```
终于，这次电脑有了不同的结果。

![](/img/dataTools/img7.jpg)

猜测这是是安装成功了。为了确认，电脑上找到了以下目录。
![](/img/dataTools/img8.jpg)
寻找如下环境变量，但是没找到。 

![](/img/dataTools/img9.jpg)   
npm输入
```js
npm config ls -l 
```
        
出现了如下内容

![](/img/dataTools/img10.jpg)
      
里面有一条：
    
![](/img/dataTools/img11.jpg)      
由此推断应该是安装成功了。  
重新到项目中,`npm install`，这次终于成功了！

所以，问题出在我改过host文件，导致windows-build-tools 总是安装失败。

ps：参考解决方案的网址如下  
`https://github.com/nodejs/node-gyp#on-windows`

emm.....以上就是我从出现问题到解决的过程，虽然路程并不是那么顺畅，也走了很多弯路。但好在最后还是解决了问题。写下这篇博客，希望能从中吸取教训，多一些经验。

