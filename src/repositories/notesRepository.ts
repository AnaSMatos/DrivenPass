import prisma from "../database.js";

export interface Note {
    id: number,
    userId: number,
    title: string,
    note: string
}

export type NoteInfo = Omit<Note, "id">

export async function insertNote(noteData: NoteInfo){
    const {title, note, userId} = noteData;

    await prisma.notes.create({
        data: {
            userId,
            title,
            note
        }
    })
}

export async function getNotes(userId: number){
    const notes = await prisma.notes.findMany({where: {userId}})

    return notes
}

export async function getNotesByUserAndTitle(userId: number, title: string){
    const notes = await prisma.notes.findMany({where: {userId, title}})

    return notes
}

export async function getNoteById(id: number){
    const note = await prisma.notes.findUnique({where: {id}})

    return note
}

export async function deleteNoteById(id:number) {
    await prisma.notes.delete({
        where:{id}
    })
}
