import {Request, Response} from "express"
import { CredInfo } from "../repositories/credentialsRepository.js"
import credentialServices from "../services/credentialsService.js"
import { decodeToken, getUserIdbyToken } from "../utils/token.js";

export async function createCredential(req: Request, res: Response){
    // const {authorization} = req.headers;
    // const userId = getUserIdbyToken(authorization).userId

    const userId = 1
    const data: CredInfo = req.body

    await credentialServices.createCredential(data, userId)

    res.sendStatus(201)
}

export async function findCredentials(req: Request, res: Response){
    // const {authorization} = req.headers;
    // const userId = getUserIdbyToken(authorization).userId


    const userId = 1

    const credentials = await credentialServices.getAllCredentials(userId)

    res.send(credentials).status(200)
}

export async function findCredential(req: Request, res: Response){
    const {id} = req.params
    // const {authorization} = req.headers;
    // const userId = getUserIdbyToken(authorization)

    const userId = 1

    const credential = await credentialServices.getCredential(Number(id), userId)

    res.send(credential).status(200)
}

export async function deleteCredential(req: Request, res: Response){
    const {id} = req.params
    // const {authorization} = req.headers;
    // const userId = getUserIdbyToken(authorization)

    const userId = 1

    await credentialServices.deleteCredential(Number(id), userId)

    res.sendStatus(200)
}