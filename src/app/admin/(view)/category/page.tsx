import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EditIcon, PlusIcon, Trash2Icon } from "lucide-react";
import React from "react";

export default function Page() {
  return (
    <section>
      <h2 className="mb-6 text-2xl">Manage Preference Category</h2>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Your categories & subcategories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 rounded-lg border flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="size-12 aspect-square border"></div>{" "}
              <h3>Emotional</h3>
            </div>
            <div className="">
              <Button variant={"ghost"}>
                <EditIcon />
              </Button>
              <Button variant={"ghost"}>
                <Trash2Icon />
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center items-center">
          <Button>
            <PlusIcon />
            Add a new category
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
