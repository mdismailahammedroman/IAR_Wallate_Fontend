"use client";

import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartCard = () => {
  const chartData = {
    labels: ["Send Money", "Add Money", "Withdraw"],
    datasets: [
      {
        data: [5000, 7000, 3000],
        backgroundColor: ["#3b82f6", "#10b981", "#ef4444"],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Transaction Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-60 w-full">
          <Pie data={chartData} />
        </div>
      </CardContent>
    </Card>
  );
};

export default PieChartCard;
