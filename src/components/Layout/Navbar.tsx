import { useMemo } from "react";
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

// ✅ Shepherd.js
import Shepherd from "shepherd.js";
import "shepherd.js/dist/css/shepherd.css";

// Public navigation links
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
  const { data } = useUserInfoQuery(undefined);

  const userRole = data?.data?.role;
  const userEmail = data?.data?.email;

  const handleLogout = async () => {
    await logout(undefined);
    localStorage.clear();
    dispatch(authApi.util.resetApiState());
  };

  // Filter links based on role
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

  // ✅ Shepherd tour steps
  const startTour = () => {
    const tour = new Shepherd.Tour({
      defaultStepOptions: {
        cancelIcon: { enabled: true },
        classes: "shadow-md bg-indigo-600 text-white",
        scrollTo: { behavior: "smooth", block: "center" },
      },
      useModalOverlay: true,
    });

    tour.addStep({
      id: "mobile-menu",
      text: "This is the mobile menu toggle!",
      attachTo: {
        element: ".mobile-menu-toggle",
        on: "right",
      },
      buttons: [
        { text: "Next", action: tour.next },
      ],
    });

    tour.addStep({
      id: "theme-toggle",
      text: "Click here to switch between light and dark mode.",
      attachTo: {
        element: ".mode-toggle",
        on: "left",
      },
      buttons: [
        { text: "Back", action: tour.back },
        { text: "Finish", action: tour.complete },
      ],
    });

    tour.start();
  };

  return (
    <header className="sticky top-0 z-50 bg-indigo-700 dark:bg-gray-700 text-white dark:text-gray-200 shadow-md">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden mobile-menu-toggle"
                variant="ghost"
                size="icon"
              >
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
          {/* ✅ Add className for Shepherd targeting */}
          <ModeToggle className="mode-toggle" />

          {/* ✅ Show Start Tour button only when logged in */}
          {userEmail && (
            <Button
              onClick={startTour}
              variant="secondary"
              className="text-sm"
            >
              Start Tour
            </Button>
          )}

          {userEmail ? (
            <Button
              onClick={handleLogout}
              variant="outline"
              className="text-sm text-gray-950"
            >
              Logout
            </Button>
          ) : (
            <>
              <Button asChild className="text-sm">
                <Link to="/auth/login">Login</Link>
              </Button>
              <Button asChild className="text-sm">
                <Link to="/user/register">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
