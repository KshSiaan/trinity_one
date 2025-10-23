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
import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp";
import { employeeLoginApi } from "@/lib/api/auth";
import { idk } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

export default function Page() {
  const navig = useRouter();
  const [pin, setPin] = useState("");
  const [{ token }, setToken, removeToken] = useCookies(["token"]);

  const { mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: () => {
      return employeeLoginApi({ body: { pin } });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      if (res.data.token) {
        if (token) {
          removeToken("token");
          setToken("token", res.data.token);
        } else {
          setToken("token", res.data.token);
        }
        toast.success(res.message ?? "Successfully logged in!");
        navig.push("/manager");
      }
    },
  });

  return (
    <main className="bg-gradient-to-tl from-[#17a14c41] to-[#8d37e434] h-dvh w-dvw flex justify-center items-center">
      <Card className="min-w-1/3 aspect-square flex flex-col justify-center items-center gap-12">
        <CardHeader className="px-12 w-full ">
          <CardTitle className="text-4xl! text-center">
            Manager Portal
          </CardTitle>
          <CardDescription className="text-center mt-2">
            Enter your 6- digit Manager PIN to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center px-12 w-full">
          <InputOTP
            maxLength={6}
            value={pin}
            onChange={setPin}
            onPaste={() => {
              setTimeout(() => mutate(), 0);
            }}
          >
            <InputOTPSlot index={0} className="rounded-lg!" />
            <InputOTPSlot index={1} className="rounded-lg!" />
            <InputOTPSlot index={2} className="rounded-lg!" />
            <InputOTPSlot index={3} className="rounded-lg!" />
            <InputOTPSlot index={4} className="rounded-lg!" />
            <InputOTPSlot index={5} className="rounded-lg!" />
          </InputOTP>
        </CardContent>
        <CardFooter className="w-full">
          <Button
            className="w-2/3 mx-auto"
            onClick={() => {
              mutate();
            }}
          >
            Log in
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
