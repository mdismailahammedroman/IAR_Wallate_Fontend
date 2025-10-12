// src/routes/agentSidebarItems.ts
import TransactionPage from "@/pages/transaction/TransactionPage";
import { UserProfile } from "@/pages/user/UserProfile";
import { UserUpdateForm } from "@/pages/user/UserUpdateForm";
import { MyTransactionHistory } from "@/pages/wallet/MyTransactionHistory";
import { MyWalletInfo } from "@/pages/wallet/MyWalletInfo";
import type { ISidebarItem } from "@/types";

export const agentSidebarItems: ISidebarItem[] = [
  {
    title: "Agent Personal Info",
    items: [
      {
        title: "Profile",
        url: "/user/me",
        component: UserProfile,
      },
      {
        title: "Update Profile",
        url: "/user/update",
        component: UserUpdateForm,
      },
    ],
  },
  {
    title: "Transactions",
    items: [
      {
        title: "Cash In",
        url: "/user/transactions/cash-in",
        component: TransactionPage,
      },
      {
        title: "Cash Out",
        url: "/user/transactions/cash-out",
        component: TransactionPage,
      },
    ],
  },
   {
      title: "wallet Info",
      items: [
        {
          title: "My Wallet",
          url: "/user/wallets/me",
          component: MyWalletInfo
  
        },
        {
          title: "My Transaction History",
          url: "/user/transactions/me",
          component: MyTransactionHistory
  
        },
      ],
    },
];
