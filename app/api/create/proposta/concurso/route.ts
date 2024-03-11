import { NextResponse, NextRequest } from "next/server";
import { createPropostaConcurso } from "@/actions/create"


export async function POST(request: NextRequest){
    const body = await request.formData();

    const concurso = body.get('id') as string;
    const orcamento = body.get('orcamento') as string;
    const tempo = body.get('tempo') as string;
    const periodo = body.get('periodo') as string;
    const descricao = body.get('descricao') as string;


    const data = {
        concurso,
        orcamento,
        tempo,
        periodo,
        descricao
    };

    const submit = await createPropostaConcurso(data);

    if(!submit) return NextResponse.json({status: 'failed'});

    return NextResponse.json({status: submit})

}