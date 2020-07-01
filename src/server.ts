import Koa from 'koa';
import Router from 'koa-router';

const app = new Koa();
const router = new Router();

router.all('/', async (ctx) => {
  ctx.body = 'hello word';
});

app.use(router.routes());

app.listen(3000, '127.0.0.1');

console.log('Server running on port 3000');
