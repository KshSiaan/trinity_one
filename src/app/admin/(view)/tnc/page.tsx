"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { Editor } from "primereact/editor";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getTermsApi, updateTermsApi } from "@/lib/api/admin";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { idk } from "@/lib/utils";

export default function Page() {
  const [{ token }] = useCookies(["token"]);
  const [content, setContent] = React.useState<string>("");

  // Fetch existing T&C
  const { data, isLoading } = useQuery({
    queryKey: ["tnc"],
    queryFn: () => getTermsApi(token),
  });
  React.useEffect(() => {
    if (data?.data?.content) {
      setContent(data.data.content);
    }
  }, [data]);
  // Mutation for updating T&C
  const { mutate, isPending: isUpdating } = useMutation({
    mutationKey: ["updateTnc"],
    mutationFn: () => updateTermsApi(token, content),
    onError: (err: any) => {
      toast.error(err.message ?? "Failed to update terms & conditions");
    },
    onSuccess: (res: idk) => {
      toast.success(res.message ?? "Successfully updated!");
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Terms & Conditions</CardTitle>
        <CardDescription>Admin can edit disclaimer</CardDescription>
      </CardHeader>

      <CardContent className="pb-12">
        <Editor
          className="h-64"
          value={content}
          onTextChange={(e) => setContent(e.htmlValue ?? "")}
          disabled={isLoading}
        />
      </CardContent>

      <CardFooter>
        <Button
          size="lg"
          className="w-full"
          onClick={() => mutate()}
          disabled={isUpdating || isLoading}
        >
          {isUpdating ? "Updating..." : "Update"}
        </Button>
      </CardFooter>
    </Card>
  );
}
