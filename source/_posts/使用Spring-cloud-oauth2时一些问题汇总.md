---
title: 使用Spring cloud oauth2时一些问题汇总
author: MoMik
avatar: /images/author.gif
categories: 自学教程
comments: true
date: 2019-07-05 22:19:37
authorLink:
authorAbout:
authorDesc:
tags:
keywords:
description:
photos: https://r.photo.store.qq.com/psb?/V115Q75b3Bxa2B/YP6fUqzMKEbXRWxC4A35l5ZMGNHkttpTJmUFlcDEQEs!/r/dFIBAAAAAAAAnull&bo=MAe.ATAHvgEDCSw!&rf=photolist&t=5_yake_qzoneimgout.png
---

一开始使用client模式在浏览器进行访问（GET）

http://localhost:8080/oauth/token?grant_type=client_credentials&scope=select&client_id=test&client_secret=123456

出现了 "Bad client credentials" 错误，直观感觉是自己的client_id和client_secret填写的和配置的不匹配，然后检查了下这两个参数发现并没有错。那么这个猜测先挂起，先去控制台看看有没有什么可靠信息供我们参考。

![](https://r.photo.store.qq.com/psb?/V115Q75b3Bxa2B/YP6fUqzMKEbXRWxC4A35l5ZMGNHkttpTJmUFlcDEQEs!/r/dFIBAAAAAAAAnull&bo=MAe.ATAHvgEDCSw!&rf=photolist&t=5_yake_qzoneimgout.png)

![](https://r.photo.store.qq.com/psb?/V115Q75b3Bxa2B/8ykeQAyWunOmb83QwXIp*BNws9gFklyiorMSFmXUe94!/r/dAgBAAAAAAAAnull&bo=IAf8ACAH*AADCSw!&rf=photolist&t=5_yake_qzoneimgout.png)

果然我每发一次请求都会出现一次"Encoded password does not look like BCrypt"，意思是说我们的密码加密类型不是BCrypt。然后百度下这个问题，大部分都是说要配置一个BCryptPasswordEncoder类型的Bean，但是实际上我是配了的。既然这个走不通，我们再回过头结合一下上面挂起的猜测，可以确定以下几点：

1、client_id、client_secret 存在问题

2、密码加密类型不对

大家都知道client模式的client_id、client_secret其实就是对应的用户名和密码，这样我们就可以确定问题了：因为加密类型不正确/没有加密 导致client_secret不匹配。

找到设置client_secret值的地方

![](https://r.photo.store.qq.com/psb?/V115Q75b3Bxa2B/cjNopvbKJhv4Ceg6J0iXN5GRMGdLHY96jmRyX2QXXpI!/r/dLgAAAAAAAAAnull&bo=IAd2AQAAAAADB3I!&rf=photolist&t=5_yake_qzoneimgout.png)

果然我们的secret并没加密，查看官方文档得知是因为springsecurity在最新版本升级后,默认把之前的明文密码方式给去掉了[官方文档说明](https://spring.io/blog/2017/11/01/spring-security-5-0-0-rc1-released#password-storage-updated)。

既然明文不行，我们就按照它的要求加密一下呗:`new BCryptPasswordEncoder().encode("123456")`

![](https://r.photo.store.qq.com/psb?/V115Q75b3Bxa2B/DqmMYevuke9QuprG.2zNYoao92jfzlOIBYu6ERNo3FQ!/r/dL8AAAAAAAAAnull&bo=EAd8AQAAAAADB0g!&rf=photolist&t=5_yake_qzoneimgout.png)

重启后再次访问:http://localhost:8080/oauth/token?grant_type=client_credentials&scope=select&client_id=test&client_secret=123456



没有GET方法…不过说明接口已经通了，我们使用Postman换成POST请求再试一次

![](https://r.photo.store.qq.com/psb?/V115Q75b3Bxa2B/y8lwJS4yN0Ba9Qiy01eg5IB2duv0vrPsWV2ZJOOLvAI!/r/dLgAAAAAAAAAnull&bo=PQWAAsIKIgUDCXk!&rf=photolist&t=5_yake_qzoneimgout.png)

到这里就已经OK了。

>  本文只是记录在使用oauth2时遇到的问题过程总结，程序具体如何实现不做详细说明。