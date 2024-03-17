import { NextResponse } from "next/server";
import { getCategories } from "@/actions/get";

export async function GET(){
    const data = await getCategories();

    return NextResponse.json(data);
}