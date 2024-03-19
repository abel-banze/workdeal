import { IoHeartOutline, IoCartOutline } from "react-icons/io5";

export default function ProductCard(){
    return (
        <>
            <div className="w-full p-3 rounded-lg bg-white shadow-lg bg-opacity-80 backdrop-blur  dark:bg-zinc-800 flex flex-col gap-2">
                <div className="h-60 w-full rounded-lg bg-zinc-900">
                
                </div>
                <h1 className="font-semibold">Nome do produto</h1>
                <div className="w-full flex flex-row items-center justify-between">
                    <div className="flex flex-row gap-2 items-center">
                        <div className="w-5 h-5 rounded-full bg-white dark:bg-zinc-900">

                        </div>
                        <small className="text-xs text-slate-500">Nome da loja</small>
                    </div>
                    <h1 className="text-lg font-bold">
                        754 MZ 
                    </h1>
                </div>
                <div className="w-full flex flex-row gap-5 items-center justify-between">
                    <button
                        type="button"
                        className="w-full rounded-lg flex flex-row items-center gap-2 justify-center bg-teal-600 text-white p-2 text-sm"
                    >
                        <IoCartOutline size={25} />
                        Adicionar ao carinho
                    </button>
                    <button
                        type="button"
                        className="p-2"
                    >
                        <IoHeartOutline size={30} />
                    </button>
                </div>
            </div>
        </>
    )
}