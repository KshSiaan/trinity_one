"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { getUserNotifApi, readAllNotifApi, readNotifApi } from "@/lib/api/auth";
import { cn, idk } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import React from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

export default function Page() {
  const [{ token }] = useCookies(["token"]);
  const qcl = useQueryClient();
  const { data, isPending } = useQuery({
    queryKey: ["notification"],
    queryFn: (): idk => {
      return getUserNotifApi({
        token,
        page: 1,
        per_page: 14,
      });
    },
  });
  const { mutate: readAll, isPending: reading } = useMutation({
    mutationKey: ["readNotifAll"],
    mutationFn: () => {
      return readAllNotifApi(token);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      toast.success(res.message ?? "Success!");
      qcl.invalidateQueries({ queryKey: ["notification"] });
    },
  });
  const { mutate } = useMutation({
    mutationKey: ["readNotif"],
    mutationFn: (id: string) => {
      return readNotifApi(token, id);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      toast.success(res.message ?? "Success!");
      qcl.invalidateQueries({ queryKey: ["notification"] });
    },
  });
  if (isPending) {
    return (
      <div className={`flex justify-center items-center h-24 mx-auto`}>
        <Loader2Icon className={`animate-spin`} />
      </div>
    );
  }
  return (
    <section>
      <div className="w-full flex justify-end items-center mb-4">
        <Button
          onClick={() => {
            readAll();
          }}
          disabled={reading}
        >
          {reading ? "In Progress.." : "Read All Notification"}
        </Button>
      </div>
      {data?.data?.data?.map((x: idk) => (
        <Alert
          key={x.id}
          className={cn(x.read_at === null && "border-2! border-green-700!")}
          onClick={() => {
            mutate(x.id);
          }}
        >
          <AlertTitle>{x.data.name}</AlertTitle>
          <AlertDescription>{x.data.message}</AlertDescription>
        </Alert>
      ))}
    </section>
  );
}
