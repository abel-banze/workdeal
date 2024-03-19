import { Metadata } from "next";
import { FaRegBuilding } from "react-icons/fa";
import { IoStorefrontOutline, IoHammerOutline, IoWalletOutline } from "react-icons/io5";
import { BiTask } from "react-icons/bi";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";

export const metadata: Metadata = {
    title: "Workdeal | Dashboard",
    description: "Work and make deal.",
};

export default async function Dashboard(){

    return (
        <>
            <div className="w-full flex flex-col gap-5 p-5">
                <div className="w-full grid grid-cols-1 lg:grid-cols-5 gap-3">
                    <div className="w-full rounded-lg p-2 flex flex-row items-center px-5 gap-3 bg-white shadow dark:bg-zinc-800">
                        <FaRegBuilding size={40} />
                        <div className="w-full flex flex-col">
                            <h1 className="text-3xl font-bold">0</h1>
                            <span>Empresas</span>
                        </div>
                    </div>
                    <div className="w-full rounded-lg p-2 flex flex-row items-center px-5 gap-3 bg-white shadow dark:bg-zinc-800">
                        <IoStorefrontOutline size={50} />
                        <div className="w-full flex flex-col">
                            <h1 className="text-3xl font-bold">0</h1>
                            <span>Lojas</span>
                        </div>
                    </div>
                    <div className="w-full rounded-lg p-2 flex flex-row items-center px-5 gap-3 bg-white shadow dark:bg-zinc-800">
                        <IoHammerOutline size={50} />
                        <div className="w-full flex flex-col">
                            <h1 className="text-3xl font-bold">0</h1>
                            <span>Trabalhos</span>
                        </div>
                    </div>
                    <div className="w-full rounded-lg p-2 flex flex-row items-center px-5 gap-3 bg-white shadow dark:bg-zinc-800">
                        <BiTask size={50} />
                        <div className="w-full flex flex-col">
                            <h1 className="text-3xl font-bold">0</h1>
                            <span>Adjudicações</span>
                        </div>
                    </div>
                </div>

                <h1>Carteira</h1>
                <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-5">
                    <div className="w-full rounded-lg p-2 flex flex-row items-center px-5 gap-3 bg-white shadow dark:bg-zinc-800">
                        <IoWalletOutline size={50} />
                        <div className="w-full flex flex-col">
                            <div className="flex flex-row gap-3 items-end">
                                <h1 className="text-3xl font-bold">0</h1>
                                <span className="text-slate-500">Meticais</span>
                            </div>
                            <span >Saldo disponível</span>
                        </div>
                    </div>
                    <div className="w-full rounded-lg p-2 flex flex-row items-center px-5 gap-3 bg-white shadow dark:bg-zinc-800">
                        <GiReceiveMoney size={50} />
                        <div className="w-full flex flex-col">
                            <div className="flex flex-row gap-3 items-end">
                                <h1 className="text-3xl font-bold">0</h1>
                                <span className="text-slate-500">Meticais</span>
                            </div>
                            <span >Valor por receber</span>
                        </div>
                    </div>
                    <div className="w-full rounded-lg p-2 flex flex-row items-center px-5 gap-3 bg-white shadow dark:bg-zinc-800">
                        <GiPayMoney size={50} />
                        <div className="w-full flex flex-col">
                            <div className="flex flex-row gap-3 items-end">
                                <h1 className="text-3xl font-bold">0</h1>
                                <span className="text-slate-500">Meticais</span>
                            </div>
                            <span >Valor por pagar</span>
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    )
}