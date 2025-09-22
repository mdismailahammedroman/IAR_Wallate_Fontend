import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode.toggle";
import { Menu } from "lucide-react";

import { Link, NavLink } from "react-router";
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { useDispatch } from "react-redux";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { RoleSelectionModal } from "../Authentication/RoleSelectionModal";

const links = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/pricing", label: "Pricing" },
  { path: "/contact", label: "Contact" },
  { path: "/faq", label: "FAQ" },
];

export default function Navbar() {
  const { data } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await logout(undefined);
    dispatch(authApi.util.resetApiState());
  };

  return (
    <header className="sticky top-0 z-50 bg-indigo-700 dark:bg-gray-900 text-white dark:text-gray-200 shadow-md">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold hover:text-indigo-300">
          IAR-WalletPro
        </Link>

        {/* Desktop navigation */}
        <NavigationMenu className="hidden md:block">
          <NavigationMenuList className="flex gap-6">
            {links.map((route, i) => (
              <NavigationMenuItem key={i}>
                <NavigationMenuLink asChild>
                  <NavLink
                    to={route.path}
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
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile menu */}
        <div className="md:hidden flex items-center gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[250px] pt-10">
              <nav className="flex flex-col gap-4  ml-5">
                {links.map((route, i) => (
                  <NavLink
                    key={i}
                    to={route.path}
                    className={({ isActive }) =>
                      isActive
                        ? "text-indigo-600 font-semibold"
                        : "hover:text-indigo-400"
                    }
                  >
                    {route.label}
                  </NavLink>
                ))}

                <div className="mt-6 border-t pt-4">
                  {!data?.data?.email ? (
                    <div className="flex flex-col-reverse sm:flex-row lg:flex-row gap-2">
                      <RoleSelectionModal action="login" />
                      <RoleSelectionModal action="register" />

                    </div>

                  ) : (
                    <button
                      onClick={handleLogout}
                      className="text-red-500 hover:underline"
                    >
                      Sign Out
                    </button>
                  )}
                </div>

                <div className="mt-4">
                  <ModeToggle />
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Theme toggle next to menu button */}
          <ModeToggle />
        </div>

        {/* Right side - desktop auth buttons */}
   {/* Right side - desktop auth buttons */}
<div className="hidden md:flex gap-3 items-center">
  {!data?.data?.email ? (
    <>
      <RoleSelectionModal action="login" />
      <RoleSelectionModal action="register" />
    </>
  ) : (
    <Button onClick={handleLogout}>Sign Out</Button>
  )}

  <ModeToggle />
</div>

      </nav>
    </header>
  );
}
