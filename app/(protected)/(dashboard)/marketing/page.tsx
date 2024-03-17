import { getFacebookPages } from "@/actions/get";


export default async function marketing(){
    const pages = await getFacebookPages();

    return (
        <>
            <div className="w-full flex flex-col gap-5 p-5">
                <h1 className="text-2xl font-semibold">Minhas páginas do facebook ({pages.data.length})</h1>

                <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-2">

                    { pages.data && pages.data.map((page: any, index: any) => (
                        <div className="w-full rounded-lg p-2 flex flex-col gap-2 bg-white shadow-lg dark:bg-zinc-800" key={index}>
                            <span className="text-lg font-semibold">
                                { page.name }
                            </span>
                            <small className="text-sm text-slate-500"> { page.category } </small>
                        </div>
                    )) }
                    
                </div>

            </div>
        </>
    )
}