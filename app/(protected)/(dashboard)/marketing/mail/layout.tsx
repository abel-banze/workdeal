import Link from "next/link";

export default function MailLayout({ children } : {
    children: React.ReactNode
}){
    return (
        <>
            <div className="w-full flex flex-col gap-5 p-5">
                <div className="w-full flex flex-row min-h-[80vh] rounded-lg bg-white shadow dark:bg-zinc-900 bg-opacity-70 p-5">
                    <div className="w-full lg:w-4/12 min-h-full border-r border-slate-300 dark:border-zinc-700">
                        <div className="w-full h-full flex flex-col pr-5 gap-5">
                            <input 
                                type="text" 
                                className="p-2 px-5 rounded-lg text-sm bg-slate-200 dark:bg-zinc-950 focus:outline-none"
                                placeholder="Procurar campanha..."
                            />

                            <div className="w-full flex flex-col gap-3 overflow-x-hidden h-full">
                                
                            </div>

                            <Link
                                href="/campaign/email"
                                className="p-2 px-5 w-full text-center bg-teal-600 text-white rounded-lg text-sm"
                            >
                                Criar campanha
                            </Link>
                        </div>                        
                    </div>

                    <div className="w-full p-5 gap-5 hidden lg:w-8/12 lg:flex flex-col items-center justify-center">
                        { children }
                    </div>
                </div>
            </div>
        </>
    )
}