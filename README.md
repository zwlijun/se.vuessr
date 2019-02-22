基于Node + Express的VUE SSR基础服务框架
--
相关命令
--
Build: npm run ssr:build<br />
Dev: npm run ssr:dev<br />
Prod: npm run ssr:start

测试地址
--
URL: http://localhost:8080

示例
--
URL: http://localhost:8080/hello

easy-monitor 在Windows无法安装解决方法
--
前提安装好  node-gyp 和 node-pre-gyp
```
npm install node-gyp -g
npm install node-pre-gyp -g
```
1. 通过npm 安装windows的build工具 
   ```
   npm install --global windows-build-tools
   ```
2. 如果还是不行，检查Python的版本号，Python用windows-build-tools中的Python(2.7)就可以了。如果之前有安装过其他的版本，把系统环境变量path中的Python配置改成window-build-tools中Python中执行路径就可以了。

