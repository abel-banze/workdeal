import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest){
    const body = await request.formData()


    return NextResponse.json("success");
}