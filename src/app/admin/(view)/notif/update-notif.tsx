"use client";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNotif, updateNotifApi } from "@/lib/api/admin";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { useEffect } from "react";

// -----------------
// ZOD SCHEMA
// -----------------
const notifSchema = z.object({
  name: z.string().min(1, "Name is required"),
  message: z.string().min(1, "Message is required"),
  role: z.string(),
  status: z.enum(["Send", "Draft"]), // handled during mutate
});

type NotifFormType = z.infer<typeof notifSchema>;

export default function UpdateNotif({
  data,
  setUpdateDataset,
}: {
  data: {
    id: number;
    name: string;
    message: string;
    role: "USER" | "EMPLOYEE";
    status: string;
    created_at: string;
    updated_at: string;
  };
  setUpdateDataset: any;
}) {
  const [{ token }] = useCookies(["token"]);
  const qcl = useQueryClient();
  const form = useForm<NotifFormType>({
    resolver: zodResolver(notifSchema),
    defaultValues: {
      name: "",
      message: "",
      role: "USER",
      status: "Send",
    },
  });

  useEffect(() => {
    if (data) {
      form.setValue("name", data.name);
      form.setValue("message", data.message);
      form.setValue("role", data.role);
    }
  }, [data, form]);

  const { mutate, isPending } = useMutation({
    mutationKey: ["update_notif"],
    mutationFn: (body: {
      name: string;
      message: string;
      role: string;
      status: string;
    }) => updateNotifApi(token, data.id, body),

    onError: (err) => {
      toast.error(err?.message ?? "Failed to complete request");
    },
    onSuccess: (res) => {
      qcl.invalidateQueries({ queryKey: ["notif"] });
      toast.success(res?.message ?? "Success!");
      form.reset();
      setUpdateDataset(undefined);
    },
  });

  const submit = (data: NotifFormType) => {
    mutate(data);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Update Notification</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(submit)}>
          {/* NAME FIELD */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter title..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* MESSAGE FIELD */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea placeholder="Write your message..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ROLE SELECT */}
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Audience</FormLabel>
                <FormControl>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USER">User</SelectItem>
                      <SelectItem value="EMPLOYEE">Employee</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* HIDDEN STATUS — updated via buttons */}
          <input type="hidden" {...form.register("status")} />

          <DialogFooter className="gap-2">
            {/* DRAFT BTN */}
            <Button
              type="button"
              variant="secondary"
              disabled={isPending}
              onClick={() => {
                form.setValue("status", "Draft");
                form.handleSubmit(submit)();
              }}
            >
              Save as Draft
            </Button>

            {/* SEND BTN */}
            <Button
              type="submit"
              disabled={isPending}
              onClick={() => form.setValue("status", "Send")}
            >
              Send Now
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
