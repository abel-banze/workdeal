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

export async function getConcursos(){
    try{

        const promise = await db.concurso.findMany({
            include: {
                user: true
            }
        });

        if(!promise) return null;

        return promise;

    }catch(err){
        console.log(err)
        return "failed"
    }
}

export async function getConcursoById(id: string){
    try{

        const promise = await db.concurso.findFirst({
            where: {
                id: id
            },
            include: {
                user: true,
                propostas: {
                    include: {
                        user: true
                    }
                }
            }
        });

        if(!promise) return "failed";

        return promise;

    }catch(err){
        return 'failed';
    }
}

export async function getTarefas(){
    try{

        const promise = await db.tarefa.findMany({
            include: {
                user: true
            }
        });
        if(!promise) return null;

        return promise;

    }catch(err){
        return "failed"
    }
}

export async function getTarefaById(id: string){
    try{

        const promise = await db.tarefa.findFirst({
            where: {
                id: id
            },
            include: {
                user: true,
                propostas: true
            }
        });

        return promise;

    }catch(err){
        return null;
    }
}

export async function getMyConcursos(){
    try{

        const auth = await getLoggedUser()
        if(!auth) return "unathenticade";

        const promise = await db.concurso.findMany({
            where: {
                userId: auth.id
            },
            include: {
                propostas: true
            }
        });

        if(!promise) return "failed";

        return promise;

    }catch(err){
        return "failed"
    }
}

export async function getMyPropostas(){
    try{

        const auth = await getLoggedUser()
        if(!auth) return "unathenticade";

        const promise = await db.concurso.findMany({
            where: {
                propostas: {
                    some: {
                        userId: auth.id
                    }
                }
            },
            include: {
                propostas: true,
                user: true,
            }
        });

        if(!promise) return "failed";

        return promise;

    }catch(err){
        return "failed";
    }
}