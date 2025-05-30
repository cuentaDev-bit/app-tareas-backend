import { Request, Response } from "express";
import {BaseError} from "../errorHandling/baseError/BaseError.ts";
import {UserService} from "../services/UserService.ts";
import { CreateUserValidation } from "../validations/userValidations.ts";
import { z } from "zod/v4";
import {ErrorUtils} from "../errorHandling/ErrorUtils.ts";
import {serializer as Serializer} from "../errorHandling/Serializer.ts";

export class UserController {
  static async createUser(req: Request, res: Response) {
    try {
      const { body } = req;
      const { name, email, password } = CreateUserValidation.parse(body);

      const user = await UserService.create({ name, email, password });

      res.status(201).send({ success: true, result: user });
    } catch (err) {
      const ensuredError = ErrorUtils.ensureError(err);
      const error = Serializer.serialize(ensuredError);
      res.status(403).send({ success: false, error });
    }
  }
}
