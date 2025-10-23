/* eslint-disable @typescript-eslint/no-explicit-any */
// types
import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types";
import type {
  ICashInPayload,
  ICashOutPayload,
  ISendMoneyPayload,
  IAmountPayload,
  ITransactionResponse,
  IWithdrawPayload,
  ITransaction,
  IPaginatedResponse,
  ITransactionListWrapper,
} from "@/types/transaction.types";

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendMoney: builder.mutation<
      IResponse<ITransactionResponse>,
      ISendMoneyPayload
    >({
      query: (data) => ({
        url: "/transactions/send-money",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Wallet"],
    }),

    addMoney: builder.mutation<IResponse<ITransactionResponse>, IAmountPayload>({
      query: (data) => ({
        url: "/transactions/add-money",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Wallet"],
    }),

    withdrawMoney: builder.mutation<
      IResponse<ITransactionResponse>,
      IWithdrawPayload
    >({
      query: (data) => ({
        url: "/transactions/withdraw",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Wallet"],
    }),

    // Cash-In and Cash-Out (for agents)
    cashIn: builder.mutation<IResponse<ITransactionResponse>, ICashInPayload>({
      query: (data) => ({
        url: "/transactions/cash-in",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Wallet"],
    }),

    cashOut: builder.mutation<IResponse<ITransactionResponse>, ICashOutPayload>({
      query: (data) => ({
        url: "/transactions/cash-out",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Wallet"],
    }),

    // Get all transactions (for admin, super admin)
    getAllTransactions: builder.query<IPaginatedResponse<ITransaction>, any>({
      query: (params) => ({
        url: "/transactions/all-transactions",
        method: "GET",
        params,
      }),
    }),

   getMyTransactions: builder.query<ITransactionListWrapper, any>({
  query: (params) => ({
    url: "/transactions/my-transactions",
    method: "GET",
    params,
  }),
}),



    // Fetch user-specific transactions (admin, super admin, user)
    getUserTransactions: builder.query<IPaginatedResponse<ITransaction>, any>({
      query: (params) => ({
        url: "/transactions/user-transaction",  // Endpoint for user-specific transactions
        method: "GET",
        params,
      }),
    }),

    // Fetch agent-specific transactions (admin, super admin, agent)
    getAgentTransactions: builder.query<IPaginatedResponse<ITransaction>, any>({
      query: (params) => ({
        url: "/transactions/agent-transaction",  // Endpoint for agent-specific transactions
        method: "GET",
        params,
      }),
    }),
  }),
});

export const {
  useSendMoneyMutation,
  useAddMoneyMutation,
  useWithdrawMoneyMutation,
  useCashInMutation,
  useCashOutMutation,
  useGetAllTransactionsQuery,
  useGetMyTransactionsQuery,  // New hook for personal transactions
  useGetUserTransactionsQuery, // User-specific transactions
  useGetAgentTransactionsQuery, // Agent-specific transactions
} = transactionApi;
