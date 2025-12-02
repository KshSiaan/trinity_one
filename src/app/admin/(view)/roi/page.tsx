"use client";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartLineMultiple } from "./line-chart";
import { useQuery } from "@tanstack/react-query";
import { howl, idk } from "@/lib/utils";
import { useCookies } from "react-cookie";
import Leaderboard from "./Leaderboard";

export default function Page() {
  const [{ token }] = useCookies(["token"]);

  const { data, isPending } = useQuery({
    queryKey: ["departments"],
    queryFn: (): idk => howl(`/admin-dashboard/roi`, { method: "GET", token }),
  });

  return (
    <div className="w-full h-full flex flex-col gap-6">
      <div className="grid auto-rows-min gap-4 md:grid-cols-4">
        {/* Total Active Employess */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Active Employess
            </CardTitle>
            <PercentIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data?.data?.summary?.total_employees}
            </div>
            <p className="text-xs text-muted-foreground">
              +5.2% vs last period
            </p>
            {/* <CardDescription className="pt-2">
              Return on investment from program costs
            </CardDescription> */}
          </CardContent>
        </Card>

        {/* Avg Goal Completion */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Goal Completion
            </CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data?.data?.summary?.avg_completion_rate}
            </div>
            <p className="text-xs text-muted-foreground">
              ↑ 5.2% vs last period
            </p>
            {/* <CardDescription className="pt-2">
              Total investment in this platform
            </CardDescription> */}
          </CardContent>
        </Card>

        {/* Engagement Score */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Engagement Score
            </CardTitle>
            <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data?.data?.summary?.engagement_score}
            </div>
            <p className="text-xs text-muted-foreground">
              ↑ 5.2% vs last period
            </p>
            {/* <CardDescription className="pt-2">
              Estimated productivity gains & cost savings
            </CardDescription> */}
          </CardContent>
        </Card>

        {/* ROI Impact Score*/}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              ROI Impact Score
            </CardTitle>
            <User2Icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data?.data?.summary?.roi_impact}
            </div>
            <p className="text-xs text-muted-foreground">
              ↑ 5.2% vs last period
            </p>
            {/* <CardDescription className="pt-2">
              ROI correlation with engagement score
            </CardDescription> */}
          </CardContent>
        </Card>
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
          <h3 className="text-xl mb-6 ">Emplyoyee Impact Leaderboard</h3>
          {/* <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select Timeline" />
            </SelectTrigger>
          </Select> */}
        </div>
        {/* <div className="flex flex-col gap-4 w-full py-6">
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
        </div> */}

        <Leaderboard />
      </div>
    </div>
  );
}
