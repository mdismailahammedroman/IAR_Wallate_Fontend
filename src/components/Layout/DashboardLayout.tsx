import { Outlet } from "react-router";
import { ModeToggle } from "./mode.toggle";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "../ui/app-sidebar";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { getSidebarItems } from "@/utils/getSidebarItems";
import { Separator } from "../ui/separator";

export const DashboardLayout = () => {
  const { data, isLoading } = useUserInfoQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const userRole = data?.data?.role?.toUpperCase() ?? localStorage.getItem("role")?.toUpperCase() ?? "PUBLIC";
console.log("DashboardLayout userRole:", userRole);

  const sidebarItems = getSidebarItems(userRole);

  console.log("User Role in DashboardLayout:", userRole);
  console.log("Sidebar Items:", sidebarItems);

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
