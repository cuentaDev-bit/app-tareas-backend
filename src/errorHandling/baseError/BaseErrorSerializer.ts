import {CompositeErrorSerializer} from "../CompositeErrorSerializer.ts";
import {BaseError, Jsonable } from "./BaseError.ts";

type SerializedBaseError = {
  name: string;
  message: string;
  cause?: object;
  context?: Jsonable;
};

class BaseErrorSerializer implements CompositeErrorSerializer {
  errorSerializers: CompositeErrorSerializer[];

  constructor(errorSerializers: CompositeErrorSerializer[] = []) {
    this.errorSerializers = errorSerializers;
  }

  canHandle(error: Error): boolean {
    return error instanceof BaseError;
  }

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