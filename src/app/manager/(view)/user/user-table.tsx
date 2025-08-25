import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Pencil, Trash2, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddUserDialog } from "./add-user";

const users = [
  {
    name: "Ittishaf Bashar",
    role: "Employee",
    department: "Engineering",
    status: "Inactive",
  },
  {
    name: "Ittishaf Bashar",
    role: "Mentor",
    department: "Engineering",
    status: "Active",
  },
  {
    name: "Ittishaf Bashar",
    role: "Employee",
    department: "Engineering",
    status: "Active",
  },
  {
    name: "Ittishaf Bashar",
    role: "Mentor",
    department: "Engineering",
    status: "Inactive",
  },
  {
    name: "Ittishaf Bashar",
    role: "Employee",
    department: "Engineering",
    status: "Active",
  },
  {
    name: "Ittishaf Bashar",
    role: "Mentor",
    department: "Engineering",
    status: "Inactive",
  },
  {
    name: "Ittishaf Bashar",
    role: "Employee",
    department: "Engineering",
    status: "Active",
  },
];

export default function UsersTable() {
  return (
    <Card className="shadow-sm rounded-2xl">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Users</h2>
          <AddUserDialog />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">User Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, i) => (
              <TableRow key={i}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.department}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`px-2 py-1 rounded-md text-xs font-medium ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-600 border-0"
                        : "bg-red-100 text-red-600 border-0"
                    }`}
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="flex justify-end gap-3">
                  <Eye className="h-4 w-4 cursor-pointer text-muted-foreground" />
                  <Pencil className="h-4 w-4 cursor-pointer text-muted-foreground" />
                  <Trash2 className="h-4 w-4 cursor-pointer text-muted-foreground" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
