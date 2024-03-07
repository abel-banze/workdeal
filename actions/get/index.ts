import { db } from "@/lib/db";
import { auth } from "@/auth"

export async function getUserById(id: string){
    try{
        const user = await db.user.findUnique({ where: { id } })
        return user;
    }catch(err){
        return null;
    }
}

export async function getLoggedUser(){
    try{

        const session = await auth();

        if(session && session.user.email){
            const promise = await db.user.findUnique({
                where: {
                    email: session.user.email
                }
            });

            if(!promise) return null;
        
            return promise;
        }

        return null;

    }catch(err){
        console.log(err);
        return null;
    }
}

export async function getCategories(){
    try{

        const promise = await db.sector.findMany();
        if(!promise) return "failed";

        return promise;

    }catch(err){
        return "failed";
    }
}