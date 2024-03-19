
import Image from "next/image"

export default function MarketplaceHero(){
    return (
        <>
            <div className="w-full h-[60vh] bg-white/30 dark:bg-zinc-900 backdrop-blur bg-opacity-80 flex flex-row rounded-lg ">
                <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 p-5">
                    <div className="w-full h-full flex flex-col items-center justify-center">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-[1.8rem] lg:text-[4rem] text-zinc-700 dark:text-zinc-400 font-black uppercase tracking-widest">Compras simplificadas</h1>
                            <h2 className="text-xl font-black text-zinc-500 uppercase tracking-widest">Satisfação garantida</h2>
                            
                            <div className="flex flex-row flex-wrap gap-2 text-sm lg:text-md">
                                <span className="p-2 lg:px-5 rounded-lg bg-slate-100 dark:bg-zinc-800 shadow-lg font-bold uppercase text-zinc-700 dark:text-zinc-400">
                                    Rápido
                                </span>
                                <span className="p-2 lg:px-5 rounded-lg bg-slate-100 dark:bg-zinc-800 shadow-lg font-bold uppercase text-zinc-700 dark:text-zinc-400">
                                    fácil
                                </span>
                                <span className="p-2 lg:px-5 rounded-lg bg-slate-100 dark:bg-zinc-800 shadow-lg font-bold uppercase text-zinc-700 dark:text-zinc-400">
                                    seguro
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex p-10 flex-col items-center justify-center">
                        <div className="w-full lg:w-7/12 h-full ">
                            <Image 
                                src="/hero-banner-marketplace.png"
                                alt="hero-marketplace"
                                width={500}
                                height={500}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}