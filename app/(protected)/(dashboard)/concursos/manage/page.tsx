import { getMyConcursos } from "@/actions/get";
import Link from "next/link";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import { HumanTime } from "@/components"

export default async function ManageConcurso(){
    const getData = await getMyConcursos();

    return (
        <>
            <div className="w-full flex flex-col gap-5 p-5">
                <h1 className="text-xl font-semibold">Meus concursos</h1>

                <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-2">
                    { getData != 'unathenticade' && getData != 'failed' && getData.map((item: any, index: any)=>(
                        <div className="p-2 px-5 rounded-lg bg-white dark:bg-zinc-800 flex flex-col gap-2" key={index}>
                            <h1 className="text-lg font-semibold"> { item.title } </h1>
                            <div className="w-full flex flex-row items-center justify-between">
                                <span className="text-xs text-gray-500">
                                    { item.propostas.length } propostas
                                </span>
                                <span className="text-xs text-gray-500">
                                    { HumanTime(item.prazo) }
                                </span>
                            </div>
                            <div className="w-full mt-5 flex flex-row items-center justify-between">
                                <Link
                                    href={`/concursos/manage/${item.id}`}
                                    className="p-2 text-sm px-4 text-white bg-teal-600 rounded-lg"
                                >
                                    Gerir propostas
                                </Link>

                                <div className="flex flex-row gap-3 items-center justify-center">
                                    <button
                                        type="button"
                                    >
                                        <HiOutlinePencilSquare size={22} />
                                    </button>

                                    <button
                                        type="button"
                                    >
                                        <HiOutlineTrash size={22} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )) }
                </div>
            </div>
        </>
    )
}