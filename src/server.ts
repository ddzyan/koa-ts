// @ts-nocheck
import 'reflect-metadata';

import Koa from 'koa';
import { Context, Next } from 'koa';
import Router from '@koa/router';

import CatsController from './controller/CatsController';
import { RouteDefinition, PATH, PREFIX } from './decorator/RouteDefinition';
import initLoad from './common/initLoad';
import { server } from './config';
import HomeRouter from './router/home';

const app = new Koa();

initLoad(app);

app.use(HomeRouter.routes());

app.use(HomeRouter.allowedMethods());

[CatsController].forEach((Controller) => {
  const router = new Router();

  const instance = new Controller();
  // 获取 prefix
  const prefix = Reflect.getMetadata(PREFIX, Controller);

  const routes: Array<RouteDefinition> = Reflect.getMetadata(PATH, instance);

  routes.forEach((route: RouteDefinition) => {
    const { path, requestMethod, property } = route;
    const url = prefix + path;
    console.log(requestMethod, url, property);

    router[requestMethod](url, (ctx: Context, next: Next) => {
      instance[property](ctx, next);
    });
  });

  app.use(router.routes());
});

app.listen(server.port, server.hostname, () => {
  console.log(`Listening on http://127.0.0.1:${server.port}`);
});

export default app;
