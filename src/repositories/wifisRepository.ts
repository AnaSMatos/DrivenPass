import prisma from "../database.js";

export interface Wifi {
    id: number,
    userId: number,
    title: string,
    name: string,
    password: string
}

export type WifiInfo = Omit<Wifi, "id">

export async function insertWifi(noteData: WifiInfo){
    const {title, name, password, userId} = noteData;

    await prisma.wifis.create({
        data: {
            userId,
            title,
            name,
            password
        }
    })
}

export async function getWifis(userId: number){
    const notes = await prisma.wifis.findMany({where: {userId}})

    return notes
}

export async function getWifiByUserAndTitle(userId: number, title: string){
    const notes = await prisma.wifis.findMany({where: {userId, title}})

    return notes
}

export async function getWifiById(id: number){
    const note = await prisma.wifis.findUnique({where: {id}})

    return note
}

export async function deleteWifiById(id:number) {
    await prisma.wifis.delete({
        where:{id}
    })
}
