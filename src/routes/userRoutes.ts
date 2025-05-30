import { Router } from "express";
import {UserController} from "../controllers/UserController.ts";

export const userRoutes = Router();

userRoutes.post("/register", UserController.createUser);

