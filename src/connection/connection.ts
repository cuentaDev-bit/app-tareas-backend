"use strict";
import { Sequelize } from "sequelize";
import config from "../config/config.ts";

const connection: Sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

/* Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
}); */

export default connection;
