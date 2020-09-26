debugger;
import Koa from 'koa';
import parser from 'koa-body';

import userRouter from './route/user';
import indexRoute from './route';

const app = new Koa();
app.use(parser());
app.use(userRouter.routes()).use(indexRoute.routes());

app.listen(3000, '127.0.0.1');

console.log('Server running on port 3000');
