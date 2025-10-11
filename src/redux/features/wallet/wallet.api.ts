// redux/features/wallet/wallet.api.ts

import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types";
import type { ITransactionListResponse, IWallet } from "@/types/transaction.types";



export const walletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    myWallet: builder.query<IResponse<IWallet>, void>({
      query: () => ({
        url: "/wallets/me", 
        method: "GET",
      }),
    }),
    myTransactions: builder.query<IResponse<ITransactionListResponse>, { limit: number; page: number }>({
      query: ({ limit, page }) => ({
        url: `/wallets/transactions/me?limit=${limit}&page=${page}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useMyWalletQuery,
  useMyTransactionsQuery
} = walletApi;
