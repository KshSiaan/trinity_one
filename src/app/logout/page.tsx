"use client";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

export default function Page() {
  const [{ token }, , removeCookie] = useCookies(["token"]);
  const navig = useRouter();
  useEffect(() => {
    try {
      if (token) {
        removeCookie("token", { path: "/" });
      }
      navig.push("/");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  }, [removeCookie, navig, token]);
  return (
    <div className={`flex justify-center items-center h-24 mx-auto`}>
      <Loader2Icon className={`animate-spin`} />
    </div>
  );
}
