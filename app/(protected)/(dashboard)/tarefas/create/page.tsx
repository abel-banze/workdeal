import { ConcursoForm } from "@/components";
import { getCategories } from "@/actions/get";


export default async function CreateTarefa(){

    const cats = await getCategories();

    return (
        <>
            <div className="w-full flex flex-col gap-5 p-5">
                <h1 className="w-full text-xl font-bold">Criar tarefa</h1>

                <ConcursoForm type="tarefa" orgId="unknown" cats={cats} />
            </div>
        </>
    )
}