import Router from 'koa-router';

const route: Router = new Router();

route.get(
  '/',
  async (ctx, next): Promise<void> => {
    ctx.body = 'hello word';
  }
);

export default route;
