import bcrypt from "bcrypt";
import { BaseError } from "../errorHandling/baseError/BaseError.ts";
import { ErrorUtils } from "../errorHandling/ErrorUtils.ts";

/**
 * Utils for dealing with passwords
 */
export class PasswordManager {
  /**
   * Hashes a password with salt
   * @param password a password to be hashed
   * @returns hashed password
   */
  static async hashPassword(password: string) {
    try {
      const rounds = 10;
      const salt = await bcrypt.genSalt(rounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    } catch (err) {
      const error = ErrorUtils.ensureError(err);
      throw new BaseError("Could not hash password", { cause: error });
    }
  }

  static async validatePassword(
    plainTextPassword: string,
    hashedPassword: string
  ) {
    const isCorrectPassword = await bcrypt.compare(
      plainTextPassword,
      hashedPassword
    );
    return isCorrectPassword;
  }
}
