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
  ITransactionListResponse,
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
    addMoney: builder.mutation<IResponse<ITransactionResponse>, IAmountPayload>(
      {
        query: (data) => ({
          url: "/transactions/add-money",
          method: "POST",
          data,
        }),
         invalidatesTags: ["Wallet"],
      }
    ),
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

    // ✅ NEW
    cashIn: builder.mutation<IResponse<ITransactionResponse>, ICashInPayload>({
      query: (data) => ({
        url: "/transactions/cash-in",
        method: "POST",
        data,
      }),
       invalidatesTags: ["Wallet"],
    }),
    cashOut: builder.mutation<IResponse<ITransactionResponse>, ICashOutPayload>(
      {
        query: (data) => ({
          url: "/transactions/cash-out",
          method: "POST",
          data,
        }),
         invalidatesTags: ["Wallet"],
      }
    ),
    // in transactionApi
    getAllTransactions: builder.query<IPaginatedResponse<ITransaction>, any>({

      query: (params) => ({
        url: "/transactions/all-transactions",
        method: "GET",
        params,
      }),
    }),
   
    
    // 👇 GET for User Transactions
    getUserTransactions: builder.query<
      IResponse<ITransactionListResponse>,
      {
        limit: number;
        page: number;
        type?: string;
        startDate?: string;
        endDate?: string;
      }
    >({
      query: ({ limit, page, type, startDate, endDate }) => {
        const params = new URLSearchParams();
        params.append("limit", limit.toString());
        params.append("page", page.toString());
        if (type) params.append("type", type);
        if (startDate) params.append("startDate", startDate);
        if (endDate) params.append("endDate", endDate);

        return {
          url: `/transactions/user-transaction?${params.toString()}`,
          method: "GET",
        };
      },
    }),

    // 👇 GET for Agent Transactions
    getAgentTransactions: builder.query<
      IResponse<ITransactionListResponse>,
      {
        limit: number;
        page: number;
        type?: string;
        startDate?: string;
        endDate?: string;
      }
    >({
      query: ({ limit, page, type, startDate, endDate }) => {
        const params = new URLSearchParams();
        params.append("limit", limit.toString());
        params.append("page", page.toString());
        if (type) params.append("type", type);
        if (startDate) params.append("startDate", startDate);
        if (endDate) params.append("endDate", endDate);

        return {
          url: `/transactions/agent-transaction?${params.toString()}`,
          method: "GET",
        };
      },
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
  useGetAgentTransactionsQuery,
  useGetUserTransactionsQuery,
} = transactionApi;
