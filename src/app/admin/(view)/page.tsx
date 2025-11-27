"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ActivityIcon,
  ArrowUp,
  DollarSignIcon,
  SparkleIcon,
  TrophyIcon,
  UsersIcon,
} from "lucide-react";
import { ChartPieDonut } from "./pie-chart";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartBarDefault } from "./bar-chart";
import { useQuery } from "@tanstack/react-query";
import { adminDashboardApi } from "@/lib/api/admin";
import { useCookies } from "react-cookie";

export default function Page() {
  const [{ token }] = useCookies(["token"]);
  const { data, isPending } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => {
      return adminDashboardApi(token, String(12));
    },
  });

  const dataset = [
    {
      label: "Active Employees",
      icon: UsersIcon,
      amm: data?.data?.summary?.active_employee ?? 0,
      growth: {
        up: true,
        value: 5.2,
      },
    },
    {
      label: "Goal Completion Rate",
      icon: TrophyIcon,
      amm: data?.data?.summary?.goal_completion_rate ?? 0,
      growth: {
        up: true,
        value: 5.2,
      },
    },
    {
      label: "Engagement Score",
      icon: SparkleIcon,
      amm: data?.data?.summary?.engagement_score ?? 0,
      growth: {
        up: false,
        value: 5.2,
      },
    },
    {
      label: "Manager Activity",
      icon: ActivityIcon,
      amm: data?.data?.summary?.manager_activity,
      growth: {
        up: true,
        value: 2.8,
      },
    },
    {
      label: "ROI Estimate",
      icon: DollarSignIcon,
      amm: 1247,
      growth: {
        up: true,
        value: 2.8,
      },
    },
  ];
  return (
    <div className="w-full h-full flex flex-col gap-6">
      <div className="grid auto-rows-min gap-4 md:grid-cols-5">
        {dataset.map((x) => (
          <div
            className="bg-background p-3 border shadow aspect-[3/1] rounded-xl flex flex-col"
            key={x.label}
          >
            <h2 className="text-sm">{x.label}</h2>
            <div className="w-full flex flex-row justify-between items-center flex-1">
              <div className="flex items-center gap-2">
                <div className="bg-purple-400 size-10 rounded-full flex justify-around items-center">
                  <x.icon className="size-5 text-background" />
                </div>
                <span className="text-2xl ">{x.amm}</span>
              </div>
              {/* <div className="h-full flex justify-end items-end">
                <div className="flex items-center text-green-600 text-sm">
                  <ArrowUp className="size-4" />
                  {x.growth.value}
                </div>
              </div> */}
            </div>
          </div>
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
          <div className="w-full grid grid-cols-2 gap-6 items-center">
            <div className="">
              <ChartPieDonut />
            </div>{" "}
            <div className="flex flex-col justify-around items-start h-2/3 ">
              <span className="flex items-center gap-6">
                <div className="size-5 rounded-full bg-amber-500" />
                <span>Engineer</span>
              </span>
              <span className="flex items-center gap-6">
                <div className="size-5 rounded-full bg-amber-500" />
                <span>Engineer</span>
              </span>
              <span className="flex items-center gap-6">
                <div className="size-5 rounded-full bg-amber-500" />
                <span>Engineer</span>
              </span>
              <span className="flex items-center gap-6">
                <div className="size-5 rounded-full bg-amber-500" />
                <span>Engineer</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min bg-background! flex flex-col justify-start items-start p-6">
        <h3>Recent Activity</h3>
        <div className="flex flex-col gap-4 w-full py-6">
          {Array(6)
            .fill("")
            .map((_, i) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={i}
                className="h-18 w-full border rounded-lg flex items-center px-4"
              >
                <Avatar className="size-12">
                  <AvatarImage src={"https://avatar.iran.liara.run/public"} />
                  <AvatarFallback>UI</AvatarFallback>
                </Avatar>
                <div className="h-full flex flex-col items-start justify-center ml-4">
                  <h4>
                    <span className="font-semibold">Sarah Chan</span> completed
                    leadership goal training!
                  </h4>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
