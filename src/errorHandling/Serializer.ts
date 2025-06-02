import {CompositeErrorSerializer} from "./CompositeErrorSerializer.ts";
import {baseErrorSerializer} from "./baseError/BaseErrorSerializer.ts";
import {zodErrorSerializer} from "./zodError/ZodErrorSerializer.ts";

/**
 * A class that serializes any error it is configured to
 * @param errorSerializers all the serializers for each type of Error
 */
export class Serializer implements CompositeErrorSerializer {
  errorSerializers: CompositeErrorSerializer[];

  constructor(errorSerializers: CompositeErrorSerializer[] = []) {
    this.errorSerializers = errorSerializers;
  }

  /**
   * 
   * @param error 
   * @returns a default error in case of failure
   */
  private defaultReturnedObject(error: Error) {
    return { message: "Could not Serialize", error };
  }

  canHandle(error: Error): boolean {
    return true;
  }

  /**
   * Serializes an error
   * @param error 
   * @returns an object that serializes the error
   */
  serialize(error: Error): object {
    let i = 0;
    let result: object = {};
    let found = false;
    while (i < this.errorSerializers.length && !found) {
      let particularSerializer = this.errorSerializers[i];
      if (particularSerializer.canHandle(error)) {
        found = true;
        result = particularSerializer.serialize(error, this);
      }
      i++;
    }

    return found ? result : this.defaultReturnedObject(error);
  }
}

/**
 * instance of Serializer with config attached
 */
export const serializer = new Serializer([zodErrorSerializer, baseErrorSerializer]);
