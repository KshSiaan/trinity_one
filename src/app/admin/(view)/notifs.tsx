"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { getNotifApi } from "@/lib/api/auth";
import { idk } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { CircleOffIcon, Loader2Icon } from "lucide-react";
import React from "react";
import { useCookies } from "react-cookie";

export default function Notifs() {
  const [{ token }] = useCookies(["token"]);
  const { data, isPending } = useQuery({
    queryKey: ["notif"],
    queryFn: (): idk => {
      return getNotifApi({ token, page: 1, per_page: 6 });
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
        {Array(6)
          .fill("")
          .map((_, i) => (
            <div
              key={i}
              className="h-18 w-full border rounded-lg flex items-center px-4"
            >
              <Avatar className="size-12">
                <AvatarImage src={"https://avatar.iran.liara.run/public"} />
                <AvatarFallback>UI</AvatarFallback>
              </Avatar>
              <div className="h-full flex flex-col items-start justify-center ml-4">
                <h4>
                  <span className="font-semibold">Sarah Chan</span> completed
                  leadership goal training!
                </h4>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
