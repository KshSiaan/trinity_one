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
import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import Link from "next/link";

import React from "react";

export default function Page() {
  return (
    <main className="bg-gradient-to-tl from-[#17a14c41] to-[#8d37e434] h-dvh w-dvw flex justify-center items-center">
      <Card className="min-w-1/3 aspect-square flex flex-col justify-center items-center gap-12">
        <CardHeader className="px-12 w-full ">
          <CardTitle className="text-4xl! text-center">
            Admin Dashboard
          </CardTitle>
          <CardDescription className="text-center mt-2">
            Secure access to your administration dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 px-12 w-full">
          <Label>E-mail</Label>
          <Input />
          <Label>Password</Label>
          <Input />
        </CardContent>
        <CardFooter className="w-full flex flex-col gap-6">
          <Button className="w-2/3 mx-auto" asChild>
            <Link href={"/admin"}>Log in</Link>
          </Button>
          <Button className="w-2/3 mx-auto" variant={"ghost"} asChild>
            <Link href={"/admin/forgot"}>Forgot Password</Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
