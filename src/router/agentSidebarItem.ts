// src/routes/agentSidebarItems.ts
import TransactionPage from "@/pages/transaction/TransactionPage";
import ChangePasswordForm from "@/pages/user/ChangePasswordForm";
import { UserProfile } from "@/pages/user/UserProfile";
import { UserUpdateForm } from "@/pages/user/UserUpdateForm";
import { MyTransactionHistory } from "@/pages/wallet/MyTransactionHistory";
import { MyWalletInfo } from "@/pages/wallet/MyWalletInfo";
import type { ISidebarItem } from "@/types";
import { 
  User, 
  Edit3, 
  Key, 
  ArrowDownToLine, 
  ArrowUpFromLine, 
  History,
  Home,
} from "lucide-react";

export const agentSidebarItems: ISidebarItem[] = [
  {
    title: "Agent Dashboard",
    items: [
      {
        title: "Home",
        url: "/user/home",
        component: MyWalletInfo,
        icon: Home,
      }
    ],
  },
  {
    title: "Agent Profile",
    items: [
      {
        title: "Profile",
        url: "/user/me",
        component: UserProfile,
        icon: User,
      },
      {
        title: "Update Profile",
        url: "/user/update",
        component: UserUpdateForm,
        icon: Edit3,
      },
      {
        title: "Change Password",
        url: "/user/change-password",
        component: ChangePasswordForm,
        icon: Key,
      },
    ],
  },
  {
    title: "Agent Transactions",
    items: [
      {
        title: "Cash In",
        url: "/user/transactions/cash-in",
        component: TransactionPage,
        icon: ArrowDownToLine,
      },
      {
        title: "Cash Out",
        url: "/user/transactions/cash-out",
        component: TransactionPage,
        icon: ArrowUpFromLine,
      },
    ],
  },
  {
    title: "Wallet Management",
    items: [
    
      {
        title: "Transaction History",
        url: "/user/transactions/me",
        component: MyTransactionHistory,
        icon: History,
      },
    ],
  },
];
