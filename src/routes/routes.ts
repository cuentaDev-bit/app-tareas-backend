import { Router } from "express";
import userRoutes from "./userRoutes.ts";

const routes = Router();
routes.use("/user", userRoutes)
export default routes