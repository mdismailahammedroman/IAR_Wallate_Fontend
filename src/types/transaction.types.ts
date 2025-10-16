import type { IUser } from "./auth.types";

// --- Payload Interfaces ---
export interface ISendMoneyPayload {
  receiverId: string;
  amount: number;
}

export interface IAmountPayload {
  amount: number;
   agentId: string;
  agentIdentifier?: string; // Optional for addMoney
}

export interface IWithdrawPayload {
  amount: number;
  agentId: string;
}

// --- Wallet Interface ---
export interface IWallet {
  _id: string;
  user: IUser;
  balance: number;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
}

// --- Transaction Interface ---
export interface ITransaction {
  _id: string;
  transactionType: "SEND" | "WITHDRAW" | "ADD"|"CASH_IN"| "CASH_OUT"; // Add union if known
  fromUser?: IUser;
  toUser?: IUser;
  toAgent?: IUser;
  amount: number;
  status: "PENDING" | "COMPLETED" | "FAILED"; // Improve typing
  createdAt: string;
}

// --- Transaction Response ---
export interface ISendMoneyResponse {
  message: string;
  newSenderBalance: number;
  transaction: ITransaction;
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

// --- Paged Transaction API Response ---
export interface ITransactionListResponse {
  transactions: ITransaction[];
  total: number;
  limit: number;
}


export interface ICashInPayload {
  amount: number;
   userId: string;
}

export interface ICashOutPayload {
  amount: number;
   userId: string;
}

export interface ITransaction {
  _id: string;
  type: "SEND" | "WITHDRAW" | "ADD" | "CASH_IN" | "CASH_OUT";
  amount: number;
  from: string;
  to: string;
  createdAt: string;
  status: "PENDING" | "COMPLETED" | "FAILED";

  initiatedByUser?: {
    _id: string;
    name: string;
    email: string;
  };

  initiatedByAgent?: {
    _id: string;
    name: string;
    email: string;
  };

  fromUser?: IUser;
  toUser?: IUser;
  fromAgent?: IUser;
  toAgent?: IUser;
}

export interface IPaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  success: boolean;
  message?: string;
}
