import { BaseError } from "sequelize";

type Result<T, E extends BaseError = BaseError> =
  | { success: true; result: T }
  | { success: false; error: E };

export default Result;
