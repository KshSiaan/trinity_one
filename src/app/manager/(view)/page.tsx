"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  return (
    <div className="w-full h-full flex flex-col gap-6">
      <div className="grid auto-rows-min gap-4 md:grid-cols-4">
        {dataset.map((x) => (
          <div
            className="bg-background p-3 border shadow aspect-[3/1] rounded-xl flex flex-col"
            key={x.label}
          >
            <h2 className="text-sm">{x.label}</h2>
            <div className="w-full flex flex-row justify-between items-center flex-1">
              <div className="flex items-center gap-2">
                <span className="text-2xl ">{x.amm}</span>
              </div>
              <div className="h-full flex justify-end items-end">
                <div className="flex items-center text-muted-foreground text-sm">
                  85% Actively Engaged
                </div>
              </div>
            </div>
          </div>
        ))}
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
                <TableRow>
                  <TableCell>Raven</TableCell>
                  <TableCell>
                    <Progress max={100} value={80} />
                  </TableCell>
                  <TableCell>
                    <Badge variant={"destructive"}>Low</Badge>
                  </TableCell>
                  <TableCell>Exceeds</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant={"ghost"}>View Details</Button>
                      </DialogTrigger>
                      <EmployeeDashboardDialog />
                    </Dialog>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
