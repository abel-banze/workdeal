import { getOrganizationById } from "@/actions/get";
import { HiOutlineBriefcase } from "react-icons/hi2";
import { TbBriefcaseOff } from "react-icons/tb";
import { BsCalendar2Check } from "react-icons/bs";
import { TiFolderOpen } from "react-icons/ti";
import { AddDepartamento, TableUsers, AddUsers } from "@/components"

export default async function OrganizationDetailView( { params } : { params: { id: string } } ){
    const data = await getOrganizationById(params.id)

    return (
        <>
            { data != 'failed' && (
                <div className="w-full p-5 px-10 flex flex-col gap-5">
                    <h1 className="text-2xl font-semibold"> { data.name } </h1>

                    <div className="w-full flex flex-row items-center justify-between">
                        <h2 className="text-lg font-semibold">Departamentos</h2>

                        <AddDepartamento id={data.id} />
                    </div>
                    <div className="w-full grid grid-cols-2 lg:grid-cols-5 gap-2">
                        { data.departamentos.length > 0 ? (
                            data.departamentos.map((dep: any, index: any) => (
                                <div className="w-full rounded-lg p-2 gap-3 bg-white shadow-lg dark:bg-zinc-800 flex flex-col items-center justify-center" key={index}>
                                    <HiOutlineBriefcase className="text-gray-500" size={60} />
                                    <span className="font-semibold"> { dep.name } </span>
                                    <span className="text-gray-500 text-sm">{ dep.colaboradores.length } colaboradores</span>
                                </div>
                            ))
                        ) : (
                            <div className="w-full rounded-lg p-2 gap-3 bg-white shadow-lg dark:bg-zinc-800 flex flex-col items-center justify-center">
                                <TbBriefcaseOff className="text-gray-500" size={60} />
                                <span className="font-semibold">Sem departamentos</span>
                            </div>
                        ) }
                    </div>

                    <div className="w-full flex flex-col gap-5 mt-5">
                        <h2 className="text-lg font-semibold">Aplicativos</h2>
                        
                        <div className="w-full grid grid-cols-2 lg:grid-cols-5 gap-2">
                            <div className="w-full p-2 items-center justify-center rounded-lg bg-white shadow-lg dark:bg-zinc-800 flex flex-col gap-2">
                                <TiFolderOpen  size={60} />
                                <span className="font-semibold">Gestor de ficheiros</span>
                                <span className="text-sm text-gray-500"> 12 ficheiros</span>
                            </div>
                            <div className="w-full p-2 items-center justify-center rounded-lg bg-white shadow-lg dark:bg-zinc-800 flex flex-col gap-2">
                                <BsCalendar2Check   size={50} />
                                <span className="font-semibold">Agenda</span>
                                <span className="text-sm text-gray-500"> 12 eventos</span>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-col gap-5 mt-5">
                        <div className="w-full flex flex-row items-center justify-between">
                            <h2 className="text-lg font-semibold">Colaboradores</h2>

                            <AddUsers />
                        </div>
                            
                        <TableUsers data={data} />

                    </div>
                </div>
            ) }
            
        </>
    )
}