import cryptr from "../cryptrConfig.js"
import { insertNote, getNotes, getNoteById, getNotesByUserAndTitle, deleteNoteById, Note, NoteInfo } from "../repositories/notesRepository.js"

async function createNote(data: NoteInfo, userId: number){
    const {title, note} = data
    const titleExists = await getNotesByUserAndTitle(userId, data.title)
    if(titleExists.length > 0){
        throw{
            type: "conflict",
            message: "Title already used"
        }
    }

    const noteInfo = {title, note, userId}

    await insertNote(noteInfo)
}

async function getAllNotes(userId: number){
    const notes = await getNotes(userId)
    
    notes.forEach((element) => {
        delete element.userId
        delete element.id
        delete element.createdAt
    });

    return notes
}

async function getNote(id: number, userId: number){
    const note = await getNoteById(id)
    if(!note){
        throw{
            type: "notFound",
            message: "The credential you are looking for could not be found"
        }
    }

    if(note.userId !== userId){
        throw{
            type: "unauthorized",
            message: "The credential you are looking for does not belong to you"
        }
    }
    

    delete note.id
    delete note.userId
    delete note.createdAt

    return note
}

async function deleteNote(id: number, userId: number){
    const note = await getNoteById(id)

    if(!note){
        throw{
            type: "notFound",
            message: "The credential you are trying to delete could not be found"
        }
    }

    if(note.userId !== userId){
        throw{
            type: "unauthorized",
            message: "The credential you are looking for does not belong to you"
        }
    }
    

    await deleteNoteById(id)
}

const noteServices = {
    createNote,
    getAllNotes,
    getNote,
    deleteNote
}

export default noteServices;