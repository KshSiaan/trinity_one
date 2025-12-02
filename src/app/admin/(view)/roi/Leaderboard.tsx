"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import { howl, idk } from "@/lib/utils";
import { LeaderType } from "@/lib/api/leaderType";

export default function Leaderboard() {
  const [{ token }] = useCookies(["token"]);

  const { data, isPending } = useQuery({
    queryKey: ["departments"],
    queryFn: (): idk => howl(`/admin-dashboard/roi`, { method: "GET", token }),
  });

  const leaderData: LeaderType[] = data?.data?.leaderboard || [];

  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  // Pagination calculations
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const paginated = leaderData.slice(start, end);
  const totalPages = Math.ceil(leaderData.length / rowsPerPage);

  return (
    <div className="w-full border rounded-xl p-4">
      <Table>
        <TableHeader className="bg-[#E9E9E9]">
          <TableRow>
            <TableHead>Employee</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Goal Completion</TableHead>
            <TableHead>
              {" "}
              <span className="ml-20">Engagement</span>{" "}
            </TableHead>
            <TableHead>ROI Impact</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {paginated.map((emp, idx) => (
            <TableRow key={idx}>
              <TableCell>{emp.name}</TableCell>
              <TableCell>{emp.role}</TableCell>

              {/* Goal Completion with Progress Bar */}
              <TableCell className="w-[200px]">
                <div className="flex flex-col gap-1">
                  <Progress value={emp.total_goals} className="h-2" />
                  <span className="text-xs text-muted-foreground">
                    {emp.total_goals}%
                  </span>
                </div>
              </TableCell>

              <TableCell>
                <span className=" bg-[#E8F6ED] py-1 px-3 rounded-[9px] text-[#17A14C] ml-20  ">
                  {emp.engagement}/10
                </span>
              </TableCell>
              <TableCell>
                <span className=" bg-[#E8F6ED] py-1 px-3 rounded-[9px] text-[#17A14C]   ">
                  {emp.roi_impact}/100
                </span>
              </TableCell>
            </TableRow>
          ))}

          {paginated.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6">
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className=" flex justify-end ">
        <div className="flex justify-between items-center mt-4 gap-x-6 ">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </Button>

          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>

          <Button
            variant="outline"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
