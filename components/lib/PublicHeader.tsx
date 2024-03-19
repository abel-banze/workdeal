import Link from "next/link";
import { auth } from "@/auth";


export default async function PublicHeader(){
    const session = await auth();
    
    return (
        <>
            <header className="w-full p-5 bg-white dark:bg-black/30 z-[999] backdrop-blur bg-opacity-70 sticky top-0 inset-0">
                <nav className="w-full flex flex-row items-center justify-between">
                    <Link href="/">
                        <h1 className="text-lg font-black">Work<strong className="text-teal-600">deal</strong></h1>                
                    </Link>
                    <div className="flex flex-row gap-3 items-center">
                        <ul className="flex flex-row gap-3 items-center">
                            <li>Empresas</li>
                            <li>Freelancers</li>
                            <li>Marketplace</li>
                            { session ? (
                                <li>
                                    <Link href="/dashboard">
                                        Painel de controle
                                    </Link>
                                </li>
                            ) : (
                                <li>
                                    <Link href="/login">
                                        Login
                                    </Link>
                                </li>
                            ) }
                            
                        </ul>
                    </div>
                </nav>
            </header>
        </>
    )
}