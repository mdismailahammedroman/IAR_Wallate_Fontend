"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJSInstance,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Chart,
} from "chart.js";
import { useRef, useEffect } from "react";
import { useGetOverviewQuery } from "@/redux/features/auth/auth.api";
import TransactionAnalytics from "./TransactionAnalytics";

// Register necessary Chart.js components
ChartJSInstance.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const Analytics = () => {
  const { data, isLoading, error } = useGetOverviewQuery();

  const volume = data?.data.transactionVolume || {};
  const pieLabels = Object.keys(volume);
  const pieValues = Object.values(volume) as number[];
  const totalVolume = pieValues.reduce((a, b) => a + b, 0);

  // Chart references
  const pieChartRef = useRef<Chart<"pie"> | null>(null);
  const barChartRef = useRef<Chart<"bar"> | null>(null);

  // Resize fix on load
  useEffect(() => {
    if (pieChartRef.current) {
      pieChartRef.current.resize();
    }
    if (barChartRef.current) {
      barChartRef.current.resize();
    }
  }, [data]);

  const pieData = {
    labels: pieLabels,
    datasets: [
      {
        data: pieValues,
        backgroundColor: [
          "#3b82f6", // blue
          "#10b981", // green
          "#ef4444", // red
          "#f59e0b", // yellow
          "#8b5cf6", // purple
          "#ec4899", // pink
        ],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const barData = {
    labels: ["Users", "Agents", "Transactions"],
    datasets: [
      {
        label: "Count",
        data: [
          data?.data.totalUsers || 0,
          data?.data.totalAgents || 0,
          data?.data.transactionCount || 0,
        ],
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b"],
        borderColor: "#e5e7eb",
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  const barOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  if (error) {
    return (
      <p className="text-red-500 text-center mt-10">
        Failed to load analytics.
      </p>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">Analytics Dashboard</h1>

      {/* Chart Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart Card */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction Volume by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-60 w-full gap-4">
              {/* Labels */}
              <div className="w-1/3 flex flex-col justify-center items-start p-2">
                <p className="text-sm text-muted-foreground mb-2">
                  Volume Levels:
                </p>
                {pieLabels.map((label, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-2 text-sm"
                  >
                    <span
                      className="inline-block w-3 h-3 rounded-full"
                      style={{
                        backgroundColor:
                          pieData.datasets[0].backgroundColor[idx],
                      }}
                    ></span>
                    <span>{label}</span>
                  </div>
                ))}
              </div>

              {/* Pie Chart */}
              <div className="w-2/3 h-full">
                {isLoading ? (
                  <Skeleton className="w-full h-full rounded-md" />
                ) : (
                  <Pie
                    ref={pieChartRef}
                    data={pieData}
                    options={pieOptions}
                  />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bar Chart Card */}
        <Card>
          <CardHeader>
            <CardTitle>User / Agent / Transaction Counts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-60 w-full">
              {isLoading ? (
                <Skeleton className="w-full h-full rounded-md" />
              ) : (
                <Bar
                  ref={barChartRef}
                  data={barData}
                  options={barOptions}
                />
              )}
            </div>
          </CardContent>
        </Card>
      </div>
 <TransactionAnalytics/>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          ["Total Users", data?.data.totalUsers],
          ["Total Agents", data?.data.totalAgents],
          ["Total Transactions", data?.data.transactionCount],
          ["Total Volume", `$${totalVolume.toLocaleString()}`],
        ].map(([label, value], index) => (
          <Card key={index} className="p-4 text-center">
            <CardTitle>{label}</CardTitle>
            <div className="text-3xl font-bold mt-2">
              {isLoading ? (
                <Skeleton className="h-8 w-20 mx-auto" />
              ) : (
                value
              )}
            </div>
          </Card>
        ))}
      </div>
     
    </div>
  );
};

export default Analytics;
