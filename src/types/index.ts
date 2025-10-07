export type {IResponse,ILoginPayload,ILoginRespons,IRegisterPayload,IsendOtp,ApiError, IverifyOtp,} from "@/types/auth.types"

import type { ComponentType } from "react";

export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}

export type TRole = "SUPER_ADMIN" | "ADMIN" |"AGENT"| "USER";

