import cryptr from "../cryptrConfig.js"
import { insertCard, getCards, getCardById, getCardsByUserAndTitle, deleteCardById, Card, CardInfo } from "../repositories/cardsRepository.js"

async function createCard(data: CardInfo, userId: number){
    const {title, securityCode, password} = data
    const titleExists = await getCardsByUserAndTitle(userId, data.title)
    if(titleExists.length > 0){
        throw{
            type: "conflict",
            message: "Title already used"
        }
    }

    //falta encriptar os dados

    const cardInfo = {...data, userId}

    await insertCard(cardInfo)
}

async function getAllCards(userId: number){
    const cards = await getCards(userId)

    //falta decriptar os dados
    
    cards.forEach((element) => {
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

    //descriptar aqui também
    
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