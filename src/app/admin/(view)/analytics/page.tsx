"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DownloadIcon,
  Loader2Icon,
  TrophyIcon,
  UserSquare2,
} from "lucide-react";
import { ChartLineMultiple } from "./line-chart";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import { getCompanyAnalyticsApi } from "@/lib/api/admin";
import { useCookies } from "react-cookie";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function Page() {
  const [{ token }] = useCookies(["token"]);

  const { data, isPending } = useQuery({
    queryKey: ["analytics"],
    queryFn: () => getCompanyAnalyticsApi(token, 12),
  });

  console.log("departments data is", data?.departments);

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-24 mx-auto">
        <Loader2Icon className="animate-spin" />
      </div>
    );
  }

  function downloadReportLocal() {
    // Create header
    const wsData = [["Department Name", "Value"]];

    // Push each department row
    data?.departments?.forEach((d) => {
      wsData.push([d.department_name, d.value.toString()]);
    });

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Report");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

    saveAs(blob, `${"Report"}_${Date.now()}.xlsx`);
  }

  return (
    <section className="w-full h-full">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            Engagement Trends by Department
          </CardTitle>

          <div className="flex justify-between items-center">
            <div className="flex justify-start items-center gap-6 mt-6">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Last 6 months" />
                </SelectTrigger>
              </Select>
            </div>

            <Button onClick={downloadReportLocal}>
              <DownloadIcon />
              Export data
            </Button>
          </div>
        </CardHeader>

        <CardContent className="w-full">
          <ChartLineMultiple data={[data]} />
        </CardContent>
      </Card>

      <div className="w-full grid grid-cols-2 gap-6 mt-6">
        {/* Manager Impact Analysis */}
        <Card className="w-full">
          <CardHeader className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-purple-400 size-10 rounded-full flex justify-around items-center">
                <UserSquare2 className="size-5 text-background" />
              </div>
              <h3 className="font-semibold">Manager Impact Analysis</h3>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {data?.managerImpactAnalysis?.map((manager, index: number) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <div className="border p-4 rounded-lg shadow-sm" key={index}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={manager.manager_avatar} />
                      <AvatarFallback>
                        {manager.manager_name?.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col">
                      <h4 className="font-semibold">{manager.manager_name}</h4>
                      <p className="text-xs">
                        Team Size : {manager.manager_user_count}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col text-sm text-muted-foreground">
                    <p>{manager.progress}% engagement</p>
                    <p>{manager.dream_completed} goals completed</p>
                  </div>
                </div>

                <div className="w-full mt-6">
                  <Progress
                    className="h-3"
                    max={100}
                    value={manager.progress}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Goal Completion by Category */}
        <Card className="w-full">
          <CardHeader className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-amber-400 size-10 rounded-full flex justify-around items-center">
                <TrophyIcon className="size-5 text-background" />
              </div>
              <h3 className="font-semibold">Goal Completion by Category</h3>
            </div>

            <div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Timeline" />
                </SelectTrigger>
              </Select>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {data?.goalCompletedByCategory?.map((cat, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <div className="space-y-2" key={index}>
                <div className="flex items-center justify-between w-full">
                  <h4>{cat.category_name}</h4>

                  <div className="text-sm flex items-center gap-2">
                    <p>
                      {cat.dream_completed}/{cat.dream_created}
                    </p>
                    <p className="p-1 text-xs border">{cat.progress}%</p>
                  </div>
                </div>

                <Progress className="h-3" max={100} value={cat.progress} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
