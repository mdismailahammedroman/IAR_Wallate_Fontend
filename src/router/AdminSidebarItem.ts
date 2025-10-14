
import Analytics from "@/pages/admin/Analytics";
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
        title: "User Manage",
        url: "analytics",
        component: Analytics,
      },
      {
        title: "Agent Manage",
        url: "analytics",
        component: Analytics,
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
