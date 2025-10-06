import  { useMemo } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { role } from "@/constants/roles";
import ModeToggle from "./mode.toggle";

// Original navigation links (public only)
const baseLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/about", label: "About", role: "PUBLIC" },
  { href: "/faq", label: "FAQ", role: "PUBLIC" },
];

// Role-based dashboard routing
const roleDashboards = {
  [role.ADMIN]: "/admin",
  [role.SUPER_ADMIN]: "/admin",
  [role.USER]: "/user",
  [role.AGENT]: "/user",
};

export default function Navbar() {
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const { data, isLoading, isError, error } = useUserInfoQuery(undefined);

console.log("User Info Response:", { data, isLoading, isError, error });

  const userRole = data?.data?.role;
  const userEmail = data?.data?.email;
console.log(data?.data);

  const handleLogout = async () => {
    await logout(undefined);
    localStorage.clear();
    dispatch(authApi.util.resetApiState());
    
  };

  const filteredLinks = useMemo(() => {
    const links = [...baseLinks];

    if (userRole && userRole in roleDashboards) {
  links.push({
    href: roleDashboards[userRole as keyof typeof roleDashboards],
    label: "Dashboard",
    role: userRole,
  });
}


    return links;
  }, [userRole]);

  return (
    <header className="sticky top-0 z-50 bg-indigo-700 dark:bg-gray-700 text-white dark:text-gray-200 shadow-md">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu */}
          <Popover>
            <PopoverTrigger asChild>
              <Button className="group size-8 md:hidden" variant="ghost" size="icon">
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0">
                  {filteredLinks.map((link, idx) => (
                    <NavigationMenuItem key={idx} className="w-full">
                      <NavigationMenuLink asChild className="py-1.5">
                        <Link to={link.href}>{link.label}</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>

          {/* Logo + desktop menu */}
          <div className="flex items-center gap-6">
            <h1 className="text-oklch hover:text-primary/90 font-bold text-2xl">
              IAR Wallet
            </h1>
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {filteredLinks.map((link, idx) => (
                  <NavigationMenuItem key={idx}>
                    <NavigationMenuLink
                      asChild
                      className="text-oklch hover:text-primary py-1.5 font-medium"
                    >
                      <Link to={link.href}>{link.label}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <ModeToggle />

          {userEmail ? (
            <Button
              onClick={handleLogout}
              variant="outline"
              className="text-sm text-gray-950"
            >
              Logout
            </Button>
          ) : (
            <Button asChild className="text-sm">
              <Link to="/auth/login">Login</Link>
            </Button>
          )}

          {/* Sign Up Role Selector */}
          {!userEmail &&
            <Button asChild className="text-sm">
              <Link to="/user/regiser">sign up</Link>
            </Button>
          }
        </div>
      </div>
    </header>
  );
}
