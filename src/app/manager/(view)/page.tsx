"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ActivityIcon,
  ArrowUp,
  DollarSignIcon,
  SparkleIcon,
  TrophyIcon,
  UsersIcon,
} from "lucide-react";
import { EmployeeDashboardDialog } from "./dialog-comp";
import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { TeamMemberType } from "@/lib/api/manager-dashboard-type";

const dataset = [
  {
    label: "Team Engagement",
    icon: UsersIcon,
    amm: "High",
    growth: {
      up: true,
      value: 5.2,
    },
  },
  {
    label: "Dream Progress",
    icon: TrophyIcon,
    amm: "72%",
    growth: {
      up: true,
      value: 5.2,
    },
  },
  {
    label: "At- Risk Employees",
    icon: SparkleIcon,
    amm: 12,
    growth: {
      up: false,
      value: 5.2,
    },
  },
  {
    label: "Team ROI",
    icon: ActivityIcon,
    amm: "+12%",
    growth: {
      up: true,
      value: 2.8,
    },
  },
];

export default function Page() {
  const [{ token }] = useCookies(["token"]);
  const baseUrl = process.env.NEXT_PUBLIC_SERVER;

  const [data, setData] = useState<{
    team_engagement?: string;
    dream_progress?: number;
    at_risk_employees?: number;
    team_roi?: string;
  }>();

  const [teamData, setTeamData] = useState<TeamMemberType[]>([]);

  useEffect(() => {
    const managerData = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/manager/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setData(res.data?.data);
        setTeamData(res.data?.data?.team_members);
      } catch (err) {
        console.error(err);
      }
    };

    if (token) managerData();
  }, [token, baseUrl]);

  console.log("teamData home data is", teamData);

  return (
    <div className="w-full h-full flex flex-col gap-6">
      <div className="grid auto-rows-min gap-4 md:grid-cols-4">
        {/* Team Engagement */}
        <div className="bg-background p-3 border shadow aspect-[3/1] rounded-xl flex flex-col">
          <h2 className="text-sm">Engagement</h2>
          <div className="w-full flex flex-row justify-between items-center flex-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{data?.team_engagement}</span>
            </div>
            <div className="h-full flex justify-end items-end">
              <div className="flex items-center text-muted-foreground text-sm">
                85% Actively Engaged
              </div>
            </div>
          </div>
        </div>

        {/* Dream Progress */}
        <div className="bg-background p-3 border shadow aspect-[3/1] rounded-xl flex flex-col">
          <h2 className="text-sm">Goals Progress</h2>
          <div className="w-full flex flex-row justify-between items-center flex-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{data?.dream_progress}%</span>
            </div>
            <div className="h-full flex justify-end items-end">
              <div className="flex items-center text-muted-foreground text-sm">
                85% Actively Engaged
              </div>
            </div>
          </div>
        </div>

        {/* At-Risk Employees */}
        <div className="bg-background p-3 border shadow aspect-[3/1] rounded-xl flex flex-col">
          <h2 className="text-sm">At-Risk Employees</h2>
          <div className="w-full flex flex-row justify-between items-center flex-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{data?.at_risk_employees}</span>
            </div>
            <div className="h-full flex justify-end items-end">
              <div className="flex items-center text-muted-foreground text-sm">
                85% Actively Engaged
              </div>
            </div>
          </div>
        </div>

        {/* Team ROI */}
        <div className="bg-background p-3 border shadow aspect-[3/1] rounded-xl flex flex-col">
          <h2 className="text-sm">Team ROI</h2>
          <div className="w-full flex flex-row justify-between items-center flex-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{data?.team_roi}</span>
            </div>
            <div className="h-full flex justify-end items-end">
              <div className="flex items-center text-muted-foreground text-sm">
                85% Actively Engaged
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="flex-1 rounded-xl p-6 border bg-background!">
          <div className="flex w-full justify-between items-center gap-2">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-xl">Team Members</h3>
            </div>
          </div>
          <div className="flex-1 w-full flex justify-center items-center ">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Goal Progress</TableHead>
                  <TableHead>Engagement</TableHead>
                  <TableHead>KPI Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamData?.map((item, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell>{item?.member}</TableCell>
                      <TableCell>
                        <Progress max={100} value={item?.goal_progress} />
                      </TableCell>
                      <TableCell>
                        <Badge variant={"destructive"}>
                          {item?.engagement}
                        </Badge>
                      </TableCell>
                      <TableCell>{item?.kpi_status}</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant={"ghost"}>View Details</Button>
                          </DialogTrigger>
                          <EmployeeDashboardDialog />
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
