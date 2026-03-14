"use client";
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
import { Eye, Pencil, Trash2 } from "lucide-react";
import { AddUserDialog } from "./add-user";
import { useCookies } from "react-cookie";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUsersApi } from "@/lib/api/manager";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { imgCreator } from "@/lib/functions";
import { howl, idk } from "@/lib/utils";
import { UpdateUser } from "./update-user";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export default function UsersTable() {
  const [{ token }] = useCookies(["token"]);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsersApi(token),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["delete_user"],
    mutationFn: (id: number) => {
      return howl(`/department/delete/${id}`, { method: "DELETE", token });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      toast.success(res.message ?? "Success!");
      refetch();
    },
  });

  const users = data?.data?.data ?? [];

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p>Error loading users</p>;

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
            {users.map((userRow) => {
              const { user, department, manager, status } = userRow;
              return (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{department?.name ?? "-"}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`px-2 py-1 rounded-md text-xs font-medium ${
                        status === "Active"
                          ? "bg-green-100 text-green-600 border-0"
                          : "bg-red-100 text-red-600 border-0"
                      }`}
                    >
                      {status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4 cursor-pointer text-muted-foreground" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>View User</DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center gap-4">
                            <Avatar>
                              <AvatarImage
                                src={imgCreator(user.avatar)}
                                alt={user.name}
                              />
                              <AvatarFallback>{user.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold">{user.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {user.email}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <p className="text-sm font-medium">
                              Role:{" "}
                              <span className="font-normal">{user.role}</span>
                            </p>
                            <p className="text-sm font-medium">
                              Employee PIN:{" "}
                              <span className="font-normal">
                                {user.employee_pin}
                              </span>
                            </p>
                            <p className="text-sm font-medium">
                              Contact:{" "}
                              <span className="font-normal">
                                {user.contact_number ?? "-"}
                              </span>
                            </p>
                            <p className="text-sm font-medium">
                              Status:{" "}
                              <span className="font-normal">{status}</span>
                            </p>
                          </div>

                          <div className="space-y-1">
                            <p className="text-sm font-medium">
                              Department:{" "}
                              <span className="font-normal">
                                {department?.name ?? "-"}
                              </span>
                            </p>
                            <p className="text-sm font-medium">
                              Manager:{" "}
                              <span className="font-normal">
                                {manager?.name ?? "-"}
                              </span>
                            </p>
                            <p className="text-sm font-medium">
                              Manager Email:{" "}
                              <span className="font-normal">
                                {manager?.email ?? "-"}
                              </span>
                            </p>
                          </div>

                          <div className="space-y-1">
                            <p className="text-sm font-medium">
                              Created At:{" "}
                              <span className="font-normal">
                                {new Date(user.created_at).toLocaleString()}
                              </span>
                            </p>
                            <p className="text-sm font-medium">
                              Updated At:{" "}
                              <span className="font-normal">
                                {new Date(user.updated_at).toLocaleString()}
                              </span>
                            </p>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline">Close</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <UpdateUser data={userRow} />
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={isPending}
                        >
                          <Trash2 className="h-4 w-4 cursor-pointer text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you sure you want to delete this user?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete the user and all associated data.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => mutate(userRow.id)}
                            disabled={isPending}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
