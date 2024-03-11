import { db } from "@/lib/db"
import { ConcursoType, CreateConcursoType, CreateTarefaType, SaveObjectType } from "@/types";
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
                        fileId: form.files[i].toString()
                    }
                })
            }
        }

        return "success";

    }catch(error){
        return "failed";
    }
}

export async function createTarefa(form: ConcursoType ){
    try{
        
        const auth = await getLoggedUser()

        if(!auth) return "unathenticade";

        // criar o concurso
        const promise = await db.tarefa.create({
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
                const registFile = await db.tarefaFile.create({
                    data: {
                        tarefa: {
                            connect: {
                                id: promise.id
                            }
                        },
                        fileId: form.files[i].toString()
                    }
                })
            }
        }

        return "success";

    }catch(error){
        return "failed";
    }
}

export async function createPropostaConcurso(form: CreateConcursoType){
    try{

        const auth = await getLoggedUser()

        if(!auth) return "unathenticade";

        const promise = await db.propostaConcurso.create({
            data: {
                user: {
                    connect: {
                        id: auth.id
                    }
                },
                concurso: {
                    connect: {
                        id: form.concurso
                    }
                },
                orcamento: form.orcamento,
                tempo: form.tempo,
                periodo: form.periodo,
                descricao: form.descricao
            }
        });

        if(!promise) return "failed";

        return "success";

    }catch(error){
        return "failed";
    }
}

export async function createPropostaTarefa(form: CreateTarefaType){
    try{

        const auth = await getLoggedUser()

        if(!auth) return "unathenticade";

        const promise = await db.propostaTarefa.create({
            data: {
                user: {
                    connect: {
                        id: auth.id
                    }
                },
                tarefa: {
                    connect: {
                        id: form.tarefa
                    }
                },
                orcamento: form.orcamento,
                tempo: form.tempo,
                periodo: form.periodo,
                descricao: form.descricao
            }
        });

        if(!promise) return "failed";

        return "success";

    }catch(error){
        return "failed";
    }
}

export async function saveConcurso(form: SaveObjectType){
    try{

        const auth = await getLoggedUser()
        if(!auth) return "unathenticade";

        const promise = await db.saved.create({
            data: {
                user: {
                    connect: {
                        id: auth.id
                    }
                },
                type: form.type,
                objectId: form.id
            }
        });

        if(!promise) return "failed";

        return "success";

    }catch(error){
        return "failed";
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