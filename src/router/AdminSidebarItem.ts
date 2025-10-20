
import Analytics from "@/pages/admin/Analytics";
import TransactionList from "@/pages/transaction/TransactionList";
import AgentManagement from "@/pages/user/AgentManagement";
import UserManagement from "@/pages/user/UserManagement";
import { UserProfile } from "@/pages/user/UserProfile";
import type { ISidebarItem } from "@/types";
import { 
  BarChart3, 
  Users, 
  UserCheck, 
  List, 
  Wallet, 
  Settings,
  TrendingUp,
  Shield
} from "lucide-react";

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "analytics",
        component: Analytics,
        icon: BarChart3,
      },
      {
        title: "Overview",
        url: "overview",
        component: Analytics,
        icon: TrendingUp,
      },
    ],
  },
  {
    title: "User Management",
    items: [
      {
        title: "Manage Users",
        url: "manageuser",
        component: UserManagement,
        icon: Users,
      },
      {
        title: "Manage Agents",
        url: "manageagent",
        component: AgentManagement,
        icon: UserCheck,
      },
    ],
  },
  {
    title: "Transactions",
    items: [
      {
        title: "All Transactions",
        url: "transction",
        component: TransactionList,
        icon: List,
      },
    ],
  },
  {
    title: "Profile & Settings",
    items: [
      {
        title: "My Wallet",
        url: "me",
        component: UserProfile,
        icon: Wallet,
      },
      {
        title: "Settings",
        url: "settings",
        component: UserProfile,
        icon: Settings,
      },
    ],
  },
];

