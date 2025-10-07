export interface ISendMoneyPayload {
  receiverId: string;
  amount: number;
}

export interface ITransaction {
  _id: string;
  transactionType: string;
  fromUser?: { _id: string; name: string; email: string; role: string };
  toUser?: { _id: string; name: string; email: string; role: string };
  amount: number;
  status: string;
  createdAt: string;
}

export interface ISendMoneyResponse {
  message: string;
  newSenderBalance: number;
  transaction: ITransaction;
}
