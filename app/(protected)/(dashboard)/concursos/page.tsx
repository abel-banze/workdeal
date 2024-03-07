import { Metadata } from "next"
import { ConcursoCard } from "@/components"


export const metadata: Metadata = {
    title: "Workdeal | Concursos",
    description: "Work and make deal.",
};


export default function Concursos(){
    return (
        <>
            <div className="w-full p-5 grid grid-cols-1 lg:grid-cols-3 gap-3">
                <ConcursoCard type="concursos" data={null} />
            </div>
        </>
    )
}