import { baseApi } from "@/redux/baseApi";
import type {
  ILoginAndRegister,
  ILoginPayload,
  ILoginRespons,
  IRegisterPayload,
  IResponse,
  IsendOtp,
  IverifyOtp,
} from "@/types/auth.types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<IResponse<ILoginAndRegister>, IRegisterPayload>({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        data: userInfo,
      }),
    }),
    login: builder.mutation<IResponse<ILoginRespons>, ILoginPayload>({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
    }),
    sendOtp: builder.mutation<IResponse<null>, IsendOtp>({
      query: (userInfo) => ({
        url: "/otp/sendotp",
        method: "POST",
        data: userInfo,
      }),
    }),
    verifyOtp: builder.mutation<IResponse<null>, IverifyOtp>({
      query: (userInfo) => ({
        url: "/otp/verifyotp",
        method: "POST",
        data: userInfo,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["USER"],
    }),
    userInfo: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useUserInfoQuery
} = authApi;
