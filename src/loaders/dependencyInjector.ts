import { Container } from "typedi";

import LoggerInstance from "./logger";

export default models => {
  try {
    for (const key in models) {
      if (Object.prototype.hasOwnProperty.call(models, key)) {
        Container.set(key, models[key]);
      }
    }

    LoggerInstance.info("✌️ sequelize Model injected into container");
  } catch (e) {
    LoggerInstance.error("🔥 Error on dependency injector loader: %o", e);
    throw e;
  }
};
