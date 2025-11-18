"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { faker } from "@faker-js/faker";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Loader2Icon } from "lucide-react";
import { cn, howl, idk } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { DateRange } from "react-day-picker";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addReportApi } from "@/lib/api/admin";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

export const metricsOptions = [
  { value: "engagement_score", label: "Engagement Score" },
  { value: "goal_completion", label: "Goal Completion" },
  { value: "user_activity", label: "User Activity" },
  { value: "goal_category", label: "Goal Category" },
  { value: "department_metrics", label: "Department Metrics" },
  { value: "manager_impact", label: "Manager Impact" },
  { value: "user_retention", label: "User Retention" },
  { value: "roi_metrics", label: "ROI Metrics" },
];

// SCHEMA (date_range removed)
const reportSchema = z.object({
  manager_id: z.string(),
  department_id: z.string(),
  name: z.string().min(1),
  schedule: z.enum(["daily", "weekly", "monthly", "date-range"]),
  description: z.string().optional(),
  metrics: z.array(z.string()).min(1),
});

type ReportFormValues = z.infer<typeof reportSchema>;

// fake defaults
const now = new Date();
const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

const fromDefault = faker.date.between({
  from: startOfMonth,
  to: new Date(now.getFullYear(), now.getMonth(), 15),
});
const toDefault = faker.date.between({
  from: new Date(now.getFullYear(), now.getMonth(), 16),
  to: endOfMonth,
});

export default function AddReportsForm() {
  const [{ token }] = useCookies(["token"]);
  const form = useForm<ReportFormValues>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      manager_id: "",
      department_id: "",
      schedule: "daily",
      name: "",
      description: "",
      metrics: ["engagement_score"],
    },
  });

  const { data, isPending } = useQuery({
    queryKey: ["departments"],
    queryFn: (): idk => howl(`/department/index`, { method: "GET", token }),
  });

  const { mutate } = useMutation({
    mutationKey: ["add-report"],
    mutationFn: (formData: FormData) => {
      return addReportApi(token, formData);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      toast.success(res.message ?? "Success!");
    },
  });
  //watch form schedule
  const sched = form.watch("schedule");
  // Keep date in state only (NOT in schema)
  const [date, setDate] = useState<DateRange>({
    from: fromDefault,
    to: toDefault,
  });

  const handleDateChange = (range: DateRange | undefined) => {
    setDate(range ?? { from: undefined, to: undefined });
  };

  const onSubmit = (values: ReportFormValues) => {
    const fromStr = date.from ? format(date.from, "yyyy-MM-dd") : "N/A";
    const toStr = date.to ? format(date.to, "yyyy-MM-dd") : "N/A";

    // replace newlines with ↵
    const descForOutput = values.description?.replace(/\n/g, "↵") ?? "";

    const formData = new FormData();

    formData.append("manager_id", values.manager_id);
    formData.append("department_id", values.department_id);
    formData.append("name", values.name);
    formData.append("schedule", values.schedule);
    formData.append("description", descForOutput);

    // append array items individually
    values.metrics.forEach((m, i) => {
      formData.append(`metrics[${i}]`, m);
    });

    if (values.schedule === "date-range") {
      formData.append("date_range", `${fromStr} to ${toStr}`);
    }

    for (const pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    mutate(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
        autoComplete="off"
      >
        <div className="grid grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="manager_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Manager ID</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="department_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department ID</FormLabel>
                <FormControl>
                  {isPending ? (
                    <div className="flex justify-center items-center h-12">
                      <Loader2Icon className="animate-spin" />
                    </div>
                  ) : (
                    <Select
                      value={field.value || ""}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Department" />
                      </SelectTrigger>
                      <SelectContent>
                        {data?.data?.map((dept: any) => (
                          <SelectItem key={dept.id} value={String(dept.id)}>
                            {dept.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="schedule"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Schedule</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select schedule" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="date-range">Date Range</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Report Name</FormLabel>
              <FormControl>
                <Input placeholder="Report name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description" rows={5} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* METRICS */}
        <FormItem>
          <FormLabel className="mb-2">Metrics</FormLabel>
          <div className="grid grid-cols-6 gap-4">
            <Controller
              name="metrics"
              control={form.control}
              render={({ field }) => {
                const selected = field.value || [];
                return (
                  <>
                    {metricsOptions.map((opt) => {
                      const isChecked = field.value?.includes(opt.value);

                      return (
                        <div
                          key={opt.value}
                          className="border p-3 flex items-center gap-3"
                        >
                          <Checkbox
                            checked={isChecked}
                            id={opt.value}
                            onCheckedChange={(checked) => {
                              const next = checked
                                ? [...(field.value || []), opt.value]
                                : (field.value || []).filter(
                                    (v) => v !== opt.value
                                  );

                              field.onChange(next);
                            }}
                          />
                          <FormLabel htmlFor={opt.value} className="text-sm">
                            {opt.label}
                          </FormLabel>
                        </div>
                      );
                    })}
                  </>
                );
              }}
            />
          </div>
          <FormMessage />
        </FormItem>

        {/* DATE RANGE (only in state) */}
        <FormItem className={cn(sched !== "date-range" && "hidden")}>
          <FormLabel>Date Range</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-fit justify-start text-left font-normal",
                  !date?.from && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>

            <PopoverContent align="start" className="w-auto p-0">
              <Calendar
                mode="range"
                numberOfMonths={2}
                selected={date}
                onSelect={handleDateChange}
              />
            </PopoverContent>
          </Popover>
        </FormItem>

        <div className="flex justify-end">
          <Button type="submit">Save & Log</Button>
        </div>
      </form>
    </Form>
  );
}
