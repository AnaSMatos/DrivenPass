import { Router } from "express";
import {validateSchema} from "../middlewares/validateSchema.js"
import { validateToken } from "../middlewares/validateToken.js";
import notesSchema from "../schemas/notesSchema.js"
import {createNote, findNotes, findNote, deleteNote} from "../controllers/notesController.js"

const notesRouter = Router()

notesRouter.post("/notes", validateSchema(notesSchema), createNote)
notesRouter.get("/notes", validateToken, findNotes)
notesRouter.get("/notes/:id", validateToken, findNote)
notesRouter.delete("/notes/:id", validateToken, deleteNote)

export default notesRouter;