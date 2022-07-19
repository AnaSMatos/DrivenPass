import { Router } from "express";
import {validateSchema} from "../middlewares/validateSchema.js"
import { validateToken } from "../middlewares/validateToken.js";
import credentialSchema from "../schemas/credentialSchema.js"
import {createCredential, findCredential, findCredentials, deleteCredential} from "../controllers/credentialsController.js"


const credentialsRouter = Router()

credentialsRouter.post("/credentials", validateSchema(credentialSchema), createCredential)
credentialsRouter.get("/credentials", validateToken, findCredentials)
credentialsRouter.get("/credentials/:id", validateToken, findCredential)
credentialsRouter.delete("/credentials/:id", validateToken, deleteCredential)

export default credentialsRouter;