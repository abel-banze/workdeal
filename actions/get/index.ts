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

        if(session && session.user && session.user.email){
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

 /*  SECCAO DE CONCURSOS  */

export async function getConcursos(){
    try{

        const promise = await db.concurso.findMany({
            include: {
                author: true
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
                author: true,
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

export async function getMyConcursos(){
    try{

        const auth = await getLoggedUser()
        if(!auth) return "unathenticade";

        const promise = await db.concurso.findMany({
            where: {
                author: {
                    userId: auth.id
                }
            },
            include: {
                author: true,
                propostas: true
            }
        });

        return promise;

    }catch(err){
        return "failed"
    }
}

export async function getSavedConcursos(){
    try{

        const auth = await getLoggedUser()
        if(!auth) return "unathenticade";

        const saved = await db.saved.findMany({
            where: {
                type: 'concurso',
                userId: auth.id
            }
        });

        const concursos = [];

        if(!saved) return null;

        for(let i=0; i < saved.length ; i++){
            if(saved[i].objectId){
                const promise = await db.concurso.findFirst({
                    where: {
                        id: saved[i].objectId?.toString()
                    }
                });
    
                concursos.push(promise)
            }
        }

        return concursos;


    }catch(err){
        return "failed";
    }
}

/* SECCAO DAS TAREFAS */

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
                propostas: {
                    include: {
                        user: true
                    }
                }
            }
        });

        return promise;

    }catch(err){
        return "failed";
    }
}

export async function getSavedTarefas(){
    try{

        const auth = await getLoggedUser()
        if(!auth) return "unathenticade";

        const saved = await db.saved.findMany({
            where: {
                type: 'tarefa',
                userId: auth.id
            }
        });

        const concursos = [];

        if(!saved) return null;

        for(let i=0; i < saved.length ; i++){
            if(saved[i].objectId){
                const promise = await db.tarefa.findFirst({
                    where: {
                        id: saved[i].objectId?.toString()
                    }
                });
    
                concursos.push(promise)
            }
        }

        return concursos;


    }catch(err){
        return "failed";
    }
}

export async function getMyTarefas(){
    try{

        const auth = await getLoggedUser()
        if(!auth) return "unathenticade";

        const promise = await db.tarefa.findMany({
            where: {
                userId: auth.id
            },
            include: {
                propostas: true
            }
        });

        return promise;

    }catch(err){
        return "failed"
    }
}
/* SECCAO DAS PROPOSTAS */

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
                author: true,
            }
        });

        if(!promise) return "failed";

        return promise;

    }catch(err){
        return "failed";
    }
}


/* SECCAO DAS ORGANIZACOES */
export async function getMyOrganizations(){
    try{

        const auth = await getLoggedUser()
        if(!auth) return "unathenticade";

        const promise = await db.organizacao.findMany({
            where: {
                userId: auth.id
            },
            include: {
                colaboradores: true,
                departamentos: true
            }
        });

        if(!promise) return "failed";

        return promise;

    }catch(err){
        return "failed";
    }
}

export async function getOrganizationById(id: string){
    try{

        const organization = await db.organizacao.findFirst({
            where: {
                id: id
            },
            include: {
                colaboradores: true,
                departamentos: {
                    include: {
                        colaboradores: true
                    }
                }
            }
        });

        if(!organization) return "failed";

        return organization;

    }catch(err){
        return "failed"
    }
}

export async function getToken(){
    try{

        const auth = await getLoggedUser();
        if (!auth) return "unathenticade";

        const media = await db.connect.findFirst({
            where: {
                userId: auth.id
            }
        });

        if(!media) return "failed";

        return media;

    }catch(err){
        return "failed"
    }
}

export async function getFacebookPages(){
    try{

        const token = await getToken();
        if(token === 'failed' || token === 'unathenticade') return "failed";

        if(token.media === 'facebook' && token.token){

            const params = new URLSearchParams({
                access_token: token.token,
                fields: 'name,id,category,picture',
            });
              
            const url = `https://graph.facebook.com/v19.0/me/accounts?${params}`;
              
            const response = await fetch(url);

            console.log('request status: ',response.status);

            const data = await response.json();

            return data;
        }

    }catch(err){
        return "failed";
    }
}