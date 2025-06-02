import {CompositeErrorSerializer} from "../CompositeErrorSerializer.ts";
import {BaseError, Jsonable } from "./BaseError.ts";

export type SerializedBaseError = {
  name: string;
  message: string;
  cause?: object;
  context?: Jsonable;
};
/**
 * A class that serializes all baseErrors
 */
export class BaseErrorSerializer implements CompositeErrorSerializer {
  errorSerializers: CompositeErrorSerializer[];

  constructor(errorSerializers: CompositeErrorSerializer[] = []) {
    this.errorSerializers = errorSerializers;
  }

  canHandle(error: Error): boolean {
    return error instanceof BaseError;
  }

  /**
   * serializes BaseErrors
   * @param error 
   * @param serializer a reference to another serializer to recursively serialize the errors in cause.
   * @returns an object the name, message, cause, and context of the error if they exist.
   */
  serialize(
    error: BaseError,
    serializer: CompositeErrorSerializer
  ): SerializedBaseError {
    const { name, message, cause, context } = error;
    let result: SerializedBaseError = { name, message };
    if (context) result.context = context;
    if (cause && cause instanceof Error) {
      const serializedCause = serializer.serialize(cause, serializer);
      result.cause = serializedCause;
    }
    return result;
  }
}

export const baseErrorSerializer = new BaseErrorSerializer();