'use client'

import { VscSave } from "react-icons/vsc";
import { useState, Fragment } from "react"
import { ReloadIcon } from "@radix-ui/react-icons"
import { Dialog, Transition } from '@headlessui/react'
import axios from "axios"


export default function ButtonProposta({ type, id } : {type: string; id: string | undefined} ){
    const [isOpen, setIsOpen] = useState(false)
    const item = type;
    const [data, setData] = useState({
        type,
        orcamento: '',
        tempo: '',
        periodo: '',
        descricao: ''
    })
    const [loading, setLoading] = useState(false)

    const handleModal = () => {
        setIsOpen(!isOpen)
    }

    const handleSubmit = async () => {
        setLoading(true)

        const form = new FormData();

        const objectId = typeof id === 'string' ? id : '';

        form.append('type', data.type);
        form.append('id', objectId);
        form.append('orcamento', data.orcamento);
        form.append('tempo', data.tempo);
        form.append('periodo', data.periodo);
        form.append('descricao', data.descricao);

        await axios.post(`/api/create/proposta/${type}`, form)
        .then((res) =>{
            setLoading(false);
            setIsOpen(!isOpen);
            console.log(res.data);
        }).catch((err) => {
            setLoading(false)
            setIsOpen(!isOpen);
            console.log(err)
        });
    }


    const handleSave = async () => {
        setLoading(true)
        const form = new FormData();
        const objectId = typeof id === 'string' ? id : '';
        form.append('type', type);
        form.append('id', objectId)

        await axios.post('/api/create/save', form)
        .then((res)=>{
            setLoading(false)
            console.log(res.data)
        }).catch((err) => {
            setLoading(false)
            console.log(err)
        })
    }

    return (
        <>
            <div className="w-full flex flex-row gap-3">
                <button
                    type="button"
                    onClick={handleModal}
                    className="p-2 px-5 rounded-lg bg-teal-600 hover:bg-teal-800 transition ease-in-out duration-200 text-white"
                >
                    Fazer proposta
                </button>
                    
                <button
                    type="button"
                    onClick={handleSave}
                    title={`Guardar ${type}`}
                    className="p-2 rounded-lg bg-white flex items-center justify-center border border-slate-200 dark:bg-zinc-900  dark:border-gray-700"
                >
                    { loading ? <ReloadIcon className="mr-2 h-3 w-3 animate-spin" /> : <VscSave /> }
                </button>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={handleModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/30 backdrop-blur bg-opacity-60" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-gray-900"
                        >
                            Fazer proposta para { type === 'tarefe' ? 'esta tarefa' : 'este concurso' }
                        </Dialog.Title>
                        <div className="mt-2">
                            <form className="w-full mt-5 flex flex-col gap-5 text-gray-700">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="orcamento" className="text-xs">Defina o seu orçamento:</label>
                                    <div className="flex flex-row border border-slate-200 rounded-lg text-sm">
                                        <span className="border-r border-slate-300 bg-slate-200 p-2 rounded-lg">
                                            MZN
                                        </span>
                                        <input 
                                            type="text" 
                                            placeholder="Orçamento"
                                            onChange={(e) => setData({...data, orcamento: e.target.value})}
                                            className="w-full p-2  focus:outline-none "
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-row gap-3">
                                    <div className="w-4/12 flex flex-col">
                                        <label htmlFor="tempo" className="text-xs">Defina o seu tempo:</label>
                                        <input 
                                            type="number"
                                            min={1}
                                            defaultValue={1} 
                                            placeholder="Tempo"
                                            onChange={(e) => setData({...data, tempo: e.target.value})}
                                            className="w-full p-2 rounded-lg focus:outline-none border border-slate-200"
                                        />
                                    </div>

                                    <div className="w-6/12 flex flex-col">
                                        <label htmlFor="periodo" className="text-xs">Defina o seu periodo:</label>
                                        <select 
                                            name="" 
                                            id=""
                                            onChange={(e) => setData({...data, periodo: e.target.value})}
                                            className="w-full p-2 rounded-lg focus:outline-none border border-slate-200"

                                        >
                                            <option value="dias">Dias</option>
                                            <option value="semanas">Semanas</option>
                                            <option value="meses">Meses</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="descricao" className="text-xs">Defina o seu orçamento:</label>
                                    <textarea name="" id="" onChange={(e) => setData({...data, descricao: e.target.value})} placeholder="Diga porquê a sua proposta deve ser a escolhida..." className="p-2 text-sm rounded-lg h-40 border border-slate-200" ></textarea>
                                </div>

                            </form>
                        </div>

                        <div className="mt-4">
                            <button
                                type="button"
                                className="inline-flex justify-center rounded-lg border border-transparent bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
                                onClick={handleSubmit}
                            >
                                { loading ? <ReloadIcon className="mr-2 h-5 w-5 animate-spin" /> : 'Enviar proposta' }
                                
                            </button>
                        </div>
                        </Dialog.Panel>
                    </Transition.Child>
                    </div>
                </div>
                </Dialog>
            </Transition>

        </>
    )
}