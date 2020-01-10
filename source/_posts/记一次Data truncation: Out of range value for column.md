---
title: '记一次Data truncation: Out of range value for column'
author: MoMik
avatar: /images/author.gif
categories: 自学教程
comments: true
cover: >-
  https://r.photo.store.qq.com/psb?/V115Q75b3Bxa2B/1tL0PRjnZvVFXiVdIQLO4v.MUE2J3w5ajFkxu2WTq5E!/r/dLYAAAAAAAAAnull&bo=vwY4BAAAAAARB7U!&rf=photolist&t=5_yake_qzoneimgout.png
photos: >-
  https://r.photo.store.qq.com/psb?/V115Q75b3Bxa2B/1tL0PRjnZvVFXiVdIQLO4v.MUE2J3w5ajFkxu2WTq5E!/r/dLYAAAAAAAAAnull&bo=vwY4BAAAAAARB7U!&rf=photolist&t=5_yake_qzoneimgout.png
abbrlink: 64996
date: 2019-07-01 18:27:18
authorLink:
authorAbout:
authorDesc:
tags:
keywords:
description:
---

今天客户方在使用程序时保存报错，根据他提供的信息来讲始终只有那一条数据保存不进去，具体报的什么错不管是日志还是前端展示上都没有明确体现（这款程序很老先不说，代码写的也贼乱，跑这个项目mac散热飞起…）。所以只能通过数据和调试程序寻找原因了。。。

1、查询数据库对比其他数据，寻找差异

大致看了下，没找到差异（粗心,没注意数据长度）

2、调试程序

代码是直接回滚掉的，try-catch也没加，哪行报错不知道，sql用的原始jdbc写的一长串sql拼接

以上几点让我没有一点想继续看代码的心情。干脆直接外层加try-catch先确定错误原因是啥。

然后就出现了：

> Data truncation: Out of range value for column 'unitPrice'

很明显的长度问题。扒开数据库找到这个字段![](https://r.photo.store.qq.com/psb?/V115Q75b3Bxa2B/HWGH*AFPt80UvuAC5QZ0a.ftHgR9o4AQuhRcjsqjtBI!/r/dMMAAAAAAAAAnull&bo=ZwEcAGcBHAADCSw!&rf=photolist&t=5_yake_qzoneimgout.png)

再来看下具体数据：

row1  9.600000     总长=7

row2  40.000000   总长=8

row3  40.000000   总长=8

row4  1950.00        总长=10

为什么row4总长为10呢？通过上图我们可以看到unitPrice字段指定长度为decimal(8,6),这里需要注意的是并不是整数位长度为8，小数位长度为6。

在 MySQL 中DECIMAL(P,D)类型：

- `P`是表示有效数字数的精度。 `P`范围为`1〜65`。
- `D`是表示小数点后的位数。 `D`的范围是`0`~`30`。MySQL要求`D`小于或等于(`<=`)`P`。

拿上面那个例子通俗点讲：

8=全长，即整数位+小数位

6=小数位长度

所以row4=4+6=10

既然知道是长度指定的有问题那么只需要根据自身情况修改下字段长度就可以解决该问题了。