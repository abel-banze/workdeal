import { ProductSlider, MarketplaceHero, ProductCard } from "@/components";
import { BsMegaphone } from "react-icons/bs";
import { Metadata } from "next";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export const metadata: Metadata = {
    title: "Workdeal | Marketplace",
    description: "Work and make deal.",
};

export default function Marketplace(){
    return (
        <>
            <div className="w-full flex flex-col gap-10 p-5 px-10">
                <MarketplaceHero />

                <div className="w-full flex flex-row items-center justify-between">
                    <h1 className="text-lg">Produtos em destaque</h1>
                    <Link href="/produtos/destaque" className="font-light flex flex-row items-center gap-2">
                        Todos produtos
                        <FaArrowRight />
                    </Link>
                </div>
                <ProductSlider />
                <div className="w-full flex flex-row items-center justify-between">
                    <h1 className="text-lg">Principais lojas</h1>
                    <Link href="/produtos/destaque" className="font-light flex flex-row items-center gap-2">
                        Todas lojas
                        <FaArrowRight />
                    </Link>
                </div>


                <div className="w-full p-2 flex flex-row gap-3 overflow-x-scroll mt-10">
                    <span className="p-2 rounded-lg text-sm bg-teal-600 text-white">
                        Todos
                    </span>
                    <span className="p-2 rounded-lg text-sm bg-white dark:bg-zinc-800">
                        Electrodomésticos
                    </span>
                </div>

                <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-3">
                    <ProductCard />
                </div>

                <div className="w-full min-h-32 p-5 gap-3 bg-white dark:bg-zinc-900 backdrop-blur bg-opacity-80 flex flex-row flex-wrap items-center justify-around rounded-lg">
                    <BsMegaphone size={50} />

                    <h1 className="text-[1.8rem] lg:text-[2.4rem] font-black tracking-wider uppercase">
                        Este espaço pode ser seu!
                    </h1>

                    <Link href="/promover/banner" className="p-2 bg-teal-600 text-white rounded-lg px-10">
                        Solicitar
                    </Link>
                </div>

                <h1 className="w-full text-center uppercase text-[1.2rem] lg:text-[1.8rem] font-black tracking-widest text-zinc-700 dark:text-zinc-300">o que dizem sobre o nosso marketplace?</h1>
            </div>
        </>
    )
}