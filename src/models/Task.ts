"use strict";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize";

import {connection} from "../connection/connection.ts";

export enum STATE {
  TO_DO = "to do",
  IN_PROGRESS = "in progress",
  WAITING = "waiting",
  FINISHED = "finished",
}

/**
 * A class that represents each task that a user has
 * @param id An identifier for the DB.
 * @param description Describes what a task means to acomplish.
 * @param taskCode The code that identifies a task in the scrum software.
 * @param state The current state of the task eg: completed, in progress.
 * @param enviroment The enviroment that is affected by the task.
 * @param enviromentChangeDate When the task was last changed from an eviroment.
 * @param lastUpdateDate When the task was last updated.
 * @param notes extra information.
 */

export class Task extends Model<InferAttributes<Task>, InferCreationAttributes<Task>> {
  declare id: CreationOptional<number>;
  declare description: CreationOptional<string>;
  declare taskCode: string;
  declare state: CreationOptional<STATE>;
  declare enviroment: string;
  declare enviromentChangeDate: CreationOptional<Date>;
  declare lastUpdateDate: CreationOptional<Date>;
  declare notes: CreationOptional<string>;

  static associate(models: any) {
    Task.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
    Task.belongsToMany(models.API, { through: "TaskAPIs" });
  }
}

  Task.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      taskCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: STATE.TO_DO,
      },
      enviroment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      enviromentChangeDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      lastUpdateDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      notes: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize: connection,
      modelName: "Task",
    }
  );

