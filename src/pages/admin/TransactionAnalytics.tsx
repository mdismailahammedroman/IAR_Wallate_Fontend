/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo } from "react";
import { format } from "date-fns";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip as ChartTooltip,
  Legend as ChartLegend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { useGetAllTransactionsQuery } from "@/redux/features/transaction/transaction.api";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartTooltip,
  ChartLegend
);

const TransactionAnalytics = () => {
  const { data: response, isLoading } = useGetAllTransactionsQuery(
    { limit: 1000 }, // Fetch more transactions for analytics
    { refetchOnMountOrArgChange: true }
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const transactions = Array.isArray(response?.data) ? response.data : [];

  // Aggregate transaction amounts by date
  const { labels, values } = useMemo(() => {
    const grouped: Record<string, number> = {};
    transactions.forEach((tx: any) => {
      const date = format(new Date(tx.createdAt), "yyyy-MM-dd");
      grouped[date] = (grouped[date] || 0) + tx.amount;
    });

    const sortedDates = Object.keys(grouped).sort();
    return {
      labels: sortedDates,
      values: sortedDates.map(date => grouped[date]),
    };
  }, [transactions]);

  const barData = {
    labels,
    datasets: [
      {
        label: "Transaction Amount",
        data: values,
        backgroundColor: "#3b82f6",
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        title: { display: true, text: "Date" },
        ticks: { autoSkip: true, maxTicksLimit: 10 },
      },
      y: {
        title: { display: true, text: "Amount ($)" },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Transaction Volume by Date</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          {isLoading ? (
            <Skeleton className="w-full h-full rounded-md" />
          ) : (
            <Bar data={barData} options={barOptions} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionAnalytics;
