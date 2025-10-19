"use client";

import React, { useState } from "react";
import { useMyTransactionsQuery } from "@/redux/features/wallet/wallet.api";
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
import { Skeleton } from "@/components/ui/skeleton";

export const MyTransactionHistory = () => {
  const [limit] = useState(10);
  const [page, setPage] = useState(1);
  const [type, setType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { data, isLoading, refetch } = useMyTransactionsQuery({
    limit,
    page,
    type,
    startDate,
    endDate,
  });

  const transactions = data?.data?.transactions || [];

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    refetch();
  };

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

        {/* ✅ Table or Skeleton */}
        <div className="overflow-x-auto">
          {isLoading ? (
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
          ) : (
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
                  transactions.map((txn) => (
                    <TableRow key={txn._id}>
                      <TableCell>{txn.transactionType}</TableCell>
                      <TableCell>{txn.amount}</TableCell>
                      <TableCell>{txn.fromUser?.name || "-"}</TableCell>
                      <TableCell>{txn.toUser?.name || "-"}</TableCell>
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
          )}
        </div>
      </CardContent>
    </Card>
  );
};
