import { useLocation } from "react-router";
import { MoneyTransactionForm } from "./MoneyTransactionForm";

const TransactionPage = () => {
  const location = useLocation();

  let type: "send" | "add" | "withdraw" = "send";

  if (location.pathname.includes("add-money")) type = "add";
  else if (location.pathname.includes("withdraw-money")) type = "withdraw";

  return <MoneyTransactionForm type={type} />;
};

export default TransactionPage;
