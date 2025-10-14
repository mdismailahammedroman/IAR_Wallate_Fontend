import { baseApi } from "@/redux/baseApi";
import type {
  ILoginAndRegister,
  ILoginPayload,
  ILoginRespons,
  IRegisterPayload,
  IResponse,
  ISearchedUser,
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

    updateUser: builder.mutation<
      IResponse<ILoginAndRegister>,
      { updateData: UpdateUserPayload }
    >({
      query: ({ updateData }) => ({
        url: `/user/update`,
        method: "PATCH",
        data: updateData, // ✅ Use 'body' instead of 'data'
      }),
    }),
    // Inside authApi.injectEndpoints(...)
   searchUsers: builder.query<
  IResponse<ISearchedUser[]>,
  { name: string; roles: string[] }
>({
  query: ({ name, roles }) => ({
    url: `/user/search`,
    method: "GET",
    params: { name, roles: roles.join(",") },
  }),
}),
fetchUsers: builder.query({
      query: () => ({
        url: "/admin/users",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
    blockUnblockUser: builder.mutation({
      query: ({ id, action }: { id: string; action: "block" | "unblock" }) => ({
        url: `/admin/users/${id}/block-unblock`,
        method: "PATCH",
        data: { action },
      }),
      invalidatesTags: ["USER"],
    }),

    fetchAgents: builder.query({
      query: () => ({
        url: "/admin/agents",
        method: "GET",
      }),
      providesTags: ["AGENT"],
    }),
    approveAgent: builder.mutation({
      query: (id: string) => ({
        url: `/admin/agents/${id}/approve`,
        method: "PATCH",
      }),
      invalidatesTags: ["AGENT"],
    }),
    suspendAgent: builder.mutation({
      query: (id: string) => ({
        url: `/admin/agents/${id}/suspend`,
        method: "PATCH",
      }),
      invalidatesTags: ["AGENT"],
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
  useSearchUsersQuery,
    useFetchUsersQuery,
  useBlockUnblockUserMutation,
  useFetchAgentsQuery,
  useApproveAgentMutation,
  useSuspendAgentMutation,
} = authApi;
