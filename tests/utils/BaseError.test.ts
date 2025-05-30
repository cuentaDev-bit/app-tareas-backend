import {ErrorUtils} from "../../src/errorHandling/ErrorUtils.ts"
import { describe, expect, it } from "vitest";

describe("#BaseError.ensureError(", ()=>{
    it("returns an error if passed an error", () => {
        expect(
            ErrorUtils.ensureError(new Error("test")) instanceof Error
        ).toBe(true);
    })
})