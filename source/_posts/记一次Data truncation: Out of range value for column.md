---

title: 记一次Data truncation: Out of range value for column ''
author: MoMik
avatar: /images/author.gif
categories: 自学教程
comments: true
date: 2019-07-01 18:27:18
authorLink:
authorAbout:
authorDesc:
tags:
keywords:
description:
photos:
---

在使用mysql是需要注意关于小数类型设置长度问题，今天客户方在使用程序时保存报错，根据他提供的信息来讲始终自由一条特殊数据保存不进去，具体报的什么错不管是日志还是前端展示上都没有明确体现（这款程序很老先不说，代码写的也贼乱，跑这个项目mac散热飞起…）。所以只能通过数据和调试程序寻找原因了。。。

1、查询数据库对比其他数据，寻找差异

大致看了下，没找到差异（没注意数据长度）

2、调试程序

代码是直接回滚掉的，try-catch也没加，哪行报错不知道，sql用的原始jdbc写的，SQL一长串

以上几点让我一点看代码的心情都没有。直接外层加try-catch先确定错误原因是啥。

然后就出现了：

> Data truncation: Out of range value for column 'unitPrice'

很明显的长度问题。扒开数据库找到这个字段

![](https://r.photo.store.qq.com/psb?/V115Q75b3Bxa2B/HWGH*AFPt80UvuAC5QZ0a.ftHgR9o4AQuhRcjsqjtBI!/r/dMMAAAAAAAAAnull&bo=ZwEcAGcBHAADCSw!&rf=photolist&t=5_yake_qzoneimgout.png)

再来看下具体数据：

row1 9.600000 总长=7

row2 40.000000 总长=8

row3 40.000000 总长=8

row4 1950.00 总长=10

为什么第四条总长为10呢，在mysql中 decimal