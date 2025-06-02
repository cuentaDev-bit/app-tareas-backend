import { Router } from "express";
import {userController} from "../controllers/UserController.ts";

/**
 * Contains the routes regarding User
 */
export const userRoutes = Router();

userRoutes.post("/register", userController.createUser);
userRoutes.post("/login", userController.login);

