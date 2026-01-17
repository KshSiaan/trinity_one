"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useCookies } from "react-cookie";
import { useMutation } from "@tanstack/react-query";
import { changePasswordApi } from "@/lib/api/auth";
import { toast } from "sonner";
import { idk } from "@/lib/utils";
import { useRouter } from "next/navigation";

// 🔐 Schema
const formSchema = z
  .object({
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function Page() {
  const navig = useRouter();
  const [{ token }] = useCookies(["token"]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["reset_password"],
    mutationFn: ({
      password,
      password_confirmation,
    }: {
      password: string;
      password_confirmation: string;
    }) => {
      return changePasswordApi({
        token,
        body: { password, password_confirmation },
      });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      navig.push("/manager");
      toast.success(res.message ?? "Successfully updated your password!");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate({
      password: values.newPassword,
      password_confirmation: values.confirmPassword,
    });
  };

  return (
    <main className="bg-gradient-to-tl from-[#17a14c41] to-[#8d37e434] h-dvh w-dvw flex justify-center items-center">
      <Card className="min-w-[95%] lg:min-w-xl flex flex-col justify-center items-center gap-8 py-10">
        <CardHeader className="px-8 w-full">
          <CardTitle className="text-3xl text-center">Reset Password</CardTitle>
          <CardDescription className="text-center mt-2">
            Save a strong password you can remember
          </CardDescription>
        </CardHeader>

        <CardContent className="w-full px-8">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 w-full"
            >
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter new password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Re-enter password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full" type="submit">
                Reset Password
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="text-center text-sm">
          <Link href="/admin" className="text-muted-foreground hover:underline">
            Go back to Admin Login
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
