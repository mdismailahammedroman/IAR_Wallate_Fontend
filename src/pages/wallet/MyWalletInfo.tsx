import { useMemo } from "react";
import { useNavigate } from "react-router";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMyTransactionsQuery, useMyWalletQuery } from "@/redux/features/wallet/wallet.api";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

export function MyWalletInfo() {
  const navigate = useNavigate();

  // Fetch wallet & balance
  const { data: walletResp, isLoading: loadingWallet } =  useMyWalletQuery(undefined, {
  refetchOnMountOrArgChange: true,
});
  const walletData = walletResp?.data;

  // Fetch user info (to get role)
  const { data: userData } = useUserInfoQuery(undefined);

  // Fetch recent transactions (e.g. limit = 5, page = 1)
  const { data: txnResp, isLoading: loadingTxns } = useMyTransactionsQuery({
    limit: 5,
    page: 1,
  });
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const transactions = txnResp?.data?.transactions || [];
  console.log(transactions);
  

  const role = userData?.data?.role;
  const isUser = role === "USER";
  const isAgent = role === "AGENT";

  // Calculate totals for chart and summary
 const {
  totalAgentCashIn,
  totalAgentCashOut,
  totalUserSend,
  totalUserAdd,
  totalUserWithdraw,
} = useMemo(() => {
  let agentCashIn = 0;
  let agentCashOut = 0;
  let userSend = 0;
  let userAdd = 0;
  let userWithdraw = 0;

  transactions.forEach((t) => {
    const byAgent = !!t.fromAgent; // Use `fromAgent` for agent transactions

    if (t.transactionType === "CASH_IN" && byAgent) {
      agentCashIn += t.amount;
    } else if (t.transactionType === "CASH_OUT" && byAgent) {
      agentCashOut += t.amount;
    } else if (t.transactionType === "SEND" && !byAgent) {
      userSend += t.amount;
    } else if (t.transactionType === "ADD" && !byAgent) {
      userAdd += t.amount;
    } else if (t.transactionType === "WITHDRAW" && !byAgent) {
      userWithdraw += t.amount;
    }
  });

  return {
    totalAgentCashIn: agentCashIn,
    totalAgentCashOut: agentCashOut,
    totalUserSend: userSend,
    totalUserAdd: userAdd,
    totalUserWithdraw: userWithdraw,
  };
}, [transactions]);


  const chartData = useMemo(() => {
  if (isUser) {
    return [
      { name: "Send", value: totalUserSend },
      { name: "Add", value: totalUserAdd },
      { name: "Withdraw", value: totalUserWithdraw },
    ];
  }
  if (isAgent) {
    return [
      { name: "Cash In", value: totalAgentCashIn },
      { name: "Cash Out", value: totalAgentCashOut },
    ];
  }

  // For others (if needed)
  return [
    { name: "Cash In", value: totalAgentCashIn },
    { name: "Cash Out", value: totalAgentCashOut },
  ];
}, [
  isUser,
  isAgent,
  totalAgentCashIn,
  totalAgentCashOut,
  totalUserSend,
  totalUserAdd,
  totalUserWithdraw,
]);

console.log(chartData);
  const COLORS = ["#4ade80", "#730bdb", "#3b82f6", "#fbbf24"]; // green, red, blue, yellow

  // Format balance (fallback to 0)
  const balance = walletData?.balance ?? 0;

  return (
    <div className="space-y-8">
      {/* Wallet Balance & Quick Actions */}
      <div className="grid dashboard-stats  gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="col-span-1 mt-4">
          <CardHeader>
            <CardTitle>Wallet Balance</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingWallet ? (
              <Skeleton className="h-8 w-36" />
            ) : (
              <p className="text-3xl font-bold text-green-600">
                ৳ {balance.toLocaleString()}
              </p>
            )}

          </CardContent>
        </Card>

        <Card className="col-span-1 mt-4">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4 flex-wrap">
            {isUser && (
              <>
                <Button
                  onClick={() => navigate("/user/transactions/cash-in")}
                  className="w-[140px]"
                >
                  Cash In
                </Button>
                <Button
                  onClick={() => navigate("/user/transactions/cash-out")}
                  className="w-[140px]"
                >
                  Cash Out
                </Button>
              </>
            )}

            {isAgent && (
              <>
                <Button
                  onClick={() => navigate("/agent/transactions/cash-in")}
                  className="w-[140px]"
                >
                  Cash In
                </Button>
                <Button
                  onClick={() => navigate("/agent/transactions/cash-out")}
                  className="w-[140px]"
                >
                  Cash Out
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Pie Chart Card */}
        <Card className="lg:col-span-2 mt-4">
          <CardHeader>
            <CardTitle>
              {isUser
                ? "User Transaction Breakdown"
                : isAgent
                  ? "Agent Transaction Breakdown"
                  : "Transaction Breakdown"}
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    label
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => `৳ ${value.toLocaleString()}`}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p>No data to show.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingTxns ? (
  <Skeleton className="h-[300px] w-full" />
          ) : transactions.length === 0 ? (
            <p>No recent transactions.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((txn) => (
                    <TableRow key={txn._id}>
                      <TableCell>{txn.transactionType}</TableCell>
                      <TableCell>৳ {txn.amount}</TableCell>
                      <TableCell>{txn.fromUser?.name || "-"}</TableCell>
                      <TableCell>{txn.toUser?.name || "-"}</TableCell>
                      <TableCell>
                        {new Date(txn.createdAt).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
