import { CreationAttributes, Model, ModelStatic } from "sequelize";
import { Result } from "../types/Result.ts";
import { BaseError } from "../errorHandling/baseError/BaseError.ts";
import { ErrorUtils } from "../errorHandling/ErrorUtils.ts";

/**
 * Defines a class to be injected into service methods to take care of simple, common logic shared between many services.
 * @param model The class that will be affected by the methods.
 * @param defaultModelQuery A query to the database, intended to be filled with the most common query for a model. This is to reduce repetition when you want the same data every time, this is optional.
 */
export class ModelQueryMaker<T extends Model> {
  private model;
  private defaultModelQuery;

  /**
   * @param model
   * @param defaultModelQuery
   */
  constructor(model: ModelStatic<T>, defaultModelQuery?: object) {
    this.model = model;
    this.defaultModelQuery = defaultModelQuery;
  }
  /**
   * @param modelCreationParams The keys intended to create the model of the class passed into the constructor.
   * @returns A promise with the created model.
   * @throws An error with the reason for the failure of the model creation.
   */
  create = async (modelCreationParams: CreationAttributes<T>): Promise<T> => {
    try {
      const result = await this.model.create(modelCreationParams);
      return result;
    } catch (err) {
      const error = ErrorUtils.ensureError(err);
      const creationError = "Could not create model";
      throw new BaseError(creationError, {
        cause: error,
        context: { model: this.model.name },
      });
    }
  };
}
