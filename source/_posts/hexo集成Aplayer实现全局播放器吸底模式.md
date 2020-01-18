---
title: hexo集成Aplayer实现全局播放器吸底模式
author: MoMik
avatar: /images/author.gif
categories: hexo从无到有
comments: true
tags:
  - Hexo
  - Aplayer
description: 装饰博客没有一款音乐播放器怎么能行呢
cover: >-
  https://images.jsonpop.cn/blog/aplyaer_top.png
abbrlink: 19777cfa
date: 2020-01-18 11:01:07
keywords:
---

装饰博客没有一款音乐播放器怎么能行呢？现在主流的播放器有[绚丽彩虹播放器](https://badapple.top/)、[APlayer](https://aplayer.js.org/) 。我个人平时喜欢简洁、清新风所以[APlayer](https://aplayer.js.org/)更适合我。

## APlayer

> 🍭 Wow, such a beautiful HTML5 music player 

![APlayer列表模式](https://images.jsonpop.cn/blog/aplayer_list.png)

这是APlayer默认的播放列表，要实现这种效果仅需要几个简单的步骤即可:

1. 引入APlayer样式、脚本
2. 引入Meting脚本
3. 创建播放器容器

```html
<!-- APlayer样式 -->
<link rel="stylesheet" href="APlayer.min.css">
<!-- 播放器容器 -->
<div id="aplayer"></div>
<!-- APlayer脚本 -->
<script src="APlayer.min.js"></script>
<!-- Meting 一个支持各种音乐平台(腾讯、网易...)的音乐 API 框架 -->
<script src="Meting.min.js"></script>
```

{% meting "455354804" "netease" "playlist" "theme:#555" "mutex:true" "listmaxheight:340px"  "preload:auto" %}

你还可以将它嵌入到你的post/page页面里。当然APlayer也提供了另外两种模式供我们选择:

- 迷你模式（详细查看官方文档）
- 吸底模式（本文介绍的是基于这种模式）

## Hexo集成APlayer

先来看下效果图

![APlayer_fixed](https://images.jsonpop.cn/blog/aplayer_fixed1.gif)

我们要做的就是将上述几行代码转换到hexo。

> 在你的主题下的layout目录（任意位置）新建一个名为aplayer文件

我的主题使用的是pug模板进行渲染 ，所以我这里新建一个aplayer.pug文件。然后将上述代码转化为你自己模板所支持的语法即可。pug格式如下：

```pug
// 判断是否启用aplayer
if theme.aplayer && theme.aplayer.enable
	// 播放器容器
	.aplayer(data-id=theme.aplayer.id data-server="theme.aplayer.server" data-type="theme.aplayer.type" data-fixed="theme.aplayer.fixed" data-order="theme.aplayer.order" data-preload="theme.aplayer.preload")
	each item in theme.aplayer.css
		link(rel='stylesheet', href=item)
	each item in theme.aplayer.js
		script(src=item)
```

注意这一行代码多了些配置参数

.aplayer(data-id="`theme.aplayer.id`" data-server="`theme.aplayer.server`" data-type="`theme.aplayer.type`" data-fixed="`theme.aplayer.fixed`" data-order="`theme.aplayer.order`" data-preload="`theme.aplayer.preload`")

| container       | document.querySelector('.aplayer') | 播放器容器元素                                               |
| --------------- | ---------------------------------- | ------------------------------------------------------------ |
| fixed           | false                              | 开启吸底模式, [详情](https://aplayer.js.org/#/home?id=fixed-mode) |
| mini            | false                              | 开启迷你模式, [详情](https://aplayer.js.org/#/home?id=mini-mode) |
| autoplay        | false                              | 音频自动播放                                                 |
| theme           | '#b7daff'                          | 主题色                                                       |
| loop            | 'all'                              | 音频循环播放, 可选值: 'all', 'one', 'none'                   |
| order           | 'list'                             | 音频循环顺序, 可选值: 'list', 'random'                       |
| preload         | 'auto'                             | 预加载，可选值: 'none', 'metadata', 'auto'                   |
| volume          | 0.7                                | 默认音量，请注意播放器会记忆用户设置，用户手动设置音量后默认音量即失效 |
| audio           | -                                  | 音频信息, 应该是一个对象或对象数组                           |
| audio.name      | -                                  | 音频名称                                                     |
| audio.artist    | -                                  | 音频艺术家                                                   |
| audio.url       | -                                  | 音频链接                                                     |
| audio.cover     | -                                  | 音频封面                                                     |
| audio.lrc       | -                                  | [详情](https://aplayer.js.org/#/home?id=lrc)                 |
| audio.theme     | -                                  | 切换到此音频时的主题色，比上面的 theme 优先级高              |
| audio.type      | 'auto'                             | 可选值: 'auto', 'hls', 'normal' 或其他自定义类型, [详情](https://aplayer.js.org/#/home?id=mse-support) |
| customAudioType | -                                  | 自定义类型，[详情](https://aplayer.js.org/#/home?id=mse-support) |
| mutex           | true                               | 互斥，阻止多个播放器同时播放，当前播放器播放时暂停其他播放器 |
| lrcType         | 0                                  | [详情](https://aplayer.js.org/#/home?id=lrc)                 |
| listFolded      | false                              | 列表默认折叠                                                 |
| listMaxHeight   | -                                  | 列表最大高度                                                 |
| storageName     | 'aplayer-setting'                  | 存储播放器设置的 localStorage key                            |

> 找到主题目录中的入口文件或者header、footer这种公共文件引入aplayer.pug

我的主题是在layout.pug文件最后一行引入

```
include ./comments/aplayer.pug
```

> 最后主题配置文件中增加aplayer配置

```yaml
# Aplayer播放器配置
aplayer: 
  enable: true
  js: 
  	- https://cdn.bootcss.com/aplayer/1.10.1/APlayer.min.js
  	- https://cdn.jsdelivr.net/npm/meting@1.2.0/dist/Meting.min.js
  css: 
  	- https://cdn.bootcss.com/aplayer/1.10.1/APlayer.min.css
  id: 455354804 #网易云歌单编号
  server: netease #网易云
  type: playlist
  fixed: true
  order: random
  preload: none
```

