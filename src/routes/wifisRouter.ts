import { Router } from "express";
import {validateSchema} from "../middlewares/validateSchema.js"
import wifiSchema from "../schemas/wifiSchema.js"
import {findWifi, findWifis, deleteWifi, createWifi} from "../controllers/wifisController.js"
import { getWifis } from "../repositories/wifisRepository.js";


const wifisRouter = Router()

wifisRouter.post("/wifis", validateSchema(wifiSchema), createWifi)
wifisRouter.get("/wifis", getWifis)
wifisRouter.get("/wifis/:id", findWifi)
wifisRouter.delete("/wifis/:id", deleteWifi)

export default wifisRouter;