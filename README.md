建议版本凑活看 有时间细化...

## 自动化部署

> 部署服务环境需要：git、node

1. ### 配置github webhooks

![GitHub Hooks 配置](https://images.jsonpop.cn/blog%2Fblog-autodeploy-github-webhooks-config.png)

2. ### 安装github-webhook-handler

   `npm i -g github-webhook-handler`

3. ### 安装pm2

   `npm i pm2 -g`

3. ### 运行webhooks.js

   `pm2 start webhook.js`

   查看运行状态:`pm2 status`

   停止运行:`pm2 stop`

   查看日志:`pm2 logs`

4. 