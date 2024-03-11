import { NextResponse, NextRequest } from "next/server";
import { createPropostaTarefa } from "@/actions/create"


export async function POST(request: NextRequest){
    const body = await request.formData();

    const tarefa = body.get('id') as string;
    const orcamento = body.get('orcamento') as string;
    const tempo = body.get('tempo') as string;
    const periodo = body.get('periodo') as string;
    const descricao = body.get('descricao') as string;

    const data = {
        tarefa,
        orcamento,
        tempo,
        periodo,
        descricao
    };

    const submit = await createPropostaTarefa(data);

    if(!submit) return NextResponse.json({status: 'failed'});

    return NextResponse.json({status: submit})

}