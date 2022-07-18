import prisma from "../database.js";

export interface Card {
    id: number,
    userId: number,
    title: string,
    number: string,
    name: string,
    securityCode: string,
    expirationDate: string,
    password: string,
    type: string,
    isVirtual?: boolean
}

export type CardInfo = Omit<Card, "id">

export async function insertCard(cardData: CardInfo){
    const {number, title, name, securityCode, expirationDate, password, isVirtual, type, userId} = cardData;
    await prisma.cards.create({
        data: {
            userId,
            number,
            title,
            name,
            securityCode,
            expirationDate, 
            password, 
            type,
            isVirtual
        }
    })
}

export async function getCards(userId: number){
    const notes = await prisma.cards.findMany({where: {userId}})

    return notes
}

export async function getCardsByUserAndTitle(userId: number, title: string){
    const notes = await prisma.cards.findMany({where: {userId, title}})

    return notes
}

export async function getCardById(id: number){
    const note = await prisma.cards.findUnique({where: {id}})

    return note
}

export async function deleteCardById(id:number) {
    await prisma.cards.delete({
        where:{id}
    })
}
