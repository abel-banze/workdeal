import Link from "next/link"
import { FaArrowRightLong } from "react-icons/fa6";
import { HumanTime } from "@/components"
import Image from "next/image"

export default function ConcursoCard({ type, data} : { type: string; data: any }){
    return (
        <>
            <div className="w-full rounded-lg p-5 bg-slate-100 shadow-lg dark:bg-zinc-900 flex flex-col gap-2">
                <h1 className="text-lg font-semibold"> { data.title } </h1>
                <div className="w-full flex flex-row items-center justify-between">
                    { type === 'concursos' && (
                        <div className="flex flex-row gap-2 items-center justify-center">
                            <div className="w-5 h-5 rounded-full bg-white dark:bg-zinc-800">
                                <Image   
                                    src={data.user.avatarUrl} 
                                    alt="avatar"
                                    className="w-full h-full object-cover rounded-full"
                                />
                            </div>

                            <small className="text-xs text-slate-500"> { data.user.firstName + ' ' + data.user.lastName} </small>
                        </div>
                    ) } 
                    <span className="text-xs text-slate-500">Publicado { HumanTime(data.createAt)}</span>
                </div>
                <p>
                    { data.descricao.slice(0,230) + "..." }
                </p>

                <Link 
                    href={`/${type}/${data.id}`}
                    className="rounded-lg p-2 bg-teal-600 text-white text-center flex flex-row items-center justify-center gap-2"
                >
                    Mais detalhes

                    <FaArrowRightLong />
                </Link>
            </div>
        </>
    )
}