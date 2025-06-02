"use strict";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize";
import { connection } from "../connection/connection.ts";
import { PasswordManager } from "../classes/PasswordManager.ts";

/**
 * User: defines an User
 * @param id An identifier for the DB
 * @param name The name of the user
 * @param email the email of the user
 * @param password the password of the user, should be hashed.
 */
export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare email: string;
  declare password: string;

  static associate(models: any) {
    User.hasMany(models.Task);
    User.belongsToMany(models.API, { through: "UserAPIs" });
  }
}

User.init(
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    modelName: "User",
  }
);

User.beforeCreate(async (user) => {
  const plainTextPassword = user.password;
  const hashedPassword = await PasswordManager.hashPassword(plainTextPassword);
  user.password = hashedPassword;
});
