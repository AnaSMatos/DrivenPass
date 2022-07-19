import {Request, Response} from "express"
import { CardInfo } from "../repositories/cardsRepository.js"
import cardServices from "../services/cardsService.js"
import { decodeToken, getUserIdbyToken } from "../utils/token.js";

export async function createCard(req: Request, res: Response){
    const {authorization} = req.headers;
    const userId = getUserIdbyToken(authorization).userId
    const data: CardInfo = req.body

    await cardServices.createCard(data, userId)

    res.sendStatus(201)

}

export async function findCards(req: Request, res: Response){
    const {authorization} = req.headers;
    const userId = getUserIdbyToken(authorization).userId

    const notes = await cardServices.getAllCards(userId)

    res.send(notes).status(200)

}

export async function findCard(req: Request, res: Response){
    const {id} = req.params
    const {authorization} = req.headers;
    const userId = getUserIdbyToken(authorization).userId

    const note = await cardServices.getCard(Number(id), userId)

    res.send(note).status(200)
}

export async function deleteCard(req: Request, res: Response){
    const {id} = req.params
    const {authorization} = req.headers;
    const userId = getUserIdbyToken(authorization).userId

    await cardServices.deleteCard(Number(id), userId)

    res.sendStatus(200)
}