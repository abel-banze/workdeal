import { SidebarDashboard, Headbar } from "@/components"

export default function DashboardLayout({ children } : {
    children: React.ReactNode
}){
    return (
        <>
            <div className="w-full flex flex-row">
                <SidebarDashboard />
                <div className="w-full flex flex-col gap-5">
                    <Headbar />
                    <div>
                        { children }
                    </div>
                </div>
            </div>
        </>
    )
}