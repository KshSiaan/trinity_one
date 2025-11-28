"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A bar chart";

const chartConfig = {
  desktop: {
    label: "Category",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function ChartBarDefault({
  data,
}: {
  data: { category_name: string; value: number }[];
}) {
  const chartData = data?.map((item) => ({
    month: item.category_name,
    desktop: item.value,
  }));

  return (
    <ChartContainer config={chartConfig} className="h-[300px]">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
      </BarChart>
    </ChartContainer>
  );
}
