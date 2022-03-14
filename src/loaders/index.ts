import * as Koa from "koa";

import dependencyInjectorLoader from "./dependencyInjector";
import { db } from "../models";
import koaLoader from "./koa";
import "./events";

export default async (app: Koa) => {
  await Promise.race([koaLoader(app), dependencyInjectorLoader(db)]);

  console.info("✌️ koa loaded");
};
