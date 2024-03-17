import { getCategories, getOrganizationById } from "@/actions/get";
import { ConcursoForm } from "@/components";


export default async function CreateOrgConcurso( { params } : { params: { id: string } } ){
    const cats = await getCategories();
    const org = await getOrganizationById(params.id)

    return (
        <>
            { org != 'failed' && (
                <div className="w-full flex flex-col gap-5 p-5">
                    <h1 className="w-full text-xl font-bold">Criar concurso para {org.name} </h1>

                    <ConcursoForm type="concurso" orgId={org.id} cats={cats} />
                </div>
            ) }
        </>
    )
}