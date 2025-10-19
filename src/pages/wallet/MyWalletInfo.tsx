"use client";

import { Skeleton } from "@/components/ui/skeleton";
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
import { useNavigate } from "react-router";

export function MyWalletInfo() {
  const navigate = useNavigate();

  // Fetch wallet & balance
  const { data: walletResp, isLoading: loadingWallet } = useMyWalletQuery();
  const walletData = walletResp?.data;

  // Fetch recent transactions
  const { data: txnResp, isLoading: loadingTxns } = useMyTransactionsQuery({
    limit: 5,
    page: 1,
  });
  const transactions = txnResp?.data?.transactions || [];

  const balance = walletData?.balance ?? 0;

  return (
    <div className="space-y-8">
      {/* Wallet & Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Wallet Balance</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingWallet ? (
              <Skeleton className="h-10 w-40" />
            ) : (
              <p className="text-3xl font-bold text-green-600">
                {balance.toLocaleString()}
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4 flex-wrap">
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
                {[...Array(5)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
                      <TableCell>{txn.amount}</TableCell>
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
