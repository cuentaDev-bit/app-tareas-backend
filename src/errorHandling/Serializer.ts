import {CompositeErrorSerializer} from "./CompositeErrorSerializer.ts";
import {baseErrorSerializer} from "./baseError/BaseErrorSerializer.ts";
import {zodErrorSerializer} from "./zodError/ZodErrorSerializer.ts";

class Serializer implements CompositeErrorSerializer {
  errorSerializers: CompositeErrorSerializer[];

  constructor(errorSerializers: CompositeErrorSerializer[] = []) {
    this.errorSerializers = errorSerializers;
  }

  private defaultReturnedObject(error: Error) {
    return { message: "Could not Serialize", error };
  }

  canHandle(error: Error): boolean {
    return true;
  }

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

export const serializer = new Serializer([zodErrorSerializer, baseErrorSerializer]);
