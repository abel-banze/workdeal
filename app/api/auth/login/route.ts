import { NextRequest, NextResponse } from "next/server";
import { login } from "@/actions/auth";


export async function POST(request: NextRequest){
    const body = await request.formData();

    const email = body.get('email') as string;
    const password = body.get('password') as string;

    const send = await login(email, password);

    if(send === 'Algo correu mal.' || send === 'As suas credenciais estão incorrectas.') return NextResponse.json({ status: 500, data: send });

    return NextResponse.json({status: 'Redicionando...'})
    
}