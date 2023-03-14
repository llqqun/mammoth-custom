# Mammoth 私人定制版

根据自己的需求修改了部分源代码

> 目录
```
├── bin  
├── browser  
├── browser-demo  // 演示文件夹
├── lib   // 源码文件夹  
├── node_modules  
└── test  
```

> 工作流程

解压 docx 文件 -> 解析 xml -> 暴露钩子给业务做转换 -> 内置的样式映射 -> 解析节点信息为 html -> 输出完整结果

> 项目配置

原作者使用了make,这里本人不使用这东西,所以稍作修改

不用 make ，只需要添加 3 行运行命令。同时删除 “prepublish” 的命令，否则 npm install 的时候也会自动执行这个命令执行 make 就报错了

```json
{
  "dev": "node bin/dev",
  "build:browser": "browserify lib/index.js --standalone mammoth > mammoth.browser.js",
  "build": "npm run build:browser && uglifyjs mammoth.browser.js > mammoth.browser.min.js"
}
```
dev 模式
添加watchify包
```
npm i watchify http-server -D
```
新建 ./bin/dev.js

1. 原始打包输出的目录（mammoth.browser.js）是输出到根目录的，所以这里也保持这个设定
2. 用 http-server 启动 8080 端口，这里没指定目录，所以启动目录是项目的根目录，刚好就能访问打包的文件了
3. 在每次打包的时候都会输出新的 msg ，用作看到 node 服务还在运行

入口文件
./lib/index.js

函数convertToHtml 将word转换成html
