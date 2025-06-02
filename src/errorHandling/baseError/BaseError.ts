export type Jsonable =
  | string
  | number
  | boolean
  | null
  | undefined
  | readonly Jsonable[]
  | { readonly [key: string]: Jsonable }
  | { toJSON(): Jsonable };

/**
 * Defines a basic error that has a context value for more information
 * @param message a message that summarizes the error
 * @param options an object that can contain the cause of an error (another error) and a context which carries the information needed to know what could have caused the error
 */
export class BaseError extends Error {
  public readonly context?: Jsonable;

  constructor(
    message: string,
    options: { cause?: Error; context?: Jsonable } = {}
  ) {
    const { cause, context } = options;

    super(message, { cause });
    this.name = this.constructor.name;

    this.context = context;
  }
}
