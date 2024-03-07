import { ButtonProposta } from "@/components"

export default function TarefaDetails(){
    return (
        <>
            <div className="p-5 w-full flex flex-col gap-5">
                <div className="w-full flex flex-row gap-3">
                    <div className="w-24 h-24 rounded-lg bg-white dark:bg-zinc-900 gap-2">

                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <h1 className="text-xl font-semibold">Aqui vem o titulo do concurso</h1>
                        <div className="flex flex-row items-center justify-between w-1/2 lg:w-4/12">
                            <small className="text-xs text-slate-500">Nome da empresa</small>
                            <small className="text-xs text-slate-500">12 propostas feitas</small>                            
                        </div>
                        <span className="text-sm text-slate-700 dark:text-slate-300">
                            Publicado há 9 dias    |   Expira em 15 dias
                        </span>
                    </div>
                </div>

                <ButtonProposta type="tarefa" />

                <div className="mt-10 flex flex-col gap-3 w-full">
                    <h1 className="text-lg font-semibold uppercase">Descrição da tarefa</h1>
                    <p className="text-slate-700 dark:text-gray-300">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, maxime! Quos tenetur illo alias ad. Porro alias similique magni exercitationem, recusandae tempora, provident totam vero eius dolorem nemo pariatur doloremque!
                    </p>
                </div>
            </div>
        </>
    )
}