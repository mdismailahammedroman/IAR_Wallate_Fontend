import App from "@/App";
import { LoginForm } from "@/components/Authentication/LoginForm";
import { RegisterForm } from "@/components/Authentication/RegisterForm";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";

import { About } from "@/pages/About/About";
import { Analytics } from "@/pages/admin/Analytics";
import { AgentGetMe } from "@/pages/Agent/AgentGetMe";
import { Contact } from "@/pages/home/Contact";
import { FAQ } from "@/pages/home/Faq";
import HomePage from "@/pages/home/HomePage";
import Pricing from "@/pages/home/Pricing";
import { UserGetMe } from "@/pages/user/UserGetMe";
import { Verify } from "@/pages/user/Verify";
import { createBrowserRouter } from "react-router";


const router=createBrowserRouter([
    {
        Component:App,
        path:"/",
       children: [
      { path: "", element: <HomePage /> },
      { path: "about", element: <About /> },
      { path: "pricing", element: <Pricing /> },
      { path: "contact", element: <Contact /> },
      { path: "faq", element: <FAQ /> },
    ],
    },
    {
        Component:DashboardLayout,
        path:"/admin",
        children:[
            {
             element:<Analytics/>,
             path:"analytics"
            },
        ]
    },
    {
        Component:DashboardLayout,
        path:"/agent",
        children:[
            {
             element:<AgentGetMe/>,
             path:"me"
            },
        ]
    },
    {
        Component:DashboardLayout,
        path:"/user",
        children:[
            {
             element:<UserGetMe/>,
             path:"me"
            },
        ]
    },
    {
        Component:LoginForm,
        path:"/login"
    },
    {
        Component:RegisterForm,
        path:"/register"
    },
    {
        Component:Verify,
        path:"/verify"
    },
   
   
])
export default router;