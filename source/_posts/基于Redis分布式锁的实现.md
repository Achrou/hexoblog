---
title: 基于Redis分布式锁的实现
avatar: /images/author.gif
categories: 自学教程
comments: true
author: MoMik
cover: 'http://wx2.sinaimg.cn/large/0069lHOigy1g2g7onydgkj30iq09dgn0.jpg'
photos: 'http://wx2.sinaimg.cn/large/0069lHOigy1g2g7onydgkj30iq09dgn0.jpg'
abbrlink: 22576
date: 2019-04-26 17:32:48
authorLink:
authorAbout:
authorDesc:
tags:
keywords:
description:
---

首先，为了确保分布式锁可用，我们至少要确保锁的实现同时满足以下四个条件：

1. 互斥性。在任意时刻，只有一个客户端能持有锁。
2. 不会发生死锁。即使有一个客户端在持有锁的期间崩溃而没有主动解锁，也能保证后续其他客户端能加锁。
3. 具有容错性。只要大部分的Redis节点正常运行，客户端就可以加锁和解锁。
4. 解铃还须系铃人。加锁和解锁必须是同一个客户端，客户端自己不能把别人加的锁给解了。

