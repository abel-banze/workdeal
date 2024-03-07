import { Storage, Client } from "appwrite"

export const appwriteConfig ={
    project: '65c60cc608fb922b416f',
    url: 'https://cloud.appwrite.io/v1',
    storage: '65c60f35854d339a50ea',
}

const client = new Client();

client
    .setProject(appwriteConfig.project)
    .setEndpoint(appwriteConfig.url)


export const storage = new Storage(client)
