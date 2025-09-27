import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, requiredRoles?: TRole | TRole[]) => {
  return function AuthWrapper() {
    const { data, isLoading } = useUserInfoQuery(undefined);

    const role = data?.data?.role ?? localStorage.getItem("role");
    const email = data?.data?.email ?? localStorage.getItem("email");

    if (!isLoading && !email) {
      return <Navigate to="/auth/login" />;
    }

    // ✅ Normalize to array
    const allowedRoles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];

    // ✅ Check if current role is in allowedRoles
    if (requiredRoles && !isLoading && !allowedRoles.includes(role as TRole)) {
      return <Navigate to="/unauthorized" />;
    }

    return <Component />;
  };
};
