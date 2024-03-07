import { Metadata } from "next";
import { ButtonSubmit } from "@/components";
import Link from "next/link";
import { login } from "@/actions/auth";


export const metadata: Metadata = {
    title: "Workdeal | Login",
    description: "Work and make deal.",
};

export default function Login(){

    const handleLogin = async (formData: FormData) => {
        'use server'

        const { email, password } = Object.fromEntries(formData);
        const emailEntry = typeof email === 'string' ? email : '';
        const passwordEntry = typeof password === 'string' ? password: '';

        await login(emailEntry, passwordEntry);
        
    }

    return (
        <>
            <div className="w-full lg:w-7/12 rounded-lg p-5 bg-white/20 dark:bg-zinc-900 flex flex-col items-center justify-center gap-5 backdrop-filter shadow ">
                <div className="flex flex-col justify-center items-center gap-2">
                    <h1 className="uppercase font-semibold text-lg">login</h1>
                    <p className="text-sm font-light">Bem-vindo de volta ao Workdeal</p>
                </div>

                <form action={handleLogin} className="flex flex-col gap-3 mt-5 w-full p-2">
                    <input 
                        type="email" 
                        name="email"
                        placeholder="Email"
                        className="w-full p-2 px-4 rounded-lg bg-white dark:bg-black focus:outline-none "
                    />
                    <input 
                        type="password" 
                        name="password"
                        placeholder="Password"
                        className="w-full p-2 px-4 rounded-lg bg-white dark:bg-black focus:outline-none "
                    />

                    <ButtonSubmit text="Login" />
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