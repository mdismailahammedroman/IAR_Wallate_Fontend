import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth =  (Component: ComponentType, requiredRole?: TRole[]) => {
  return function AuthWrapper() {
    const { data, isLoading } = useUserInfoQuery(undefined);

    if (!isLoading && !data?.data?.email) {
      return <Navigate to="/auth/login" />;
    }

   if (
  requiredRole &&
  !isLoading &&
  !requiredRole.includes(data?.data?.role as TRole)
) {
  return <Navigate to="/unauthorized" />;
}


    return <Component />;
  };
};