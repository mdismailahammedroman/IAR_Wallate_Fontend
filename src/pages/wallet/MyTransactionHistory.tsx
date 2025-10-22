/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useMyTransactionsQuery } from "@/redux/features/wallet/wallet.api";
import { useGetAgentTransactionsQuery } from "@/redux/features/transaction/transaction.api";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Spinner } from "@/components/ui/spinner";

export const MyTransactionHistory = () => {
  const [limit] = useState(100);
  const [page, setPage] = useState(1);
  const [type, setType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Detect role
  const { data: userInfo } = useUserInfoQuery(undefined);
  const role = userInfo?.data?.role;
  const isAgent = role === "AGENT";


  // Call both hooks with skip flags to preserve hook order
  const userQuery = useMyTransactionsQuery(
    { limit, page, type, startDate, endDate },
    { skip: isAgent }
  );
  const agentQuery = useGetAgentTransactionsQuery(
    { limit, page, type, startDate, endDate },
    { skip: !isAgent }
  );

  const selected = isAgent ? agentQuery : userQuery;
  const { data, isLoading, refetch, error } = selected;

  // Normalize response: agents may return an array; users return { transactions: [] }
  const selectedRaw = data?.data as any;
  const transactions = Array.isArray(selectedRaw)
    ? selectedRaw
    : (selectedRaw?.transactions || []);

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    refetch();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner className="size-8" />
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Failed to load transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={() => refetch()}>Try Again</Button>
        </CardContent>
      </Card>
    );
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">My Transactions</CardTitle>
      </CardHeader>

      <CardContent>
        {/* ✅ Filter Form */}
        <form
          onSubmit={handleFilter}
          className="flex flex-col md:flex-row md:flex-wrap gap-4 items-start md:items-center mb-6"
        >
          <Select
            onValueChange={(val) => setType(val === "ALL" ? "" : val)}
            value={type || "ALL"}
          >
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Transaction Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Types</SelectItem>
              <SelectItem value="SEND">Send</SelectItem>
              <SelectItem value="WITHDRAW">Withdraw</SelectItem>
              <SelectItem value="CASH_IN">Cash In</SelectItem>
              <SelectItem value="CASH_OUT">Cash Out</SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full md:w-[180px]"
          />
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full md:w-[180px]"
          />

          <Button type="submit" className="w-full md:w-auto">
            Filter
          </Button>
        </form>

        {/* ✅ Transaction Table */}
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
              {transactions.length > 0 ? (
                transactions.map((txn: any) => (
                  <TableRow key={txn._id}>
                    <TableCell>{txn.transactionType}</TableCell>
                    <TableCell>{txn.amount}</TableCell>
                    <TableCell>
                      {
                        txn.fromUser && typeof txn.fromUser === "object" && txn.fromUser.name ? txn.fromUser.name :
                          txn.fromAgent && typeof txn.fromAgent === "object" && txn.fromAgent.name ? txn.fromAgent.name :
                            txn.initiatedByUser && typeof txn.initiatedByUser === "object" && txn.initiatedByUser.name ? txn.initiatedByUser.name :
                              txn.initiatedByAgent && typeof txn.initiatedByAgent === "object" && txn.initiatedByAgent.name ? txn.initiatedByAgent.name :
                                "-"
                      }
                    </TableCell>

                    <TableCell>
                      {
                        txn.toUser && typeof txn.toUser === "object" && txn.toUser.name ? txn.toUser.name :
                          txn.toAgent && typeof txn.toAgent === "object" && txn.toAgent.name ? txn.toAgent.name :
                            txn.initiatedByUser && typeof txn.initiatedByUser === "object" && txn.initiatedByUser.name ? txn.initiatedByUser.name :
                              txn.initiatedByAgent && typeof txn.initiatedByAgent === "object" && txn.initiatedByAgent.name ? txn.initiatedByAgent.name :
                                "-"
                      }
                    </TableCell>

                    <TableCell>
                      {new Date(txn.createdAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No transactions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};