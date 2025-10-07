
import { SendMoney } from "@/pages/transaction/SendMoney";
import { UserProfile } from "@/pages/user/UserProfile";
import { UserUpdateForm } from "@/pages/user/UserUpdateForm";
import type { ISidebarItem } from "@/types";



export const userSidebarItems: ISidebarItem[] = [
  {
    title: "Personal Info",
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
        title: "Send Money",
        url: "/user/send-money",
        component:SendMoney,
      },
    ],
    
  },
];
