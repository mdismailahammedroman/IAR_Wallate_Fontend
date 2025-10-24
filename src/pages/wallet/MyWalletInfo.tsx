import { useEffect, useMemo, useState } from "react";
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
  useMyWalletQuery,
} from "@/redux/features/wallet/wallet.api";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useGetMyTransactionsQuery } from "@/redux/features/transaction/transaction.api";
import { useTour } from "@/hooks/useTour";
import { getTourConfigByRole, hasSeenTour, markTourAsSeen } from "@/config/tours";


export function MyWalletInfo() {
  const navigate = useNavigate();

 

  const { data: walletResp, isLoading: loadingWallet } = useMyWalletQuery(
    undefined,
    { refetchOnMountOrArgChange: true }
  );
  const walletData = walletResp?.data;

  const { data: userData } = useUserInfoQuery(undefined);
  const role = userData?.data?.role;
  const isUser = role === "USER";
  const isAgent = role === "AGENT";

  const { data: txnResp, isLoading: loadingTxns } = useGetMyTransactionsQuery(
    { limit: 5, page: 1 },
    { refetchOnMountOrArgChange: true }
  );



  const transactions = useMemo(() => {
    return txnResp?.data?.data || [];
  }, [txnResp?.data]);
  console.log("Raw txnResp:", txnResp);
  console.log("Extracted transactions:", transactions);


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

      const isAgentTxn =
        !!t.initiatedByAgent || !!t.fromAgent || !!t.toAgent;

      const isUserTxn =
        !!t.initiatedByUser || !!t.fromUser || !!t.toUser;

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
    return [];
  }, [
    isUser,
    isAgent,
    totalAgentCashIn,
    totalAgentCashOut,
    totalUserSend,
    totalUserAdd,
    totalUserWithdraw,
  ]);

  const COLORS = {
    Send: "#3b82f6",
    Add: "#4ade80",
    Withdraw: "#fbbf24",
    "Cash In": "#22c55e",
    "Cash Out": "#f87171",
  };

  const balance = walletData?.balance ?? 0;

   const { startTour } = useTour();
  const [tourStarted, setTourStarted] = useState(false);

  useEffect(() => {
    if (!userData?.data || tourStarted) return;

    const tourConfig = getTourConfigByRole(role);
    if (!hasSeenTour(tourConfig.storageKey)) {
      startTour(tourConfig);
      markTourAsSeen(tourConfig.storageKey);
    }

    setTourStarted(true);
  }, [userData, role, startTour, tourStarted]);


  return (
<div className="space-y-8 mywallet-sidebar-nav">
      <div className="grid dashboard-stats gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="col-span-1 mt-4 mywallet-wallet-balance-card">
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

        <Card className="col-span-1 mt-4 mywallet-quick-actions-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4 flex-wrap">
            {isUser && (
              <>
                <Button
                  onClick={() => navigate("/user/transactions/send-money")}
                  className="w-[140px]"
                >
                  Send Money
                </Button>
                <Button
                  onClick={() => navigate("/user/transactions/add-money")}
                  className="w-[140px]"
                >
                  Add Money
                </Button>
                <Button
                  onClick={() => navigate("/user/transactions/withdraw")}
                  className="w-[140px]"
                >
                  Withdraw
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

        <Card className="lg:col-span-2 mt-4 mywallet-dashboard-transaction-breakdown">
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
                  >
                    {chartData.map((entry) => (
                      <Cell
                        key={entry.name}
                        fill={COLORS[entry.name as keyof typeof COLORS] || "#999"}
                      />
                    ))}
                  </Pie>
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
                  <Tooltip formatter={(value) => `৳ ${value.toLocaleString()}`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-500">No data to show.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mywallet-recent-transactions">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Recent Transactions</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/user/transactions/me")}
          >
            View All
          </Button>
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
                    <TableHead>Initiated By</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((txn) => (
                    <TableRow key={txn._id}>
                      <TableCell>{txn.transactionType}</TableCell>
                      <TableCell>৳ {txn.amount}</TableCell>
                      <TableCell>
                        {txn.fromUser?.name || txn.fromAgent?.name || "-"}
                      </TableCell>
                      <TableCell>
                        {txn.toUser?.name || txn.toAgent?.name || "-"}
                      </TableCell>
                      <TableCell>
                        {txn.initiatedByUser?.name || txn.initiatedByAgent?.name || "-"}
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
  