import App from "@/App";
import { RegisterForm } from "@/components/Authentication/RegisterForm";

import { DashboardLayout } from "@/components/Layout/DashboardLayout";

import { About } from "@/pages/About/About";
import { Contact } from "@/pages/home/Contact";
import { FAQ } from "@/pages/home/Faq";
import HomePage from "@/pages/home/HomePage";
import Pricing from "@/pages/home/Pricing";
import { Verify } from "@/pages/user/Verify";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter, Navigate } from "react-router";
import { userSidebarItems } from "./userSidebarItems";
import { LoginForm } from "@/components/Authentication/LoginForm";
import { agentSidebarItems } from "./agentSidebar";
import { adminSidebarItems } from "./AdminSidebarItem";
import { role } from "@/constants/roles";
import type { TRole } from "@/types";
import { withAuth } from "@/utils/withAuth";
import { UnAuthorized } from "@/pages/UnAuthorized/UnAuthorized";



const router = createBrowserRouter([
    {
        Component: App,
        path: "/",
        children: [
            { path: "", element: <HomePage /> },
            { path: "about", element: <About /> },
            { path: "pricing", element: <Pricing /> },
            { path: "contact", element: <Contact /> },
            { path: "faq", element: <FAQ /> },
        ],
    },
    {
        Component:  withAuth(DashboardLayout, role.ADMIN as TRole),
        path: "/admin",
        children: [
              { index: true, element: <Navigate to="/admin/analytics" /> },
           ...generateRoutes(adminSidebarItems)
        ]
    },
    {
        //  withAuth(DashboardLayout, role.AGENT as TRole),
        Component:  withAuth(DashboardLayout, role.AGENT as TRole),
        path: "/agent",
        children: [
              { index: true, element: <Navigate to="/agent/me" /> },
            ...generateRoutes(agentSidebarItems)
        ]
    },
    {
        
        Component:  withAuth(DashboardLayout, role.USER as TRole),
        path: "/user",
        children: [
              { index: true, element: <Navigate to="/user/me" /> },
 ...generateRoutes(userSidebarItems)
        ]
    },
  {
  path: "/user/register",
  element: <RegisterForm role="USER" />
},
{
  path: "/agent/agent-register",
  element: <RegisterForm role="AGENT" />
},
{
  path: "/auth/login",
  element: <LoginForm  />
},  {
    Component: UnAuthorized,
    path: "/unauthorized",
  },


    {
        Component: Verify,
        path: "/verify"
    },


])
export default router;

