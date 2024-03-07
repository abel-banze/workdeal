import { ButtonSubmit } from "@/components";
import { createConcurso } from "@/actions/create";
import { uploadFile } from "@/actions/appwrite";
import { getCategories } from "@/actions/get";


export default async function CreateConcurso(){

    const cats = await getCategories();


    const submit = async (formData: FormData) =>{
        'use server'

        
        const { title, sector, prazo, precoMin, precoMax, descricao } = Object.fromEntries(formData)
        
        const ficheiros: string[] = [];

        const files = formData.get('files') as unknown as FileList;

        if(files.length > 0){
            for(let i=0; i < files.length; i++){
                const upload = await uploadFile(files[i])
                if(!upload) return;
    
                ficheiros.push(upload.$id);
            }
        }


        const data = {
            user: '',
            title: typeof title === 'string' ? title : '',
            sector: typeof sector === 'string' ? sector : '',
            prazo: typeof prazo === 'string' ? new Date(prazo) : null,
            precoMin: typeof precoMin === 'string' ? precoMin : '',
            precoMax: typeof precoMax === 'string' ? precoMax : '',
            descricao: typeof descricao === 'string' ? descricao : '',
            files: files.length > 0 ? files : null
        }

        await createConcurso(data)

    }

    return (
        <>
            <div className="w-full flex flex-col gap-5 p-5">
                <h1 className="w-full text-xl font-bold">Criar concurso</h1>

                <form action={submit} className="w-full lg:w-9/12 flex flex-row flex-wrap">
                    <div className="flex flex-col gap-2 p-2 w-full lg:w-7/12">
                        <label htmlFor="title" className="text-xs text-slate-5000">Título do concurso</label>
                        <input 
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Título"
                            className="p-2 px-5 rounded-lg w-full bg-white dark:bg-zinc-800 focus:outline-none" 
                        />
                    </div>
                    
                    <div className="flex flex-col gap-2 p-2 w-full lg:w-5/12">
                        <label htmlFor="title" className="text-xs text-slate-5000">Seleciona a categoria</label>
                        <select name="sector" id="" className="p-2 px-5 rounded-lg w-full bg-white dark:bg-zinc-800 focus:outline-none">
                            { cats != 'failed' && cats.map((cat: any, index: any) => (
                                <option value={cat.id}> {cat.name} </option>
                            )) }
                        </select>
                    </div>

                    <div className="w-full grid grid-cols-3">
                        <div className="flex flex-col gap-2 p-2 w-full">
                            <label htmlFor="prazo" className="text-xs text-slate-5000">Até quando este concurso deverá ficar?</label>
                            <input 
                                type="date"
                                id="prazo"
                                name="prazo"
                                placeholder="Prazo do concurso"
                                className="p-2 px-5 rounded-lg w-full bg-white dark:bg-zinc-800 focus:outline-none" 
                            />
                        </div>
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
                            placeholder="Escreva a descrição do seu concurso..."
                        >
                        </textarea>
                    </div>

                    <div className="w-full flex flex-col gap-2 p-2">
                        <label htmlFor="min" className="text-xs text-slate-5000">Adicione ficheiros que estão relacionados a esse concurso.</label>
                        <input 
                            type="file"
                            multiple={true}
                            name="files"
                            title="Clique para carregar os ficheiros"
                            className="p-2 py-5 w-full h-full cursor-pointer" 
                        />
                    </div>

                    <div className="w-full flex flex-col mt-3 p-2">
                        <ButtonSubmit text="Criar concurso" />
                    </div>
                </form>
            </div>
        </>
    )
}