import 'reflect-metadata';

import Koa from 'koa';
import { Context, Next } from 'koa';
import Router from '@koa/router';

import initLoad from './common/initLoad';
import { server } from './config';

const app = new Koa();

initLoad(app);

app.listen(server.port, server.hostname, () => {
  console.log(`Listening on http://${server.hostname}:${server.port}`);
});

export default app;
