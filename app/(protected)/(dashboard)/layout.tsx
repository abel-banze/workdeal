import { SidebarDashboard } from "@/components"

export default function DashboardLayout({ children } : {
    children: React.ReactNode
}){
    return (
        <>
            <div className="w-full flex flex-row">
                <SidebarDashboard />
                <div className="w-full flex flex-col p-5 gap-5">
                    { children }
                </div>
            </div>
        </>
    )
}