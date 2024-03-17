import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest){
    const body = await request.formData();

    const { name, id } = Object.fromEntries(body);

    const submit = await db.departamento.create({
        data: {
            organizacao: {
                connect: {
                    id: id.toString()
                }
            },
            name: name.toString()
        }
    });

    if(!submit) return NextResponse.json("failed")

    return NextResponse.json("success")
}