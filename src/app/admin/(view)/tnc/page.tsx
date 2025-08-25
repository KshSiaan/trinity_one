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
export default function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Terms & conditions</CardTitle>
        <CardDescription>Admin can edit disclaimer</CardDescription>
      </CardHeader>
      <CardContent className="pb-12">
        <Editor className="h-64" />
      </CardContent>
      <CardFooter>
        <Button size={"lg"} className="w-full">
          Update
        </Button>
      </CardFooter>
    </Card>
  );
}
