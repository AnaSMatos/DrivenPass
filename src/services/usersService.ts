import { insertUser, getUserByEmail, UserInfo } from "../repositories/usersRepository.js";
import bcrypt from "bcrypt"
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();


async function createUser(data:UserInfo){
    const {email, password} = data;

    const emailExists = await getUserByEmail(email);
    console.log(emailExists)
    if(emailExists.length > 0){
        throw{
            type: "conflict",
            message: "The email is already registered"
        }
    }

    const encryptedPassword = bcrypt.hashSync(password, +process.env.HASH)

    await insertUser({email, password: encryptedPassword})
}

async function logUser(data: UserInfo){
    const {email, password} = data
    const user = await getUserByEmail(email)
    if(user.length === 0){
        throw{
            type: "notFound",
            message: "The email is not registered"
        }
    }

    const checkPassword = bcrypt.compareSync(password, user[0].password)
    if(!checkPassword){
        throw{
            type: "unauthorized",
            message: "Wrong password"
        }
    }

    const token = {id: user[0].id, email: user[0].email};
    return jwt.sign(token, process.env.JWT_TOKEN);
}

const userServices = {
    createUser,
    logUser
}

export default userServices;