
import { UserProfile } from "@/pages/user/UserProfile";
import type { ISidebarItem } from "@/types";



export const userSidebarItems: ISidebarItem[] = [
  {
    title: "History",
    items: [
      {
        title: "Bookings",
        url: "/user/me",
        component:UserProfile,
      },
    ],
  },
];
