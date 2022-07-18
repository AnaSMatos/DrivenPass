import { Router } from "express";
import {validateSchema} from "../middlewares/validateSchema.js"
import credentialSchema from "../schemas/credentialSchema.js"
import {createCredential, findCredential, findCredentials, deleteCredential} from "../controllers/credentialsController.js"


const credentialsRouter = Router()

credentialsRouter.post("/credentials", validateSchema(credentialSchema), createCredential)
credentialsRouter.get("/credentials", findCredentials)
credentialsRouter.get("/credentials/:id", findCredential)
credentialsRouter.delete("/credencials/:id", deleteCredential)

export default credentialsRouter;