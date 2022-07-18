import prisma from "../database.js";

export interface Credential {
    id: number,
    userId: number,
    url: string,
    name: string,
    password: string,
    title: string
}
export type CredInfo = Omit<Credential, "id">

export async function insertCredential(userData: CredInfo){
    const {url, name, title, password, userId} = userData;

    await prisma.credentials.create({
        data: {
            userId,
            url,
            name,
            title,
            password
        }
    })
}

export async function getCredentials(userId: number){
    const credentials = await prisma.credentials.findMany({where: {userId}})

    return credentials
}

export async function getCredentialsByUserAndTitle(userId: number, title: string){
    const credentials = await prisma.credentials.findMany({where: {userId, title}})

    return credentials
}

export async function getCredentialById(id: number, userId: number){
    const credential = await prisma.credentials.findUnique({where: {id, userId}})

    return credential
}

export async function deleteCredendialById(id:number) {
    await prisma.credentials.delete({
        where:{id}
    })
}
