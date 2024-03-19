import { Metadata } from "next"
import Link from "next/link"
import { getMyOrganizations } from "@/actions/get"
import Image from "next/image"
import { TbBriefcaseOff } from "react-icons/tb";

export const metadata: Metadata = {
    title: "Workdeal | Organizações",
    description: "Work and make deal.",
};

export default async function Organizacao(){
    const getData = await getMyOrganizations();

    return (
        <>
            <div className="w-full flex flex-col gap-5 p-5">
                <div className="w-full flex flex-row items-center justify-between">
                    <h1 className="text-xl font-semibold">Minhas organizações</h1>
                    <Link
                        href="/organizacoes/create"
                        className="p-2 text-sm px-5 rounded-lg bg-teal-600 text-white hover:bg-teal-800 transition ease-in-out duration-200"
                    >
                        Criar organização
                    </Link>
                </div>

                <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-2">
                    { getData != 'failed' && getData != 'unathenticade' && (
                        getData.length > 0 ? (
                            getData.map((data: any, index: any) => (
                                <Link key={index} href={`/organizacoes/${data.id}`}>
                                    <div className="w-full flex flex-col gap-3 rounded-lg bg-white p-5 dark:bg-zinc-800 items-center justify-center">
                                        <div className="w-20 h-20">
                                            <Image 
                                                src={data.logo}
                                                width={500}
                                                height={500}
                                                alt="logo"
                                                className="object-cover w-full h-full rounded-lg"
                                            />
                                        </div>
                                        <span className="text-xl font-semibold">
                                            { data.name }
                                        </span>
                                        <small className="text-xs text-gray-500"> { data.departamentos.length } departamentos  |  { data.colaboradores.length } Colaboradores </small>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="w-full flex flex-col gap-3 rounded-lg bg-white p-5 dark:bg-zinc-800 items-center justify-center">
                                <TbBriefcaseOff size={40} />
                                <span>
                                    Sem organizações
                                </span>
                                <small className="text-xs text-gray-500">Clique em criar organização</small>
                            </div>
                        )
                    ) }
                    
                </div>
            </div>
        </>
    )
}