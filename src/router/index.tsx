import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";

import { withAuth } from "@/utils/withAuth";
import { role } from "@/constants/roles";
import type { TRole } from "@/types";

import { userSidebarItems } from "./userSidebarItems";
import { adminSidebarItems } from "./AdminSidebarItem";
import { agentSidebarItems } from "./agentSidebar";
import { generateRoutes } from "@/utils/generateRoutes";

// Lazy-loaded components
const App = lazy(() => import("@/App"));
const DashboardLayout = lazy(() =>import ("@/components/Layout/DashboardLayout"))
const RegisterForm = lazy(() => import("@/components/Authentication/RegisterForm"));
const LoginForm = lazy(() => import("@/components/Authentication/LoginForm"));
const Verify = lazy(() => import("@/pages/user/Verify"));
const UnAuthorized = lazy(() => import("@/pages/UnAuthorized/UnAuthorized"));

const HomePage = lazy(() => import("@/pages/home/HomePage"));
const About = lazy(() => import("@/pages/About/About"));
const Contact = lazy(() => import("@/pages/home/Contact"));
const FAQ = lazy(() => import("@/pages/home/Faq"));
const Pricing = lazy(() => import("@/pages/home/Pricing"));



// Router configuration
const router = createBrowserRouter([
  {
    path: "/",
    Component: () => <App />,
    children: [
      { path: "", element: <HomePage />},
      { path: "about", element: <About />},
      { path: "pricing", element: <Pricing />},
      { path: "contact", element: <Contact />},
      { path: "faq", element: <FAQ />},
    ],
  },

  {
    path: "/admin",
    Component:  withAuth(DashboardLayout, role.ADMIN as TRole),
    children: [
      { index: true, element: <Navigate to="/admin/analytics" /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },
  {
    path: "/admin",
    Component:  withAuth(DashboardLayout, role.SUPER_ADMIN as TRole),
    children: [
      { index: true, element: <Navigate to="/admin/analytics" /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },

  {
    path: "/agent",
    Component: 
      withAuth(DashboardLayout, role.AGENT as TRole),
    children: [
      { index: true, element: <Navigate to="/agent/me" /> },
      ...generateRoutes(agentSidebarItems),
    ],
  },

  {
    path: "/user",
    Component:
      withAuth(DashboardLayout, role.USER as TRole),
    children: [
      { index: true, element: <Navigate to="/user/bookings" /> },
      ...generateRoutes(userSidebarItems),
    ],
  },

  {
    path: "/user/register",
    element: <RegisterForm role="USER" />,
  },
  {
    path: "/agent/agent-register",
    element: <RegisterForm role="AGENT" />,
  },
  {
    path: "/auth/login",
    element: <LoginForm />,
  },
  {
    path: "/unauthorized",
    element: <UnAuthorized />,
  },
  {
    path: "/verify",
    element: <Verify />,
  },
]);

export default router;
