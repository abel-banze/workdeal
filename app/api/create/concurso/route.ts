import { NextRequest, NextResponse } from "next/server";
import { createConcurso } from "@/actions/create";
import { uploadFile } from "@/actions/appwrite";


export async function POST(request: any){
    const body = await request.formData()

    const title = body.get('title') as string;
    const descricao = body.get('descricao') as string;
    const prazoEntry = body.get('prazo') as string;
    const prazo = new Date(prazoEntry);
    const precoMin = body.get('precoMin') as string;
    const precoMax = body.get('precoMax') as string;
    const sector = body.get('sector') as string;
    const files = body.getAll('ficheiros');

    const data = {
        user: '',
        title,
        descricao,
        prazo,
        precoMin,
        precoMax,
        sector,
        files
    }

    const submit = await createConcurso(data);

    if(!submit) return NextResponse.json({status: 'failed'});

    return NextResponse.json({status: submit});

}