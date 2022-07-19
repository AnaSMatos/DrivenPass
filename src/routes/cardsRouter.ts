import { Router } from "express";
import {validateSchema} from "../middlewares/validateSchema.js"
import { validateToken } from "../middlewares/validateToken.js";
import cardSchema from "../schemas/cardSchema.js"
import {createCard, findCard, findCards, deleteCard} from "../controllers/cardsController.js"

const cardsRouter = Router()

cardsRouter.post("/cards", validateSchema(cardSchema), createCard)
cardsRouter.get("/cards", validateToken, findCards)
cardsRouter.get("/cards/:id", validateToken, findCard)
cardsRouter.delete("/cards/:id", validateToken, deleteCard)


export default cardsRouter;