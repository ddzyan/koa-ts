import { Context, Next } from 'koa';
import * as Koa from 'koa';
import koaJson from 'koa-json';
import parser from 'koa-bodyparser';
import * as fs from 'fs';
import * as path from 'path';

import { systemMiddleware, customMiddleware } from '../config';

const loadModuleByPath = (filePath?: string) =>
  import(filePath).then((module) => (module.default ? module.default : module));

async function customMiddlewareLoad(app: Koa) {
  const middlewareDir = path.resolve(path.join(__dirname, '../middleware'));

  if (fs.existsSync(middlewareDir)) {
    for (const key in customMiddleware) {
      if (Object.prototype.hasOwnProperty.call(customMiddleware, key)) {
        const middleware = customMiddleware[key];

        if (middleware.enable) {
          const filePath = path.resolve(path.join(middlewareDir, `${key}`));
          console.log('[customMiddlewareLoad]', `load ${key}`);
          console.log(filePath);
          const middlewareObject = await loadModuleByPath(filePath);
          app.use(middlewareObject(middleware.options));
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

function controllerLoad() {
  // 定义扩展名
  // const extname = '.{js,ts}';
  // const modules = [];
  // fs.readdirSync(path.join(__dirname, '../controller'))
  //   .filter((file) => file.indexOf('.ts') !== 0 || file.indexOf('.js') !== 0)
  //   .forEach((file) => {
  //     const fileName = file.split('.')[0];
  //     modules.push = require(path.join(__dirname, file));
  //   });
}

export default async function initLoad(app: Koa) {
  systemMiddlewareLoad(app);
  await customMiddlewareLoad(app);
}
