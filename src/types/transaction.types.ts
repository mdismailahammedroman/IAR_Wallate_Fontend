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
// Request payload for add/withdraw money
export interface IAmountPayload {
  amount: number;
  agentIdentifier?: string;
  
}
export interface IWithdrawPayload {
  amount: number;
  agentId: string;

}



export interface ITransactionResponse {
  transactionId: string;
  createdAt: string;
  amount: number;
  senderPrevBalance: number;
  senderNewBalance: number;
  receiverPrevBalance?: number;
  receiverNewBalance?: number;
}
