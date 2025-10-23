"use client";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useCookies } from "react-cookie";

export default function SucurityProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const navig = useRouter();
  const [{ token }] = useCookies(["token"]);
  useEffect(() => {
    if (!token) {
      navig.push("/login");
      return;
    }
  }, [navig, token]);
  return children;
}
