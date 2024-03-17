export type CreateUserType = {
    email: string;
    firstName: string;
    lastName: string;
    hashPass: string;
}

export type ConcursoType = {
    user: string;
    organizacao: string;
    localizacao: string;
    title: string;
    descricao: string;
    sector: string;
    precoMin: string;
    precoMax: string;
    prazo: Date | null;
    files: string[] | null;
}

export type TarefaType = {
    user: string;
    title: string;
    descricao: string;
    sector: string;
    precoMin: string;
    precoMax: string;
    prazo: Date;
}

export type ConcursoFile = {
    url: string;
    concurso: string;
}

export type TarefaFile = {
    url: string;
    tarefa: string;
}

export type PropostaConcurso = {
    user: string;
    concurso: string;
    orcamento: string;
    tempo: string;
    periodo: string;
    descricao: string;
}

export type PropostaTarefa = {
    user: string;
    tarefa: string;
    orcamento: string;
    tempo: string;
    periodo: string;
    descricao: string;
}


export type SaveConcurso = {
    user: string;
    tipo: string;
    objectId: string;
}

export type CreateConcursoType = {
    concurso: string;
    orcamento: string;
    tempo: string;
    periodo: string;
    descricao: string;
}

export type CreateTarefaType = {
    tarefa: string;
    orcamento: string;
    tempo: string;
    periodo: string;
    descricao: string;
}

export type SaveObjectType = {
    id: string;
    type: string;
}