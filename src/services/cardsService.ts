import cryptr from "../cryptrConfig.js"
import { insertCard, getCards, getCardById, getCardsByUserAndTitle, deleteCardById, Card, CardInfo } from "../repositories/cardsRepository.js"

async function createCard(data: CardInfo, userId: number){
    const {number, title, name, securityCode, expirationDate, password, isVirtual, type} = data
    const titleExists = await getCardsByUserAndTitle(userId, data.title)
    if(titleExists.length > 0){
        throw{
            type: "conflict",
            message: "Title already used"
        }
    }

    const encryptedPassword = cryptr.encrypt(password)

    const cardInfo = {number, title, name, securityCode, expirationDate, password: encryptedPassword, isVirtual, type, userId}

    await insertCard(cardInfo)
}

async function getAllCards(userId: number){
    const cards = await getCards(userId)
    
    cards.forEach((element) => {
        element.password = cryptr.decrypt(element.password)
        delete element.userId
        delete element.id
        delete element.createdAt
    });

    return cards
}

async function getCard(id: number, userId: number){
    const card = await getCardById(id)
    if(!card){
        throw{
            type: "notFound",
            message: "The credential you are looking for could not be found"
        }
    }

    if(card.userId !== userId){
        throw{
            type: "unauthorized",
            message: "The credential you are looking for does not belong to you"
        }
    }
    
    card.password = cryptr.decrypt(card.password)
    delete card.id
    delete card.userId
    delete card.createdAt

    return card
}

async function deleteCard(id: number, userId: number){
    const card = await getCardById(id)

    if(!card){
        throw{
            type: "notFound",
            message: "The credential you are trying to delete could not be found"
        }
    }

    if(card.userId !== userId){
        throw{
            type: "unauthorized",
            message: "The credential you are looking for does not belong to you"
        }
    }
    

    await deleteCardById(id)
}

const cardServices = {
    createCard,
    getAllCards,
    getCard,
    deleteCard
}

export default cardServices;