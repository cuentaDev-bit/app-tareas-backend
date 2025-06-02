import { Request, Response } from "express";
import { BaseError } from "../errorHandling/baseError/BaseError.ts";
import { UserService, userService } from "../services/UserService.ts";
import {
  CreateUserValidation,
  loginUserValidation,
} from "../validations/userValidations.ts";
import { success, z } from "zod/v4";
import { ErrorUtils } from "../errorHandling/ErrorUtils.ts";
import { serializer as Serializer } from "../errorHandling/Serializer.ts";
import { token } from "../classes/Token.ts";

/**
 * Receives request pertaining to User, delegates them and returns the result
 */
export class UserController {
  userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }
  /**
   * creates a new User according to the validated data from the request body.
   * returns the created user in the response or the error in case of failure.
   * @param req request object
   * @param res response object
   */
  createUser = async (req: Request, res: Response) => {
    try {
      const { body } = req;
      /**
       * validates the request body
       */
      const validatedUser = CreateUserValidation.parse(body);
      const { name, email } = await this.userService.create(validatedUser);
      const userToken = token.generateToken({
        name,
        email,
      });
      res.cookie("token", userToken);
      res
        .status(201)
        .send({ success: true, message: "User signed up succesfully" });
    } catch (err) {
      const ensuredError = ErrorUtils.ensureError(err);
      const error = Serializer.serialize(ensuredError);
      res.status(403).send({ success: false, error });
    }
  };

  /**
   * sends a cookie with the user data and a token
   */
  login = async (req: Request, res: Response) => {
    try {
      const { body } = req;
      /**
       * validates the request body
       */
      const { email, password } = loginUserValidation.parse(body);
      const logedInUser = await this.userService.login(email, password);
      const userToken = token.generateToken(logedInUser);
      res.cookie("token", userToken);
      res
        .status(200)
        .send({ success: true, message: "User loged in succesfully" });
    } catch (err) {
      const ensuredError = ErrorUtils.ensureError(err);
      const error = Serializer.serialize(ensuredError);
      res.status(403).send({ success: false, error });
    }
  };
}

export const userController = new UserController(userService);
