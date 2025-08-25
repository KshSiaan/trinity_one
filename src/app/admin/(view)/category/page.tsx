import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant={"ghost"}>
                    <EditIcon />
                  </Button>
                </DialogTrigger>
                <DialogContent className="min-w-[80dvw]">
                  <DialogHeader>
                    <DialogTitle>Edit your category </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6 mt-6">
                    <Label>Upload Icon</Label>
                    <Input type="file" />
                    <Label>Category name</Label>
                    <Input placeholder="" />
                  </div>
                  <DialogFooter>
                    <Button className="px-24" size={"lg"}>
                      Update
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant={"ghost"}>
                    <Trash2Icon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent side="bottom" align="end">
                  <h3 className="font-semibold">Delete Category</h3>
                  <p className="text-sm">
                    If you delete the category, it will be permanently removed
                    from your app
                  </p>
                  <div className="w-full flex justify-between items-center mt-6">
                    <Button variant={"ghost"} className="text-destructive">
                      Delete
                    </Button>
                    <Button>Cancel</Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center items-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusIcon />
                Add a new category
              </Button>
            </DialogTrigger>
            <DialogContent className="min-w-[80dvw]">
              <DialogHeader>
                <DialogTitle>Add your category </DialogTitle>
              </DialogHeader>
              <div className="space-y-6 mt-6">
                <Label>Upload Icon</Label>
                <Input type="file" />
                <Label>Category name</Label>
                <Input placeholder="" />
              </div>
              <DialogFooter>
                <Button className="px-24" size={"lg"}>
                  Add
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </section>
  );
}
