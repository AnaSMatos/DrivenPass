import { Router } from "express";
import {validateSchema} from "../middlewares/validateSchema.js"
import notesSchema from "../schemas/notesSchema.js"
import {createNote, findNotes, findNote, deleteNote} from "../controllers/notesController.js"

const notesRouter = Router()

notesRouter.post("/notes", validateSchema(notesSchema), createNote)
notesRouter.get("/notes", findNotes)
notesRouter.get("/notes/:id", findNote)
notesRouter.delete("/notes/:id", deleteNote)

export default notesRouter;