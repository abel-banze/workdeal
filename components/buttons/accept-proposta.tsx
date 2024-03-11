'use client'

import axios from "axios";
import { useState, Fragment } from "react";
import { ReloadIcon } from "@radix-ui/react-icons"
import { Dialog, Transition } from '@headlessui/react'
import { SlEnvolope } from "react-icons/sl";
import { PiEye } from "react-icons/pi";

export default function AcceptProposta( { data, type, itemId } : { data: any; type: string; itemId: string } ){
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleModal = () => {
        setIsOpen(!isOpen)
    }


    const submit = async () =>{
        setLoading(true)

        const form = new FormData();
        form.append('id', data.id);
        form.append('itemId', itemId);

        await axios.post(`/api/create/proposta/accept/${type}`, form)
            .then((res) => {
                setLoading(false)
                setIsOpen(!isOpen)
                console.log(res.data)
            }).catch((err) => {
                setLoading(false)
                setIsOpen(!isOpen)
                console.log(err)
            })

    }

    return (
        <>
            <div className="p-2 flex flex-row gap-3">
                <button
                    type="button"
                    onClick={handleModal}
                    className="p-2 rounded-lg px-5 text-white bg-teal-600 text-xs"
                >
                    Aceitar proposta
                </button>

                <button
                    type="button"
                >
                    <SlEnvolope size={22} />
                </button>
                <button
                    type="button"
                >
                    <PiEye size={22} />
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
                            Aceitar proposta de { data.user.firstName + ' ' + data.user.lastName } 
                        </Dialog.Title>
                        <div className="mt-2">
                            <div className="w-full flex flex-col gap-2 text-gray-700">
                                <span
                                    className="p-2 text-sm bg-red-200 rounded-lg"
                                >
                                    Tem certeza que deseja aceitar essa proposta de { data.user.firstName + ' ' + data.user.lastName }?</span>
                                <div className="flex flex-col">
                                    <span>
                                        Proposta: <strong> { data.orcamento } Meticais </strong>
                                    </span>
                                    <span>
                                        Tempo de execução: <strong> { data.tempo + ' ' + data.periodo } </strong>
                                    </span>
                                </div>
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
                                { loading ? <ReloadIcon className="mr-2 h-5 w-5 animate-spin" /> : 'Aceitar proposta' }
                                
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