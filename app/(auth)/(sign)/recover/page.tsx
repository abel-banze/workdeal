import { Metadata } from "next"
import { ButtonSubmit } from "@/components"
import Link from "next/link"

export const metadata: Metadata = {
    title: "Workdeal | Recuperar",
    description: "Work and make deal.",
};

export default function Recover(){
    return (
        <>
            <div className="w-full lg:w-7/12 rounded-lg p-5 bg-white/20 dark:bg-zinc-900 flex flex-col items-center justify-center gap-5 backdrop-filter shadow ">
                <div className="flex flex-col justify-center items-center gap-2">
                    <h1 className="uppercase font-semibold text-lg">Redefinir a senha</h1>
                    <p className="text-sm font-light">Forneça sua nova senha:</p>
                </div>

                <form action="" className="flex flex-col gap-3 mt-5 w-full p-2">
                    <input 
                        type="password" 
                        name="password"
                        placeholder="Password"
                        className="w-full p-2 px-4 rounded-lg bg-white dark:bg-black focus:outline-none "
                    />
                    <input 
                        type="password" 
                        name="password2"
                        placeholder="Confirmar Password"
                        className="w-full p-2 px-4 rounded-lg bg-white dark:bg-black focus:outline-none "
                    />
                    
                    <ButtonSubmit text="Recuperar" />
                </form>

                <div className="mt-5 flex flex-row w-full px-4">
                    <div className="flex flex-col gap-1">
                        <Link href="/login" className="underline underline-offset-4 text-sm">
                            Voltar
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}