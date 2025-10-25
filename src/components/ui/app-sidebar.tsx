import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Link } from "react-router"
import type { ISidebarItem } from "@/types"
import { Wallet } from "lucide-react"

interface AppSidebarProps {
  items: ISidebarItem[];
   className?: string;
}

export default function AppSidebar({ items, ...props }: AppSidebarProps) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link to={"/"} className="flex items-center gap-2 p-2">
          <Wallet className="w-6 h-6 text-indigo-600" />
          <h2 className="text-xl font-bold hover:text-indigo-300">IAR Wallet</h2>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {items.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {item.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((subItem) => {
                  const IconComponent = subItem.icon;
                  return (
                    <SidebarMenuItem key={subItem.title}>
                      <SidebarMenuButton asChild className="w-full justify-start">
                        <Link to={subItem.url} className="flex items-center gap-2">
                          {IconComponent && <IconComponent className="w-4 h-4" />}
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
