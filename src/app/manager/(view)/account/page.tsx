import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ImageIcon, MailIcon, PhoneIcon, User2Icon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Card>
            <CardContent className="flex flex-col justify-center items-center">
              <div className="size-[200px] border-dashed border-3 rounded-2xl bg-secondary flex items-center justify-center">
                <ImageIcon className="size-24 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mt-6 text-xl">Upload your photo</h3>
              <div className="mt-6 w-full space-y-6">
                <div className="border rounded-md flex items-center px-3">
                  <User2Icon className="text-muted-foreground" />
                  <Input
                    placeholder="Full Name"
                    className="border-0! ring-0! bg-transparent"
                  />
                </div>
                <div className="border rounded-md flex items-center px-3">
                  <PhoneIcon className="text-muted-foreground" />
                  <Input
                    placeholder="Contact number"
                    className="border-0! ring-0! bg-transparent"
                  />
                </div>
                <div className="border rounded-md flex items-center px-3">
                  <MailIcon className="text-muted-foreground" />
                  <Input
                    placeholder="Email"
                    className="border-0! ring-0! bg-transparent"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="mt-24 flex flex-col gap-6">
              <Button size={"lg"} className="w-full">
                Save changes
              </Button>
              <Button
                size={"lg"}
                className="w-full"
                variant={"secondary"}
                asChild
              >
                <Link href={"account/change-pass"}>
                  Update password from here
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </CardContent>
      </Card>
    </section>
  );
}
