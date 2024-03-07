import Link from "next/link"
import { FaArrowRightLong } from "react-icons/fa6";


export default function ConcursoCard({ type, data} : { type: string; data: any }){
    return (
        <>
            <div className="w-full rounded-lg p-5 bg-slate-100 shadow-lg dark:bg-zinc-900 flex flex-col gap-2">
                <h1 className="text-lg font-semibold">Aqui vem o titulo do concurso</h1>
                <div className="w-full flex flex-row items-center justify-between">
                    { type === 'concursos' && (
                        <div className="flex flex-row gap-2 items-center justify-center">
                            <div className="w-5 h-5 rounded-full bg-white dark:bg-zinc-800">

                            </div>

                            <small className="text-xs text-slate-500">Nome da empresa</small>
                        </div>
                    ) } 
                    <span className="text-xs text-slate-500">PUblicado há 32min</span>
                </div>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo debitis, alias deserunt consequuntur quis temporibus corrupti inventore, minima necessitatibus magnam omnis libero blanditiis unde! Officiis porro tempora libero soluta sequi!
                </p>

                <Link 
                    href={`/${type}/id`}
                    className="rounded-lg p-2 bg-teal-600 text-white text-center flex flex-row items-center justify-center gap-2"
                >
                    Mais detalhes

                    <FaArrowRightLong />
                </Link>
            </div>
        </>
    )
}