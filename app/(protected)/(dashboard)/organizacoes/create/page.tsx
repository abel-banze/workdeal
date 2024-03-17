'use client'

import { useState, useEffect } from "react";
import { PiImageSquare } from "react-icons/pi";
import { uploadFile, getFileUrl } from "@/actions/appwrite";
import { getCategories } from "@/actions/get"
import { useRouter } from "next/navigation";
import { ReloadIcon } from "@radix-ui/react-icons"
import axios from "axios";

type ORG = {
    name: string;
    email: string;
    nuit: string;
    endereco: string;
    descricao: string;
    logo: File | null;
    contactos: string;
    sector: string;
    slogan: string;
}

const INITIAL_STATE = {
    name: '',
    email: '',
    nuit: '',
    endereco: '',
    descricao: '',
    logo: null,
    contactos: '',
    slogan: '',
    sector: '',
}


export default function CreateOrganizacao(){
    const [data, setData] = useState<ORG>(INITIAL_STATE)
    const [loading, setLoading] = useState(false)
    const [cats, setCats] = useState<any[]>([])
    const router = useRouter()


    useEffect(() => {
        getCats()
    },[cats])

    const getCats = async () => {
        await axios.get('/api/retrieve/sectores')
        .then((res) => {
            setCats(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const handleSubmit = async () => {
        setLoading(true)

        const form = new FormData();
        form.append('name', data.name);
        form.append('email', data.email);
        form.append('nuit', data.nuit);
        form.append('endereco', data.endereco);
        form.append('slogan', data.slogan);
        form.append('descricao', data.descricao);
        form.append('contactos', data.contactos);
        form.append('sector', data.sector);

        if(data.logo){
            const upload = await uploadFile(data.logo);
            if(!upload) return;

            const fileUrl = await getFileUrl(upload.$id);
            if(!fileUrl) return;

            form.append('logo', fileUrl.toString());
        }


        await axios.post('/api/create/organizacao', form)
        .then((res) => {
            setLoading(false)
            router.push(res.data.url)
        })
        .catch((err) => {
            setLoading(false)
        })
    }

    return (
        <>
            <div className="w-full flex flex-col p-5 lg:px-10 gap-5">
                <h1 className="text-xl font-semibold">Criar organização</h1>

                <form className="mt-5 w-full lg:w-1/2 flex flex-col gap-2">
                    <div className="flex flex-col gap-2 w-full p-2">
                        <label htmlFor="title" className="text-xs">Defina o nome da organização</label>
                        <input 
                            type="text"
                            onChange={(e) => setData({...data, name: e.target.value})}
                            placeholder="Nome da organização"
                            className="p-2 rounded-lg w-full bg-white dark:bg-zinc-800 focus:outline-none px-5"
                        />
                    </div>

                    <div className="w-full flex flex-col gap-2 p-2">
                        <label htmlFor="sector" className="text-xs">Indica a área de actividade</label>
                        <select onChange={(e) => setData({...data, sector: e.target.value})} className="p-2 rounded-lg w-full bg-white dark:bg-zinc-800 focus:outline-none px-5">
                            { cats.map((cat: any, index: any) => (
                                <option value={cat.id} key={index}> { cat.name } </option>
                            )) }
                        </select>
                    </div>

                    <div className="w-full grid grid-cols-1 lg:grid-cols-2">
                        <div className="flex flex-col gap-2 w-full p-2">
                            <label htmlFor="email" className="text-xs"> Insira o email da organização</label>
                            <input 
                                type="text"
                                onChange={(e) => setData({...data, email: e.target.value})}
                                placeholder="Email da organização"
                                className="p-2 rounded-lg w-full bg-white dark:bg-zinc-800 focus:outline-none px-5"
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-full p-2">
                            <label htmlFor="address" className="text-xs">Insira o endereço da sede da organização</label>
                            <input 
                                type="text"
                                onChange={(e) => setData({...data, endereco: e.target.value})}
                                placeholder="Endereço"
                                className="p-2 rounded-lg w-full bg-white dark:bg-zinc-800 focus:outline-none px-5"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 w-full p-2">
                        <label htmlFor="slogan" className="text-xs"> Defina o slogan da organização </label>
                        <input 
                            type="text"
                            onChange={(e) => setData({...data, slogan: e.target.value})}
                            placeholder="Aqui vem o slogan da sua organização..."
                            className="p-2 rounded-lg w-full bg-white dark:bg-zinc-800 focus:outline-none px-5"
                        />
                    </div>

                    <div className="w-full grid grid-cols-1 lg:grid-cols-2">
                        <div className="flex flex-col gap-2 w-full p-2">
                            <label htmlFor="nuit" className="text-xs">Insira o NUIT da organização</label>
                            <input 
                                type="text"
                                onChange={(e) => setData({...data, nuit: e.target.value})}
                                placeholder="Insira o NUIT da organização..."
                                className="p-2 rounded-lg w-full bg-white dark:bg-zinc-800 focus:outline-none px-5"
                            />
                        </div>

                        <div className="flex flex-col gap-2 w-full p-2">
                            <label htmlFor="contacts" className="text-xs">Insira o(s) contacto(s). </label>
                            <input 
                                type="text"
                                onChange={(e) => setData({...data, contactos: e.target.value})}
                                placeholder="84 123 4567, 82 123 4567"
                                className="p-2 rounded-lg w-full bg-white dark:bg-zinc-800 focus:outline-none px-5"
                            />
                        </div>
                    </div>

                    <div className="w-full p-2 flex">
                        <div className="w-full p-5 gap-3 rounded-lg bg-white dark:bg-zinc-800 flex items-center justify-center relative">
                            <PiImageSquare size={40} />
                            <h1 className="text-sm font-semibold text-gray-500">Clique aqui para selecionar o logotipo da organização</h1>

                            <input 
                                type="file"
                                onChange={(e) => setData({...data, logo: e.target.files ? e.target.files[0] : null})}
                                className="w-full h-full inset-0 absolute opacity-0 cursor-pointer" 
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 w-full p-2">
                        <label htmlFor="descricao" className="text-xs">Descreva a organização</label>
                        <textarea
                            onChange={(e) => setData({...data, descricao: e.target.value})} 
                            className="p-2 rounded-lg w-full h-56 bg-white dark:bg-zinc-800 focus:outline-none px-5"
                        
                        ></textarea>
                    </div>

                    <div className="w-full flex p-2">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="w-full p-2 font-semibold rounded-lg bg-teal-600 text-white hover:bg-teal-800 transition ease-in-out duration-200"
                        >
                            { loading ? <ReloadIcon className="mr-2 h-5 w-5 animate-spin" /> : 'Criar organização' }
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}