'use client'


export default function TableUsers({ data } : { data: any }){
    return (
        <>
            <table className="w-full rounded-lg table-auto border-collapse border border-slate-300 dark:border-gray-700">
                <thead className="text-left bg-slate-700 text-white dark:bg-zinc-800">
                    <tr className="px-5">
                        <th className="px-3">Nome</th>
                        <th>Departamento</th>
                        <th>Cargo</th>
                        <th>Atribuição</th>
                        <th>Acções</th>
                    </tr>
                </thead>
                <tbody>
                { data.colaboradores.length > 0 ? (
                    data.colaboradores.map((user: any, index: any)=> (
                        <tr className="px-3 border-b border-slate-300 dark:border-gray-700" key={index}>
                            <td className="px-3">
                                <div className="flex flex-row gap-x-2 items-center">
                                    <div className="h-5 w-5 rounded-full bg-zinc-800">
                                    </div>
                                    <div>
                                        { user.user.firstName + ' ' + user.user.lastName }
                                    </div> 
                                </div>
                            </td>
                        </tr>
                    ))
                    ) : 'Nenhum colaboradores cadastrado.' }
                </tbody>
            </table>
        </>
    )
}