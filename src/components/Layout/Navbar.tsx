import React from "react";
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
  useGetAgentInfoQuery,
} from "@/redux/features/auth/auth.api";
import { useDispatch } from "react-redux";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { RoleSelectionModal } from "../Authentication/RoleSelectionModal";
import { role } from "@/constants/roles";

export default function Navbar() {
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();

  const storedRole = localStorage.getItem("role") || "PUBLIC";

  // Fetch user or agent info conditionally
  const {
    data: userRes,
    isLoading: userLoading,

  } = useUserInfoQuery(undefined, { skip: storedRole !== role.USER });

  const {
    data: agentRes,
    isLoading: agentLoading,

  } = useGetAgentInfoQuery(undefined, { skip: storedRole !== role.AGENT });

  const data = storedRole === role.AGENT ? agentRes : userRes;
  const isLoading = storedRole === role.AGENT ? agentLoading : userLoading;

  const user = data?.data;
  const userRole = user?.role || storedRole;
  const userEmail = user?.email || localStorage.getItem("email");

  if (isLoading) return <p>Loading...</p>;


  // 🧠 Determine dashboard path based on role
  const dashboardHref =
    userRole === role.ADMIN || userRole === role.SUPER_ADMIN
      ? "/admin/analytics"
      : userRole === role.AGENT
      ? "/agent/me"
      : userRole === role.USER
      ? "/user/me"
      : "/";

  // 🧭 Navigation links
  const links = [
    { href: "/", label: "Home", roles: ["PUBLIC"] },
    { href: "/about", label: "About", roles: ["PUBLIC"] },
    { href: "/faq", label: "Faq", roles: ["PUBLIC"] },
    {
      href: dashboardHref,
      label: "Dashboard",
      roles: [role.ADMIN, role.SUPER_ADMIN, role.AGENT, role.USER],
    },
  ];

  // 🧹 Logout handler
  const handleLogout = async () => {
    await logout(undefined);
    dispatch(authApi.util.resetApiState());
    localStorage.clear();
    window.location.href = "/auth/login";
  };

  return (
    <header className="sticky top-0 z-50 bg-indigo-700 dark:bg-gray-900 text-white dark:text-gray-200 shadow-md">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold hover:text-indigo-300">
          IAR-WalletPro
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:block">
          <NavigationMenuList className="flex gap-6">
            {links.map((link, index) => {
              const isPublic = link.roles.includes("PUBLIC");
              const isPrivate = link.roles.includes(userRole);

              if (isPublic || isPrivate) {
                return (
                  <NavigationMenuItem key={index} className="w-full">
                    <NavigationMenuLink asChild className="py-1.5">
                      <NavLink
                        to={link.href}
                        className={({ isActive }) =>
                          isActive
                            ? "border-b-2 border-white font-semibold"
                            : "hover:border-b-2 hover:border-indigo-300"
                        }
                      >
                        {link.label}
                      </NavLink>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              }

              return null;
            })}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[250px] pt-10">
              <nav className="flex flex-col gap-4 ml-5">
                {links.map((link, i) => {
                  const isPublic = link.roles.includes("PUBLIC");
                  const isPrivate = link.roles.includes(userRole);

                  if (isPublic || isPrivate) {
                    return (
                      <NavLink
                        key={i}
                        to={link.href}
                        className={({ isActive }) =>
                          isActive
                            ? "text-indigo-600 font-semibold"
                            : "hover:text-indigo-400"
                        }
                      >
                        {link.label}
                      </NavLink>
                    );
                  }

                  return null;
                })}

                {/* Auth Actions */}
                <div className="mt-6 border-t pt-4">
                  {!userEmail ? (
                    <div className="flex flex-col-reverse sm:flex-row lg:flex-row gap-2">
                      <Button asChild className="text-sm">
                        <Link to="/auth/login">Login</Link>
                      </Button>
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

          <ModeToggle />
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex gap-3 items-center">
          {!userEmail ? (
            <>
              <Button asChild className="text-sm">
                <Link to="/auth/login">Login</Link>
              </Button>
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
