"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import Link from "next/link";
import { getProfileApi, updateProfileApi } from "@/lib/api/auth";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { idk } from "@/lib/utils";
import { imgCreator } from "@/lib/functions";
import { toast } from "sonner";

// ------------------ ZOD SCHEMA ------------------
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long."),
  phone_number: z
    .string()
    .regex(/^\+?\d{10,15}$/, "Invalid phone number format."),
  avatar: z
    .any()
    .refine((file) => file instanceof File || file === null, "Invalid file."),
});

// ------------------ COMPONENT ------------------
export default function Account() {
  const [{ token }] = useCookies(["token"]);
  const [mail, setMail] = useState("");
  const [currentAvatar, setCurrentAvatar] = useState<string | null>(null);

  // ----------------- Data mofidication and direction -------------
  const { data, isPending } = useQuery({
    queryKey: ["profile_data"],
    queryFn: (): idk => getProfileApi(token),
    enabled: !!token,
  });
  const { mutate } = useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: (body: FormData) => {
      return updateProfileApi({ body, token });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      toast.success(res.message ?? "Success!");
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone_number: "",
      avatar: null,
    },
  });

  // ------------------ EFFECT ------------------
  useEffect(() => {
    if (!isPending && data?.data) {
      form.setValue("name", data.data.name);
      form.setValue("phone_number", data.data.contact_number);
      setMail(data.data.email ?? "");
      setCurrentAvatar(imgCreator(data.data.avatar));
      console.log(data.data);
    }
  }, [isPending, data, form]);

  // ------------------ SUBMIT ------------------
  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("phone_number", values.phone_number);
    if (values.avatar instanceof File) {
      formData.append("avatar", values.avatar);
    }

    console.log("Submitting:", values);
    mutate(formData);
  };

  // ------------------ RENDER ------------------
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Profile Information</CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {/* Avatar Upload */}
            <div className="flex flex-col justify-center items-center">
              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="avatar">
                      <div className="relative size-[200px] border-dashed border-3 rounded-2xl bg-secondary flex items-center justify-center cursor-pointer overflow-hidden group">
                        {/* Avatar display */}
                        {field.value instanceof File ? (
                          <img
                            src={URL.createObjectURL(field.value)}
                            alt="New avatar preview"
                            className="w-full h-full object-cover"
                          />
                        ) : currentAvatar ? (
                          <img
                            src={currentAvatar}
                            alt="Current avatar"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImageIcon className="size-24 text-muted-foreground" />
                        )}

                        {/* Edit overlay on hover */}
                        <div className="absolute bottom-0 w-full text-center bg-black/50 py-2 text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          Change photo
                        </div>
                      </div>
                    </FormLabel>

                    <FormControl>
                      <input
                        id="avatar"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          field.onChange(file);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <h3 className="font-semibold mt-6 text-xl">Upload your photo</h3>
            </div>

            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <div className="border rounded-md flex items-center px-3">
                    <User2Icon className="text-muted-foreground" />
                    <FormControl>
                      <Input
                        placeholder="Full Name"
                        className="border-0 ring-0 bg-transparent"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone Field */}
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <div className="border rounded-md flex items-center px-3">
                    <PhoneIcon className="text-muted-foreground" />
                    <FormControl>
                      <Input
                        placeholder="Contact number"
                        className="border-0 ring-0 bg-transparent"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Display (Disabled) */}
            <div className="border rounded-md flex items-center px-3 opacity-60 pointer-events-none">
              <MailIcon className="text-muted-foreground" />
              <Input
                readOnly
                className="border-0 ring-0 bg-transparent"
                value={mail}
              />
            </div>

            {/* Footer */}
            <CardFooter className="pt-10 flex flex-col gap-6">
              <Button size="lg" className="w-full" type="submit">
                Save changes
              </Button>
              <Button size="lg" className="w-full" variant="secondary" asChild>
                <Link href="account/change-pass">
                  Update password from here
                </Link>
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
