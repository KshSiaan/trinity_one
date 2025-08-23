import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DownloadIcon, TrophyIcon, UserSquare2 } from "lucide-react";
import { ChartLineMultiple } from "./line-chart";
import { Progress } from "@/components/ui/progress";

export default function Page() {
  return (
    <section className="w-full h-full">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            Engagement Trends by Department
          </CardTitle>
          <div className=" flex justify-between items-center">
            <div className="flex justify-start items-center gap-6 mt-6">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Last 6 months" />
                </SelectTrigger>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All departments" />
                </SelectTrigger>
              </Select>
            </div>

            <Button>
              <DownloadIcon />
              Export data
            </Button>
          </div>
        </CardHeader>
        <CardContent className="w-full">
          <ChartLineMultiple />
        </CardContent>
      </Card>
      <div className="w-full grid grid-cols-2 gap-6 mt-6">
        <Card className="w-full">
          <CardHeader className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-purple-400 size-10 rounded-full flex justify-around items-center">
                <UserSquare2 className="size-5 text-background" />
              </div>
              <h3 className="font-semibold">Manager Impact Analysis</h3>
            </div>
            <div className="">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Timeline" />
                </SelectTrigger>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {[1, 2].map((x) => (
              <div className="border p-4 rounded-lg shadow-sm" key={x}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage
                        src={`https://avatar.iran.liara.run/public`}
                      />
                      <AvatarFallback>UI</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <h4 className="font-semibold">Sarah Chan</h4>
                      <p className="text-xs">Team Size : 8</p>
                    </div>
                  </div>
                  <div className="flex flex-col text-sm text-muted-foreground">
                    <p>92% engagement</p>
                    <p>156 goals completed</p>
                  </div>
                </div>
                <div className="w-full mt-6">
                  <Progress
                    className="text-green-600 h-3"
                    max={100}
                    value={92}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-amber-400 size-10 rounded-full flex justify-around items-center">
                <TrophyIcon className="size-5 text-background" />
              </div>
              <h3 className="font-semibold">Goal Completion by Category</h3>
            </div>
            <div className="">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Timeline" />
                </SelectTrigger>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {[1, 2, 3, 4].map((x) => (
              <div className="space-y-2" key={x}>
                <div className="flex items-center justify-between w-full">
                  <h4>Career Development</h4>
                  <div className="text-sm flex items-center gap-2">
                    <p>245/300</p>
                    <p className="p-1 text-xs border">82%</p>
                  </div>
                </div>
                <Progress className="text-green-600 h-3" max={100} value={92} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
