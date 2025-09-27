// userSidebarItems.ts
import { UserProfile } from "@/pages/user/UserProfile";
import { UserUpdateForm } from "@/pages/user/UserUpdateForm";
import type { ISidebarItem } from "@/types";

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "user",
    items: [
      {
        title: "Profile",
        url: "me",
        component: UserProfile,
      },
      {
        title: "Edit Profile",
        url: "edit", 
        component: UserUpdateForm,
      },
      {
        title: "Update Profile",
        url: "ismail",
        component: UserProfile,
      },
    ],
  },
];
