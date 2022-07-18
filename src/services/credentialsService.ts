import cryptr from "../cryptrConfig.js"
import { insertCredential, getCredentials, getCredentialById, getCredentialsByUserAndTitle, deleteCredendialById, CredInfo, Credential } from "../repositories/credentialsRepository"

async function createCredential(data: CredInfo, userId: number){
    const {url, name, password, title} = data
    const titleExists = await getCredentialsByUserAndTitle(userId, data.title)
    if(titleExists.length > 0){
        throw{
            type: "conflict",
            message: "Title already used"
        }
    }

    const encryptedPassword = cryptr.encrypt(password)
    const allInfo = {url, name, password:encryptedPassword, title, userId}

    await insertCredential(allInfo)
}

async function getAllCredentials(userId: number){
    const credentials = await getCredentials(userId)
    
    credentials.forEach((element) => {
        element.password = cryptr.decrypt(element.password)
        delete element.userId
        delete element.id
    });

    return credentials
}

async function getCredential(id: number, userId: number){
    const credential = await getCredentialById(id, userId)
    
    if(!credential){
        throw{
            type: "notFound",
            message: "The credential you are looking for could not be found or does not belong to you"
        }
    }
    credential.password = cryptr.decrypt(credential.password)
    delete credential.id
    delete credential.userId

    return credential
}

async function deleteCredential(id: number, userId: number){
    const credential = await getCredentialById(id, userId)
    if(!credential){
        throw{
            type: "notFound",
            message: "The credential you are trying to delete could not be found or does not belong to you"
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