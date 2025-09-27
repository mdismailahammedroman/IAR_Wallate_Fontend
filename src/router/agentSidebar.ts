// userSidebarItems.ts
import { UserProfile } from "@/pages/user/UserProfile";
import { UserUpdateForm } from "@/pages/user/UserUpdateForm";
import type { ISidebarItem } from "@/types";

export const agentSidebarItems: ISidebarItem[] = [
  {
    title: "Agent",
    items: [
      { title: "My Wallet", url: "/agent/me", component: UserProfile },
      { title: "Update Profile", url: "/agent/profile", component:UserUpdateForm},
    ],
  },
];
