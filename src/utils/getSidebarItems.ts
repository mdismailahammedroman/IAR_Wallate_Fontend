

import { adminSidebarItems } from "@/router/AdminSidebarItem";
import { agentSidebarItems } from "@/router/agentSidebar";
import { userSidebarItems } from "@/router/userSidebarItems";




export const getSidebarItems = (userRole: string) => {
  switch (userRole) {
    case "SUPER_ADMIN":
      return [...adminSidebarItems];
    case "ADMIN":
      return [...adminSidebarItems];
    case "AGENT":
     return [...agentSidebarItems];
    case "USER":
      return [...userSidebarItems];
    default:
      return []; // or return guestSidebarItems if you want
  }
};
