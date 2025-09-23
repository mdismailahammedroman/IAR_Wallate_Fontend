
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@radix-ui/react-separator"
import { Outlet } from "react-router"
import { AppSidebar } from "../ui/app-sidebar"
import { ModeToggle } from "./mode.toggle"


export const DashboardLayout = () => {
  return (
    <SidebarProvider>
      
      <AppSidebar />

      <SidebarInset>

        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <ModeToggle />

          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
        

        </header>
        
        <div className="flex flex-1 flex-col gap-4 p-4">
          
    <Outlet/>     
         
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}


