import { appwriteConfig, storage } from "@/actions/appwrite/config";
import { ID } from "appwrite";


export async function uploadFile(file: File){
    try {

        const upload = await storage.createFile(
            appwriteConfig.storage,
            ID.unique(),
            file
        );

        return upload; 

    }catch(error){
        console.log(error)
    }
}

// to show images
export async function getFileUrl(fileId: string){
    try {
        
        const fileUrl = await storage.getFilePreview(
            appwriteConfig.storage,
            fileId,
            2000,
            2000,
            "top",
            100
        )

        if(!fileUrl) throw Error;

        return fileUrl;

    }catch (error){
        console.log(error)
    }
}

// to show videos
export async function getFileView(fileId: string){
    try{

        const fileView = await storage.getFileView(
            appwriteConfig.storage,
            fileId
        );
        
        if(!fileView) throw Error("Nao foi possivel guardar o video.");

        return fileView;

    }catch(error){
        console.log(error)
    }
}

export async function getFile(id: string){
    try{

        const promise = await storage.getFile(
            appwriteConfig.storage,
            id
        );

        if(!promise) return "failed";

        return JSON.stringify(promise);

    }catch(err){
        console.log(err)
        return "failed";
    }
}

export async function downloadFile(id: string){
    try{

        const promise = await storage.getFileDownload(
            appwriteConfig.storage,
            id
        );

        if(!promise) return "failed";

        return JSON.stringify(promise);

    }catch(err){
        console.log(err)
        return "failed";
    }
}