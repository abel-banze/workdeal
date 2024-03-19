'use client'

import { useState, useEffect } from "react";
import axios from "axios";
import { uploadFile, getFileView } from "@/actions/appwrite"; 
import { ReloadIcon } from "@radix-ui/react-icons";

type DOCUMENTS = {
    file: File | null;
    tipo: string;
    empresa: string;
    departamento: string;
    descricao: string;
}


const INITIAL_STATE = {
    file: null,
    tipo: '',
    empresa: '',
    departamento: '',
    descricao: ''
}

export default function CreateFile(){
    const [data, setData] = useState<DOCUMENTS>(INITIAL_STATE)
    const [loading, setLoading] = useState(false)
    const [empresas, setEmpresas] = useState<any[]>([])
    const [departamentos, setDepartamentos] = useState<any[]>([])

    useEffect(()=> {
        getCompanies()
    },[empresas])

    const getCompanies = async () => {
        await axios.post('/api/retrieve/organizations')
        .then( async (response) => {
            if(response.data != 'failed' && response.data != 'unathenticade') setEmpresas(response.data)

        })
    }

    const handleCompanyChange = (companyId: string) => {
        const selectedCompany: any = empresas.find(company => company.id === companyId);
        if (selectedCompany) {
            setDepartamentos(selectedCompany.departamentos);
        }

        if(companyId === '') setDepartamentos([])
    }

    const submit = async () => {
        setLoading(true)
        let doc = "";
        if(data.file){
            const upload = await uploadFile(data.file)
            if(!upload) return;
            doc = upload.$id;
        }

        const form = new FormData();
        form.append('empresa', data.empresa);
        form.append('departamento', data.departamento);
        form.append('descricao', data.descricao);
        form.append('tipo', data.tipo);
        form.append('fileId', doc);

        await axios.post('/api/create/document', form)
        .then((res) => {
            setLoading(false)
            console.log(res.data)
        }).catch((err) => {
            setLoading(false)
            console.log(err)
        })
    }


    return (
        <>
            <div className="w-full px-10 p-5 flex flex-col gap-5">
                <h1 className="text-xl font-bold">Adicionar documento</h1>

                <form className="w-full lg:w-7/12 flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="doc" className="text-xs">Selecione o documento</label>
                        <div className="relative p-2 flex flex-col items-center justify-center bg-white shadow dark:bg-zinc-800 rounded-lg">
                            <h1 className="text-zinc-500 font-bold text-lg">
                                { data.file ? data.file.name : 'Clique aqui para selecionar' }
                            </h1>
                            <input 
                                type="file"
                                onChange={(e) => setData({...data, file: e.target.files ? e.target.files[0] : null})}
                                className="absolute cursor-pointer w-full h-full inset-0 opacity-0" 
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex flex-row gap-2 cursor-pointer">
                            <input type="radio" onChange={(e) => setData({...data, tipo: e.target.value ? 'publico' : 'privado' })} name="tipo" id="public"  />
                            <label htmlFor="public" className="text-sm">Público</label>
                        </div>
                        <div className="flex flex-row gap-2 cursor-pointer">
                            <input type="radio" name="tipo" onChange={(e) => setData({...data, tipo: e.target.value ? 'privado' : 'publico' })} id="private" />
                            <label htmlFor="private" className="text-sm">Privado</label>
                        </div>
                    </div>
                    
                    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3">
                        <div className="w-full flex flex-col gap-2">
                            <label className="text-sm" htmlFor="company">Selecione a empresa que deseja associar:</label>
                            <select id="company" onChange={(e) => handleCompanyChange(e.target.value)} className="w-full p-2 rounded-lg bg-white shadow-lg dark:bg-zinc-800 ">
                                <option value="">Nenhuma</option>
                                { empresas.length > 0 && empresas.map((item:any, index:any) => (
                                    <option value={item.id} key={index}> { item.name} </option>
                                )) }
                            </select>
                        </div>

                        <div className="w-full flex flex-col gap-2">
                            <label className="text-sm" htmlFor="sector">Selecione o departamento:</label>
                            <select id="sector" onChange={(e) => setData({...data, departamento: e.target.value})} className="w-full p-2 rounded-lg bg-white shadow-lg dark:bg-zinc-800 ">
                                <option value="">Nenhum</option>
                                { departamentos.map((department:any) => (
                                    <option value={department.id} key={department.id}> { department.name } </option>
                                )) }
                            </select>
                        </div>
                    </div>

                    <textarea name="" onChange={(e) => setData({...data, descricao: e.target.value})} placeholder="Escreva uma breve descrição..." className="p-5 text-sm bg-white dark:bg-zinc-800 rounded-lg h-40 focus:outline-none" >
                    </textarea>

                    <button
                        type="button"
                        onClick={submit}
                        className="p-2 rounded-lg bg-teal-600 text-white flex items-center justify-center"
                    >
                        { loading ? <ReloadIcon className="mr-2 h-5 w-5 animate-spin" /> : 'Carregar' }
                    </button>
                </form>
            </div>
        </>
    )
}