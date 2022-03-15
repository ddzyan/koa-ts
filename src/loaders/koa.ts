import { Context, Next } from "koa";
import * as Koa from "koa";
import koaJson from "koa-json";
import parser from "koa-bodyparser";
import * as fs from "fs";
import * as path from "path";
import Router from "@koa/router";

import { RouteDefinition, PATH, PREFIX } from "../decorator/RouteDefinition";

function customMiddlewareLoad(app: Koa) {
  console.time("[customMiddlewareLoad]");
  const middlewareDir = path.join(__dirname, "../middleware");

  fs.readdirSync(middlewareDir)
    .filter(file => file.indexOf(".") !== -1)
    .forEach(file => {
      const filePath = path.join(middlewareDir, file);
      console.log("[customMiddlewareLoad]", filePath);
      const middlewareObject = require(filePath).default;
      app.use(middlewareObject());
    });

  console.timeEnd("[customMiddlewareLoad]");
}

function systemMiddlewareLoad(app: Koa) {
  console.time("[systemMiddlewareLoad]");
  app
    .use(
      parser({
        enableTypes: ["json", "form", "text"],
        onerror(err: Error, ctx: Context) {
          ctx.throw("body parse error", 422);
        }
      })
    )
    .use(async (ctx: Context, next: Next) => {
      ctx.set("Access-Control-Allow-Origin", "*");
      ctx.set(
        "Access-Control-Allow-Headers",
        "Content-Type, Content-Length, Authorization, Accept, X-Requested-With"
      );
      ctx.set(
        "Access-Control-Allow-Methods",
        "PUT, POST, GET, DELETE, OPTIONS"
      );
      if (ctx.method === "OPTIONS") {
        ctx.body = 200;
      } else {
        await next();
      }
    })
    .use(koaJson());

  console.timeEnd("[systemMiddlewareLoad]");
}

function controllerLoad(app: Koa) {
  console.time("[controllerLoad]");
  const modules: Array<string> = [];
  const basePath = path.join(__dirname, "../api");
  fs.readdirSync(basePath)
    .filter(
      file =>
        (file.indexOf(".ts") !== -1 || file.indexOf(".js") !== -1) &&
        file.indexOf(".map") === -1
    )
    .forEach(file => {
      modules.push(path.join(basePath, file));
    });
  for (const controllerPath of modules) {
    const { default: controller } = require(controllerPath);
    const router = addRouter(controller);
    app.use(router.routes());
  }

  console.timeEnd("[controllerLoad]");
}

function addRouter(Controller: any): Router {
  const router = new Router();

  const instance = new Controller();
  // 获取 prefix
  const prefix = Reflect.getMetadata(PREFIX, Controller);

  const routes: Array<RouteDefinition> = Reflect.getMetadata(PATH, instance);

  routes.forEach((route: RouteDefinition) => {
    const { path, requestMethod, property } = route;
    const url = prefix + path;
    router[requestMethod](url, instance[property]);
  });

  return router;
}

export default function initLoad(app: Koa) {
  systemMiddlewareLoad(app);
  customMiddlewareLoad(app);
  controllerLoad(app);
}
