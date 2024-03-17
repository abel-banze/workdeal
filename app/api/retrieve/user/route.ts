import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db"

export async function POST(request: NextRequest){
    const body = await request.formData();

    const { name, surname } = Object.fromEntries(body);

    const firstName = name.toString().trim();
    const lastName  = surname ? surname.toString().trim() : '';

    const users = await db.user.findMany({
        where: {
            OR: [
                { firstName: { contains: firstName, mode: 'insensitive' } },
                { lastName: { contains: lastName, mode: 'insensitive' } },
                { firstName: { startsWith: firstName, mode: 'insensitive' } },
                { lastName: { startsWith: lastName, mode: 'insensitive' } }
            ]
        }
    });

    return NextResponse.json(users);
}



