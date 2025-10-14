
import Analytics from "@/pages/admin/Analytics";
import AgentManagement from "@/pages/user/AgentManagement";
import ManageUsersAndAgents from "@/pages/user/ManageUsersAndAgents";
import UserManagement from "@/pages/user/UserManagement";
import { UserProfile } from "@/pages/user/UserProfile";
import type { ISidebarItem } from "@/types";


export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "admin",
    items: [
   
      {
        title: "Update Profile",
        url: "analytics",
        component: Analytics,
      },
      {
        title: "Manage User",
        url: "manageuser",
        component: UserManagement,
      },
      {
        title: "Manage Agent",
        url: "manageagent",
        component: AgentManagement,
      },
      {
        title: "Manage Agent and user",
        url: "manageagent",
        component: ManageUsersAndAgents,
      },
    ],
  },
  {
    title: "Profile",
    items: [
      {
        title: "My Wallet",
        url: "me",
        component: UserProfile,
      },
    
    ],
  },
];
