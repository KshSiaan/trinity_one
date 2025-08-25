"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  Users,
  Target,
  AlertTriangle,
  Menu,
  Bell,
  Settings,
} from "lucide-react";

const chartData = [
  { quarter: "Q1", goalProgress: 35, teamProductivity: 42 },
  { quarter: "Q2", goalProgress: 45, teamProductivity: 58 },
  { quarter: "Q3", goalProgress: 65, teamProductivity: 72 },
  { quarter: "Q4", goalProgress: 78, teamProductivity: 85 },
];

const chartConfig = {
  goalProgress: {
    label: "Avg Goal Progress",
    color: "hsl(var(--chart-1))",
  },
  teamProductivity: {
    label: "Team Productivity Inc",
    color: "hsl(var(--chart-2))",
  },
};

const riskData = [
  {
    member: "Master React Hooks",
    riskFactor: "Disengagement",
    issue: "Missed deadline, low participation",
    action: "Re-initiate AI summary",
  },
  {
    member: "Master React Hooks",
    riskFactor: "Disengagement",
    issue: "Missed deadline, low participation",
    action: "Re-initiate AI summary",
  },
  {
    member: "Master React Hooks",
    riskFactor: "Disengagement",
    issue: "Missed deadline, low participation",
    action: "Re-initiate AI summary",
  },
  {
    member: "Master React Hooks",
    riskFactor: "Disengagement",
    issue: "Missed deadline, low participation",
    action: "Re-initiate AI summary",
  },
  {
    member: "Master React Hooks",
    riskFactor: "Disengagement",
    issue: "Missed deadline, low participation",
    action: "Generate AI summary",
  },
  {
    member: "Master React Hooks",
    riskFactor: "Disengagement",
    issue: "Missed deadline, low participation",
    action: "Generate AI summary",
  },
  {
    member: "Master React Hooks",
    riskFactor: "Disengagement",
    issue: "Missed deadline, low participation",
    action: "Generate AI summary",
  },
];

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="w-full">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Chart Section */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Personal Goal vs Professional KPI Correlation
              </CardTitle>
              <CardDescription>
                Tracking goal progress and team productivity over quarters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="quarter" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="goalProgress"
                      stroke="var(--color-chart-1)"
                      strokeWidth={2}
                      dot={{ fill: "var(--color-chart-1)" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="teamProductivity"
                      stroke="var(--color-chart-2)"
                      strokeWidth={2}
                      dot={{ fill: "var(--color-chart-2)" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* ROI Tracking */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                ROI Tracking (Team Impact)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Productivity Increases
                  </span>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    +12%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Correlated with a 20% increase in personal goal completion
                  this quarter.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Productivity Increases
                  </span>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    +12%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Correlated with a 20% increase in personal goal completion
                  this quarter.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Productivity Increases
                  </span>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    +12%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Correlated with a 20% increase in personal goal completion
                  this quarter.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Risk Assessment Table */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Risk Assessment & Engagement Tracking
            </CardTitle>
            <CardDescription>
              Monitor team member engagement and identify potential risks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Risk Factor</TableHead>
                  <TableHead className="hidden md:table-cell">Issue</TableHead>
                  <TableHead>Suggested Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {riskData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.member}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-yellow-50 text-yellow-800 border-yellow-200"
                      >
                        {item.riskFactor}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                      {item.issue}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100"
                      >
                        ✨Generate AI summary
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
