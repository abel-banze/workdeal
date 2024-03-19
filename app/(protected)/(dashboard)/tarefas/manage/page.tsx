import { getMyTarefas } from "@/actions/get";
import Link from "next/link";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import { TbBriefcaseOff } from "react-icons/tb";
import { HumanTime } from "@/components"

export default async function ManageTarefa(){
    const getData = await getMyTarefas();

    return (
        <>
            <div className="w-full flex flex-col gap-5 p-5">
                <h1 className="text-xl font-semibold">Tarefas publicadas por mim</h1>

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
                                    href={`/tarefas/manage/${item.id}`}
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

                { getData != 'failed' && getData != 'unathenticade' && getData.length === 0 && (
                    <div className="w-full flex flex-col gap-5 items-center justify-center">
                        <div className="w-full lg:w-1/2 rounded-lg bg-white shadow-lg dark:bg-zinc-800 p-2 flex flex-col gap-3 items-center justify-center">
                            <TbBriefcaseOff className="text-slate-500" size={60} />
                            <span className="text-lg font-light">
                                Não tens nenhuma tarefa publicada.
                            </span>

                            <Link href="/tarefas/create" className="p-2 rounded-lg px-5 bg-teal-600 text-white text-sm">
                                Criar tarefa
                            </Link>
                        </div>
                    </div>
                ) }
            </div>
        </>
    )
}