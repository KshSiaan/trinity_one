"use client";

import { CalendarIcon, SparklesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export function EmployeeDashboardDialog() {
  return (
    <DialogContent className="min-w-[80dvw] max-h-[90vh] overflow-y-auto p-0">
      <DialogHeader className="px-6 py-4 border-b">
        <div className="flex items-center justify-between">
          <DialogTitle className="text-2xl font-semibold">
            Ittishaf Bashar
          </DialogTitle>
        </div>
      </DialogHeader>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Performance Correlation Chart */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Performance Correlation
              </h3>
              <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-1 bg-blue-500 rounded"></div>
                  <span className="text-sm text-muted-foreground">
                    Personal Goal Progress
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-1 bg-green-500 rounded"></div>
                  <span className="text-sm text-muted-foreground">
                    Professional KPI
                  </span>
                </div>
              </div>

              {/* Chart Area */}
              <div className="relative h-64 bg-gray-50 rounded-lg p-4">
                <svg className="w-full h-full" viewBox="0 0 400 200">
                  {/* Grid lines */}
                  <defs>
                    <pattern
                      id="grid"
                      width="40"
                      height="20"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 40 0 L 0 0 0 20"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="1"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />

                  {/* Y-axis labels */}
                  <text x="10" y="20" className="text-xs fill-gray-500">
                    80
                  </text>
                  <text x="10" y="60" className="text-xs fill-gray-500">
                    60
                  </text>
                  <text x="10" y="100" className="text-xs fill-gray-500">
                    40
                  </text>
                  <text x="10" y="140" className="text-xs fill-gray-500">
                    20
                  </text>
                  <text x="10" y="180" className="text-xs fill-gray-500">
                    0
                  </text>

                  {/* X-axis labels */}
                  <text x="40" y="195" className="text-xs fill-gray-500">
                    Jan
                  </text>
                  <text x="100" y="195" className="text-xs fill-gray-500">
                    Feb
                  </text>
                  <text x="160" y="195" className="text-xs fill-gray-500">
                    Mar
                  </text>
                  <text x="220" y="195" className="text-xs fill-gray-500">
                    Apr
                  </text>
                  <text x="280" y="195" className="text-xs fill-gray-500">
                    May
                  </text>
                  <text x="340" y="195" className="text-xs fill-gray-500">
                    June
                  </text>

                  {/* Blue line (Personal Goal Progress) */}
                  <polyline
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    points="40,160 100,140 160,120 220,100 280,90 340,80"
                  />

                  {/* Green line (Professional KPI) */}
                  <polyline
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    points="40,140 100,130 160,120 220,100 280,80 340,60"
                  />

                  {/* Data points */}
                  <circle cx="40" cy="160" r="3" fill="#3b82f6" />
                  <circle cx="100" cy="140" r="3" fill="#3b82f6" />
                  <circle cx="160" cy="120" r="3" fill="#3b82f6" />
                  <circle cx="220" cy="100" r="3" fill="#3b82f6" />
                  <circle cx="280" cy="90" r="3" fill="#3b82f6" />
                  <circle cx="340" cy="80" r="3" fill="#3b82f6" />

                  <circle cx="40" cy="140" r="3" fill="#10b981" />
                  <circle cx="100" cy="130" r="3" fill="#10b981" />
                  <circle cx="160" cy="120" r="3" fill="#10b981" />
                  <circle cx="220" cy="100" r="3" fill="#10b981" />
                  <circle cx="280" cy="80" r="3" fill="#10b981" />
                  <circle cx="340" cy="60" r="3" fill="#10b981" />
                </svg>
              </div>
            </CardContent>
          </Card>

          {/* Personal Dreams */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Personal Dreams</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Master React Hooks</span>
                  </div>
                  <Progress value={75} className="h-3" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Master React Hooks</span>
                  </div>
                  <Progress value={75} className="h-3" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Performance Correlation Summary */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">
                  Performance Correlation
                </h3>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-purple-500 to-teal-500 text-white"
                >
                  <SparklesIcon className="w-4 h-4 mr-2" />
                  Generate AI summary
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Click the button to generate a performance summary
              </p>
            </CardContent>
          </Card>

          {/* One-on-One Support */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                One- on- One support
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Schedule a Session
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="datetime-local"
                      defaultValue="2025-07-08T17:30"
                      className="flex-1"
                    />
                    <Button size="icon" variant="outline">
                      <CalendarIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Upcoming Schedule
                </Button>

                <div>
                  <h4 className="font-medium mb-2 text-muted-foreground">
                    Upcoming/Past Session
                  </h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div>July 25, 2025 - Quarterly Review</div>
                    <div>July 25, 2025 - Quarterly Review</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mentorship */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Mentorship</h3>

              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Current Mentor:
                  </div>
                  <div className="font-medium">Harry Potter</div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Assign New Mentor
                  </label>
                  <Select defaultValue="albus">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="albus">Albus Dumbledore</SelectItem>
                      <SelectItem value="hermione">Hermione Granger</SelectItem>
                      <SelectItem value="severus">Severus Snape</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Assign
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Support Tools & Request */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Support Tools & Request
              </h3>

              <div className="flex items-center justify-between">
                <span className="font-medium">Ergonomic Chair</span>
                <div className="flex gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-yellow-100 text-yellow-800"
                  >
                    Pending
                  </Badge>
                  <Badge className="bg-green-600 hover:bg-green-700">
                    Approve
                  </Badge>
                  <Badge variant="destructive">Deny</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DialogContent>
  );
}
