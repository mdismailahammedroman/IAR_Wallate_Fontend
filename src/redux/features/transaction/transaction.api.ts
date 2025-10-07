import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types";
import type { ISendMoneyPayload, ISendMoneyResponse } from "@/types/transaction.types";


export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendMoney: builder.mutation<IResponse<ISendMoneyResponse>, ISendMoneyPayload>({
      query: (data) => ({
        url: "/transactions/send-money",
        method: "POST",
        data,
      }),
    }),
  }),
});

export const { useSendMoneyMutation } = transactionApi;
