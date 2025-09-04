
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

import { ModeToggle } from "./mode.toggle"
import { Link, NavLink } from "react-router"

const routes = [
  { href: "/", label: "Home" },
  {
    label: "Features",
    megaMenu: [
      { href: "/features/security", label: "Security" },
      { href: "/features/usability", label: "Usability" },
      { href: "/features/integrations", label: "Integrations" },
    ],
  },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
]

export default function Navbar() {
  return (
   <header className="sticky top-0 z-50 bg-indigo-700 dark:bg-gray-900 text-white dark:text-gray-200 shadow-md">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold hover:text-indigo-300">
          WalletPro
        </Link>

        {/* Desktop nav */}
        <NavigationMenu className="hidden md:block">
          <NavigationMenuList className="flex gap-6">
            {routes.map((route, i) =>
              route.megaMenu ? (
                <NavigationMenuItem key={i} className="relative group">
                  <Popover>
                    <PopoverTrigger asChild>
                      <NavigationMenuLink
                        className="cursor-pointer"
                      >
                        {route.label}
                      </NavigationMenuLink>
                    </PopoverTrigger>
                    <PopoverContent
                      side="bottom"
                      align="start"
                      className="w-64 p-4 bg-white text-black rounded-lg shadow-lg"
                    >
                      <ul className="flex flex-col gap-3">
                        {route.megaMenu.map((item, j) => (
                          <li key={j}>
                            <Link
                              to={item.href}
                              className="block px-2 py-1 rounded hover:bg-indigo-100"
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </PopoverContent>
                  </Popover>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={i}>
                  <NavigationMenuLink asChild>
                    <NavLink
                      to={route.href}
                      className={({ isActive }) =>
                        isActive
                          ? "border-b-2 border-white font-semibold"
                          : "hover:border-b-2 hover:border-indigo-300"
                      }
                    >
                      {route.label}
                    </NavLink>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )
            )}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile menu - simplified */}
        <div className="md:hidden flex items-center gap-4">
          {/* Could add mobile menu button here */}
          <ModeToggle />
        </div>

        {/* Right side buttons */}
        <div className="hidden md:flex gap-3 items-center">
          <Button variant="ghost" asChild>
            <Link to="/login">Sign In</Link>
          </Button>
          <Button asChild>
            <Link to="/signup">Sign Up</Link>
          </Button>
          <ModeToggle />
        </div>
      </nav>
    </header>
  )
}
