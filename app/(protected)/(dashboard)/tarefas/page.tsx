import { Metadata } from "next"
import { ConcursoCard } from "@/components"


export const metadata: Metadata = {
    title: "Workdeal | Tarefas",
    description: "Work and make deal.",
};


export default function Tarefas(){
    return (
        <>
            <div className="w-full p-5 grid grid-cols-1 lg:grid-cols-3 gap-3">
                <ConcursoCard type="tarefas" data={null} />
            </div>
        </>
    )
}