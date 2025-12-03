"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Target } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

const yearlyData = [
  { category: "Sales", roi: 120 },
  { category: "Marketing", roi: 90 },
  { category: "Operations", roi: 140 },
  { category: "Finance", roi: 110 },
  { category: "HR", roi: 95 },
  { category: "Customer Success", roi: 130 },
  { category: "IT", roi: 155 },
  { category: "Legal", roi: 80 },
  { category: "Admin", roi: 100 },
  { category: "Procurement", roi: 115 },
  { category: "QA", roi: 125 },
  { category: "Support", roi: 102 },
];

const monthlyData = [
  { category: "Sales", roi: 40 },
  { category: "Marketing", roi: 55 },
  { category: "Operations", roi: 70 },
  { category: "Finance", roi: 45 },
  { category: "HR", roi: 30 },
  { category: "Customer Success", roi: 60 },
  { category: "IT", roi: 75 },
  { category: "Legal", roi: 32 },
  { category: "Admin", roi: 44 },
  { category: "Procurement", roi: 58 },
  { category: "QA", roi: 67 },
  { category: "Support", roi: 41 },
];

const weeklyData = [
  { category: "Sales", roi: 10 },
  { category: "Marketing", roi: 15 },
  { category: "Operations", roi: 20 },
  { category: "Finance", roi: 12 },
  { category: "HR", roi: 8 },
  { category: "Customer Success", roi: 16 },
  { category: "IT", roi: 22 },
  { category: "Legal", roi: 7 },
  { category: "Admin", roi: 11 },
  { category: "Procurement", roi: 14 },
  { category: "QA", roi: 18 },
  { category: "Support", roi: 9 },
];

// 🎨 Color palette (12 unique colors)
const colors = [
  "#3B82F6", // blue
  "#10B981", // green
  "#F59E0B", // amber
  "#EF4444", // red
  "#8B5CF6", // violet
  "#EC4899", // pink
  "#6366F1", // indigo
  "#14B8A6", // teal
  "#F97316", // orange
  "#84CC16", // lime
  "#0EA5E9", // sky
  "#A855F7", // purple
];

export default function RoiImpactChart() {
  const [filter, setFilter] = React.useState("yearly");

  const getCurrentData = () => {
    if (filter === "yearly") return yearlyData;
    if (filter === "monthly") return monthlyData;
    return weeklyData;
  };

  return (
    <div className="w-full md:col-span-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <Target className="h-5 w-5" />
            ROI Impact by Goal Category
          </CardTitle>

          {/* Filter Dropdown */}
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yearly">Yearly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>

        <CardContent className="p-6">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={getCurrentData()}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />

                {/* Multi-color bar support */}

                <Bar
                  dataKey="roi"
                  barSize={40}
                  radius={[6, 6, 0, 0]}
                  isAnimationActive={false}
                  activeBar={false}
                >
                  {getCurrentData().map((entry, i) => (
                    <Cell key={i} fill={colors[i % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
