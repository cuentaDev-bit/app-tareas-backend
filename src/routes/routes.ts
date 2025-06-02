import { Router } from "express";
import {userRoutes} from "./userRoutes.ts";

/**
 * Contains the collection of routes of the project
 */
export const routes = Router();
routes.use("/user", userRoutes);
