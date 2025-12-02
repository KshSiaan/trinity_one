"use client";

import { useState, type MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Award, Loader2Icon } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createDreamApi,
  getDremMentorApi,
  getUsersApi,
} from "@/lib/api/manager";
import { useCookies } from "react-cookie";
import { DreamType } from "@/lib/api/manager-dashboard-type";

import { toast } from "sonner";
import { idk } from "@/lib/utils";

export default function TeamManagementPage() {
  const qcl = useQueryClient();

  const [dreamDescription, setDreamDescription] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedMentor, setSelectedMentor] = useState("");

  const { mutate } = useMutation({
    mutationKey: ["drems_data"],
    mutationFn: (body: FormData) => {
      return createDreamApi(body, token);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      qcl.invalidateQueries({ queryKey: ["drems_data"] });
      setDreamDescription("");
      setSelectedEmployee("");
      setSelectedMentor("");

      // form.reset();
      toast.success(res.message ?? "Successfully created a company!");
    },
  });

  interface DreamFormValues {
    goal_name: string;
    employee_id: string;
    mentor_id: string;
  }

  const handleSubmitDream = async (
    e: MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    console.log(dreamDescription, selectedEmployee, selectedMentor);

    const formData: FormData = new FormData();

    const payload: DreamFormValues = {
      goal_name: dreamDescription,
      employee_id: selectedEmployee,
      mentor_id: selectedMentor,
    };

    formData.append("goal_name", payload.goal_name);
    formData.append("employee_id", payload.employee_id);
    formData.append("mentor_id", payload.mentor_id);

    mutate(formData);
  };

  const [{ token }] = useCookies(["token"]);

  const { data, isPending } = useQuery({
    queryKey: ["drems_data"],
    queryFn: () => {
      return getDremMentorApi(token);
    },
  });

  // user fetch

  const { data: userData } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsersApi(token),
  });

  const users = userData?.data?.data ?? [];

  if (isPending) {
    return (
      <TableRow>
        <TableCell colSpan={6} className="text-center">
          <div className={`flex justify-center items-center h-24 mx-auto`}>
            <Loader2Icon className={`animate-spin`} />
          </div>
        </TableCell>
      </TableRow>
    );
  }

  console.log("dream data is", data?.data?.data);

  const dreamData: DreamType[] = Array.isArray(data?.data?.data)
    ? data.data.data
    : [];

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <main className="mx-auto px-4 py-8">
        <div className="mb-12">
          {/* Assign Mentor */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Company Goal
              </CardTitle>
              <CardDescription>
                Select a strategic company-wide goal to assign to your team
                members.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Select Company Goal</Label>
                <Textarea
                  value={dreamDescription}
                  onChange={(e) => {
                    setDreamDescription(e.target.value);
                  }}
                  className="min-h-[200px]"
                  placeholder="e.g., Improve Customer Satisfaction"
                />
              </div>
              <div className="space-y-2">
                <Label>Select Employee</Label>
                <Select
                  value={selectedEmployee}
                  onValueChange={setSelectedEmployee}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Employee" />
                  </SelectTrigger>
                  <SelectContent>
                    {users?.map((item, i) => {
                      if (item?.user.role !== "EMPLOYEE") return null;

                      const employeeName = item?.user?.name; // or whatever field you want

                      return (
                        <SelectItem key={i} value={String(i)}>
                          {employeeName}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Select Mentor</Label>
                <Select
                  value={selectedMentor}
                  onValueChange={setSelectedMentor}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Mentor" />
                  </SelectTrigger>
                  <SelectContent>
                    {users?.map((item, i) => {
                      if (item?.user.role !== "MENTOR") return null;

                      const employeeName = item?.user?.name; // or whatever field you want

                      return (
                        <SelectItem key={i} value={String(i)}>
                          {employeeName}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleSubmitDream}
                className="w-full"
                disabled={!selectedEmployee || !selectedMentor}
              >
                Create Goal
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Active Dreams & Mentors Table */}
        <Card>
          <CardHeader>
            <CardTitle>Active Dreams & Mentors</CardTitle>
            <CardDescription>
              Overview of current mentorship assignments and team goals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Assign To</TableHead>
                    <TableHead>Mentor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dreamData.map((dream) => (
                    <TableRow key={dream.id}>
                      <TableCell className="font-medium">
                        {dream.goal_name}
                      </TableCell>
                      <TableCell>{dream.employee?.name}</TableCell>
                      <TableCell>{dream.mentor?.name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
