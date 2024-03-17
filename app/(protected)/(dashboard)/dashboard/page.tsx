import { Metadata } from "next";
import { auth } from "@/auth";


export const metadata: Metadata = {
    title: "Workdeal | Dashboard",
    description: "Work and make deal.",
};

export default async function Dashboard(){
    const session = await auth()

    return (
        <>
            { 
            
            }
        </>
    )
}