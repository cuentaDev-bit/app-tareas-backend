import { CreationAttributes } from "sequelize";
import { z } from "zod/v4";
import {User} from "../models/User.ts";

export const CreateUserValidation = z.object({
    name: z.string().trim(),
    email: z.email({ pattern: z.regexes.rfc5322Email }),
    password: z.string().trim(),
})

export type CreateUserAttributes = z.infer<typeof CreateUserValidation> & CreationAttributes<User>;
