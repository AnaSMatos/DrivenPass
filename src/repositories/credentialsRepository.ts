import prisma from "../database.js";

export interface Credential {
    id: number,
    userId: number,
    url: string,
    username: string,
    password: string,
    title: string
}
export type CredInfo = Omit<Credential, "id">

export async function insertCredential(userData: CredInfo){
    const {url, username, title, password, userId} = userData;

    await prisma.credentials.create({
        data: {
            userId,
            title,
            url,
            username,
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

export async function getCredentialById(id: number){
    const credential = await prisma.credentials.findUnique({where: {id}})

    return credential
}

export async function deleteCredendialById(id:number) {
    console.log(id)
    await prisma.credentials.delete({
        where:{id}
    })
}
