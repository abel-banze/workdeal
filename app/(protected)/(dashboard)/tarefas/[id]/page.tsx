import { ButtonProposta } from "@/components";
import { getTarefaById } from "@/actions/get";
import { HumanTime } from "@/components";
import { redirect } from "next/navigation";

export default async function TarefaDetails({ params } : {
    params: {
        id: string;
    }
}){

    const getData = await getTarefaById(params.id)

    if(getData === 'failed') redirect('/tarefas');

    return (
        <>
            <div className="p-5 w-full flex flex-col gap-5">
                <div className="w-full flex flex-row gap-3">
                    <div className="w-24 h-24 rounded-lg bg-white dark:bg-zinc-900 gap-2">

                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <h1 className="text-xl font-semibold"> { getData?.title } </h1>
                        <div className="flex flex-row items-center justify-between w-1/2 lg:w-4/12">
                            <small className="text-xs text-slate-500"> Autor: { getData?.user.firstName + ' ' + getData?.user.lastName } </small>
                            <small className="text-xs text-slate-500"> { getData?.propostas.length } propostas feitas</small>                            
                        </div>
                        <span className="text-sm text-slate-700 dark:text-slate-300">
                            Publicado { HumanTime(getData?.createAt) }    |   { HumanTime(getData?.prazo) }
                        </span>
                    </div>
                </div>

                <ButtonProposta type="tarefa" id={getData?.id} />

                <div className="mt-10 flex flex-col gap-3 w-full">
                    <h1 className="text-lg font-semibold uppercase">Descrição da tarefa</h1>
                    <p className="text-slate-700 dark:text-gray-300">
                        { getData?.descricao }
                    </p>
                </div>
            </div>
        </>
    )
}