## 简介

使用 ts + koa 完善后台服务

完善内容：

1. dto:data transfer object
2. interface:接口数据结构定义

## 使用

```sh
yarn

yarn start
```

### 直接调试 ts

```shell
yarn add typescript --save-dev
yarn add ts-node --save-dev
```

添加 vscode launch.json 文件

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Current TS File",
      "type": "node",
      "request": "launch",
      "program": "${workspaceRoot}/node_modules/ts-node/dist/bin.js",
      "args": ["${relativeFile}"],
      "cwd": "${workspaceRoot}",
      "protocol": "inspector"
    }
  ]
}
```

在要调试的文件头部添加 debugger,插入断点并且选择指定的 debug 模式，F5 运行
