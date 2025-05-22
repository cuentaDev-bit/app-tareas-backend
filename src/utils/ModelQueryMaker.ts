import { CreationAttributes, Model, ModelStatic } from "sequelize";
import Result from "../types/Result.ts";
import BaseError from "./BaseError.ts";

export default class ModelQueryMaker<T extends Model> {
  private model;
  private defaultModelQuery;

  constructor(model: ModelStatic<T>, defaultModelQuery?: object) {
    this.model = model;
    this.defaultModelQuery = defaultModelQuery;
  }

  async create(modelCreationParams: CreationAttributes<T>): Promise<T> {
    try {
      const result = await this.model.create(modelCreationParams);
      return result;
    } catch (err) {
      const error = BaseError.ensureError(err);
      const creationError = "Could not create model";
      throw new BaseError(creationError, {
        cause: error,
        context: { model: this.model.name },
      });
    }
  }
}
