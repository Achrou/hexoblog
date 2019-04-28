---
title: 使用微博相册做个人网站CDN图床
avatar: /images/author.gif
categories: 自学教程
comments: true
date: 2019-04-25 17:39:32
author: MoMik
authorLink:
authorAbout:
authorDesc:
tags:
keywords:
description: 对于迁站的痛苦想必很多站长都深有体会
photos: http://wx4.sinaimg.cn/large/0069lHOigy1g2f1szrfimj30sg0g0gmx.jpg
---

## #序言

今天博主终于从wordpress转到hexo来了，至于为什么要转其实我也不想实在是被wp给逼的！
在wp时文章中图片用的是七牛云，相较于其他云存储来说七牛云算是比较够意识的，新注册用户实名认证后送10G免费存储空间，虽然用户上来之后测试域名开始限时，CDN开始收费0.15 元/GB ，但是还是挺划算的🙃

## #正文

七牛云打算放一些重要文件备份，在搭建hexo时就没有选择七牛云做图床。
现在免费可靠的可用于图床的存储空间有：github、gitee、coding、新浪相册
通过下面这个表格对比下

| 存储空间 | 大小 | CDN配合 |
| ------ | ------------------------- | -------- |
| github | 超过1G后官方会发邮件通知 | jsdelivr |
| gitee | 私有仓库免费5G 免费仓库 | 无 |
| coding | 5 个项目数、128M 仓库容量 | 无 |
| 新浪相册 | 单目录126个文件、大小不限 | 新浪CDN |

