"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgotPassApi } from "@/lib/api/auth";
import { idk } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const navig = useRouter();
  const [mail, setMail] = useState("");
  const { mutate } = useMutation({
    mutationKey: ["forgot"],
    mutationFn: () => {
      return forgotPassApi({ body: { email: mail } });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      if (res.status !== "success") {
        toast.error(res.message ?? "Failed to complete this request");
        return;
      }
      localStorage.setItem("forgotMail", mail);
      navig.push("/admin/verify");
      toast.success(res.message ?? "Please check your given mail");
    },
  });

  return (
    <main className="bg-gradient-to-tl from-[#17a14c41] to-[#8d37e434] h-dvh w-dvw flex justify-center items-center">
      <Card className="min-w-1/3 aspect-square flex flex-col justify-center items-center gap-12">
        <CardHeader className="px-12 w-full ">
          <CardTitle className="text-4xl! text-center">
            Reset Password
          </CardTitle>
          <CardDescription className="text-center mt-2">
            Secure access to your administration dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 px-12 w-full">
          <Label>E-mail</Label>
          <Input
            value={mail}
            onChange={(e) => {
              setMail(e.target.value);
            }}
          />
        </CardContent>
        <CardFooter className="w-full flex flex-col gap-6">
          <Button
            className="w-2/3 mx-auto"
            onClick={() => {
              mutate();
            }}
          >
            Send Verification Code
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
