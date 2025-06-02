import "dotenv/config";
import { Options } from "sequelize";

type ValidEnviroments = "development" | "testing" | "production";
type ValidDialects =
  | "mysql"
  | "postgres"
  | "sqlite"
  | "mariadb"
  | "mssql"
  | "db2"
  | "snowflake"
  | "oracle";

interface ConfigTemplate {
  enviroment: ValidEnviroments;
  database: string;
  username: string;
  password?: string;
  host: string;
  dialect: string;
  secret: string;
}

let host: string;
let dialect: ValidDialects;

switch (process.env.NODE_ENV) {
  case "development": {
    host = "127.0.0.1";
    dialect = "mysql";
    break;
  }
  case "testing": {
    host = "127.0.0.1";
    dialect = "mysql";
    break;
  }
  case "production": {
    host = "127.0.0.1";
    dialect = "mysql";
    break;
  }
  default: {
    throw new Error("Invalid Enviroment");
  }
}

if (process.env.DB_NAME == undefined) throw new Error("Database Name Empty");
if (process.env.DB_USERNAME == undefined) throw new Error("Username Empty");
if (process.env.SECRET == undefined) throw new Error("Secret Empty");

function getConfig({
  enviroment,
  database,
  username,
  password,
  host,
  dialect,
  secret
}: ConfigTemplate & Options): ConfigTemplate & Options {
  return {
    enviroment,
    username,
    password,
    database,
    host,
    dialect,
    secret
  };
}

export const config = getConfig({
  enviroment: process.env.NODE_ENV,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  secret: process.env.SECRET,
  host,
  dialect,
});
