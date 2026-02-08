"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { idk } from "@/lib/utils";

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-6)",
];

export function ChartLineMultiple({ data }: { data: any }) {
  if (!data) return null;

  // force array (API gives single object)
  const arr = Array.isArray(data) ? data : [data];

  // extract department names
  const departmentNames: idk = (arr[0]?.departments ?? []).map(
    (d: any) => d.department_name,
  );

  // build chart config
  const chartConfig: ChartConfig = departmentNames.reduce(
    (
      acc: { [x: string]: { label: any; color: string } },
      name: string | number,
      idx: number,
    ) => {
      acc[name] = {
        label: name,
        color: COLORS[idx] ?? COLORS[0],
      };
      return acc;
    },
    {} as ChartConfig,
  );

  // convert to recharts format
  const chartData = arr.map((item) => {
    const row: any = { month: item?.month };

    (item?.departments ?? []).forEach((dep: any) => {
      row[dep?.department_name] = dep?.value;
    });

    return row;
  });

  return (
    <div>
      <ChartContainer config={chartConfig} className="max-h-[35dvh] w-full">
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{ left: 12, right: 12 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value?.slice(0, 3)}
          />

          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

          {departmentNames.map((name: string, index: number) => (
            <Line
              key={name}
              dataKey={name}
              type="monotone"
              stroke={COLORS[index] ?? COLORS[0]}
              strokeWidth={2}
              dot={{
                r: arr.length === 1 ? 6 : 4, // show dot for single point
                strokeWidth: 2,
                fill: "white",
                stroke: COLORS[index] ?? COLORS[0],
              }}
            />
          ))}
        </LineChart>
      </ChartContainer>

      {/* LEGEND */}
      <div className="w-full mt-6 flex justify-center items-center gap-6 flex-wrap">
        {departmentNames.map((name: string, idx: number) => (
          <div
            key={name}
            className="text-sm font-semibold flex items-center gap-2"
          >
            <span
              className="size-4 rounded-full"
              style={{ background: COLORS[idx] ?? COLORS[0] }}
            />
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}
