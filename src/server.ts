import Koa from 'koa';

import UserRouter from './route/user';

const app = new Koa();

app.use(UserRouter.routes());

app.listen(3000, '127.0.0.1');

console.log('Server running on port 3000');
