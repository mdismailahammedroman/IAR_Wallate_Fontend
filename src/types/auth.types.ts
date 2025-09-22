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
}

export interface ILoginAndRegister {
  _id: string
  name: string
  email: string
  role: string
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

export interface IResponse<T> {
  statusCode: number
  success: boolean
  message: string
  data: T
}




// src/types/ApiError.ts

export interface ApiError {
  status: number;
  data: {
    message?: string;
    errors?: Record<string, string[]>;
    [key: string]: any;
  };
}



