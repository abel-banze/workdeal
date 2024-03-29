import Link from "next/link"
import { getMyOrganizations } from "@/actions/get"
import Image from "next/image"
import { TbBriefcaseOff } from "react-icons/tb";


export default async function CreateConcurso(){
    const getData = await getMyOrganizations();

    return (
        <>
            <div className="w-full flex flex-col gap-5 p-5">
                <h1 className="w-full text-xl font-bold">Seleciona a organização a qual deseja associar o concurso:</h1>
               
                <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-2">
                    { getData != 'failed' && getData != 'unathenticade' && (
                        getData.length > 0 ? (
                            getData.map((data: any, index: any) => (
                                <Link key={index} href={`create/${data.id}`}>
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