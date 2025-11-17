"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { howl, idk } from "@/lib/utils";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { createUserApi } from "@/lib/api/manager";

const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  role: z.string().min(1, "Role is required"),
  department: z.string().min(1, "Department is required"),
  status: z.string().min(1, "Status is required"),
  sendWelcome: z.boolean(),
  employeePin: z
    .string()
    .min(1, "Employee code is required")
    .regex(/^\d+$/, "Employee code must be numeric"),
});

type UserFormData = z.infer<typeof userSchema>;

export function AddUserDialog() {
  const [open, setOpen] = React.useState(false);
  const [avatarFile, setAvatarFile] = React.useState<File | null>(null);
  const [{ token }] = useCookies(["token"]);

  const { data, isPending } = useQuery({
    queryKey: ["departments"],
    queryFn: (): idk => howl(`/department/index`, { method: "GET", token }),
  });
  const { mutate } = useMutation({
    mutationKey: ["create_user"],
    mutationFn: (formData: FormData) => {
      return createUserApi(formData, token);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      toast.success(res.message ?? "Success!");
    },
  });
  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "",
      department: "",
      status: "",
      sendWelcome: true,
      employeePin: "",
    },
  });

  const onSubmit = (values: UserFormData) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("role", values.role.toUpperCase());
    formData.append(
      "department_id",
      values.department === "it" ? "1" : values.department === "hr" ? "2" : "3"
    );
    formData.append("status", values.status);
    formData.append("send_welcome_email", values.sendWelcome ? "1" : "0");
    formData.append("employee_pin", values.employeePin);
    if (avatarFile) formData.append("avatar", avatarFile);
    console.log("FormData entries:");
    for (const pair of formData.entries()) console.log(pair[0], pair[1]);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon />
          Add User
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-6"
          >
            {/* Avatar Upload */}
            <div className="col-span-2 flex items-center gap-4 mb-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                {avatarFile && (
                  <img
                    src={URL.createObjectURL(avatarFile)}
                    alt="avatar"
                    className="w-16 h-16 object-cover rounded-full"
                  />
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setAvatarFile(e.target.files?.[0] ?? null)}
              />
            </div>

            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Role */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USER">User</SelectItem>
                        <SelectItem value="MENTOR">Mentor</SelectItem>
                        <SelectItem value="EMPLOYEE">Employee</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Department */}
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <FormControl>
                    {isPending ? (
                      <div className="flex justify-center items-center h-12">
                        <Loader2Icon className="animate-spin" />
                      </div>
                    ) : (
                      <Select
                        value={field.value || ""}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Department" />
                        </SelectTrigger>
                        <SelectContent>
                          {data?.data?.map((dept: any) => (
                            <SelectItem key={dept.id} value={String(dept.id)}>
                              {dept.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Employee Code */}
            <FormField
              control={form.control}
              name="employeePin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Employee Code <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter employee code" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Welcome Email */}
            <FormField
              control={form.control}
              name="sendWelcome"
              render={({ field }) => (
                <FormItem className="col-span-2 flex items-center gap-2 mt-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(v) => field.onChange(!!v)}
                    />
                  </FormControl>
                  <span className="text-sm text-muted-foreground">
                    Send account activation instructions
                  </span>
                </FormItem>
              )}
            />

            {/* Footer */}
            <DialogFooter className="col-span-2 flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-green-400 text-white"
              >
                Add User
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
