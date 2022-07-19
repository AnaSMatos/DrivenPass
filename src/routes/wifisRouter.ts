import { Router } from "express";
import {validateSchema} from "../middlewares/validateSchema.js"
import { validateToken } from "../middlewares/validateToken.js";
import wifiSchema from "../schemas/wifiSchema.js"
import {findWifi, findWifis, deleteWifi, createWifi} from "../controllers/wifisController.js"



const wifisRouter = Router()

wifisRouter.post("/wifis", validateSchema(wifiSchema), createWifi)
wifisRouter.get("/wifis", validateToken, findWifis)
wifisRouter.get("/wifis/:id", validateToken, findWifi)
wifisRouter.delete("/wifis/:id", validateToken, deleteWifi)

export default wifisRouter;