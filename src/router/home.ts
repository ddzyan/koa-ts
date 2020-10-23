import Router from '@koa/router';
import { Context, Next } from 'koa';

const router = new Router();

router.get('/', (ctx: Context, next: Next) => {
  ctx.body = 'hello word';
});

export default router;
