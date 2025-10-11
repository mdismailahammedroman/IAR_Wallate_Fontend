import TransactionPage from "@/pages/transaction/TransactionPage";
import { UserProfile } from "@/pages/user/UserProfile";
import { UserUpdateForm } from "@/pages/user/UserUpdateForm";                     
import { MyTransactionHistory } from "@/pages/wallet/MyTransactionHistory";
import { MyWalletInfo } from "@/pages/wallet/MyWalletInfo";
import type { ISidebarItem } from "@/types";


export const userSidebarItems: ISidebarItem[] = [
  {
    title: "Personal Info",
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
        title: "Send Money",
        url: "/user/send-money",
        component: TransactionPage

      },
      {
        title: "Add Money",
        url: "/user/add-money",
       component: TransactionPage
      },
      {
        title: "Withdraw Money",
        url: "/user/withdraw-money",
       component: TransactionPage
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
