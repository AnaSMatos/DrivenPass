import cryptr from "../cryptrConfig.js"
import { insertWifi, getWifis, getWifiById, getWifiByUserAndTitle, deleteWifiById, Wifi, WifiInfo } from "../repositories/wifisRepository.js"

async function createWifi(data: WifiInfo, userId: number){
    const {title, name, password} = data
    const titleExists = await getWifiByUserAndTitle(userId, data.title)
    if(titleExists.length > 0){
        throw{
            type: "conflict",
            message: "Title already used"
        }
    }

    //falta encriptar os dados

    const wifiInfo = {...data, userId}

    await insertWifi(wifiInfo)
}

async function getAllWifis(userId: number){
    const wifis = await getWifis(userId)

    //falta decriptar os dados
    
    wifis.forEach((element) => {
        delete element.userId
        delete element.id
        delete element.createdAt
    });

    return wifis
}

async function getWifi(id: number, userId: number){
    const wifi = await getWifiById(id)
    if(!wifi){
        throw{
            type: "notFound",
            message: "The credential you are looking for could not be found"
        }
    }

    if(wifi.userId !== userId){
        throw{
            type: "unauthorized",
            message: "The credential you are looking for does not belong to you"
        }
    }

    //descriptar aqui também
    
    delete wifi.id
    delete wifi.userId
    delete wifi.createdAt

    return wifi
}

async function deleteWifi(id: number, userId: number){
    const wifi = await getWifiById(id)

    if(!wifi){
        throw{
            type: "notFound",
            message: "The credential you are trying to delete could not be found"
        }
    }

    if(wifi.userId !== userId){
        throw{
            type: "unauthorized",
            message: "The credential you are looking for does not belong to you"
        }
    }
    

    await deleteWifiById(id)
}

const wifiServices = {
    createWifi,
    getAllWifis,
    getWifi,
    deleteWifi
}

export default wifiServices;