import Koa from 'koa';

import initLoad from './common/initLoad';
import { server } from './config';
import HomeRouter from './router/home';

const app = new Koa();

initLoad(app);

app.use(HomeRouter.routes());

app.use(HomeRouter.allowedMethods());

app.listen(server.port, server.hostname, () => {
  console.log(`Listening on ${server.port}`);
});

export default app;
