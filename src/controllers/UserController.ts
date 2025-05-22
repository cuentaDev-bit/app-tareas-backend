import { Request, Response } from "express";
import BaseError from "../utils/BaseError.ts";
import UserService from "../services/UserService.ts";
import { User } from "../models/index.ts";

export default class UserController {
  static async createUser(req: Request, res: Response) {
    try {
      if (!req.body) throw new BaseError("Request body is empty");

      const name: unknown = req.body.name;
      const email: unknown = req.body.email;
      const password: unknown = req.body.password;

      if (typeof name != "string")
        throw new BaseError("name has to be string", { context: typeof name });

      if (typeof email != "string")
        throw new BaseError("email has to be string", {
          context: typeof email,
        });

      if (typeof password != "string")
        throw new BaseError("password has to be string", {
          context: typeof password,
        });

      const user = await UserService.create({ name, email, password });

      res.status(201).send({ success: true, message: user });
    } catch (err) {
      const error = BaseError.ensureError(err);
      res.status(403).send({ success: false, message: error });
    }
  }
}
