## 简介

使用 ts + koa2 + 装饰器 完成服务端功能开发

## 核心代码介绍

### Reflect Metadata

资料介绍：https://itdashu.com/docs/typescriptlesson/2edda/reflectmetada.html

Reflect Metadata 可以在声明的时候对对象添加元数据。通过这种方式添加对元数据，不会对对象原始对数据结构产生影响

一些基础库源码如 vue-class-component、Angular 均使用了 Reflect Metadata ，有兴趣的可以深入源码学习下。

在使用的时候必须安装此模块

```bash
npm i reflect-metadata --save
```

#### 注意

TIPS: 实例方法与静态方法取元数据是不同的，实例方法需要在类的实例上取元数据，静态方法直接在类上取元数据。

## 完成功能

1. ts + koa 基础框架搭建和配置
2. 中间件根据配置文件，自动化热加载
3. 增加 controller，router 装饰器，实现通过装饰器配置路由地址

## 使用

```sh
git clone https://github.com/ddzyan/koa-ts.git

cd koa-ts

npm install
```

### vsCode 配置

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "koa2",
      "type": "node",
      "request": "launch",
      "program": "${workspaceRoot}/src/server.ts",
      "stopOnEntry": false,
      "args": [],
      "cwd": "${workspaceRoot}",
      "outFiles": ["${workspaceRoot}/dist/**/*.js"],
      "runtimeExecutable": "nodemon",
      "runtimeArgs": ["--nolazy"],
      "env": {
        "NODE_ENV": "development"
      },
      "sourceMaps": true,
      "restart": true
    }
  ]
}
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

### 启动

```sh
# 启动tsc编译监控
npm run dev
```

点击 vscode 默认 debug 键, enjoy!
