---
title: Ubuntu 16.04 升级Python3.x
avatar: /images/author.gif
categories: 自学教程
comments: true
date: 2019-04-26 17:29:22
author: MoMik
authorLink:
authorAbout:
authorDesc:
tags:
keywords:
description:
photos: http://wx3.sinaimg.cn/large/0069lHOigy1g2g7m5li9qj318g0nudia.jpg
---

## 序言
有个项目需要Python3.5
我的服务器系统是Ubuntu 16.04 内置Python2.7版本有点低需要升级至3.x

## 代码
1.首先在ubuntu的终端ternimal输入命令：

```shell
sudo apt-get install python3
```

博主选择的是安装python3.5,命令为：sudo apt-get install python3.5
输入你的密码后会下载，刚才下载的Python程序被安装在usr/localb/python3.5 中。

2.指定默认打开的是python3.5版本（你新安装的python版本）。
安装完成之后，你在终端中输入python，输出的信息里面会提示是2.7版本的，也就是说默认打开的并不是刚才安装好的3.5，所以还需要我们重新修改一下链接。方法如下：

> 第一步：先备份原来的链接（在对系统执行删除之前进行备份是个好的习惯）。在ternimal下输入命令：

```shell
sudo cp /usr/bin/python /usr/bin/python_bak

```

> 第二步：删除原来默认指向python2.7版本的链接。在ternimal下输入命令：

```shell
sudo rm /usr/bin/python

```

> 第三步：重新指定新的链接给python3.5版本。输入命令：

```shell
sudo ln -s /usr/bin/python3.5 /usr/bin/python

```

> 另：python2.7和3.5版本之间随意切换（这里3.5切换回2.7版本）：

```shell
sudo rm /usr/bin/python
sudo ln -s /usr/bin/python2.7 /usr/bin/python
```