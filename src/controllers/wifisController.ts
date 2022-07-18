import {Request, Response} from "express"
import { WifiInfo } from "../repositories/wifisRepository.js"
import wifiServices from "../services/wifisService.js"
import { decodeToken, getUserIdbyToken } from "../utils/token.js";

export async function createWifi(req: Request, res: Response){
    // const {authorization} = req.headers;
    // const userId = getUserIDbyToken(authorization).userId
    
    const userId = 1

    const data: WifiInfo = req.body

    await wifiServices.createWifi(data, userId)

    res.sendStatus(201)

}

export async function findWifis(req: Request, res: Response){
    // const {authorization} = req.headers;
    // const userId = getUserIDbyToken(authorization)
    const userId = 1

    const wifis = await wifiServices.getAllWifis(userId)

    res.send(wifis).status(200)

}

export async function findWifi(req: Request, res: Response){
    const {id} = req.params
    // const {authorization} = req.headers;
    // const userId = getUserIDbyToken(authorization)
    const userId = 1

    const wifi = await wifiServices.getWifi(Number(id), userId)

    res.send(wifi).status(200)
}

export async function deleteWifi(req: Request, res: Response){
    const {id} = req.params
    // const {authorization} = req.headers;
    // const userId = getUserIDbyToken(authorization)

    const userId = 1

    await wifiServices.deleteWifi(Number(id), userId)

    res.sendStatus(200)
}