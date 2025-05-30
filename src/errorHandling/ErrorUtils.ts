export class ErrorUtils {
  public static ensureError(value: unknown): Error {
    if (value instanceof Error) return value;

    let stringified = "[Unable to stringify the thrown value]";
    try {
      stringified = JSON.stringify(value);
    } catch {}

    const error = new Error(
      `This value was thrown as is, not through an Error: ${stringified}`
    );
    return error;
  }

  public static serializeError(error: Error): Object {
    const name = error.name;
    const message = error.message;
    let cause: any;
    if(error)
    if (error.cause instanceof Error) {
      cause = this.serializeError(error.cause);
    }

    let result: object = { name };
    if (message) result = { ...result, message };
    if (cause) result = { ...result, cause };
    return result;
  }
}
