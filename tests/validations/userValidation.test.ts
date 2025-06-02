import { describe, expect, it } from "vitest";
import { CreateUserValidation } from "../../src/validations/userValidations.ts";

describe("#CreateUserValidation", () => {
  it("Checks if a correct validation passes", () => {
    expect(
      CreateUserValidation.safeParse({
        name: "ABC ",
        email: "ABC@gmail.com",
        password: "123",
      }).success
    ).toBe(true);
  });
});

describe("#CreateUserValidation", () => {
  it("Checks if triming on name works", () => {
    expect(
      "ABC" ===
        CreateUserValidation.safeParse({
          name: "ABC ",
          email: "ABC@gmail.com",
          password: "123",
        }).data?.name
    ).toBe(true);
  });
});

describe("#CreateUserValidation", () => {
  it("Checks if an incorrect email gets caught", () => {
    expect(
      CreateUserValidation.safeParse({
        name: "ABC",
        email: "ABC@gmailcom",
        password: "123",
      }).success
    ).toBe(false);
  });
});

describe("#CreateUserValidation", () => {
  it("Checks if a number as name gets caught", () => {
    expect(
      CreateUserValidation.safeParse({
        name: 2,
        email: "ABC@gmailcom",
        password: "123",
      }).success
    ).toBe(false);
  });
});

describe("#CreateUserValidation", () => {
  it("Checks if a number as password gets caught", () => {
    expect(
      CreateUserValidation.safeParse({
        name: 2,
        email: "ABC@gmailcom",
        password: 123,
      }).success
    ).toBe(false);
  });
});
