import { BaseError } from "../errorHandling/baseError/BaseError.ts"; 

export type Result<T, E extends BaseError = BaseError> =
  | { success: true; result: T }
  | { success: false; error: E };

