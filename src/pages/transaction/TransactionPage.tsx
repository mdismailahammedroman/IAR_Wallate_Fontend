import { useLocation } from "react-router";
import { MoneyTransactionForm } from "./MoneyTransactionForm";

type TransactionType = "send" | "add" | "withdraw" | "cashin" | "cashout";

const getTransactionTypeFromPath = (pathname: string): TransactionType => {
  if (pathname.includes("add-money")) return "add";
  if (pathname.includes("withdraw-money")) return "withdraw";
  if (pathname.includes("cash-in")) return "cashin";
  if (pathname.includes("cash-out")) return "cashout";
  return "send"; // default
};

const TransactionPage = () => {
  const location = useLocation();
  const type = getTransactionTypeFromPath(location.pathname);

  return <MoneyTransactionForm type={type} />;
};

export default TransactionPage;
