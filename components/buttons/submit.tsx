'use client'
import { ReloadIcon } from "@radix-ui/react-icons"
import { useFormStatus } from "react-dom"

export default function ButtonSubmit({ text } : { 
    text: string;
}){
    const { pending } = useFormStatus()

    return (
        <>
            <button
                type="submit"
                className="w-full p-2 bg-teal-600 text-white rounded-lg flex flex-row items-center justify-center"
            >
                { pending && <ReloadIcon className="mr-2 h-5 w-5 animate-spin" /> }
                { text }
            </button>
        </>
    )
}