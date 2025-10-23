"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import { getProfileApi } from "@/lib/api/auth";
import { idk } from "@/lib/utils";
import { imgCreator } from "@/lib/functions";
import { Loader2Icon } from "lucide-react";
export default function HeaderProfSection() {
  const [{ token }] = useCookies(["token"]);
  const { data, isPending } = useQuery({
    queryKey: ["profile_data"],
    queryFn: (): idk => getProfileApi(token),
    enabled: !!token,
  });
  if (isPending) {
    return (
      <div className={`flex justify-center items-center h-full mx-auto`}>
        <Loader2Icon className={`animate-spin`} />
      </div>
    );
  }
  return (
    <div className="flex flex-row gap-4 justify-center items-center">
      <Avatar>
        <AvatarImage
          className="object-cover object-center"
          src={
            imgCreator(data.data.avatar) ??
            "https://avatar.iran.liara.run/public"
          }
        />
        <AvatarFallback>UI</AvatarFallback>
      </Avatar>
      <div className="flex flex-col justify-center items-start">
        <p className="font-semibold">{data.data.name ?? "N/A"}</p>
        <p className="text-muted-foreground text-xs">
          {data.data.email ?? "N/A"}
        </p>
      </div>
    </div>
  );
}
