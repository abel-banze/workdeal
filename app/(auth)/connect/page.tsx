'use client'

import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { signIn } from "next-auth/react";

export default function Connect(){
    
    const handleConnect = async (provider: string) => {
        await signIn(provider, { callbackUrl: '/marketing/media' })
        .then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <>
            <div className="w-full h-screen flex flex-col items-center justify-center p-5 gap-5">
                <h1 className="text-2xl font-semibold">Escolha o provedor que deseja associar</h1>

                <div className="w-full lg:w-1/2 mt-10 grid grid-col-2 lg:grid-cols-3 gap-5 text-2xl font-semibold">
                    <div onClick={() => handleConnect('facebook')} className="p-2 px-5 h-40 hover:border-3 hover:border-teal-600 cursor-pointer rounded-lg bg-blue-500 flex flex-col gap-5 items-center justify-center">
                        <FaFacebook size={56} />
                        Associar
                    </div>
                    <div className="p-2 px-5 rounded-lg cursor-pointer bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 flex flex-col gap-5 items-center justify-center">
                        <FaInstagram size={56} />
                        Associar
                    </div>
                    <div  onClick={() => handleConnect('linkedin')} className="p-2 px-5 rounded-lg cursor-pointer bg-blue-500 flex flex-col gap-5 items-center justify-center">
                        <FaLinkedin size={56} />
                        Associar
                    </div>
                </div>
            </div>
        </>
    )
}