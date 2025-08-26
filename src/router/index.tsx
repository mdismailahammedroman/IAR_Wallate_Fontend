import App from "@/App";
import { LoginForm } from "@/components/Authentication/LoginForm";
import { RegisterForm } from "@/components/Authentication/RegisterForm";
import { About } from "@/pages/About/About";
import { Contact } from "@/pages/home/Contact";
import { FAQ } from "@/pages/home/Faq";
import { Features } from "@/pages/home/Features";
import HomePage from "@/pages/home/HomePage";
import Pricing from "@/pages/home/Pricing";

import { createBrowserRouter } from "react-router";


const router=createBrowserRouter([
    {
        Component:App,
        path:"/",
       children: [
      { path: "", element: <HomePage /> },
      { path: "about", element: <About /> },
      { path: "features", element: <Features /> },
      { path: "pricing", element: <Pricing /> },
      { path: "contact", element: <Contact /> },
      { path: "faq", element: <FAQ /> },
    ],
    },
    {
        Component:LoginForm,
        path:"/login"
    },
    {
        Component:RegisterForm,
        path:"/register"
    },
   
   
])
export default router;