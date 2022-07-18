import {Request, Response} from "express"
import { User } from "../repositories/usersRepository.js"
import userServices from "../services/usersService.js"

export type UserInfo = Omit<User, "id">
//o token deve ser recebido em todas as requisições!!
export async function signUp(req: Request, res: Response){
    const data: UserInfo = req.body

    await userServices.createUser(data)

    res.sendStatus(201)
}

export async function signIn(req: Request, res: Response){
    const data: UserInfo = req.body

    const token = await userServices.logUser(data)

    res.send(token) 
}