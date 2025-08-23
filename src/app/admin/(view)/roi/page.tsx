import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DollarSignIcon,
  PercentIcon,
  TrendingUpIcon,
  TrophyIcon,
  User2Icon,
  UsersIcon,
} from "lucide-react";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartBarDefault } from "./bar-chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartLineMultiple } from "./line-chart";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const metrics = [
  {
    title: "ROI Percentage",
    icon: PercentIcon,
    value: "3.2x",
    change: "+5.2% vs last period",
    description: "Return on investment from program costs",
  },
  {
    title: "Total Program Cost",
    icon: DollarSignIcon,
    value: "$245,000",
    change: "↑ 5.2% vs last period",
    description: "Total investment in this platform",
  },
  {
    title: "Total Gains",
    icon: TrendingUpIcon,
    value: "$245,000",
    change: "↑ 5.2% vs last period",
    description: "Estimated productivity gains & cost savings",
  },
  {
    title: "Engagement Impact",
    icon: User2Icon,
    value: "+22%",
    change: "↑ 5.2% vs last period",
    description: "ROI correlation with engagement score",
  },
];

export default function Page() {
  return (
    <div className="w-full h-full flex flex-col gap-6">
      <div className="grid auto-rows-min gap-4 md:grid-cols-4">
        {metrics.map((x) => (
          <Card key={x.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{x.title}</CardTitle>
              <x.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{x.value}</div>
              <p className="text-xs text-muted-foreground">{x.change}</p>
              <CardDescription className="pt-2">
                {x.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="w-full grid grid-cols-2 gap-6">
        <div className="flex-1 rounded-xl p-6 border aspect-video bg-background!">
          <div className="flex w-full justify-between items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="bg-amber-400 size-10 rounded-full flex justify-around items-center">
                <TrophyIcon className="size-5 text-background" />
              </div>
              <h3 className="font-semibold">Goal Completation by Category</h3>
            </div>
            <div className="">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Timeline" />
                </SelectTrigger>
              </Select>
            </div>
          </div>
          <div className="flex-1 w-full flex justify-center items-center ">
            <ChartBarDefault />
          </div>
        </div>
        <div className="flex-1 rounded-xl p-6 border aspect-video bg-background!">
          <div className="flex w-full justify-between items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="bg-purple-400 size-10 rounded-full flex justify-around items-center">
                <UsersIcon className="size-5 text-background" />
              </div>
              <h3 className="font-semibold">Department Distribution</h3>
            </div>
            <div className="">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Timeline" />
                </SelectTrigger>
              </Select>
            </div>
          </div>
          <div className="w-full items-center">
            <div className="flex justify-end items-center py-4 px-4 gap-6 text-sm">
              <span className="flex items-center gap-4">
                <div className="size-4 rounded-full bg-green-500" />
                <span>ROI</span>
              </span>
              <span className="flex items-center gap-4">
                <div className="size-4 rounded-full bg-purple-500" />
                <span>Engagement Score</span>
              </span>
            </div>
            <div className="w-full">
              <ChartLineMultiple />
            </div>{" "}
          </div>
        </div>
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min bg-background! flex flex-col justify-start items-start p-6">
        <div className="flex justify-between items-center w-full">
          <h3 className="text-xl">Scheduled Reports</h3>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select Timeline" />
            </SelectTrigger>
          </Select>
        </div>
        <div className="flex flex-col gap-4 w-full py-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Department</TableHead>
                <TableHead>Investment</TableHead>
                <TableHead>Gains</TableHead>
                <TableHead>Net ROI</TableHead>
              </TableRow>
            </TableHeader>
          </Table>
        </div>
      </div>
    </div>
  );
}
