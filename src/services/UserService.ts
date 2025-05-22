import { CreationAttributes } from "sequelize";
import { User } from "../models/index.ts";
import ModelQueryMaker from "../utils/ModelQueryMaker.ts";

export default class UserService {
    static userQueryMaker: ModelQueryMaker<User> = new ModelQueryMaker<User>(User);

    static async create(userCreationParams: CreationAttributes<User>): Promise<User>{
        return await this.userQueryMaker.create(userCreationParams);
    }
}