import { ConcursoForm } from "@/components";
import { getCategories } from "@/actions/get";


export default async function CreateConcurso(){

    const cats = await getCategories();

    return (
        <>
            <div className="w-full flex flex-col gap-5 p-5">
                <h1 className="w-full text-xl font-bold">Criar concurso</h1>

                <ConcursoForm type="concurso" cats={cats} />
            </div>
        </>
    )
}