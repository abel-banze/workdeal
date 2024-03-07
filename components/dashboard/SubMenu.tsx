'use client'

import Link from "next/link"
import {IoIosArrowDown} from "react-icons/io"
import { motion } from "framer-motion"
import { useState } from "react"


export default function SubMenu({ data } : {data : any}){
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            { data.menu ? (
                <li 
                    className={`capitalize flex flex-row gap-2 justify-between items-center cursor-pointer ${isOpen && ' text-teal-500'}`}
                    onClick={()=> setIsOpen(!isOpen)}
                >
                    <div className="flex flex-row gap-2 items-center capitalize">
                        { <data.icon /> }
                        <p> {data?.name} </p>
                    </div>
                    { data.menu && (
                        <IoIosArrowDown className={`${isOpen && ' rotate-180 '} duration-200`} />
                    ) }
                </li>
            ) : (
                <li>
                    <Link href={`/${data.name}`} className="capitalize flex flex-row gap-2 justify-between items-center cursor-pointer">
                        <div className="flex flex-row gap-2 items-center capitalize">
                            { <data.icon /> }
                            <p> {data?.name} </p>
                        </div>
                        { data.menu && (
                            <IoIosArrowDown className={`${isOpen && ' rotate-180 '} duration-200`} />
                        ) }
                    </Link>
                </li>
            ) }

            <motion.ul 
                className="flex flex-col gap-2 ml-7 overflow-hidden"
                animate ={
                    isOpen
                    ? {
                        height: 'fit-content',
                    }
                    : {
                        height: 0,
                    }
                }
            >
                {data.menu && data.menu.map((item: any, index: any)=> (
                    <li 
                        key={index} 
                        className="text-sm"
                    >
                        <Link href={`/${data.name}/${item.url}`} className="capitalize">
                            {item.label}
                        </Link>
                    </li>
                ))}
            </motion.ul>
        </>
    )
}