import cryptr from "../cryptrConfig.js"
import { insertCredential, getCredentials, getCredentialById, getCredentialsByUserAndTitle, deleteCredendialById, CredInfo, Credential } from "../repositories/credentialsRepository.js"

async function createCredential(data: CredInfo, userId: number){
    const {url, username, password, title} = data
    const titleExists = await getCredentialsByUserAndTitle(userId, data.title)
    if(titleExists.length > 0){
        throw{
            type: "conflict",
            message: "Title already used"
        }
    }

    const encryptedPassword = cryptr.encrypt(password)
    const allInfo = {url, username, password:encryptedPassword, title, userId}

    await insertCredential(allInfo)
}

async function getAllCredentials(userId: number){
    const credentials = await getCredentials(userId)
    console.log(credentials)
    credentials.forEach((element) => {
        element.password = cryptr.decrypt(element.password)
        delete element.userId
        delete element.id
        delete element.createdAt
    });

    return credentials
}

async function getCredential(id: number, userId: number){
    const credential = await getCredentialById(id)
    if(!credential){
        throw{
            type: "notFound",
            message: "The credential you are looking for could not be found"
        }
    }
    
    if(credential.userId !== userId){
        throw{
            type: "unauthorized",
            message: "The credential you are looking for does not belong to you"
        }
    }
    
    credential.password = cryptr.decrypt(credential.password)
    delete credential.id
    delete credential.userId
    delete credential.createdAt

    return credential
}

async function deleteCredential(id: number, userId: number){
    const credential = await getCredentialById(id)

    if(!credential){
        throw{
            type: "notFound",
            message: "The credential you are trying to delete could not be found"
        }
    }

    if(credential.userId !== userId){
        throw{
            type: "unauthorized",
            message: "The credential you are looking for does not belong to you"
        }
    }
    

    await deleteCredendialById(id)
}

const credentialServices = {
    createCredential,
    getAllCredentials,
    getCredential,
    deleteCredential
}

export default credentialServices;