'use client'


import { usePathname } from "next/navigation"
import Link from "next/link";
import { AiOutlineAppstore, AiOutlineCalendar } from "react-icons/ai";
import { HiOutlineUsers } from "react-icons/hi";
import { IoCartOutline } from "react-icons/io5";
import { GrDocumentStore } from "react-icons/gr";
import { BiTask, BiStore } from "react-icons/bi";
import { PiHammer, PiSuitcaseSimple } from "react-icons/pi";
import { SlSettings } from "react-icons/sl";
import { LuHardHat } from "react-icons/lu";
import { BsMegaphone } from "react-icons/bs"
import { SubMenu } from "@/components";


export default function SidebarDashboard(){
    const pathname = usePathname()
    
    const menu = [
        {
            label: 'Dashboard',
            path: '/dashboard',
            icon: AiOutlineAppstore,
        },
        {
            label: 'Documentos',
            path: '/files',
            icon: GrDocumentStore,
        },
        {
            label: 'Agenda',
            path: '/agenda',
            icon: AiOutlineCalendar
        }
    ]

    const subMenuList = [
        {
            name: 'marketplace',
            icon: IoCartOutline,
            menu: null
        },
        {
            name: 'market',
            icon: BiStore,
            menu: [
                {
                    label: 'minhas lojas',
                    url: 'minhas'
                },
                {
                    label: 'criar loja',
                    url: 'create'
                },
                {
                    label: 'adicionar produto',
                    url: 'create/produto'
                }
            ]
        },

        {
            name: 'empresas',
            icon: PiSuitcaseSimple,
            menu: [
                {
                    label: 'Encontrar empresa',
                    url: 'all'
                },
                {
                    label: 'minhas empresas',
                    url: ''
                },
                {
                    label: 'criar empresa',
                    url: 'create'
                }
            ]
        },
        {
            name: 'marketing',
            icon: BsMegaphone,
            menu: [
                {
                    label: 'redes sociais',
                    url: 'media'
                },
                {
                    label: 'Email-marketing',
                    url: 'mail'
                },
                /*
                {
                    label: 'SMS-marketing',
                    url: 'sms'
                }

                */
            ]
        },
        {
            name: 'tarefas',
            icon: PiHammer,
            menu: [
                {
                    label: 'todas tarefas',
                    url: ''
                },
                {
                    label: 'gerir tarefas',
                    url: 'manage'
                },
                {
                    label: 'criar tarefa',
                    url: 'create'
                },
                {
                    label: 'guardados',
                    url: 'saved'
                }
            ]
        },
        {
            name: 'concursos',
            icon: BiTask,
            menu: [
                {
                    label: 'todos concursos',
                    url: ''
                },
                {
                    label: 'gerir concursos',
                    url: 'manage'
                },
                {
                    label: 'criar concurso',
                    url: 'create'
                },
                {
                    label: 'guardados',
                    url: 'saved'
                }
            ]
        },
        {
            name: 'trabalhos',
            icon: LuHardHat,
            menu: [
                {
                    label: 'propostas feitas',
                    url: ''
                },
                {
                    label: 'propostas aceites',
                    url: 'aceites'
                },{
                    label: 'trabalhos concluídos',
                    url: 'concluidos'
                }
            ]
        }
    ]

    return (
        <>
            <div className="text-gray-500 bg-white dark:bg-zinc-900 dark:text-gray-100 shadow-xl z-[999] w-[16rem] max-w-[16rem] h-screen overflow-hidden md:relative sticky top-0 left-0 !bottom-0">
                <div className="flex items-center gap-2.5 font-bold border-b border-slate-300 dark:border-gray-700 py-3 mx-3">
                    <h1 className="text-xl whitespace-pre"> 
                        Workdeal
                    </h1>
                </div>
                
                <div className="flex flex-col h-full px-3">
                    <ul className="gap-2 py-3 flex flex-col gap-1 overflow-x-hidden scrollbar-track-white dark:scrollbar-black scrollbar-thumb-slate-200 dark:scrollbar-thumb-zinc-800" style={{ scrollbarWidth: 'thin' }}>
                        {
                            menu.map((item:any, index: any)=>{
                                const isActive = item.path === pathname;

                                return (
                                    <li className={`p-1 ${isActive && ' rounded-lg bg-slate-100 dark:bg-black/30'}`} key={index}>
                                        <Link href={item.path} className="flex flex-row gap-2 whitespace-pre">
                                            { <item.icon size={23} /> }
                                            { item.label }
                                        </Link>
                                    </li>
                                )
                            })
                        }

                        <div className="border-y py-2 px-3 border-slate-300 dark:border-gray-700">
                            <small className="text-xs text-slate-500">Categoria de negócios</small>
                            <div className="py-4 flex flex-col gap-2">
                                { subMenuList.map((menu:any, index: any) => (
                                    <div key={index} className="flex flex-col gap-2">
                                        <SubMenu data={menu} />
                                    </div>
                                )) }
                            </div>
                        </div>

                        <li className={`p-2 ${pathname === '/settings' && ' rounded-lg bg-slate-200 dark:bg-black/30'}`}>
                            <Link href="/settings" className="flex flex-row gap-2">
                                <SlSettings size={23} />
                                Definições
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}