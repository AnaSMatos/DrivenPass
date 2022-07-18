import { Router } from "express";
import {validateSchema} from "../middlewares/validateSchema.js"
import cardSchema from "../schemas/cardSchema.js"

const cardsRouter = Router()

cardsRouter.post("/cards", validateSchema(cardSchema))
cardsRouter.get("/cards")
cardsRouter.get("/cards/:id")
cardsRouter.delete("/cards/:id")


export default cardsRouter;