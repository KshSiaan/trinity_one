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
import Link from "next/link";

import React from "react";

export default function Page() {
  return (
    <main className="bg-gradient-to-tl from-[#17a14c41] to-[#8d37e434] h-dvh w-dvw flex justify-center items-center">
      <Card className="min-w-1/3 aspect-square flex flex-col justify-center items-center gap-12">
        <CardHeader className="px-12 w-full ">
          <CardTitle className="text-4xl! text-center">New Password</CardTitle>
          <CardDescription className="text-center mt-2">
            Create a strong and secure password
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center px-12 w-full">
          <InputOTP maxLength={6}>
            <InputOTPSlot index={0} className="rounded-lg!" />
            <InputOTPSlot index={1} className="rounded-lg!" />
            <InputOTPSlot index={2} className="rounded-lg!" />
            <InputOTPSlot index={3} className="rounded-lg!" />
            <InputOTPSlot index={4} className="rounded-lg!" />
            <InputOTPSlot index={5} className="rounded-lg!" />
          </InputOTP>
        </CardContent>
        <CardFooter className="w-full">
          <Button className="w-2/3 mx-auto" asChild>
            <Link href={"/admin/reset"}>Verify Code</Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
