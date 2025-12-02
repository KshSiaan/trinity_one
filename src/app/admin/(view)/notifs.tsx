"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { getNotifApi, getUserNotifApi } from "@/lib/api/auth";
import { cn, idk } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { CircleOffIcon, Loader2Icon } from "lucide-react";
import React from "react";
import { useCookies } from "react-cookie";

export default function Notifs() {
  const [{ token }] = useCookies(["token"]);
  const { data, isPending } = useQuery({
    queryKey: ["notification"],
    queryFn: (): idk => {
      return getUserNotifApi({
        token,
        page: 1,
        per_page: 6,
      });
    },
  });

  if (isPending) {
    <div className={`flex justify-center items-center h-24 mx-auto`}>
      <Loader2Icon className={`animate-spin`} />
    </div>;
  }

  if (!data?.data?.data || data?.data?.data.length <= 0) {
    return (
      <div className="">
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
      </div>
    );
  }
  return (
    <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min bg-background! flex flex-col justify-start items-start p-6">
      <h3>Recent Activity</h3>
      <div className="flex flex-col gap-4 w-full py-6">
        {data?.data?.data.map((x: any) => (
          <Alert
            key={x.id}
            className={cn(x.read_at === null && "border-2! border-green-700!")}
          >
            <AlertTitle>{x.data.name}</AlertTitle>
            <AlertDescription>{x.data.message}</AlertDescription>
          </Alert>
        ))}
      </div>
    </div>
  );
}
