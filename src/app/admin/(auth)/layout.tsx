import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

export default async function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const token = (await cookies()).get("token")?.value;
  if (token) {
    return redirect("/admin");
  }
  return children;
}
