import z from "zod/v4";
import {CompositeErrorSerializer} from "../CompositeErrorSerializer.ts";

class ZodErrorSerializer implements CompositeErrorSerializer {

    errorSerializers: CompositeErrorSerializer[];

    constructor(errorSerializers : CompositeErrorSerializer[] = []){
        this.errorSerializers = errorSerializers;
    }

    canHandle(error: Error): boolean {
        return error instanceof z.ZodError;
    }
    serialize(error: z.ZodError, serializer: CompositeErrorSerializer): object {
        return {name: error.name, issues: z.prettifyError(error)}
    }

}

export const zodErrorSerializer = new ZodErrorSerializer();