import z from "zod/v4";
import {CompositeErrorSerializer} from "../CompositeErrorSerializer.ts";

/**
 * A class that serializes Zod validation errors.
 */
export class ZodErrorSerializer implements CompositeErrorSerializer {

    errorSerializers: CompositeErrorSerializer[];

    constructor(errorSerializers : CompositeErrorSerializer[] = []){
        this.errorSerializers = errorSerializers;
    }

    canHandle(error: Error): boolean {
        return error instanceof z.ZodError;
    }
    /**
     * 
     * @param error 
     * @param serializer 
     * @returns an object serializing the error, has the name and a prettified version of the issues
     */
    serialize(error: z.ZodError, serializer: CompositeErrorSerializer): object {
        return {name: error.name, issues: z.prettifyError(error)}
    }

}

export const zodErrorSerializer = new ZodErrorSerializer();