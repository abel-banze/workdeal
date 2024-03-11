import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from 'next/cache'
import { db } from "@/lib/db"


export async function POST(request: NextRequest){
    const body = await request.formData();

    const id = body.get('id') as string;
    const concurso = body.get('itemId') as string;

    const promise = await db.propostaConcurso.updateMany({
        where: {
            concursoId: concurso
        },
        data: {
            status: 'pending'
        }
    });

    if(!promise) return NextResponse.json({status: 'failed'});

    const update = await db.propostaConcurso.update({
        where: {
            id: id
        },

        data: {
            status: 'aceite'
        }
    })

    if(!update) return NextResponse.json({status: 'failed'});

    revalidatePath('/(protected)/(dashboard)/concursos/manage/[id]', 'page')

    return NextResponse.json({status: 'success'});

}