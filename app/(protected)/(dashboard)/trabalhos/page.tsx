import { getMyPropostas } from "@/actions/get";

export default async function Trabalhos(){
    const getData = await getMyPropostas()

    return (
        <>
            <div className="w-full flex flex-col p-5 gap-5">
                <h1 className="text-xl font-semibold">Minhas propostas </h1>
                {(getData !== 'unathenticade' && getData !=='failed') ? (
                    getData.length > 0 ? (
                        getData.map((item: any, index: any) => (
                            <div className="w-full flex flex-col gap-5 p-5" key={index}>
                                <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-3">
                                    <div className="w-full p-3 rounded-lg bg-white dark:bg-zinc-800 flex flex-col gap-3">
                                        <h1 className="text-lg font-semibold"> { item.title } </h1>
                                        <div className="flex flex-row items-center justify-between">
                                            <div className="flex flex-row items-center justify-center gap-2">
                                                <div className="w-5 h-5 rounded-full bg-zinc-900">

                                                </div>
                                                <small className="text-xs text-slate-700 dark:text-gray-400"> { item.user.firstName + ' ' + item.user.lastName } </small>
                                            </div>

                                            <span className="text-xs rounded-lg p-1 px-5 bg-slate-300 bg-zinc-700 dark:text-gray-400">
                                                { item.propostas.status !== 'aceite' ? 'Em análise' : 'Proposta rejeitada' }
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : 'Nenhuma prosposta encontrada.'
                ) : 'Não possivel carregar as propostas.'}
            </div>
        </>
    )
}