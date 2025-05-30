import { Router } from "express";
import {userRoutes} from "./userRoutes.ts";

export const routes = Router();
routes.use("/user", userRoutes);
