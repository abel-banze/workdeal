import { NextRequest, NextResponse } from "next/server";
import { saveConcurso } from "@/actions/create";

export async function POST(request: NextRequest){
    const body = await request.formData();

    const type = body.get('type') as string;
    const id = body.get('id') as string;

    const data = {
        type,
        id
    };

    const submit = await saveConcurso(data);

    if(!submit) return NextResponse.json({status: 'failed'});

    return NextResponse.json({status: submit});
}