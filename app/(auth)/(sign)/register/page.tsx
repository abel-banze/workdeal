import { Metadata } from "next";
import { ButtonSubmit } from "@/components";
import Link from "next/link";
import { register } from "@/actions/auth";


export const metadata: Metadata = {
    title: "Workdeal | Cadastrado",
    description: "Work and make deal.",
};


export default function Register(){

    const handleRegister = async (formData: FormData)=>{
        'use server'

        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        const email = formData.get('email');
        const hashPass = formData.get('hashPass');

        const info = {
            email: email != null ? (typeof email ==='string' ? email : '') : '',
            firstName: firstName != null ? (typeof firstName === 'string' ? firstName : '') : '',
            lastName: lastName !=null ? (typeof lastName === 'string' ? lastName : '') : '',
            hashPass: hashPass != null ? (typeof hashPass === 'string' ? hashPass : '') : ''
        }

        await register(info);

    }

    return (
        <>
            <div className="w-full lg:w-7/12 rounded-lg p-5 bg-white/20 dark:bg-zinc-900 flex flex-col items-center justify-center gap-5 backdrop-filter shadow ">
                <div className="flex flex-col justify-center items-center gap-2">
                    <h1 className="uppercase font-semibold text-lg">criar conta</h1>
                    <p className="text-sm font-light">Bem-vindo ao Workdeal</p>
                </div>

                <form action={handleRegister} className="flex flex-col gap-3 mt-5 w-full p-2">
                    <input 
                        type="text" 
                        name="firstName"
                        placeholder="Primeiro nome"
                        className="w-full p-2 px-4 rounded-lg bg-white dark:bg-black focus:outline-none "
                    />

                    <input 
                        type="text" 
                        name="lastName"
                        placeholder="Apelido/Tipo de sociedade"
                        className="w-full p-2 px-4 rounded-lg bg-white dark:bg-black focus:outline-none "
                    />

                    <input 
                        type="email" 
                        name="email"
                        placeholder="Email"
                        className="w-full p-2 px-4 rounded-lg bg-white dark:bg-black focus:outline-none "
                    />

                    <input 
                        type="password" 
                        name="hashPass"
                        placeholder="Password"
                        className="w-full p-2 px-4 rounded-lg bg-white dark:bg-black focus:outline-none "
                    />

                    <ButtonSubmit text="Criar conta" />
                </form>

                <div className="mt-5 flex flex-row w-full px-4">
                    <div className="flex flex-col gap-1">
                        <span className="text-xs text-slate-500">Já está cadastrado?</span>
                        <Link href="/login" className="underline underline-offset-4 text-sm">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}