'use client'
import { useState, Fragment } from "react"
import { ReloadIcon } from "@radix-ui/react-icons"
import { Dialog, Transition } from '@headlessui/react'
import axios from "axios"

export default function AddDepartamento({id} : {
    id: string
}){

    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [name, setName] = useState("")

    const handleModal = () => {
        setIsOpen(!isOpen)
    }

    const submit = async () => {
        setLoading(true)

        const form = new FormData();
        form.append('name', name);
        form.append('id', id);

        await axios.post('/api/create/departamento', form)
        .then((res) => {
            setLoading(false)
            setIsOpen(false)
        }).catch((err) => {
            setIsOpen(false)
            setLoading(false)
            console.log(err)
        })

    }

    return (
        <>
            <button
                type="button"
                onClick={handleModal}
                className="text-sm p-2 px-5 rounded-lg bg-teal-600 text-white"
            >
                Criar departamento
            </button>

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
                            Criar departamento
                        </Dialog.Title>
                        <div className="mt-2">
                            <div className="w-full flex flex-col gap-2 text-gray-700">
                                <input 
                                    type="text"
                                    onChange={(e) => setName(e.target.value)} 
                                    className="p-2 px-5 w-full border border-slate-200 rounded-lg focus:outline-none"
                                    placeholder="Nome do departamento"
                                />


                            </div>
                        </div>

                        <div className="mt-4 flex flex-row justify-between">
                            <button
                                type="button"
                                onClick={handleModal}
                                className="p-2 rounded-lg text-white text-sm bg-red-300 px-3"
                            >
                                Cancelar
                            </button>

                            <button
                                type="button"
                                onClick={submit}
                                className="inline-flex justify-center rounded-lg border border-transparent bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
                            >
                                { loading ? <ReloadIcon className="mr-2 h-5 w-5 animate-spin" /> : 'Criar departamento' }
                                
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