import BaseError from "../../src/utils/BaseError.ts";
import { describe, expect, it } from "vitest";

describe("#BaseError.ensureError(", ()=>{
    it("returns an error if passed an error", () => {
        expect(
            BaseError.ensureError(new Error("test")) instanceof Error
        ).toBe(true);
    })
})