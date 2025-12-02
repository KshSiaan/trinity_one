"use client";

import { useState } from "react";
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
import { Users, Target, Award } from "lucide-react";

export default function TeamManagementPage() {
  const [dreamTitle, setDreamTitle] = useState("");
  const [dreamDescription, setDreamDescription] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedMentor, setSelectedMentor] = useState("");

  // Mock data for active dreams and mentors
  const activeDreams = [
    {
      id: 1,
      member: "Master React Hooks",
      assignTo: "Ittishof Bashar",
      mentor: "Ittishof Bashar",
      status: "Active",
    },
    {
      id: 2,
      member: "Master React Hooks",
      assignTo: "Ittishof Bashar",
      mentor: "Ittishof Bashar",
      status: "Active",
    },
    {
      id: 3,
      member: "Master React Hooks",
      assignTo: "Ittishof Bashar",
      mentor: "Ittishof Bashar",
      status: "Active",
    },
    {
      id: 4,
      member: "Master React Hooks",
      assignTo: "Ittishof Bashar",
      mentor: "Ittishof Bashar",
      status: "Active",
    },
    {
      id: 5,
      member: "Master React Hooks",
      assignTo: "Ittishof Bashar",
      mentor: "Ittishof Bashar",
      status: "Active",
    },
    {
      id: 6,
      member: "Master React Hooks",
      assignTo: "Ittishof Bashar",
      mentor: "Ittishof Bashar",
      status: "Active",
    },
    {
      id: 7,
      member: "Master React Hooks",
      assignTo: "Ittishof Bashar",
      mentor: "Ittishof Bashar",
      status: "Active",
    },
  ];

  const employees = [
    "John Doe",
    "Jane Smith",
    "Mike Johnson",
    "Sarah Wilson",
    "Ittishof Bashar",
  ];
  const mentors = [
    "Senior Dev A",
    "Senior Dev B",
    "Tech Lead C",
    "Ittishof Bashar",
  ];

  const handleCreateGoal = () => {
    console.log("Creating goal:", { dreamTitle, dreamDescription });
    // Reset form
    setDreamTitle("");
    setDreamDescription("");
  };

  const handleGenerateDescription = () => {
    setDreamDescription(
      "Improve customer satisfaction by implementing advanced features and optimizing user experience."
    );
  };

  const handleAssignMentor = () => {
    console.log("Assigning mentor:", { selectedEmployee, selectedMentor });
    // Reset selections
    setSelectedEmployee("");
    setSelectedMentor("");
  };

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
                    {employees.map((employee) => (
                      <SelectItem key={employee} value={employee}>
                        {employee}
                      </SelectItem>
                    ))}
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
                    {mentors.map((mentor) => (
                      <SelectItem key={mentor} value={mentor}>
                        {mentor}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleAssignMentor}
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
                  {activeDreams.map((dream) => (
                    <TableRow key={dream.id}>
                      <TableCell className="font-medium">
                        {dream.member}
                      </TableCell>
                      <TableCell>{dream.assignTo}</TableCell>
                      <TableCell>{dream.mentor}</TableCell>
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
