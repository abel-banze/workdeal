import { PublicHeader } from "@/components";

export default function PublicLayout( { children } : {
    children: React.ReactNode
} ){
    return (
        <>
            <div className="w-full flex flex-col">
                <PublicHeader />
                { children }
            </div>
        </>
    )
}