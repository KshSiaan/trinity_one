"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A multiple line chart";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ChartLineMultiple() {
  return (
    <div className="">
      <ChartContainer config={chartConfig} className="max-h-[30dvh] w-full">
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Line
            dataKey="desktop"
            type="monotone"
            stroke="var(--color-desktop)"
            strokeWidth={2}
            dot={{
              r: 5,
              strokeWidth: 2,
              fill: "white",
              stroke: "var(--color-desktop)",
            }}
          />
          <Line
            dataKey="mobile"
            type="monotone"
            stroke="var(--color-mobile)"
            strokeWidth={2}
            dot={{
              r: 5,
              strokeWidth: 2,
              fill: "white",
              stroke: "var(--color-mobile)",
            }}
          />
        </LineChart>
      </ChartContainer>
      <div className="w-full mt-6 flex justify-center items-center gap-6">
        <div className=" text-sm font-semibold flex items-center gap-2">
          <div className="size-4 rounded-full bg-purple-400" /> Engineer
        </div>
        <div className=" text-sm font-semibold flex items-center gap-2">
          <div className="size-4 rounded-full bg-amber-400" /> Finance
        </div>
        <div className=" text-sm font-semibold flex items-center gap-2">
          <div className="size-4 rounded-full bg-lime-400" /> Marketing
        </div>
      </div>
    </div>
  );
}
