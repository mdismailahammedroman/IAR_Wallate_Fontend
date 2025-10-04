import { baseApi } from "@/redux/baseApi";
import type {
  ILoginAndRegister,
  ILoginPayload,
  ILoginRespons,
  IRegisterPayload,
  IResponse,
  IsendOtp,
  IverifyOtp,
  UpdateUserPayload,
} from "@/types/auth.types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    userRegister: builder.mutation<
      IResponse<ILoginAndRegister>,
      IRegisterPayload
    >({
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
    userInfo: builder.query<IResponse<ILoginAndRegister>, void>({
  query: () => ({
    url: "/user/me",
    method: "GET",
  }),
  providesTags: ["USER"],
}),



    updateUser: builder.mutation<IResponse<ILoginAndRegister>, { id: string; updateData: UpdateUserPayload }>({
      query: ({ id, updateData }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        body: updateData, // ✅ Use 'body' instead of 'data'
      }),
    }),
  }),
});

export const {
  useUserRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useUserInfoQuery,
  useUpdateUserMutation,
} = authApi;
