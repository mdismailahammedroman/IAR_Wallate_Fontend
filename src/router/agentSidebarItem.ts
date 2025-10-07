
import { UserProfile } from "@/pages/user/UserProfile";
import { UserUpdateForm } from "@/pages/user/UserUpdateForm";
import type { ISidebarItem } from "@/types";



export const agentSidebarItems: ISidebarItem[] = [
  {
    title: "Agent Personal Info",
    items: [
      {
        title: "Profile",
        url: "/user/me",
        component:UserProfile,
      },
      {
        title: "Update Profile",
        url: "/user/update",
        component:UserUpdateForm,
      },
    ],
    
  },
    {
    title: "transaction",
    items: [
      {
        title: "cash in",
        url: "/user/send-money",
        component:UserProfile,
      },
    ],
    
  },
];
