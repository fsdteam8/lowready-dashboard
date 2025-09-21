import { useChartData } from "@/hooks/use-dashboard";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const EarningsBarChart = () => {
  const { data, isLoading } = useChartData();
  if (isLoading) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-white">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  // Calculate max value for Y-axis scaling
  const maxEarnings = Math.max(...(data?.map((d) => d.totalEarnings) ?? []));
  const yAxisMax =
    maxEarnings > 0 ? Math.ceil(maxEarnings / 1000) * 1000 : 4000;

  return (
    <div className="w-full bg-[#FFF] border border-[#E6E7E6] rounded-xl" style={{ height: "400px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 60,
            bottom: 40,
          }}
          barCategoryGap="20%"
        >
          <CartesianGrid
            strokeDasharray="none"
            stroke="#f0f0f0"
            horizontal={true}
            vertical={false}
          />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#666666" }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#666666" }}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
            domain={[0, yAxisMax]}
          />
          <Bar
            dataKey="totalEarnings"
            fill="#22c55e"
            radius={[2, 2, 0, 0]}
            stroke="none"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EarningsBarChart;
