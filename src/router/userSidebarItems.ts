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
  Send, 
  Plus, 
  Minus, 
  History,
  Home,
  Key,
} from "lucide-react";

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
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
    title: "Personal Info",
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
    title: "Transactions",
    items: [
      {
        title: "Send Money",
        url: "/user/send-money",
        component: TransactionPage,
        icon: Send,
      },
      {
        title: "Add Money",
        url: "/user/add-money",
        component: TransactionPage,
        icon: Plus,
      },
      {
        title: "Withdraw Money",
        url: "/user/withdraw-money",
        component: TransactionPage,
        icon: Minus,
      },
    ],
  },
  {
    title: "Transaction Info",
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
