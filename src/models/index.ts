import { Sequelize, DataTypes } from "sequelize";
import * as fs from "fs";
import * as path from "path";

import config from "../config";

const db = {};

const sequelize = new Sequelize(
  config.sequelize.database, // 数据库名称
  config.sequelize.username, // 用户名
  config.sequelize.password, // 用户密码
  config.sequelize.options // 高级配置
);

fs.readdirSync(__dirname)
  .filter(file => file.indexOf(".") !== 0 && file.indexOf("index") === -1)
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

export default {
  db,
  sequelize,
  Sequelize
};
