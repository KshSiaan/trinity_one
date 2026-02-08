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

  const {
    data,
    isPending: isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["departments"],
    queryFn: (): idk => howl(`/department/index`, { method: "GET", token }),
  });
  const { mutate, isPending } = useMutation({
    mutationKey: ["delete_department"],
    mutationFn: (id: string) => {
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

  const users = data?.data ?? [];

  if (isLoading) return <p>Loading departments...</p>;
  if (error) return <p>Error loading departments</p>;

  return (
    <Card className="shadow-sm rounded-2xl">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Department</h2>
          <AddUserDialog />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">ID</TableHead>
              <TableHead>Department Name</TableHead>
              <TableHead>Created at</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((department: any) => {
              return (
                <TableRow key={department.id}>
                  <TableCell>{department.id}</TableCell>
                  <TableCell>{department.name}</TableCell>
                  <TableCell>
                    {new Date(department.created_at).toDateString()}
                  </TableCell>
                  <TableCell className="flex justify-end gap-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant={"ghost"} size={"icon"}>
                          <Eye className="h-4 w-4 cursor-pointer text-muted-foreground" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>View User</DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center gap-4">
                            {/* <Avatar>
                              <AvatarImage
                                src={imgCreator(department.avatar)}
                                alt={department.name}
                              />
                              <AvatarFallback>
                                {department.name[0]}
                              </AvatarFallback>
                            </Avatar> */}
                            <div>
                              <p className="font-semibold">
                                Name: {department.name}
                              </p>
                              {/* <p className="text-sm text-muted-foreground">
                                {department.email}
                              </p> */}
                            </div>
                          </div>

                          {/* <div className="space-y-1">
                            <p className="text-sm font-medium">
                              Role:{" "}
                              <span className="font-normal">
                                {department.role}
                              </span>
                            </p>
                            <p className="text-sm font-medium">
                              Employee PIN:{" "}
                              <span className="font-normal">
                                {department.employee_pin}
                              </span>
                            </p>
                            <p className="text-sm font-medium">
                              Contact:{" "}
                              <span className="font-normal">
                                {department.contact_number ?? "-"}
                              </span>
                            </p>
                            <p className="text-sm font-medium">
                              Status:{" "}
                              <span className="font-normal">
                                {department.status}
                              </span>
                            </p>
                          </div> */}

                          <div className="space-y-1">
                            {/* <p className="text-sm font-medium">
                              Department:{" "}
                              <span className="font-normal">
                                {department?.name ?? "-"}
                              </span>
                            </p> */}
                            {/* <p className="text-sm font-medium">
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
                            </p> */}
                          </div>

                          <div className="space-y-1">
                            <p className="text-sm font-medium">
                              Created At:{" "}
                              <span className="font-normal">
                                {new Date(
                                  department.created_at,
                                ).toLocaleString()}
                              </span>
                            </p>
                            <p className="text-sm font-medium">
                              Updated At:{" "}
                              <span className="font-normal">
                                {new Date(
                                  department.updated_at,
                                ).toLocaleString()}
                              </span>
                            </p>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline">Close</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <UpdateUser data={department} />
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant={"ghost"}
                          size={"icon"}
                          disabled={isPending}
                        >
                          <Trash2 className="h-4 w-4 cursor-pointer text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you sure you want to delete this department?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete the department and all associated data.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => mutate(department.id)}
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
