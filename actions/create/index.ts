import { db } from "@/lib/db"
import { ConcursoType, CreateConcursoType, CreateTarefaType, SaveObjectType } from "@/types";
import { getLoggedUser } from "@/actions/get"


export async function createConcurso(form: ConcursoType){
    try{
        
        // criar o concurso
        const promise = await db.concurso.create({
            data: {
                author: {
                    connect: {
                        id: form.organizacao
                    }
                },
                title: form.title,
                descricao: form.descricao,
                prazo: form.prazo,
                precoMin: form.precoMin,
                precoMax: form.precoMax,
                localizacao: form.localizacao,
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

export async function createOrganizacao(form: any) {
    try {
        const auth = await getLoggedUser();
        if (!auth) return "unathenticade"

        // criar organizacao
        const createdOrganizacao = await db.organizacao.create({
            data: {
                user: {
                    connect: {
                        id: auth.id
                    }
                },
                sector: {
                    connect: {
                        id: form.sector
                    }
                },
                name: form.name,
                email: form.email,
                slogan: form.slogan,
                descricao: form.descricao,
                nuit: form.nuit,
                logo: form.logo,
                contactos: form.contactos
            }
        });


        if (!createdOrganizacao) return "failed";

        return createdOrganizacao;

    } catch (err) {
        console.error("Error creating organization:", err);
        return "failed";
    }
}

export async function createColaborador(form: any){
    try{

        const auth = await getLoggedUser();
        if (!auth) return "unathenticade"

        const cargo = form.cargo ? form.cargo : 'editor';

        const addColaborador = await db.colaborador.create({
            data: {
                user: {
                    connect: {
                        id: auth.id
                    }
                },
                organizacao: {
                    connect: {
                        id: form.organizacao
                    }
                },
                cargo: cargo,
                descricao: form.descricao
            }
        })

    }catch(err){
        return "failed";
    }
}

export async function registerFacebookAccount(){
    try{

        const auth = await getLoggedUser();
        if (!auth) return "unathenticade";

        const checkToken = await db.account.findFirst({
            where: {
                userId: auth.id
            }
        });

        if(!checkToken) return "failed";

        if(checkToken.provider === 'facebook'){
            const createConnection = await db.connect.create({
                data: {
                    user: {
                        connect: {
                            id: auth.id
                        }
                    },
                    media: checkToken.provider,
                    token: checkToken.access_token
                }
            })

            if(!createConnection) return "failed";

            return "success";
        }

        return "failed";

    }catch(err){
        return "failed"
    }
}
