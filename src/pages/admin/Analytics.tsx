import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Activity,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw
} from "lucide-react";

export default function Analytics() {
  // Mock data - replace with real data from your API
  const stats = [
    {
      title: "Total Revenue",
      value: "$124,500",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      description: "From last month"
    },
    {
      title: "Active Users",
      value: "2,847",
      change: "+8.2%",
      trend: "up",
      icon: Users,
      description: "Currently active"
    },
    {
      title: "Transactions",
      value: "15,432",
      change: "+3.1%",
      trend: "up",
      icon: Activity,
      description: "This month"
    },
    {
      title: "Wallet Balance",
      value: "$89,230",
      change: "-2.4%",
      trend: "down",
      icon: Wallet,
      description: "Total wallet balance"
    }
  ];

  const recentTransactions = [
    { id: 1, user: "John Doe", amount: "$500.00", type: "Deposit", status: "Completed", time: "2 min ago" },
    { id: 2, user: "Jane Smith", amount: "$250.00", type: "Transfer", status: "Pending", time: "5 min ago" },
    { id: 3, user: "Mike Johnson", amount: "$1,200.00", type: "Withdrawal", status: "Completed", time: "10 min ago" },
    { id: 4, user: "Sarah Wilson", amount: "$75.00", type: "Deposit", status: "Completed", time: "15 min ago" },
    { id: 5, user: "David Brown", amount: "$300.00", type: "Transfer", status: "Failed", time: "20 min ago" },
  ];

  const topUsers = [
    { name: "John Doe", email: "john@example.com", balance: "$5,240", transactions: 42 },
    { name: "Jane Smith", email: "jane@example.com", balance: "$3,890", transactions: 38 },
    { name: "Mike Johnson", email: "mike@example.com", balance: "$2,650", transactions: 35 },
    { name: "Sarah Wilson", email: "sarah@example.com", balance: "$1,980", transactions: 28 },
    { name: "David Brown", email: "david@example.com", balance: "$1,420", transactions: 22 },
  ];

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
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4" />
          Refresh Data
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 dashboard-stats">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const isPositive = stat.trend === "up";
          
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Chart Section */}
        <Card className="col-span-4 dashboard-chart">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>
              Monthly revenue trends for the past 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Chart visualization would go here</p>
                <p className="text-sm text-gray-400">Integrate with your charting library</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>
              Latest wallet transactions across the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      transaction.status === 'Completed' ? 'bg-green-500' :
                      transaction.status === 'Pending' ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                    <div>
                      <p className="font-medium text-sm">{transaction.user}</p>
                      <p className="text-xs text-gray-500">{transaction.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">{transaction.amount}</p>
                    <Badge variant={transaction.status === 'Completed' ? 'default' : 'secondary'} className="text-xs">
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
      <Card className="dashboard-top-users">
        <CardHeader>
          <CardTitle>Top Users by Balance</CardTitle>
          <CardDescription>
            Users with the highest wallet balances
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topUsers.map((user, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-indigo-600 font-bold text-sm">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">{user.balance}</p>
                  <p className="text-sm text-gray-500">{user.transactions} transactions</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="dashboard-quick-actions">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common administrative tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
              <Users className="w-6 h-6" />
              <span>Manage Users</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
              <Activity className="w-6 h-6" />
              <span>View Transactions</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
              <TrendingUp className="w-6 h-6" />
              <span>Generate Report</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}