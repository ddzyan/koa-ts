import { Context, Next } from 'koa';
import * as Koa from 'koa';
import koaJson from 'koa-json';
import parser from 'koa-bodyparser';
import * as fs from 'fs';
import * as path from 'path';
import Router from '@koa/router';

import { RouteDefinition, PATH, PREFIX } from '../decorator/RouteDefinition';
import { systemMiddleware, customMiddleware } from '../config';

function customMiddlewareLoad(app: Koa) {
  const middlewareDir = path.join(__dirname, '../middleware');

  if (fs.existsSync(middlewareDir)) {
    for (const key in customMiddleware) {
      if (Object.prototype.hasOwnProperty.call(customMiddleware, key)) {
        const middleware = customMiddleware[key];

        if (middleware.enable) {
          const filePath = path.join(middlewareDir, `${key}.js`);
          if (fs.statSync(filePath).isFile()) {
            console.log('[customMiddlewareLoad]', `load ${key}`);
            console.log(filePath);
            const middlewareObject = require(filePath).default;
            app.use(middlewareObject(middleware.options));
          }
        }
      }
    }
  }
}

function systemMiddlewareLoad(app: Koa) {
  console.log('[systemMiddlewareLoad] bodyparser');
  app.use(
    parser({
      enableTypes: ['json', 'form', 'text'],
      onerror(err: Error, ctx: Context) {
        ctx.throw('body parse error', 422);
      },
    }),
  );

  if (systemMiddleware.crossDomain.enable) {
    console.log('[systemMiddlewareLoad] crossDomain');
    app.use(async (ctx: Context, next: Next) => {
      ctx.set('Access-Control-Allow-Origin', '*');
      ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
      ctx.set('Access-Control-Allow-Methods', systemMiddleware.crossDomain.options.methods);
      if (ctx.method === 'OPTIONS') {
        ctx.body = 200;
      } else {
        await next();
      }
    });
  }

  if (systemMiddleware.koaJson.enable) {
    console.log('[systemMiddlewareLoad] koa-json');
    app.use(koaJson());
  }
}

function controllerLoad(app: Koa) {
  const modules: Array<any> = [];
  const basePath = path.join(__dirname, '../controller');
  fs.readdirSync(basePath)
    .filter((file) => file.indexOf('.js') !== -1 && file.indexOf('.map') === -1)
    .forEach((file) => {
      const fileName = file.split('.')[0];
      modules.push(path.join(basePath, file));
    });
  for (const controllerPath of modules) {
    const { default: controller } = require(controllerPath);
    const router = addRouter(controller);
    app.use(router.routes());
  }
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
    router[requestMethod](url, (ctx: Context, next: Next) => {
      instance[property](ctx, next);
    });
  });

  return router;
}

export default function initLoad(app: Koa) {
  systemMiddlewareLoad(app);
  customMiddlewareLoad(app);
  controllerLoad(app);
}
