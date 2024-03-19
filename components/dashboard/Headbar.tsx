'use client'
import { SlBell, SlEnvolope } from "react-icons/sl";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { signOut } from "next-auth/react";

export default function Headbar(){
    return (
        <>
            <header className="w-full p-4 flex sticky bg-white dark:bg-black/30 backdrop-blur bg-opacity-90 border-b border-slate-200 dark:border-gray-700 top-0 items-center justify-end">
                <nav className="flex flex-row gap-5">
                    <button>
                        <SlEnvolope size={20} />
                    </button>
                    <button>
                        <SlBell size={20} />
                    </button>
                    <button
                        type="button"
                        onClick={()=> signOut()}
                        className="flex flex-row gap-1 items-center justify-center"
                    >
                        Sair
                        <HiArrowRightOnRectangle size={20} />
                    </button>
                </nav>
            </header>
        </>
    )
}