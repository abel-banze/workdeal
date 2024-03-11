import { Metadata } from "next"
import { ConcursoCard } from "@/components"
import { getConcursos } from "@/actions/get";

export const metadata: Metadata = {
    title: "Workdeal | Concursos",
    description: "Work and make deal.",
};


export default async function Concursos(){
    const getData = await getConcursos();

    return (
        <>
            <div className="w-full p-5 grid grid-cols-1 lg:grid-cols-3 gap-3">
                { getData && getData != 'failed' && getData.map((item: any, index: any)=>(
                    <ConcursoCard type="concursos" data={item} key={index} />
                )) }
            </div>
        </>
    )
}