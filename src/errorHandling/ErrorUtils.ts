/**
 * A set of utils for handling errors
 */
export class ErrorUtils {
  /**
   * Ensures a value is an Error.
   * @param value Something that needs to be ensured to be an error.
   * @returns an Error, the one passed in case if it's an error, a wrapper in the case it's not.
   */
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
}
