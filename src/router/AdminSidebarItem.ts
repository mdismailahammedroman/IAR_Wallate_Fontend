
import Analytics from "@/pages/admin/Analytics";
import TransactionList from "@/pages/transaction/TransactionList";
import AgentManagement from "@/pages/user/AgentManagement";
import UserManagement from "@/pages/user/UserManagement";
import { UserProfile } from "@/pages/user/UserProfile";
import type { ISidebarItem } from "@/types";


export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "admin",
    items: [
   
      {
        title: "Dashbord",
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
        title: "Transaction list",
        url: "transction",
        component: TransactionList,
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
