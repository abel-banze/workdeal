import { db } from "@/lib/db"
import { ConcursoType } from "@/types";
import { getLoggedUser } from "@/actions/get"


export async function createConcurso(form: ConcursoType){
    try{
        
        const auth = await getLoggedUser()

        if(!auth) return "unathenticade";


        // criar o concurso
        const promise = await db.concurso.create({
            data: {
                user: {
                    connect: {
                        id: auth.id
                    }
                },
                title: form.title,
                descricao: form.descricao,
                prazo: form.prazo,
                precoMin: form.precoMin,
                precoMax: form.precoMax,
                sector: {
                    connect: {
                        id: form.sector
                    }
                }
            }
        });

        // adicionar ficheiros
        if(form.files && form.files.length > 0){
            for(let i=0; i < form.files.length; i++){
                const registFile = await db.concursoFile.create({
                    data: {
                        concurso: {
                            connect: {
                                id: promise.id
                            }
                        },
                        url: form.files[i].toString()
                    }
                })
            }
        }

        return "success";

    }catch(error){
        return "failed";
    }
}

export async function createTarefa(){
    try{

    }catch(error){

    }
}

export async function createPropostaConcurso(){
    try{

    }catch(error){

    }
}

export async function createPropostaTarefa(){
    try{

    }catch(error){

    }
}

export async function saveConcurso(){
    try{

    }catch(error){

    }
}

export async function saveTarefa(){
    try{

    }catch(error){
        
    }
}

export async function createCategoria(name: string){
    try{

        const promise = await db.sector.create({
            data: {
                name: name
            }
        });

        if(!promise) return "failed";

        return "success";

    }catch(err){
        return "failed";
    }
}