import Link from "next/link"

export default async function ProductDetailView( { params } : { params: { id: string } } ){
    return (
        <>
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3 p-5">
                <div className="w-full flex flex-col gap-2 justify-center items-center">
                    <div className="w-full lg:w-1/2 h-72 bg-white dark:bg-zinc-800">

                    </div>
                </div>

                <div className="w-full flex flex-col gap-5">
                    <div className="flex flex-row gap-3 text-sm">
                        <Link href="/marketplace" className="text-slate-500">
                            Marketplace
                        </Link>
                        /
                        <Link href="/produtos" className="text-slate-500">
                            Produtos
                        </Link>
                        /
                        <span>Nome do produto</span>
                    </div>

                    <h1 className="text-2xl font-bold">Nome do produto</h1>
                    <p className="text-slate-700 dark:text-slate-400">
                        lorem lakndsjasd a ipsum aslkdas 
                    </p>
                    <h1 className="text-2xl font-bold">734 Meticais</h1>

                </div>
            </div>
        </>
    )
}