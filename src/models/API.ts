"use strict";

import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize";
import connection from "../connection/connection.ts";

export default class API extends Model<
  InferAttributes<API>,
  InferCreationAttributes<API>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare abbreviation: CreationOptional<string>;

  static associate(models: any) {
    API.belongsToMany(models.User, { through: "UserAPIs" });
    API.belongsToMany(models.Task, { through: "TaskAPIs" });
  }
}

API.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    abbreviation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: connection,
    modelName: "API",
  }
);
