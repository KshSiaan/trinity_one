"use client";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { howl, idk } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const description = "A bar chart";

const data = [
  { name: "Page A", goal: 85, engagement: 72, roi: 60 },
  { name: "Page B", goal: 78, engagement: 65, roi: 55 },
  { name: "Page C", goal: 92, engagement: 81, roi: 75 },
  { name: "Page D", goal: 70, engagement: 58, roi: 49 },
  { name: "Page E", goal: 88, engagement: 74, roi: 67 },
  { name: "Page F", goal: 95, engagement: 82, roi: 79 },
  { name: "Page G", goal: 80, engagement: 69, roi: 54 },
];

const chartConfig = {
  goal: {
    label: "Goal Completion",
    color: "var(--chart-1)",
  },
  engagement: {
    label: "Engagement Level",
    color: "var(--chart-2)",
  },
  roi: {
    label: "ROI Impact Score",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function ChartBarDefault() {
  const [{ token }] = useCookies(["token"]);

  const { data, isPending } = useQuery({
    queryKey: ["departments"],
    queryFn: (): idk => howl(`/admin-dashboard/roi`, { method: "GET", token }),
  });

  console.log("summery is", data?.data?.roi_trend);

  return (
    <ChartContainer config={chartConfig} className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data?.data?.roi_trend}
          margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            width={40}
            tickFormatter={(value) => `${value}%`}
            ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
          />
          <Tooltip />
          <Legend />

          <Bar
            dataKey="goal"
            fill="var(--chart-1)"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            dataKey="engagement"
            fill="var(--chart-2)"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            dataKey="roi"
            fill="var(--chart-3)"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
