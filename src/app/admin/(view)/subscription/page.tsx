"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getSubsAPI } from "@/lib/api/admin";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { EditIcon, EyeIcon, Loader2Icon, PlusIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useCookies } from "react-cookie";

export default function Page() {
  const [{ token }] = useCookies(["token"]);
  const { data, isPending } = useQuery({
    queryKey: ["subs"],
    queryFn: () => {
      return getSubsAPI(token);
    },
  });
  return (
    <Card className="h-full w-full">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-2xl text-muted-foreground">
          Subscription Plan
        </CardTitle>
        {/* <Button asChild>
          <Link href={"/admin/subscription/add"}>
            <PlusIcon />
            Create Plan
          </Link>
        </Button> */}
      </CardHeader>
      <CardContent>
        {isPending ? (
          <div className={`flex justify-center items-center h-24 mx-auto`}>
            <Loader2Icon className={`animate-spin`} />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plan Name</TableHead>
                <TableHead>Features</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data?.plans.map((x) => (
                <TableRow key={x.id}>
                  <TableCell>{x.name}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant={"outline"} className="text-xs!">
                          <EyeIcon />
                          View Features
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{x.name} Plan Features</DialogTitle>
                        </DialogHeader>
                        <div className="">
                          <ul className="list-disc list-inside">
                            {x.features.map((y) => (
                              <li key={y}>{y}</li>
                            ))}
                          </ul>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                  <TableCell>{x.interval}</TableCell>
                  <TableCell>${x.price}</TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        x.is_active
                          ? "bg-green-200 text-green-600"
                          : "bg-secondary text-foreground"
                      )}
                    >
                      {x.is_active ? "Active" : "Disabled"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant={"ghost"} size={"icon"} asChild>
                      <Link href={`subscription/${x.id}`}>
                        <EditIcon />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
