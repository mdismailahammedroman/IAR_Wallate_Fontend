import { useLocation } from "react-router";
import { MoneyTransactionForm } from "./MoneyTransactionForm";

const TransactionPage = () => {
  const location = useLocation();

  let type: "send" | "add" | "withdraw"| "cashin" | "cashout"  = "send";



  if (location.pathname.includes("add-money")) type = "add";
  else if (location.pathname.includes("withdraw-money")) type = "withdraw";
  else if (location.pathname.includes("cash-in")) type = "cashin";
  else if (location.pathname.includes("cash-out")) type = "cashout";

  return <MoneyTransactionForm type={type} />;
};

export default TransactionPage;
