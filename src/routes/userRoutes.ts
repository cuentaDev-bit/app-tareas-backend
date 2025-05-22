import { Router } from "express";
import UserController from "../controllers/UserController.ts";

const userRoutes = Router();

userRoutes.post("/register", UserController.createUser);

export default userRoutes;