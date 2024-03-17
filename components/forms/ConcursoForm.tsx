'use client'

import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { uploadFile } from "@/actions/appwrite";
import axios from "axios";


type ConcursoType = {
    user: string;
    title: string;
    descricao: string;
    sector: string;
    precoMin: string;
    precoMax: string;
    prazo: string;
    localizacao: string;
    files: FileList | null;
}

const INITIAL_STATE = {
    user: '',
    title: '',
    descricao: '',
    prazo: '',
    localizacao: '',
    precoMin: '',
    precoMax: '',
    files: null,
    sector: ''
}

export default function ConcursoForm({type, cats, orgId } : { type: string; cats: any; orgId: string}){
    const [data, setData] = useState<ConcursoType>(INITIAL_STATE)
    const [loading, setLoading] = useState(false)


    const submit = async () => {
        setLoading(true);
      
        const form = new FormData();
      
        form.append('title', data.title);
        form.append('user', data.user);
        form.append('descricao', data.descricao);
        form.append('prazo', data.prazo);
        form.append('precoMin', data.precoMin);
        form.append('precoMax', data.precoMax);
        form.append('sector', data.sector);
        form.append('organizacao', orgId);
        form.append('localizacao', data.localizacao)
      
        if (data.files) {
          for (const file of Object.values(data.files)) {
            const ficheiros = await uploadFile(file);
            if (ficheiros) {
              form.append('ficheiros', ficheiros.$id);
            }
          }
        }
            
        axios.post(`/api/create/${type}`, form)
          .then((res) => {
            setLoading(false);
            const responseData = res.data;
            console.log(responseData);
          })
          .catch((err) => {
            setLoading(false);
            console.error(err);
          });
      };
      

    return (
        <>
            <form className="w-full lg:w-9/12 flex flex-row flex-wrap">
                <div className="flex flex-col gap-2 p-2 w-full lg:w-7/12">
                    <label htmlFor="title" className="text-xs text-slate-5000">Título do concurso</label>
                    <input 
                        type="text"
                        id="title"
                        onChange={(e) => setData({...data, title: e.target.value})}
                        placeholder="Título"
                        className="p-2 px-5 rounded-lg w-full bg-white dark:bg-zinc-800 focus:outline-none" 
                    />
                </div>
                    
                <div className="flex flex-col gap-2 p-2 w-full lg:w-5/12">
                    <label htmlFor="title" className="text-xs text-slate-5000">Seleciona a categoria</label>
                    <select onChange={(e) => setData({...data, sector: e.target.value})} id="" className="p-2 px-5 rounded-lg w-full bg-white dark:bg-zinc-800 focus:outline-none">
                        { cats != 'failed' && cats.map((cat: any, index: any) => (
                            <option value={cat.id} key={index}> {cat.name} </option>
                        )) }
                    </select>
                </div>

                <div className="w-full grid grid-cols-3">
                    <div className="flex flex-col gap-2 p-2 w-full">
                        <label htmlFor="prazo" className="text-xs text-slate-5000">Até quando { type === 'concurso' ? 'este concurso' : 'esta tarefa' } deverá ficar?</label>
                        <input 
                            type="date"
                            id="prazo"
                            onChange={(e) => setData({...data, prazo: e.target.value})}
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
                                onChange={(e) => setData({...data, precoMin: e.target.value})}
                                placeholder="Valor mínimo"
                                min={100}
                                className="p-2 px-5 rounded-lg w-full bg-transparent focus:outline-none" 
                            />
                        </div>
                        </div>
                    <div className="flex flex-col gap-2 p-2 w-full">
                        <label htmlFor="max" className="text-xs text-slate-5000">Valor máximo</label>
                        <div className="flex flex-row rounded-lg w-full bg-white dark:bg-zinc-800">
                            <span className="text-slate-500 flex items-center justify-center p-2">MT</span>
                            <input 
                                type="number"
                                id="max"
                                onChange={(e) => setData({...data, precoMax: e.target.value})}
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
                        onChange={(e) => setData({...data, descricao: e.target.value})}
                        className="rounded-lg bg-white dark:bg-zinc-800 focus:outline-none h-60 w-full p-2"
                        placeholder="Escreva a descrição do seu concurso..."
                    >
                    </textarea>
                </div>

                <div className="w-full grid grid-cols-1 lg:grid-cols-2">
                    <div className="w-full flex flex-col gap-2 p-2">
                        <label htmlFor="location" className="text-xs">Onde este trabalho deverá ser realizado?</label>
                        <input 
                            type="text"
                            onChange={(e) => setData({...data, localizacao: e.target.value})} 
                            placeholder="Indique a província ou cidade..."
                            className="p-2 px-5 rounded-lg w-full bg-white dark:bg-zinc-800 focus:outline-none" 
                        />
                    </div>

                    <div className="w-full flex flex-col gap-2 p-2">
                        <label htmlFor="min" className="text-xs">Adicione ficheiros que estão relacionados a esse concurso.</label>
                        <input 
                            type="file"
                            multiple={true}
                            onChange={(e) => setData({...data, files: e.target.files})}
                            name="files"
                            title="Clique para carregar os ficheiros"
                            className="w-full h-full cursor-pointer" 
                        />
                    </div>
                </div>

                

                <div className="w-full flex flex-col mt-3 p-2">
                <button
                    type="button"
                    onClick={submit}
                    className="w-full p-2 bg-teal-600 text-white rounded-lg flex flex-row items-center justify-center"
                >
                    { loading ? <ReloadIcon className="mr-2 h-5 w-5 animate-spin" /> : 'Criar concurso' }
                </button> 
                </div>
            </form>
        </>
    )
}