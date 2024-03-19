import { NextRequest, NextResponse } from "next/server";
import { createDocument } from "@/actions/create";

export async function POST(request: NextRequest){
    const body = await request.formData();

    const { descricao, tipo, fileId, empresa, departamento } = Object.fromEntries(body);

    const data = {
        tipo: tipo.toString(),
        file: fileId.toString(),
        descricao: descricao.toString(),
        empresa: empresa.toString(),
        departamento: departamento.toString()
    }

    const response = await createDocument(data);

    if(typeof response != 'string' && response ) return NextResponse.json(response);
    
    return NextResponse.json("failed")
}