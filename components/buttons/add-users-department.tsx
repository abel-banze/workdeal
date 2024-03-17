'use client'

import { useState, useEffect, Fragment } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Dialog, Transition } from '@headlessui/react';
import axios from "axios";
import Image from "next/image"


export default function AddUsers(){
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [name, setName] = useState("")
    const [users, setUsers] = useState<string[]>([])


    const handleModal = () => {
        setIsOpen(!isOpen)
    }


    const searchUser = async (e: string) =>{
        const form = new FormData();
        
        const trimmedName = name.trim();
        const nameParts = trimmedName.split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

        form.append('name', firstName);
        form.append('surname', lastName)

        if(e != ''){
            await axios.post('/api/retrieve/user', form)
            .then((res)=> {
                setUsers(res.data)
            }).catch((err)=> {
                console.log(err)
            })
        }
    }


    const submit = async () => {
        setLoading(true)
    }

    return (
        <>
            <button
                type="button"
                onClick={handleModal}
                className="p-2 px-5 bg-white dark:bg-teal-600 text-white rounded-lg text-sm"
            >
                Adicionar colaborador
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
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white dark:bg-zinc-800 p-6 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-gray-900"
                        >
                            Adicionar colaborador
                        </Dialog.Title>
                        <div className="mt-2">
                            <div className="w-full flex flex-col gap-2">
                                <input 
                                    type="text"
                                    onChange={(e) => searchUser(e.target.value)} 
                                    className="p-2 px-5 w-full border border-slate-200 dark:bg-zinc-600 rounded-lg focus:outline-none"
                                    placeholder="Escreva o nome do usuário..."
                                />

                                <div className="w-full flex flex-col gap-2 px-5 h-40 overflow-y-scroll">

                                    { users.length > 0 ? (
                                        users.map((user: any, index: any) => (
                                        <div className="w-full flex flex-row items-center gap-2" key={index}>
                                            { user.avatarUrl && (
                                                <div className="w-5 h-5 rounded-full bg-slate-300" >
                                                    <Image 
                                                        alt="avatar"
                                                        src={user.avatarUrl}
                                                        width={500}
                                                        height={500}
                                                        className="object-cover w-full h-full rounded-full"
                                                    />
                                                </div>
                                            ) }
                                            
                                            <span className="text-xs"> { user.firstName + ' ' + user.lastName } </span>
                                        </div>
                                        ))
                                    ) : 'Nenhum usuário encontrado.' }                                    
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
                                { loading ? <ReloadIcon className="mr-2 h-5 w-5 animate-spin" /> : 'Adicionar usuário' }
                                
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