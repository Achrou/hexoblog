---
title: SpringBoot集成Netty实现百万级的消息推送系统
avatar: /images/author.gif
categories: 自学教程
comments: true
author: MoMik
cover: 'https://images.jsonpop.cn/UQ47Hg.png'
photos: 'https://images.jsonpop.cn/UQ47Hg.png'
abbrlink: 52446
date: 2019-04-26 17:58:35
authorLink:
authorAbout:
authorDesc:
tags:
keywords:
description:
---

## 序言
第一次接触物联网项目{{keai}},这个项目主要的工作就是要有一个系统来支持设备的接入、向设备推送消息（充电、充电完成...）;同时还得满足大量设备接入的需求(想想你家小区的充电桩有多少 {{xieyanxiao}})。
所以本次分享的内容不但可以满足物联网领域同时还支持以下场景：

1. 基于 WEB 的聊天系统（点对点、群聊）。
2. WEB 应用中需求服务端推送的场景。
3. 基于 SDK 的消息推送平台。

> RE:在做这个项目的时候临时学的Netty,现在对Netty也就是一知半解。本文借鉴了一些优秀的文章,如有重复部分，还请见谅。(后面有时间一定要把Netty搞懂！！！然后写专题!{{dalao}})
## 为何选择Netty

1. API使用简单，开发门槛低；
2. 功能强大，预置了多种编解码功能，支持多种主流协议；
3. 定制能力强，可以通过ChannelHandler对通信框架进行灵活的扩展；
4. 性能高，通过与其它业界主流的NIO框架对比，Netty的综合性能最优；
5. 成熟、稳定，Netty修复了已经发现的所有JDK NIO BUG，业务开发人员不需要再为NIO的BUG而烦恼；
6. 社区活跃，版本迭代周期短，发现的BUG可以被及时修复，同时，更多的新功能会被加入；
7. 经历了大规模的商业应用考验，质量已经得到验证。在互联网、大数据、网络游戏、企业应用、电信软件等众多行业得到成功商用，证明了它可以完全满足不同行业的商业应用。

参考:
1、[详看点我](https://blog.csdn.net/zcbyzcb/article/details/79916720 "详看点我")
2、[Netty性能测试对比](https://colobu.com/2015/07/14/performance-comparison-of-7-websocket-frameworks/ "Netty性能测试对比")

## SpringBoot集成Netty

### 构建 Netty 服务端
### 构建 Netty 客户端
### 使用 protobuf 构建通信协议
#### protobuf简介
#### 为什么要用protobuf
#### 怎么使用protobuf
##### 定义 protobuf 协议格式
##### 使用 .proto编译器编译
##### 使用 Java 对应 的 protobuf API来读写消息
#### protobuf的编解码器
###  客户端心跳机制
#### 心跳机制简介
#### 如何实现心跳机制
#### Netty 实现心跳机制
#### Netty 客户端断线重连
### 服务端空闲检测
### Controller方法测试