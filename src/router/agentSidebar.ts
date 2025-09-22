import { UserGetMe } from "@/pages/user/UserGetMe";
import type { ISidebarItem } from "@/types/userAgent";

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "User",
    items: [
      {
        title: "My Wallet",
        url: "/user/me",
        component: UserGetMe ,
      },
    ],
  },
];