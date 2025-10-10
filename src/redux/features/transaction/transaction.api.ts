import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types";
import type {
  ISendMoneyPayload,
  IAmountPayload,
  ITransactionResponse,
  IWithdrawPayload
} from "@/types/transaction.types";

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendMoney: builder.mutation<IResponse<ITransactionResponse>, ISendMoneyPayload>({
      query: (data) => ({
        url: "/transactions/send-money",
        method: "POST",
        data,
      }),
    }),
    addMoney: builder.mutation<IResponse<ITransactionResponse>, IAmountPayload>({
      query: (data) => ({
        url: "/transactions/add-money",
        method: "POST",
        data,
      }),
    }),
    withdrawMoney: builder.mutation<IResponse<ITransactionResponse>, IWithdrawPayload>({
      query: (data) => ({
        url: "/transactions/withdraw",
        method: "POST",
        data,
      }),
    }),
  }),
});

export const {
  useSendMoneyMutation,
  useAddMoneyMutation,
  useWithdrawMoneyMutation,
} = transactionApi;
