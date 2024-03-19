import Link from "next/link";
import Image from "next/image"
import { getSavedConcursos } from "@/actions/get";

export default async function SavedConcursos(){
    const getData = await getSavedConcursos()

    return (
        <>
            <div className="w-full flex flex-col gap-5 p-5">
                <h1 className="text-xl font-bold">Concursos guardados</h1>

                <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-2">
                    <div className="w-full  px-5 rounded-lg p-2 bg-white shadow-lg dark:bg-zinc-800 flex flex-col gap-2">
                        <h1 className="text-lg font-semibold">Titulo do concurso...</h1>
                        <div className="w-full flex flex-row items-center justify-between">
                            <div className="flex flex-row gap-2 items-center">
                                <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-zinc-900">
                                    <Image 
                                        alt="company-logo"
                                        src={``}
                                        width={500}
                                        height={500}
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                </div>
                                <span className="text-xs text-slate-500">Nome da empresa</span>
                            </div>
                            <span className="text-xs text-slate-500">Expira em 5 dias</span>
                        </div>

                        <div className="w-full flex flex-row items-center justify-between">
                            <Link href="/concursos/id" className="p-2 text-sm px-5 rounded-lg bg-teal-600 text-white">
                                Ver detalhes...
                            </Link>

                            <button
                                type="button"
                                className="text-sm p-2 px-5 bg-slate-200 dark:bg-zinc-800 rounded-lg"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}