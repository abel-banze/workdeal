import { ButtonSubmit } from "@/components"

export default function CreateTarefa(){
    return (
        <>
            <div className="w-full flex flex-col gap-5 p-5">
                <h1 className="w-full text-xl font-bold">Criar tarefa</h1>

                <form className="w-full lg:w-9/12 flex flex-row flex-wrap">
                    <div className="flex flex-col gap-2 p-2 w-full lg:w-1/2">
                        <label htmlFor="title" className="text-xs text-slate-5000">Título da tarefa</label>
                        <input 
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Título"
                            className="p-2 px-5 rounded-lg w-full bg-white dark:bg-zinc-800 focus:outline-none" 
                        />
                    </div>
                    <div className="flex flex-col gap-2 p-2 w-full lg:w-1/2">
                        <label htmlFor="prazo" className="text-xs text-slate-5000">Até quando esta tarefa deverá ficar?</label>
                        <input 
                            type="date"
                            id="prazo"
                            name="prazo"
                            placeholder="Prazo do tarefa"
                            className="p-2 px-5 rounded-lg w-1/2 bg-white dark:bg-zinc-800 focus:outline-none" 
                        />
                    </div>
                    
                    <div className="w-full grid grid-cols-2">
                        <div className="flex flex-col gap-2 p-2 w-full">
                            <label htmlFor="min" className="text-xs text-slate-5000">Valor mínimo</label>
                            <div className="flex flex-row rounded-lg w-full bg-white dark:bg-zinc-800">
                                <span className="text-slate-500 flex items-center justify-center p-2">MT</span>
                                <input 
                                    type="number"
                                    id="min"
                                    name="precoMin"
                                    placeholder="Valor mínimo"
                                    min={100}
                                    className="p-2 px-5 rounded-lg w-full bg-transparent focus:outline-none" 
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 p-2 w-full">
                            <label htmlFor="min" className="text-xs text-slate-5000">Valor máximo</label>
                            <div className="flex flex-row rounded-lg w-full bg-white dark:bg-zinc-800">
                                <span className="text-slate-500 flex items-center justify-center p-2">MT</span>
                                <input 
                                    type="number"
                                    id="min"
                                    name="precoMax"
                                    placeholder="Valor máximo"
                                    min={100}
                                    className="p-2 px-5 rounded-lg w-full bg-transparent focus:outline-none" 
                                />
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex p-2">
                        <textarea 
                            name="descricao" 
                            id="" 
                            className="rounded-lg bg-white dark:bg-zinc-800 focus:outline-none h-60 w-full p-2"
                            placeholder="Escreva a descrição do seu tarefa..."
                        >
                        </textarea>
                    </div>

                    <div className="w-full flex flex-col gap-2 p-2">
                        <label htmlFor="min" className="text-xs text-slate-5000">Adicione ficheiros que estão relacionados a essa tarefa.</label>
                        <div className="relative w-full rounded-lg">
                            <div className="absolute flex w-full h-full inset-0 p-2 py-5 items-center text-slate-500 cursor-pointer justify-center rounded-lg bg-white dark:bg-zinc-800">
                                Clique para adicionar os ficheiros
                            </div>
                            <input 
                                type="file"
                                multiple={true}
                                title="Clique para carregar os ficheiros"
                                className="absolute inset-0 opacity-0 p-2 py-5 w-full h-full" 
                            />
                        </div>
                    </div>

                    <div className="w-full flex flex-col mt-10 p-2">
                        <ButtonSubmit text="Criar tarefa" />
                    </div>
                </form>
            </div>
        </>
    )
}