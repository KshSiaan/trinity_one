"use client";

import { redirect } from "next/navigation";
import { type ReactNode } from "react";
import { useCookies } from "react-cookie";

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [{ token }] = useCookies(["token"]);
  if (!token) {
    return redirect("/admin/forgot");
  }
  return children;
}
