## 自动化部署

虽然hexo为了简化发布流程已经有了直接部署到云服务器上的插件，但是我还是觉得有点麻烦并且效率不太好。(说白了就是懒)

1. 部署和提交代码分为两步（代码不交给云托管的当我没说🌚）
2. 每次deploy都是在本地生成好静态文件上传到服务器（效率低下）

如何解决这两个问题？我最终选择使用webhook来实现自动化部署。

> 使用Jenkins一类的工具也可，但是如果是一个简单的项目或者是个人项目使用Jenkins就显得太重了，我们用hexo做博客无非就是图个轻量级。

## 什么是webhooks

> 准确的说webhooks是一种web回调或者http的push API，是向APP或者其他应用提供实时信息的一种方式。webhooks在数据产生时立即发送数据，也就是你能实时收到数据。这一种不同于典型的API，需要用了实时性需要足够快的轮询。这无论是对生产还是对消费者都是高效的，唯一的缺点是初始建立困难。

> webhooks有时也被称为反向API，因为他提供了API规则，你需要设计要使用的API。Webhook将向你的应用发起http请求，典型的是post请求，应用程序由请求驱动。

> 部署服务环境需要：`Git`、`Node`

## 部署架构

假装有图

## Github Webhooks

### 配置Webhooks

![GitHub Hooks 配置](https://images.jsonpop.cn/blog%2Fblog-autodeploy-github-webhooks-config.png)

### 安装github-webhook-handler

```
npm install github-webhook-handler --save
```

### 编写监听服务（node构建）

```shell
vim webhooks.js
```

```javascript
var http = require('http')
var createHandler = require('github-webhook-handler')
var handler = createHandler({ path: '/', secret: '和在gihub中设置的secret一致' })

function run_cmd(cmd, args, callback) {
  var spawn = require('child_process').spawn;
  var child = spawn(cmd, args);
  var resp = "";
  child.stdout.on('data', function(buffer) { resp += buffer.toString(); });
  child.stdout.on('end', function() { callback (resp) });
}
handler.on('error', function (err) {
  console.error('Error:', err.message)
})
// GitHub
handler.on('push', function (event) {
  console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref);
    run_cmd('sh', ['./deploy.sh',event.payload.repository.name], function(text){ console.log(text) });
})
try {
  http.createServer(function (req, res) {
    handler(req, res, function (err) {
      res.statusCode = 404
      res.end('no such location')
    })
  }).listen(8811)
}catch(err){
  console.error('Error:', err.message)
}
```



## Gitee Webhooks

### 配置Webhooks

![Gitee Webhooks配置](https://images.jsonpop.cn/blog/iShot2020-02-15 23.08.56.png)

### 安装github-webhook-handler

```
npm install gitee-webhook-handler --save
```

### 编写监听服务（node构建）

```shell
vim webhooks.js
```

```
var http = require('http')
var createHandler = require('gitee-webhook-handler')
var handler = createHandler({ path: '/', secret: '和gitee中设置的密码一致' })

function run_cmd(cmd, args, callback) {
  var spawn = require('child_process').spawn;
  var child = spawn(cmd, args);
  var resp = "";
  child.stdout.on('data', function(buffer) { resp += buffer.toString(); });
  child.stdout.on('end', function() { callback (resp) });
}
handler.on('error', function (err) {
  console.error('Error:', err.message)
})
// Gitee
handler.on('Push Hook', function (event) {
  console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref);
    run_cmd('sh', ['./deploy.sh'], function(text){ console.log(text) });
})
try {
  http.createServer(function (req, res) {
    handler(req, res, function (err) {
      res.statusCode = 404
      res.end('no such location')
    })
  }).listen(8811)
}catch(err){
  console.error('Error:', err.message)
}
```

## 编写Shell脚本

```shell
vim deploy.sh
```

```shell
BLOG_PATH="/data/hexoblog"
STATIC_SITE="/www/wwwroot/hexoblog"
echo "======================================"
echo "script: cd $BLOG_PATH"
cd $BLOG_PATH
echo "script: git pull gitee master..."
git pull gitee master
echo "script: hexo clean..."
hexo clean
echo "script: hexo g..."
hexo g
echo "script: cp -r $BLOG_PATH/public/* $STATIC_SITE..."
cp -r $BLOG_PATH/public/* $STATIC_SITE
```

## 安装pm2

```
npm i pm2 -g
```

## 运行webhooks.js

```
pm2 start webhook.js
```

查看运行状态:`pm2 status serviceA`

停止运行:`pm2 stop serviceA`

查看日志:`pm2 logs`

## 本地push代码测试

