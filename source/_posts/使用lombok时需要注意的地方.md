---
title: 使用lombok时需要注意的地方
author: MoMik
avatar: /images/author.gif
categories: 自学教程
comments: true
Tags: lombok
abbrlink: 10056
date: 2019-04-28 11:54:40
authorLink:
authorAbout:
authorDesc:
keywords:
description:
photos:
---

集成父类时出现如下警告

`Warning:(16, 1) java: Generating equals/hashCode implementation but without a call to superclass, even though this class does not extend java.lang.Object. If this is intentional, add '@EqualsAndHashCode(callSuper=false)' to your type.`

![QQ20190428-120101](http://ws2.sinaimg.cn/large/0069lHOigy1g2i7qosme1j30x302kdg9.jpg)

原文中提到的大致有以下几点： 

1. 此注解会生成equals(Object other) 和 hashCode()方法。 
2. 它默认使用非静态，非瞬态的属性 
3. 可通过参数exclude排除一些属性 
4. 可通过参数of指定仅使用哪些属性 
5. 它默认仅使用该类中定义的属性且不调用父类的方法 
6. 可通过callSuper=true解决上一点问题。让其生成的方法中调用父类的方法。

另：@Data相当于@Getter @Setter @RequiredArgsConstructor @ToString @EqualsAndHashCode这5个注解的合集。

通过官方文档，可以得知，当使用@Data注解时，则有了@EqualsAndHashCode注解，那么就会在此类中存在equals(Object other) 和 hashCode()方法，且不会使用父类的属性，这就导致了可能的问题。 
比如，有多个类有相同的部分属性，把它们定义到父类中，恰好id（数据库主键）也在父类中，那么就会存在部分对象在比较时，它们并不相等，却因为lombok自动生成的equals(Object other) 和 hashCode()方法判定为相等，从而导致出错。

修复此问题的方法很简单： 
1. 使用@Getter @Setter @ToString代替@Data并且自定义equals(Object other) 和 hashCode()方法，比如有些类只需要判断主键id是否相等即足矣。 

2. 或者使用在使用@Data时同时加上@EqualsAndHashCode(callSuper=true)注解。

3. 另外，lombok作者Roel也给出了解决办法，就是通过自定义lombok.config文件来解决。

   按照Roel的说法，lombok.config文件需要放在src/main/java文件夹下的目录中（也可以放在实体同级目录下），放在src/main/resources目录下，不会生效。下面，我们通过这种方式来解决这个警告的问题。

   ```properties
   config.stopBubbling=true
   lombok.equalsAndHashCode.callSuper=call
   ```