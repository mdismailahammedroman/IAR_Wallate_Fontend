import { Outlet } from "react-router";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { getSidebarItems } from "@/utils/getSidebarItems";
import { Separator } from "../ui/separator";
import ModeToggle from "./mode.toggle";
import AppSidebar from "../ui/app-sidebar";

 const DashboardLayout = () => {
  const { data, isLoading } = useUserInfoQuery();

  if (isLoading) {
    return    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-row gap-2">
  <div className="w-4 h-4 rounded-full bg-gray-400 animate-bounce"></div>
  <div className="w-4 h-4 rounded-full bg-gray-400 animate-bounce [animation-delay:-.3s]"></div>
  <div className="w-4 h-4 rounded-full bg-gray-400 animate-bounce [animation-delay:-.5s]"></div>
</div>
    </div>
  }

  const userRole = data?.data?.role?.toUpperCase() ?? localStorage.getItem("role")?.toUpperCase() ?? "PUBLIC";

  const sidebarItems = getSidebarItems(userRole);

  

  return (
    <SidebarProvider>
      <AppSidebar items={sidebarItems} />

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
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout