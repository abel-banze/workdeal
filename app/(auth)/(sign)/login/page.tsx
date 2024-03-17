'use client'

import { useState } from "react";
import Link from "next/link";
import axios from "axios"
import { ReloadIcon } from "@radix-ui/react-icons"


const INITIAL_STATE = {
    email: '',
    password: ''
}


export default function Login(){
    const [data, setData] = useState(INITIAL_STATE)
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {
        setLoading(true)

        const form = new FormData();
        form.append('email', data.email);
        form.append('password', data.password);

        const send = await axios.post('/api/auth/login', form)
            .then((res)=> {
                setLoading(false)
                if(res.data.status === 500){
                    setMessage(res.data.data)
                }
            }).catch((err)=> {
                setLoading(false)
                setMessage("Algo correu mal. Tente novamente.")
            })

    }

    return (
        <>
            <div className="w-full lg:w-7/12 rounded-lg p-5 bg-white/20 dark:bg-zinc-900 flex flex-col items-center justify-center gap-5 backdrop-filter shadow ">
                <div className="flex flex-col justify-center items-center gap-2">
                    <h1 className="uppercase font-semibold text-lg">login</h1>
                    <p className="text-sm font-light">Bem-vindo de volta ao Workdeal</p>

                    { message != '' && (
                        <span className="w-full text-center rounded-lg p-2 text-sm shadow-lg bg-white dark:bg-red-800">
                            { message }
                        </span>
                    ) }
                </div>

                <form action={handleLogin} className="flex flex-col gap-3 mt-5 w-full p-2">
                    <div className="w-full flex flex-col gap-2">
                        <input 
                            type="email" 
                            onChange={(e) => setData({...data, email: e.target.value})}
                            placeholder="Email"
                            className="w-full p-2 px-4 rounded-lg bg-white dark:bg-black focus:outline-none "
                        />
                    </div>
                    <input 
                        type="password" 
                        onChange={(e)=> setData({...data, password: e.target.value})}
                        placeholder="Password"
                        className="w-full p-2 px-4 rounded-lg bg-white dark:bg-black focus:outline-none "
                    />

                <button
                    type="button"
                    onClick={handleLogin}
                    className="w-full p-2 bg-teal-600 text-white rounded-lg flex flex-row items-center justify-center"
                >
                    { loading ? <ReloadIcon className="mr-2 h-5 w-5 animate-spin" /> : 'Entrar' }
                </button>
                </form>

                <div className="mt-5 flex flex-row justify-between w-full px-4">
                    <div className="flex flex-col gap-1">
                        <span className="text-xs text-slate-500">Esqueceu senha?</span>
                        <Link href="/reset" className="underline underline-offset-4 text-sm">
                            Recuperar
                        </Link>
                    </div>

                    <div className="flex flex-col gap-1 text-right">
                        <span className="text-xs text-slate-500">Não está cadastrado?</span>
                        <Link href="/register" className="underline underline-offset-4 text-sm">
                            Criar conta
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}