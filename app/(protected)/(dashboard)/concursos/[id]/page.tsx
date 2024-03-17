import { ButtonProposta } from "@/components"
import { getConcursoById } from "@/actions/get"
import { HumanTime } from "@/components"
import Image from "next/image"

export default async function ConcursoDetails( { params } : { params: { id: string } } ){
    const getData = await getConcursoById(params.id)
    const descricao = ( getData != 'failed' &&  getData?.descricao) ? { __html: getData.descricao } : { __html: 'Sem descrição...' };

    return (
        <>
            { getData != 'failed' && (
                <div className="p-5 w-full flex flex-col gap-5">
                    <div className="w-full flex flex-row gap-3">
                        <div className="w-24 h-24 rounded-lg bg-white dark:bg-zinc-900 gap-2">
                            { getData?.author.logo && (
                                <Image 
                                    alt="avatar"
                                    src={getData.author.logo}
                                    width={500}
                                    height={500}
                                    className="object-cover w-full h-full rounded-lg"
                                />
                            ) }
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <h1 className="text-xl font-semibold"> { getData?.title } </h1>
                            <div className="flex flex-row items-center justify-between w-1/2 lg:w-4/12">
                                <small className="text-xs text-slate-500"> Autor: { getData?.author.name} </small>
                                <small className="text-xs text-slate-500">{ getData?.propostas.length } propostas feitas</small>                            
                            </div>
                            <span className="text-sm text-slate-700 dark:text-slate-300">
                                Publicado { HumanTime(getData?.createAt) }    |   { HumanTime(getData?.prazo) }
                            </span>
                        </div>
                    </div>

                    <ButtonProposta type="concurso" id={ getData?.id } />

                    <div className="mt-10 flex flex-col gap-3 w-full">
                        <h1 className="text-lg font-semibold uppercase">Descrição do concurso</h1>

                        { getData &&  getData.descricao && (
                            <p 
                                className="text-slate-700 dark:text-gray-300" 
                                dangerouslySetInnerHTML={descricao as { __html: string }}
                            >
                            </p>
                        ) }
                        
                    </div>
                </div>
            ) }
        </>
    )
}