"use client";
import { getPrivacy } from "@/lib/api/admin";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function page() {
  const { data, isLoading } = useQuery({
    queryKey: ["privacy"],
    queryFn: () => getPrivacy(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <pre className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-amber-400 rounded-xl p-6 shadow-lg overflow-x-auto text-sm leading-relaxed border border-zinc-700">
      <code className="whitespace-pre-wrap">
        {JSON.stringify(data, null, 2)}
      </code>
    </pre>
  );
}
