---
title: 关于Java多线程的理解
avatar: /images/author.gif
categories: 自学教程
comments: true
author: MoMik
cover: 'https://edu.aliyun.com/files/course/2018/01-17/194713172484278756.png'
photos: 'https://edu.aliyun.com/files/course/2018/01-17/194713172484278756.png'
abbrlink: 58178
date: 2019-04-26 17:27:52
authorLink:
authorAbout:
authorDesc:
tags:
keywords:
description:
---

首先说到线程就要提一下进程：

一个程序的执行周期就是一个进程 。

不管有多少块CPU，最后都是一块空间进行程序 处理

在单cpu的情况下 多个程序同时执行时就需要对源进行轮番使用就

![](http://b.jsonpop.cn/wp-content/uploads/2018/11/19455539a000209163.png)

在传统进程中 在一个程序执行的时候所有的资源只为这一个程序服务

而在现阶段 还是只有一块资源而这一块资源就要被程序轮番占用

一块资源在同一时间段内可能会有多个进程交替执行，但是在某一时间点上只能有一个进程在执行。

## 多线程

线程是在进程的基础上进一步划分，也就是说线程是比进程更小得执行单位。

![](https://edu.aliyun.com/files/course/2018/01-17/194713172484278756.png)

在服务器应用中 web服务就相当于一个进程，而不同用户访问这个进程就是一个线程，线程拥有自己的对象，而这些线程都是指向同一块堆内存。

并发就是访问的进程量爆高，最直白的问题就是服务器的内存不够用了，无法创建新的用户（线程）。