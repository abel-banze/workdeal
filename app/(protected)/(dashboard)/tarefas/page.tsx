import { Metadata } from "next";
import { ConcursoCard } from "@/components";
import { getTarefas } from "@/actions/get";

export const metadata: Metadata = {
    title: "Workdeal | Tarefas",
    description: "Work and make deal.",
};


export default async function Tarefas(){
    const getData = await getTarefas();

    return (
        <>
            <div className="w-full p-5 grid grid-cols-1 lg:grid-cols-3 gap-3">
                { getData && getData != 'failed' && getData.map((item: any, index: any)=> (
                    <ConcursoCard type="tarefas" data={item} key={index} />
                )) }
            </div>
        </>
    )
}