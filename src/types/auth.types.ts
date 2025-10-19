/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IRegisterPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "USER" | "AGENT";
}



export interface ILoginPayload {
  email: string
  password: string
}



export interface ILoginRespons {
  accessToken: string
  refreshToken: string
  user:ILoginAndRegister
  role:Role
}

export interface ILoginAndRegister {
  _id: string
  
  email: string;
  password: string;
  name?: string; // maybe optional for login
  role?: string;
  phone?: string; // ✅ Add this line
  address?: string;
  profileImage?: string;
  dateOfBirth?: string;
  isVerified: boolean
  userStatus: string
  isDeleted: boolean
  isActive: string
  auths: Auth[]
  approved: boolean
  commissionRate: number
  createdAt: string
  updatedAt: string

}

export interface Auth {
  provider: string
  providerID: string
}


export interface IsendOtp{
  email:string,
}
export interface IverifyOtp{
  email:string,
  otp:string,
}

export interface IUserAuth {
  provider: string;
  providerID: string;
}

export type UserRole = "USER" | "AGENT" | "ADMIN";
export type UserStatus = "PENDING" | "APPROVED" | "REJECTED"; // Add if needed
export type ActiveStatus = "ACTIVE" | "INACTIVE";

export type UpdateUserPayload = {
  name?: string;
  picture?: string;
  phone?: string;
  address?: string;
  profileImage?: string;
  dateOfBirth?: string;
};
export interface IResponse<T> {
  avatar: string | undefined;
  email: string;
  isActive: string;
  role: string;
  name: string;
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export interface ISearchedUser {
  userStatus: string;
  isActive: string;
  isSuspended: any;
  isBlocked: any;
  isApproved: any;
  _id: string;
  name: string;
  email: string;
  role: string;
}


export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: string;
}


export interface ApiError {
  status: number;
  data: {
    message?: string;
    errors?: Record<string, string[]>;
    [key: string]: any;
  };
}



export const Role = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  USER: "USER",
  AGENT: "AGENT",
} as const;

export type Role = (typeof Role)[keyof typeof Role];

export interface OverviewResponse {
  totalUsers: number;
  totalAgents: number;
  transactionCount: number;
  transactionVolume: {
    deposit: number;
    withdraw: number;
    transfer: number;
  };
}
