import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";

import { withAuth } from "@/utils/withAuth";

// import { userSidebarItems } from "./userSidebarItems";
import { adminSidebarItems } from "./AdminSidebarItem";
import { generateRoutes } from "@/utils/generateRoutes";
import { userSidebarItems } from "./userSidebarItems";
import { role } from "@/constants/roles";
import { agentSidebarItems } from "./agentSidebarItem";
import { Features } from "@/pages/home/Features";

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
      { path: "Features ", element: <Features />},
      { path: "contact", element: <Contact />},
      { path: "faq", element: <FAQ />},
    ],
  },
{
  Component: withAuth(DashboardLayout, [role.ADMIN, role.SUPER_ADMIN]),
  path: "/admin",
  children: [
    { index: true, element: <Navigate to="/admin/analytics" /> },
    ...generateRoutes(adminSidebarItems),
  ],
},
{
  Component: withAuth(DashboardLayout, [role.AGENT, role.USER]),
  path: "/user",
  children: [
    { index: true, element: <Navigate to="/user/home" /> },
   ...generateRoutes([...userSidebarItems, ...agentSidebarItems]),
  ],
},

  {
    path: "/user/register",
    element: <RegisterForm/>,
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
