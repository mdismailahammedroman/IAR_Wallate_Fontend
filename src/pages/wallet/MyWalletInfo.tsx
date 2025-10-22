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
import { Skeleton } from "@/components/ui/skeleton";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import {
  useMyTransactionsQuery,
  useMyWalletQuery,
} from "@/redux/features/wallet/wallet.api";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import {
  useGetAgentTransactionsQuery
} from "@/redux/features/transaction/transaction.api";

export function MyWalletInfo() {
  const navigate = useNavigate();

  // Fetch wallet & balance
  const { data: walletResp, isLoading: loadingWallet } = useMyWalletQuery(
    undefined,
    { refetchOnMountOrArgChange: true }
  );
  const walletData = walletResp?.data;

  // Fetch user info (role)
  const { data: userData } = useUserInfoQuery(undefined);
  const role = userData?.data?.role;
  const isUser = role === "USER";
  const isAgent = role === "AGENT";

  // Always call both hooks, but use the appropriate one based on role
  const userQuery = useMyTransactionsQuery({
    limit: 5,
    page: 1,
  }, { skip: isAgent });

  const agentQuery = useGetAgentTransactionsQuery({
    limit: 5,
    page: 1,
  }, { skip: !isAgent });

  // Use the appropriate query result based on role
  const { data: txnResp, isLoading: loadingTxns } = isAgent ? agentQuery : userQuery;
  
  const transactions = useMemo(() => {
    return txnResp?.data?.transactions || [];
  }, [txnResp?.data?.transactions]);

  // Debug logging
  console.log("🔍 MyWalletInfo Debug:");
  console.log("Role:", role);
  console.log("Is Agent:", isAgent);
  console.log("User Query Data:", userQuery.data);
  console.log("Agent Query Data:", agentQuery.data);
  console.log("Selected Query Data:", txnResp);
  console.log("Transactions:", transactions);

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
    const type = (t.transactionType || "").toUpperCase();
    const amount = Number(t.amount) || 0;

    const isAgentTxn = !!t.initiatedByAgent || t.fromUser?.role === "AGENT" || t.toUser?.role === "AGENT";
    const isUserTxn = !!t.initiatedByUser || t.fromUser?.role === "USER" || t.toUser?.role === "USER";

    // Agent perspective
    if (isAgentTxn) {
      if (type === "CASH_IN") agentCashIn += amount;
      else if (type === "CASH_OUT") agentCashOut += amount;
    }

    // User perspective
    if (isUserTxn) {
      if (type === "SEND") userSend += amount;
      else if (type === "ADD" || type === "CASH_IN") userAdd += amount;
      else if (type === "WITHDRAW" || type === "CASH_OUT") userWithdraw += amount;
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


console.log("Transactions:", transactions);
console.log("AgentCashIn:", totalAgentCashIn);
console.log("AgentCashOut:", totalAgentCashOut);
console.log("UserAdd:", totalUserAdd);
console.log("UserWithdraw:", totalUserWithdraw);

  // Chart data
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

  // Chart colors
  const COLORS = {
    Send: "#3b82f6",      // blue
    Add: "#4ade80",       // green
    Withdraw: "#fbbf24",  // yellow
    "Cash In": "#22c55e", // green
    "Cash Out": "#fbbf24" // red
  };


  const balance = walletData?.balance ?? 0;

  return (
    <div className="space-y-8">
      {/* Wallet Balance & Quick Actions */}
      <div className="grid dashboard-stats gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Wallet Balance */}
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

        {/* Quick Actions */}
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
          </CardContent>
        </Card>

        {/* Pie Chart Breakdown */}
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
            {loadingTxns ? (
              <Skeleton className="h-[300px] w-full" />
            ) : chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={3}
                    label
                    isAnimationActive={true}
                    animationDuration={800}
                    cx="50%"
                    cy="50%"
                  >
                    {chartData.map((entry) => (
                      <Cell
                        key={entry.name}
                        fill={COLORS[entry.name as keyof typeof COLORS] || "#999"}
                      />
                    ))}

                  </Pie>
                  {/* Center total text */}
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-sm font-semibold fill-gray-700"
                  >
                    ৳{" "}
                    {chartData
                      .reduce((a, b) => a + b.value, 0)
                      .toLocaleString()}
                  </text>
                  <Tooltip
                    formatter={(value) => `৳ ${value.toLocaleString()}`}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-500">No data to show.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions Table */}
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
  <TableCell>
   {txn.fromUser?.name ||
    txn.fromAgent?.name ||
    txn.initiatedByAgent?.name ||
    "-"}
 </TableCell>
 <TableCell>
   {txn.toUser?.name ||
    txn.toAgent?.name ||
    txn.initiatedByUser?.name ||
    "-"}
 </TableCell>

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
