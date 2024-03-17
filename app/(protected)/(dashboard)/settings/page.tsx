import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
    title: "Workdeal | Definições",
    description: "Work and make deal.",
};

export default function Settings(){
    return (
        <>
            <div className="w-full flex flex-col gap-5 p-5">
                <div className="flex flex-col gap-2">
                    <label htmlFor="">Associar minha conta do Facebook</label>
                    <Link href="/connect" className="p-2 rounded-lg px-5 bg-blue-500 text-white flex flex-row items-center justify-center gap-3">
                        Associar
                    </Link>
                </div>
            </div>
        </>
    )
}