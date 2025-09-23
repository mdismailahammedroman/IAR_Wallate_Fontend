
import { EditUserProfile } from "@/components/Authentication/EditUserProfile";
import { UserProfile } from "@/pages/user/UserProfile";
import type { ISidebarItem } from "@/types";


export const agentSidebarItems: ISidebarItem[] = [
  {
    title: "Agent",
    items: [
      {
        title: "My Wallet",
        url: "me",
        component: UserProfile,
      },
      {
        title: "Update Profile",
        url: "id",
        component: EditUserProfile,
      },
    ],
  },
];