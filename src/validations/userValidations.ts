import { CreationAttributes } from "sequelize";
import { z } from "zod/v4";
import {User} from "../models/User.ts";

/**
 * Defines the validations for creating an User
 */
export const CreateUserValidation = z.object({
    name: z.string().trim(),
    email: z.email({ pattern: z.regexes.rfc5322Email }),
    password: z.string().trim(),
})

export const loginUserValidation = z.object({
    name: z.string().trim().optional(),
    email: z.email({ pattern: z.regexes.rfc5322Email }),
    password: z.string().trim(),
})

export type CreateUserAttributes = z.infer<typeof CreateUserValidation> & CreationAttributes<User>;
