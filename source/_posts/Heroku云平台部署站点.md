---
title: Heroku云平台部署站点
avatar: /images/author.gif
categories: 自学教程
comments: true
date: 2019-04-26 17:33:43
author: MoMik
authorLink:
authorAbout:
authorDesc:
tags:
keywords:
description:
cover: http://wx1.sinaimg.cn/large/0069lHOigy1g2g68cki8nj30m2066mxd.jpg
photos: http://wx1.sinaimg.cn/large/0069lHOigy1g2g68cki8nj30m2066mxd.jpg
---

### 序言
最近在搞这个博客建设中经常要爬墙，每次都要到不同网站获取 "碍事碍事R"真的很麻烦。
为了方便于是便有了用Python爬各个网站的共享账号的想法。
一开始是奔着自己写的，然后无意间在github上发现了一款开源的项目，顿时有种泪奔的冲动真是帮大忙了，省了我不少时间哈哈?并且通过这个项目让我知道了Heroku。下面简单了解下它  ：Start
### Heroku
Heroku是一个支持多种编程语言的免费云平台，可以很好的满足我们学习/研究/实验/测试的目的，同时，他对Python的支持非常良好。[官网](https://www.heroku.com/ "官网")

### 注册
注册前需要准备两样东西
1. 爬墙软件（需要爬墙才可以访问 有心人可以本站找到"碍事碍事R"免费账号{{xieyanxiao}} ）
2. 谷歌邮箱 (验证账号用的，也可是是其他国外邮箱，实测qq、163都不可以大概国内邮箱都不可以）

注册地址[点击这里](https://signup.heroku.com/ "点击这里")
![](http://b.jsonpop.cn/wp-content/uploads/2018/11/Xnip2018-11-20_14-10-42.png)
已经帮各位童鞋翻译成中文了，按照提示填写信息就OK了。然后Heroku就会发送一封认证邮件到你刚刚填写的邮箱地址中。
![](http://b.jsonpop.cn/wp-content/uploads/2018/11/Xnip2018-11-20_14-17-27.png)
然后就会出现设置密码界面
### 创建APP
在[创建应用页面](https://dashboard.heroku.com/new-app "创建应用页面")创建一个应用
在部署 (Deploy) 页面选择 GitHub，在Connect to GitHub 这一栏连接上你的 GitHub 帐号，搜索并连接你要部署的项目
选择一个分支并点击 Deploy Branch
部署完毕后，将网页拉到最上面，并点击Open app打开你的网站。
至此Heroku部署站点就完成了。