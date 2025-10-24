import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Users,
  Activity,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
} from "lucide-react";
import { useGetAllTransactionsQuery } from "@/redux/features/transaction/transaction.api";

// Recharts for the revenue chart
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Pie,
  Legend,
  PieChart,
  Cell,
} from "recharts";
import { useGetOverviewQuery } from "@/redux/features/auth/auth.api";
import { Link } from "react-router";

export default function Analytics() {
  const { data: overviewData, refetch: refetchOverview } = useGetOverviewQuery();
  const { data: transactionData, refetch: refetchTransactions } = useGetAllTransactionsQuery({ page: 1, limit: 50 });


  const handleRefresh = () => {
    refetchOverview();
    refetchTransactions();
  };

  const overview = overviewData?.data;
  const recentTransactionsData = transactionData?.data || [];

  // ==============================
  // 🧾 Create monthly revenue data
  // ==============================
  const monthlyRevenue = (() => {
    const data = (recentTransactionsData || []).reduce<Record<string, number>>((acc, tx) => {
      const month = new Date(tx.createdAt).toLocaleString("default", { month: "short" });
      if (!acc[month]) acc[month] = 0;
      acc[month] += tx.amount || 0;
      return acc;
    }, {});

    // last 6 months, sorted
    const now = new Date();
    const months = Array.from({ length: 6 }).map((_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
      const monthName = d.toLocaleString("default", { month: "short" });
      return {
        month: monthName,
        revenue: data[monthName] || 0,
      };
    });

    return months;
  })();

  // ======================================
  // 🧮 Generate top users from transactions
  // ======================================
  type TxUser = {
    name: string;
    email?: string;
    balance: number;
    transactions: number;
  };

  const topUsers: TxUser[] = Object.values(
    (recentTransactionsData || []).reduce<Record<string, TxUser>>((acc, tx) => {
      const user =
        tx.initiatedByUser?.name ||
        tx.initiatedByAgent?.name ||
        tx.fromUser?.name ||
        tx.toUser?.name;
      const email =
        tx.initiatedByUser?.email ||
        tx.initiatedByAgent?.email ||
        tx.fromUser?.email ||
        tx.toUser?.email;

      if (!user) return acc;

      if (!acc[user]) {
        acc[user] = {
          name: user,
          email,
          balance: tx.amount || 0,
          transactions: 1,
        };
      } else {
        acc[user].balance += tx.amount || 0;
        acc[user].transactions += 1;
      }

      return acc;
    }, {})
  )
    .sort((a, b) => b.balance - a.balance)
    .slice(0, 5);

  // ===================================
  // 🧾 Map real recent transactions data
  // ===================================
  const recentTransactions = (recentTransactionsData || []).slice(0, 5).map((tx) => ({
    id: tx._id,
    user:
      tx.initiatedByUser?.name ||
      tx.initiatedByAgent?.name ||
      tx.fromUser?.name ||
      tx.toUser?.name ||
      "Unknown",
    amount: `$${tx.amount}`,
    type: tx.transactionType.replace("_", " "),
    status: tx.status.charAt(0).toUpperCase() + tx.status.slice(1),
    time: new Date(tx.createdAt).toLocaleString(),
  }));

  // ===================================
  // 🧾 Dashboard Stats Cards
  // ===================================
  const stats = [
    {
      title: "Total Users",
      value: overview?.totalUsers ?? "0",
      change: "+8.2%",
      trend: "up",
      icon: Users,
      description: "Registered users",
    },
    {
      title: "Total Agents",
      value: overview?.totalAgents ?? "0",
      change: "+5.4%",
      trend: "up",
      icon: Activity,
      description: "Approved agents",
    },
    {
      title: "System Wallet Balance",
      value: `$${(overview?.totalWalletBalance ?? 12345).toLocaleString()}`,

      change: "+3.1%",
      trend: "up",
      icon: Wallet,
      description: "Combined user wallet balance",
    },

  ];


  const transactionTypeSummary = (() => {
    const summary: Record<string, number> = {};

    (recentTransactionsData || []).forEach((tx) => {
      const type = tx.transactionType?.replace("_", " ") || "Unknown";
      summary[type] = (summary[type] || 0) + 1;
    });

    const colors: Record<string, string> = {
      Send: "#4f46e5",
      Add: "#10b981",
      Withdraw: "#ef4444",
      "Cash In": "#f59e0b",
      "Cash Out": "#3b82f6",
      Unknown: "#9ca3af",
    };

    return Object.entries(summary).map(([type, value]) => ({
      type,
      value,
      color: colors[type] || "#6b7280",
    }));
  })();

  return (
    <div className="space-y-6 dashboard-analytics">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your wallet system performance and user activity
          </p>
        </div>
        <Button onClick={handleRefresh} variant="outline" size="sm" className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4" />
          Refresh Data
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 dashboard-stats">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const isPositive = stat.trend === "up";

          return (
            <Card key={index} className="hover:shadow-md transition-shadow ">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  {isPositive ? (
                    <ArrowUpRight className="h-3 w-3 text-green-600" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 text-red-600" />
                  )}
                  <span className={isPositive ? "text-green-600" : "text-red-600"}>
                    {stat.change}
                  </span>
                  <span>{stat.description}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Chart + Recent Transactions */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-6 dashboard-chart">
        {/* Revenue Chart */}
        <Card className="col-span-3 ">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue trends for the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyRevenue} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      borderRadius: "8px",
                      border: "1px solid #e5e7eb",
                    }}
                    labelStyle={{ color: "#111827" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#4f46e5"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#4f46e5" }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Transaction Type Breakdown</CardTitle>
            <CardDescription>Distribution of Send, Add, Withdraw, Cash In, Cash Out</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={transactionTypeSummary}
                    dataKey="value"
                    nameKey="type"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={(entry) => `${entry.type} (${entry.value})`}
                  >
                    {transactionTypeSummary.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

      </div>


      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-6 dashboard-top-users">
        {/* Top Users */}
        <Card className="col-span-6 md:col-span-2 lg:col-span-3 ">
          <CardHeader>
            <CardTitle>Top Users</CardTitle>
            <CardDescription>Users with the highest wallet balances</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topUsers.map((user, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-indigo-600 font-bold text-sm">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">
                      ${user.balance.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      {user.transactions} transactions
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="col-span-6 md:col-span-2 lg:col-span-3 dashboard-transactions">
          <CardHeader>
            <CardTitle>Transactions</CardTitle>
            <CardDescription>
              Latest wallet transactions across the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 dark:bg-gray-800 bg-gray-100 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${transaction.status === "Completed"
                          ? "bg-green-500"
                          : transaction.status === "Pending"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                    />
                    <div>
                      <p className="font-medium text-sm">{transaction.user}</p>
                      <p className="text-xs text-gray-500">{transaction.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">{transaction.amount}</p>
                    <Badge
                      variant={
                        transaction.status === "Completed"
                          ? "default"
                          : "secondary"
                      }
                      className="text-xs"
                    >
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Users */}


      {/* Quick Actions */}
      <Card className="dashboard-actionss">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Link to={"/admin/manageuser"}  className="h-20 flex flex-col items-center justify-center gap-2 border-2 rounded-xl">
              <Users className="w-6 h-6" />
              <span>Manage Users</span>
            </Link>
            <Link to={"/admin/transction"}  className="h-20 flex flex-col items-center justify-center gap-2 border-2 rounded-xl">
              <Activity className="w-6 h-6" />
              <span>View Transactions</span>
            </Link>
            <Link to={"/admin/manageagent"}  className="h-20 flex flex-col items-center justify-center gap-2 border-2 rounded-xl">
              <TrendingUp className="w-6 h-6" />
              <span>Manage Agents</span>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
