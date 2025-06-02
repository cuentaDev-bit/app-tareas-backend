"use strict";
import { Sequelize } from "sequelize";
import { config } from "../config/config.ts";

const { database, username, password, host, dialect, port } = config;
export const connection: Sequelize = new Sequelize(
  database,
  username,
  password,
  {
    host,
    dialect,
    port,
  }
);

/* Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
}); */
