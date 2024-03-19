import { NextResponse } from "next/server"
import { getMyOrganizations } from "@/actions/get"

export async function POST(){
    const data = await getMyOrganizations();

    return NextResponse.json(data);
}