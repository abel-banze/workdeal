import { Metadata } from "next"
import Link from "next/link"
import { BsFileEarmarkPdf } from "react-icons/bs";
import { PiDotsThreeCircle } from "react-icons/pi";

export const metadata: Metadata = {
    title: "Workdeal | Documentos",
    description: "Work and make deal.",
};

export default function Files(){
    return (
        <>
            <div className="w-full flex flex-col gap-5 p-5">
                <div className="w-full flex flex-row items-center justify-between">
                    <h1 className="text-xl font-bold">Documentos</h1>
                    <Link href="/files/create" className="p-2 rounded-lg bg-teal-600 text-white px-5 text-sm">Carregar documento</Link>
                </div>

                <div className="w-full p-2 overflow-x-scroll flex flex-row gap-3">
                    <span className="p-2 text-sm px-5 bg-white dark:bg-zinc-800 rounded-lg ">Todos</span>
                </div>

                <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="w-full flex flex-row gap-2 items-center bg-white shadow-lg dark:bg-zinc-800 rounded-lg p-2">
                        <BsFileEarmarkPdf size={40} />
                        <div className="w-full flex flex-col gap-2 text-sm">
                            <span>Nome do documento</span>
                            <div className="w-full flex flex-row items-center justify-between">
                                <small className="text-xs text-slate-500">12-03-2024</small>
                                <button
                                    type="button"
                                >
                                    <PiDotsThreeCircle size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}