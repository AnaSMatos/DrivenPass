import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config({ path: '.env' });

export async function validateToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "").trim();

    if(!token){
        throw{
            type: "unauthorized",
            message: "Invalid token"
        }
    }
    const userDataFromToken = jwt.verify(token, 'secret', function (err, decoded) {
        if (err){
            throw{
                type: "unauthorized",
                message: "Invalid token"
            }
        } 
        return decoded;
    });

    res.locals.userDataFromToken = userDataFromToken;

    next();
};