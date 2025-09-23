

import { UserProfile } from "@/pages/user/UserProfile";
import type { ISidebarItem } from "@/types";


export const userSidebarItems: ISidebarItem[] = [
 {
    title: "user",
    items: [
   
      {
        title: "Update Profile",
        url: "me",
        component: UserProfile,
      },
      {
        title: "Update Profile",
        url: "hello",
        component: UserProfile,
      },
      {
        title: "Update Profile",
        url: "ismail",
        component: UserProfile,
      },
    ],
  },
  // {
  //   title: "Profile",
  //   items: [
  //     {
  //       title: "My Wallet",
  //       url: "me",
  //       // component: hello,
  //     },
    
  //   ],
  // },
];