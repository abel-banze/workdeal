'use client'

import { VscSave } from "react-icons/vsc";
import { useState, Fragment } from "react"
import { ReloadIcon } from "@radix-ui/react-icons"
import { Dialog, Transition } from '@headlessui/react'


export default function ButtonProposta({ type } : {type: string} ){
    const [isOpen, setIsOpen] = useState(false)

    const handleModal = () => {
        setIsOpen(!isOpen)
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
                    className="p-2 rounded-lg bg-white border border-slate-200 dark:bg-zinc-900  dark:border-gray-700"
                >
                    <VscSave />
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
                            <p className="text-sm text-gray-500">
                            Your payment has been successfully submitted. We’ve sent
                            you an email with all of the details of your order.
                            </p>
                        </div>

                        <div className="mt-4">
                            <button
                                type="button"
                                className="inline-flex justify-center rounded-lg border border-transparent bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
                                onClick={handleModal}
                            >
                                Enviar proposta
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