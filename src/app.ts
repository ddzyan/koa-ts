import "reflect-metadata";

import Koa from "koa";

import Logger from "./loaders/logger";
import config from "./config";

async function startServer() {
  const app = new Koa();
  await require("./loaders").default(app);

  app
    .listen(config.port, () => {
      Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `);
    })
    .on("error", err => {
      Logger.error(err);
      process.exit(1);
    });
}

startServer();
