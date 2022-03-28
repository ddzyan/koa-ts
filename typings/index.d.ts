/// <reference path="globals/node/index.d.ts" />

declare module "koa" {
  interface Request {
    body?: any;
    rawBody: string;
    params?: any;
  }
}
