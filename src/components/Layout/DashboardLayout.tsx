"use client";

import { Outlet } from "react-router";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import AppSidebar from "../ui/app-sidebar";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { getSidebarItems } from "@/utils/getSidebarItems";
import { Separator } from "../ui/separator";
import ModeToggle from "./mode.toggle";
import { Spinner } from "../ui/spinner";
import { Button } from "../ui/button";
import { useEffect } from "react";
import { resetTour, restartTour, startTour } from "../Tour/tour";

const DashboardLayout = () => {
  const { data, isLoading } = useUserInfoQuery();
  const role = data?.data?.role || "PUBLIC";

    useEffect(() => {
    if (!role) return; // wait until role is loaded
    const tourCompleted = localStorage.getItem(`tourCompleted-${role}`);
    if (!tourCompleted) {
      startTour(role);
    }
  }, [role]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner className="size-8" />
      </div>
    );
  }

  const sidebarItems = getSidebarItems(role);

  return (
    <SidebarProvider>
      <AppSidebar items={sidebarItems} />

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <ModeToggle className="mode-toggle" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className="text-sm"
              onClick={() => restartTour(role)}
            >
              Restart Tour
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-sm"
              onClick={() => resetTour(role)}
            >
              Reset Tour
            </Button>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
