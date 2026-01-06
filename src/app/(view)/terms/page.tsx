"use client";
import { getPrivacy, getTermsApi } from "@/lib/api/admin";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import DOMPurify from "dompurify";

export default function Page() {
  const { data, isLoading } = useQuery({
    queryKey: ["terms"],
    queryFn: () => getTermsApi(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const cleanHTML = DOMPurify.sanitize(data?.data?.content || "");

  return (
    <div
      // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
      dangerouslySetInnerHTML={{
        __html: cleanHTML,
      }}
    />
  );
}
