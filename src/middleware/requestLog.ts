import { Context, Next } from 'koa';

const formatRequest: (ctx: Context) => void = (ctx) => {
  const {
    request: { method, originalUrl, body = {} },
  } = ctx;

  console.log(`[${new Date().toLocaleString()}] <--- ${originalUrl} ${method} ${JSON.stringify(body)}`);
};

const formatResponse: (ctx: Context, ms: number) => void = (ctx, ms) => {
  const {
    status,
    body,
    request: { method, originalUrl },
  } = ctx;
  const resData = typeof body === 'object' ? JSON.stringify(body) : body;

  console.log(`[${new Date().toLocaleString()}] ---> ${originalUrl} ${method} ${resData} ${status} ${ms}ms`);
};

const formatError: (error: Error) => void = (error) => {
  let logText = '';
  if (error instanceof Error) {
    logText = `${error.message}\n`;
    logText = error.stack;
  } else {
    logText = error;
  }
  console.error(`[${new Date().toLocaleString()}] ${logText}`);
};

const requestLog = function () {
  return async (ctx: Context, next: Next) => {
    const { method, originalUrl } = ctx.request;

    if (originalUrl === '/favicon.ico' || method === 'OPTIONS') {
      await next();
      return;
    }

    const startTime = new Date().valueOf();
    try {
      await next();
      formatRequest(ctx);
    } catch (error) {
      formatError(error);
    } finally {
      const endTime = new Date().valueOf();
      formatResponse(ctx, endTime - startTime);
    }
  };
};

export default requestLog;
