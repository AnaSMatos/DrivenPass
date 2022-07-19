import {Request, Response} from "express"
import { WifiInfo } from "../repositories/wifisRepository.js"
import wifiServices from "../services/wifisService.js"
import { getUserIdbyToken } from "../utils/token.js";

export async function createWifi(req: Request, res: Response){
    const {authorization} = req.headers;
    const userId = getUserIdbyToken(authorization).userId

    const data: WifiInfo = req.body

    await wifiServices.createWifi(data, userId)

    res.sendStatus(201)

}

export async function findWifis(req: Request, res: Response){
    const {authorization} = req.headers;
    const userId = getUserIdbyToken(authorization).userId

    const wifis = await wifiServices.getAllWifis(userId)

    res.send(wifis).status(200)

}

export async function findWifi(req: Request, res: Response){
    const {id} = req.params
    const {authorization} = req.headers;
    const userId = getUserIdbyToken(authorization).userId

    const wifi = await wifiServices.getWifi(Number(id), userId)

    res.send(wifi).status(200)
}

export async function deleteWifi(req: Request, res: Response){
    const {id} = req.params
    const {authorization} = req.headers;
    const userId = getUserIdbyToken(authorization).userId

    await wifiServices.deleteWifi(Number(id), userId)

    res.sendStatus(200)
}