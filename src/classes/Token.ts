import jwt from "jsonwebtoken";
import {config} from "../config/config.ts";
const {secret} = config;

export class Token { 
    /**
     * 
     * @param payload data to save into the token
     * @returns json web token
     */
    generateToken (payload: object){
        const token = jwt.sign(payload, secret, {expiresIn: "2d"});
        return token
    }
    /**
     * 
     * @param token A token to decode
     * @returns A decoded token
     * @throws An error when the token and the secret don't match
     */
    verifyToken (token: string){
        const decodedToken = jwt.verify(token, secret)
        return decodedToken
    }
}

export const token = new Token()