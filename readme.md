## 简介

使用 ts 和 Ioc 在 koa2 上完成服务端功能开发

## 使用

```sh
yarn

yarn start
```

### 直接调试 ts

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
