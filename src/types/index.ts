/* eslint-disable @typescript-eslint/no-explicit-any */
export type {IResponse,ILoginPayload,ILoginRespons,IRegisterPayload,IsendOtp,ApiError, IverifyOtp,} from "@/types/auth.types"

import type { LucideIcon } from "lucide-react";
import type { ComponentType } from "react";

export interface ISubItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  component?: ComponentType<any>; // <-- Add this
}

export interface ISidebarItem {
  title: string;
  items: ISubItem[];
}


export type TRole = "SUPER_ADMIN" | "ADMIN" |"AGENT"| "USER";

