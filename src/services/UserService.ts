import { CreationAttributes } from "sequelize";
import { User } from "../models/index.ts";
import { ModelQueryMaker } from "./ModelQueryMaker.ts";
import { BaseError } from "../errorHandling/baseError/BaseError.ts";
import { PasswordManager } from "../classes/PasswordManager.ts";

/**
 * A service for managing operations for the Model User.
 */
export class UserService {
  passwordManager: typeof PasswordManager;
  userQueryMaker: ModelQueryMaker<User>;

  constructor(
    userQueryMaker: ModelQueryMaker<User>,
    passwordManager: typeof PasswordManager
  ) {
    this.userQueryMaker = userQueryMaker;
    this.passwordManager = passwordManager;
  }
  /**
   * @param userCreationParams The parameters to create a User.
   * @returns The created User
   * @throws An error with information about why the creation of a new User failed.
   */
  public create = async (
    userCreationParams: CreationAttributes<User>
  ): Promise<User> => {
    return await this.userQueryMaker.create(userCreationParams);
  };

  login = async (email: string, password: string) => {
    try {
      const validUser = await this.validUserLogin(email, password);
      const { name } = validUser;
      return {
        name,
        email,
      };
    } catch (err) {
      const LOGIN_VALIDATION_ERROR_MESSAGE = "Incorrect email or password";
      throw new BaseError(LOGIN_VALIDATION_ERROR_MESSAGE);
    }
  };

  private validUserLogin = async (email: string, plainTextPassword: string) => {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error();
    const hashedPassword = user.password;
    const isCorrectPassword = await this.passwordManager.validatePassword(
      plainTextPassword,
      hashedPassword
    );
    if (!isCorrectPassword) throw new Error();
    return user;
  };
}

//In case this needs to be customised
const queryMaker = new ModelQueryMaker<User>(User);
export const userService = new UserService(queryMaker, PasswordManager);
