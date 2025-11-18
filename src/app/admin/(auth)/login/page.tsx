"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { loginApi } from "@/lib/api/auth";
import { toast } from "sonner";
import { idk } from "@/lib/utils";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

// 🧩 Validation schema
const formSchema = z.object({
  email: z.string().email({ message: "Enter a valid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export default function Page() {
  const [{ token }, setToken, removeToken] = useCookies(["token"]);
  const navig = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: (body: z.infer<typeof formSchema>) => {
      return loginApi({ body });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      if (!res.data.token) {
        toast.error("Error #290 Token not found");
        return;
      }
      if (token) {
        removeToken("token");
        setToken("token", res.data.token);
        toast.success(res.message ?? "Success!");
        navig.push("/admin");
        return;
      }
      setToken("token", res.data.token);
      toast.success(res.message ?? "Success!");
      navig.push("/admin");
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form submitted:", values);
    mutate(values);
  }

  return (
    <main className="bg-gradient-to-tl from-[#17a14c41] to-[#8d37e434] h-dvh w-dvw flex justify-center items-center p-6">
      <Card className="min-w-full lg:min-w-2xl flex flex-col justify-center items-center gap-12 py-10">
        <CardHeader className="px-12 w-full text-center">
          <CardTitle className="text-4xl">Admin Dashboard</CardTitle>
          <CardDescription className="mt-2">
            Secure access to your administration dashboard
          </CardDescription>
        </CardHeader>

        <CardContent className="px-12 w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-2/3 mx-auto block"
                disabled={isPending}
              >
                {isPending ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="w-full flex flex-col gap-4">
          <Button
            className="w-2/3 mx-auto"
            variant="ghost"
            disabled={isPending}
            asChild
          >
            <Link href="/admin/forgot">Forgot Password</Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
