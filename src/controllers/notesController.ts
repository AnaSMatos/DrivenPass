import {Request, Response} from "express"
import { NoteInfo } from "../repositories/notesRepository.js"
import noteServices from "../services/notesService.js"
import { decodeToken, getUserIdbyToken } from "../utils/token.js";

export async function createNote(req: Request, res: Response){
    // const {authorization} = req.headers;
    // const userId = getUserIDbyToken(authorization).userId
    
    const userId = 1

    const data: NoteInfo = req.body

    await noteServices.createNote(data, userId)

    res.sendStatus(201)

}

export async function findNotes(req: Request, res: Response){
    // const {authorization} = req.headers;
    // const userId = getUserIDbyToken(authorization)
    const userId = 1

    const notes = await noteServices.getAllNotes(userId)

    res.send(notes).status(200)

}

export async function findNote(req: Request, res: Response){
    const {id} = req.params
    // const {authorization} = req.headers;
    // const userId = getUserIDbyToken(authorization)
    const userId = 1

    const note = await noteServices.getNote(Number(id), userId)

    res.send(note).status(200)
}

export async function deleteNote(req: Request, res: Response){
    const {id} = req.params
    // const {authorization} = req.headers;
    // const userId = getUserIDbyToken(authorization)

    const userId = 1

    await noteServices.deleteNote(Number(id), userId)

    res.sendStatus(200)
}