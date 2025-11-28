"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getNotifApi } from "@/lib/api/auth";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CircleOffIcon,
  EditIcon,
  EyeIcon,
  Loader2Icon,
  PlusIcon,
  Trash2Icon,
} from "lucide-react";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Separator } from "@/components/ui/separator";
import CreateNotif from "./create-notif";

import { idk } from "@/lib/utils";
import UpdateNotif from "./update-notif";
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
import { deleteNotif } from "@/lib/api/admin";
import { toast } from "sonner";
export default function Page() {
  const qcl = useQueryClient();
  const [{ token }] = useCookies(["token"]);
  const [page, setPage] = React.useState(1);
  const [updateDataset, setUpdateDataset] = useState<
    | {
        id: number;
        name: string;
        message: string;
        role: "USER" | "EMPLOYEE";
        status: string;
        created_at: string;
        updated_at: string;
      }
    | undefined
  >();
  const { data, isPending } = useQuery({
    queryKey: ["notif", page],
    queryFn: (): idk => getNotifApi({ token, page, per_page: 10 }),
  });
  const { mutate } = useMutation({
    mutationKey: ["delete_notif"],
    mutationFn: (id: string | number) => {
      return deleteNotif(token, id);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      toast.success(res.message ?? "Success!");
      qcl.invalidateQueries({ queryKey: ["notif"] });
    },
  });
  return (
    <section className="w-full h-full">
      <Card>
        <CardHeader className=" flex justify-between items-center">
          <CardTitle className="text-2xl">Manage Notification</CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusIcon /> Create Notification
              </Button>
            </DialogTrigger>
            <CreateNotif />
          </Dialog>
        </CardHeader>
        <CardContent className="">
          <div className="mt-6 w-full">
            {isPending ? (
              <div className={`flex justify-center items-center h-24 mx-auto`}>
                <Loader2Icon className={`animate-spin`} />
              </div>
            ) : !data?.data?.data || data?.data?.data.length <= 0 ? (
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant={"icon"}>
                    <CircleOffIcon />
                  </EmptyMedia>
                  <EmptyTitle>No Notifications found</EmptyTitle>
                </EmptyHeader>
                <EmptyContent>
                  <EmptyDescription>
                    You'll recieve a notification soon
                  </EmptyDescription>
                </EmptyContent>
              </Empty>
            ) : (
              <Table>
                <TableHeader className="bg-secondary">
                  <TableRow>
                    <TableHead>TITLE</TableHead>
                    <TableHead>AUDIENCE</TableHead>
                    <TableHead>STATUS</TableHead>
                    <TableHead>DATE</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.data?.data.map((x: any) => (
                    <TableRow key={x.id}>
                      <TableCell>{x.name}</TableCell>
                      <TableCell>{x.role}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            x.status === "Draft" ? "secondary" : "default"
                          }
                        >
                          {x.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(x.created_at).toDateString()}
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant={"ghost"} size={"icon"}>
                              <EyeIcon />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className=" text-sm">
                            <DialogHeader>
                              <DialogTitle>{x.name}</DialogTitle>
                            </DialogHeader>
                            <div>
                              <div className="flex justify-start items-center gap-2">
                                <span>Name:</span>
                                {x.name}
                              </div>
                              <div className="flex justify-start items-center gap-2">
                                <span>Message:</span>
                                {x.message}
                              </div>
                              <div className="flex justify-start items-center gap-2">
                                <span>Audience:</span>
                                {x.role}
                              </div>
                              <div className="flex justify-start items-center gap-2">
                                <span>Status:</span>
                                {x.status}
                              </div>
                              <Separator className="my-2" />
                              <div className="flex justify-between items-center">
                                <div className="flex justify-start items-center gap-2">
                                  <span>Created At:</span>
                                  {new Date(x.created_at).toLocaleDateString()}
                                </div>
                                <div className="flex justify-start items-center gap-2">
                                  <span>Updated At:</span>
                                  {new Date(x.updated_at).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant={"ghost"}
                          size={"icon"}
                          onClick={() => {
                            setUpdateDataset(x);
                          }}
                        >
                          <EditIcon />
                        </Button>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant={"ghost"} size={"icon"}>
                              <Trash2Icon />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogDescription>
                              You're going to delete "{x.name}" notification.
                              This action can not be undone.
                            </AlertDialogDescription>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => {
                                  mutate(x.id);
                                }}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </CardContent>
        <Dialog
          open={!!updateDataset}
          onOpenChange={(e) => {
            if (updateDataset) {
              setUpdateDataset(undefined);
            }
          }}
        >
          <DialogTrigger asChild></DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {!!updateDataset && !!updateDataset.name && updateDataset.name}
              </DialogTitle>
            </DialogHeader>
            <UpdateNotif
              data={updateDataset as any}
              setUpdateDataset={setUpdateDataset}
            />
          </DialogContent>
        </Dialog>
        <CardFooter className="flex justify-end items-center">
          <div className="">
            <Pagination>
              <PaginationContent>
                {/* Prev */}
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => {
                      if (data?.data?.prev_page_url) {
                        const prevPage = data.data.current_page - 1;
                        setPage(prevPage);
                      }
                    }}
                    className={
                      !data?.data?.prev_page_url
                        ? "opacity-50 pointer-events-none"
                        : ""
                    }
                  />
                </PaginationItem>

                {/* Page Numbers */}
                {Array.from({ length: data?.data?.last_page || 1 }).map(
                  (_, i) => {
                    const page = i + 1;
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          isActive={page === data?.data?.current_page}
                          onClick={() => {
                            setPage(page);
                          }}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  }
                )}

                {/* Next */}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => {
                      if (data?.data?.next_page_url) {
                        const nextPage = data.data.current_page + 1;
                        setPage(nextPage);
                      }
                    }}
                    className={
                      !data?.data?.next_page_url
                        ? "opacity-50 pointer-events-none"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
}
