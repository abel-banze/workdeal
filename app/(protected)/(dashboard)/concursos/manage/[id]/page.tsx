import { getConcursoById } from "@/actions/get"
import { AcceptProposta } from "@/components"


export default async function GerirPropostasConcurso({ params } : { params: { id: string } }){
    const getData = await getConcursoById(params.id)

    return (
        <>
            <div className="w-full flex flex-col gap-5 p-5">
                <h1>Propostas do concurso: <strong> { getData != 'failed' &&  getData.title } </strong> </h1>

                <div className="w-full flex flex-col gap-5">
                    <table className="w-full rounded-lg table-auto border-collapse border border-slate-300 dark:border-gray-700">
                        <thead className="text-left bg-slate-700 text-white dark:bg-zinc-800">
                            <tr className="px-5">
                                <th className="px-3">Proponente</th>
                                <th>Proposta</th>
                                <th>Tempo de execução</th>
                                <th>Status</th>
                                <th>Acções</th>
                            </tr>
                        </thead>
                        <tbody >
                            { (getData != 'failed' && getData.propostas.length > 0) ? (
                                getData.propostas.map((item: any, index: any)=> (
                                    <tr className="px-3 border-b border-slate-300 dark:border-gray-700">
                                        <td className="px-3">
                                            <div className="flex flex-row gap-x-2 items-center">
                                                <div className="h-5 w-5 rounded-full bg-zinc-800">

                                                </div>
                                                <div>
                                                    { item.user.firstName + ' ' + item.user.lastName }
                                                </div> 
                                            </div>
                                        </td>
                                        <td > { item.orcamento } Meticais</td>
                                        <td > { item.tempo + ' ' + item.periodo } </td>
                                        <td> { item.status != 'aceite' ?  'Em análise' : (
                                            <span className="text-xs p-2 px-3 bg-red-400 rounded-lg text-white">
                                                Proposta aceite
                                            </span>
                                        ) } </td>

                                        <td >
                                            <AcceptProposta type="concurso" itemId={params.id} data={item} />
                                        </td>
                                    </tr>
                                ))
                            ) : 'Este concurso ainda não tem propostas.' }
                        </tbody>
                    </table>
                    
                </div>
            </div>
        </>
    )
}