import App from "@/App";
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
    
   
])
export default router;