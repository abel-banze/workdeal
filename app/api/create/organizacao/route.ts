import { NextRequest, NextResponse } from "next/server";
import { createOrganizacao } from "@/actions/create"

export async function POST(request: NextRequest){
    const body = await request.formData();

    const { name, email, descricao, nuit, contactos, endereco, slogan, logo, sector } = Object.fromEntries(body)

    const data = {
        name,
        email,
        descricao,
        nuit,
        contactos,
        endereco,
        slogan,
        logo,
        sector
    }

    const submit = await createOrganizacao(data);

    if(submit === 'failed' || submit === 'unathenticade')  return NextResponse.json({url: '/organizacoes/create'});

    return NextResponse.json({url: `/organizacoes/${submit.id}`})
}