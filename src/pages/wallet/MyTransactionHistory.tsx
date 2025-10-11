/* eslint-disable @typescript-eslint/no-explicit-any */
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useMyTransactionsQuery } from "@/redux/features/wallet/wallet.api";

interface TransactionRowProps {
  tx: any;
}

function TransactionRow({ tx }: TransactionRowProps) {
  return (
    <tr className="border-b text-sm text-gray-700 hover:bg-gray-50 transition">
      <td className="py-2 px-3">{new Date(tx.createdAt).toLocaleString()}</td>
      <td className="py-2 px-3 capitalize">{tx.transactionType}</td>
      <td className="py-2 px-3 text-green-600 font-semibold">tk{tx.amount}</td>
      <td className="py-2 px-3">
        {tx.toAgent
          ? `Agent: ${tx.toAgent.name || tx.toAgent}`
          : tx.toUser
          ? `User: ${tx.toUser.name || tx.toUser}`
          : "-"}
      </td>
      <td className="py-2 px-3">
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            tx.status === "COMPLETED"
              ? "bg-green-100 text-green-700"
              : tx.status === "PENDING"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {tx.status}
        </span>
      </td>
    </tr>
  );
}

export function MyTransactionHistory() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error, isFetching } = useMyTransactionsQuery({ limit: 10, page });

  const skeletonRows = Array.from({ length: 5 });

  if (isLoading) {
    return (
      <Card className="w-full lg:max-w-4xl mx-auto p-6 space-y-4">
        <Skeleton className="h-6 w-1/3" />
        {skeletonRows.map((_, idx) => (
          <Skeleton key={idx} className="h-4 w-full" />
        ))}
      </Card>
    );
  }

  if (error || !data?.data?.transactions) {
    return (
      <div className="text-center text-red-500 mt-6">
        Unable to load transactions. Please try again.
      </div>
    );
  }

  // ✅ Corrected destructuring
  const { transactions, total, limit } = data.data;
  const totalPages = Math.ceil(total / limit);

  return (
    <Card className="w-full lg:max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl text-fuchsia-900">📄 Transaction History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border rounded-lg">
            <thead className="bg-gray-100 text-gray-700 text-sm">
              <tr>
                <th className="text-left px-3 py-2">Date</th>
                <th className="text-left px-3 py-2">Type</th>
                <th className="text-left px-3 py-2">Amount</th>
                <th className="text-left px-3 py-2">Counterparty</th>
                <th className="text-left px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    No transactions found.
                  </td>
                </tr>
              ) : (
                transactions.map((tx: any) => <TransactionRow key={tx._id} tx={tx} />)
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="mt-6 flex justify-between items-center">
          <Button
            variant="outline"
            disabled={page <= 1 || isFetching}
            onClick={() => setPage((p) => p - 1)}
          >
            ⬅ Prev
          </Button>
          <span className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            disabled={page >= totalPages || isFetching}
            onClick={() => setPage((p) => p + 1)}
          >
            Next ➡
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
