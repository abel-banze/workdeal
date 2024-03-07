import { createCategoria } from "@/actions/create"
import { ButtonSubmit } from "@/components"

export default function AdminPainel(){

    const submit = async (formData: FormData) => {
        'use server'

        const { name } = Object.fromEntries(formData);
        const data = typeof name === 'string' ? name : '';

        await createCategoria(data)

    }

    return (
        <>
            <div className="w-full p-5 flex flex-col">
                <h1>Adicionar categoria</h1>

                <form action={submit} className="flex mt-5 flex-col gap-2 w-3/12 items-center">
                    <input 
                        type="text" 
                        name="name"
                        placeholder="Nome da categoria"
                        className="p-2 rounded-lg w-full bg-white dark:bg-zinc-800 px-5 focus:outline-none"
                    />

                    <ButtonSubmit text="Adicionar" />
                </form>
            </div>
        </>
    )
}