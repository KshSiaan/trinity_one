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
import { verifyOtpApi } from "@/lib/api/auth";
import { idk } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

export default function Page() {
  const router = useRouter();
  const [mail, setMail] = useState("");
  const [otp, setOtp] = useState("");
  const [{ token }, setToken, removeToken] = useCookies(["token"]);
  useEffect(() => {
    const forgMail = localStorage.getItem("forgotMail");
    setMail(forgMail ?? "");
  }, []);

  const { mutate, isPending } = useMutation({
    mutationKey: ["verify"],
    mutationFn: () => verifyOtpApi({ body: { otp, email: mail } }),
    onError: (err: idk) => {
      toast.error(err?.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      toast.success(res?.message ?? "Success!");
      if (token) {
        removeToken("token");
        setToken("token", res.data.token);
      } else {
        setToken("token", res.data.token);
      }
      localStorage.removeItem("forgotMail");
      router.push("/manager/reset");
    },
  });

  return (
    <main className="bg-gradient-to-tl from-[#17a14c41] to-[#8d37e434] h-dvh w-dvw flex justify-center items-center">
      <Card className="lg:min-w-xl aspect-square flex flex-col justify-center items-center gap-12">
        <CardHeader className="px-12 w-full text-center">
          <CardTitle className="text-3xl">Verify OTP</CardTitle>
          <CardDescription className="mt-2">
            Enter the 6-digit code sent to your email
          </CardDescription>
        </CardHeader>

        <CardContent className="flex justify-center items-center w-full">
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            {[...Array(6)].map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: blehh
              <InputOTPSlot key={i} index={i} className="rounded-lg" />
            ))}
          </InputOTP>
        </CardContent>

        <CardFooter className="w-full flex justify-center">
          <Button
            className="w-2/3"
            disabled={otp.length < 6 || isPending}
            onClick={() => mutate()}
          >
            {isPending ? "Verifying..." : "Verify Code"}
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
