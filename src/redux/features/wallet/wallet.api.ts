// redux/features/wallet/wallet.api.ts

import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types";
import type {
  ITransactionListResponse,
  IWallet,
} from "@/types/transaction.types";

export const walletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    myWallet: builder.query<IResponse<IWallet>, void>({
      query: () => ({
        url: "/wallets/me",
        method: "GET",
      }),
       providesTags: ["Wallet"],
    }),
    myTransactions: builder.query<
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
          url: `/wallets/transactions/me?${params.toString()}`,
          method: "GET",
        };
      },
providesTags: ["Wallet"],

    }),
  }),
});

export const { useMyWalletQuery, useMyTransactionsQuery } = walletApi;
