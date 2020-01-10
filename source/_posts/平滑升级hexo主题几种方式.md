---
title: 平滑升级hexo主题几种方式
author: MoMik
avatar: /images/author.gif
categories: hexo从无到有
comments: true
cover: 'https://images.jsonpop.cn/blog/hexothemesupdate.jpg'
abbrlink: 37453
date: 2020-01-10 22:19:35
authorLink:
authorAbout:
authorDesc:
tags:
  - hexo
  - themes
keywords:
description:
photos:
---

对 hexo 页面排版的改动时常需要改主题目录里的文件，但主题也会升级，这意味着用户和主题开发者可能会改动相同的代码，如果不妥善管理代码，需要升级主题时，可能会很不优雅。本文以 Next 主题为例。

# 手动升级

面对升级版本之间的改动，一种容易想到的方法是纯手动升级。这里有两个案例

1. [Hexo 主题快速升级办法 - 知识沉言](https://ricky.moe/2017/06/28/hexo-theme-update/)

   > 手动保存主题改动过的文件
   > 如果你在 themes/xxx 主题文件有自定义的修改，请自行手动备份一下；如果你是大改的话，我也没有好办法

2. [Hexo 升级之坑 - 杨二小](https://zerosoul.github.io/2016/06/15/upgrade-hexo-to-3-2/)

   > 断断续续折腾了两天，才升级成功。所以，如果有啥感想，那就是：没事别瞎 TM 升级！当然，如果一定要升级，最好做增量升级：另起炉灶，一项一项地加功能，这样好定位问题，也容易回滚。

看来手动升级不够优雅，容易采坑。

# 通过 git 升级

为了避免手动升级，一个思路是采用 git 仓库管理主题目录，当主题升级时，采用 git 进行平滑升级。
这看似优雅，却会引入另一个问题：如何在主博客仓库中合理管理一个子主题仓库？NexT Issue #932有很多讨论，也有一些解决方案，这里列出几个：

## 1 采用数据文件的方式

参考[数据文件](https://github.com/theme-next/hexo-theme-next/blob/master/docs/zh-CN/DATA-FILES.md)的介绍和 [NexT Issue #328](https://github.com/iissnan/hexo-theme-next/issues/328)。采用数据文件也只能避免_config.yml 文件冲突，对于用户修改页面模板情况就没办法了。

## 2 基于 fork + submodule

维护父子两个仓库大大增加了复杂度，还要 fork 一份冗余的主题仓库，为了不经常有的主题升级增加这样的复杂性，实在没什么必要。

## 3 同步工具

有用户写了一个 hexo 同步工具 [hexo-git-backup](https://github.com/coneycode/hexo-git-backup)，支持博客、主题的同步，支持自定义 commit 消息。但本质上是个备份工具，需要删除掉主题目录的.git 目录，所以也不支持通过 git 升级主题。

采用 git 升级的方式，确实能够解放双手，平滑升级，但毕竟还是引入了一定的复杂度。有没有一种既能利用 git 的平滑升级，又不那么复杂的方案？

# 暴力但不失优雅的解决方式

由于主题升级的次数相对较少，一般不如用户修改频繁，所以一种简单易行暴力的方式是，git 只用来升级，不用来同步，既能利用 git 进行平滑升级，又避免了引入双层 git 的复杂情况。



## 原理

由 hexo 博客主目录作为 git 仓库统一管理所有代码，主题目录不设单独 git 仓库。每次升级主题时，手动将主题目录制作成临时的 git 仓库，进而以 git 的方式进行升级，升级过后可以再销毁这个临时 git 仓库，由博客主仓库管理升级变更。

## 步骤

1. 记录当前的主题版本 tag，版本号在主题目录的 package.json 中的 version 字段。
2. 随便找个其他目录，clone 最新版本的主题仓库，新建分支 temp 并 checkout，再将 temp 分支 reset –hard 到当前版本的 tag。
3. 【暴力】确认 hexo 的主题目录中没有.git 目录，如果有，删掉。此时拿到步骤 2 的 temp 分支对应的.git 文件夹，将其拷贝到 hexo 的主题目录中。
4. 在主题目录中的 temp 分支上做一次提交（这次提交代表着在上一个版本基础上对主题目录所做的所有更改）。
5. 在 temp 分支上 merge 想要升级到的版本 tag，如果有冲突逐一解决掉。
6. 至此升级完成，主题目录下的.git **可以**删掉了（销毁临时 git 仓库）。升级完成后记得将主目录做一次提交，主目录会将主题升级的所有改动进行提交。

> 本文出自：[暴力而不失优雅地升级 Hexo 主题](https://zhangnai.xin/2018/11/11/hexo-theme-upgrade/)

