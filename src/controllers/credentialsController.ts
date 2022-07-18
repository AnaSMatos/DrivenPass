import {Request, Response} from "express"
import { CredInfo } from "../repositories/credentialsRepository.js"
import credentialServices from "../services/credentialsService.js"

export async function createCredential(req: Request, res: Response){
    const data: CredInfo = req.body
    const userId = res.locals.userDataFromToken;

    await credentialServices.createCredential(data, userId)

    res.sendStatus(201)
}

export async function findCredentials(req: Request, res: Response){
    const userId = res.locals.userDataFromToken;

    const credentials = await credentialServices.getAllCredentials(userId)

    res.send(credentials).status(200)
}

export async function findCredential(req: Request, res: Response){
    const {id} = req.params
    const userId = res.locals.userDataFromToken;

    const credential = await credentialServices.getCredential(Number(id), userId)

    res.send(credential).status(200)
}

export async function deleteCredential(req: Request, res: Response){
    const {id} = req.params
    const userId = res.locals.userDataFromToken;

    await credentialServices.deleteCredential(Number(id), userId)
}