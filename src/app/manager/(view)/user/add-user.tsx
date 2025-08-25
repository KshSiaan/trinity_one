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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Camera, PlusIcon, Upload } from "lucide-react";
import Image from "next/image";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  role: z.string().min(1, "Role is required"),
  department: z.string().min(1, "Department is required"),
  status: z.string().min(1, "Status is required"),
  sendWelcome: z.boolean(), // ✅ always boolean
});

type FormData = z.infer<typeof schema>;

export function AddUserDialog() {
  const [open, setOpen] = React.useState(false);
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      role: "",
      department: "",
      status: "",
      sendWelcome: true, // ✅ consistent with schema
    },
  });
  function onSubmit(values: FormData) {
    console.log({
      ...values,
      employeeCode: `EMP-${Date.now().toString().slice(-6)}`, // auto-gen
    });
    setOpen(false);
  }

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

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-6"
        >
          {/* Avatar + Upload */}
          <div className="col-span-2 flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200">
              <Image
                src="/placeholder-avatar.png"
                alt="avatar"
                fill
                className="object-cover"
              />
              <button
                type="button"
                className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <Button type="button" variant="outline" className="gap-2">
              <Upload className="w-4 h-4" />
              Upload Photo
            </Button>
          </div>

          {/* Name */}
          <div>
            <Label>Name</Label>
            <Input {...form.register("name")} />
          </div>

          {/* Email */}
          <div>
            <Label>Email address</Label>
            <Input {...form.register("email")} />
          </div>

          {/* Role */}
          <div>
            <Label>Role</Label>
            <Select
              onValueChange={(v) => form.setValue("role", v)}
              defaultValue={form.getValues("role")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="employee">Employee</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Department */}
          <div>
            <Label>Department</Label>
            <Select
              onValueChange={(v) => form.setValue("department", v)}
              defaultValue={form.getValues("department")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="it">IT</SelectItem>
                <SelectItem value="hr">HR</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status */}
          <div>
            <Label>Status</Label>
            <Select
              onValueChange={(v) => form.setValue("status", v)}
              defaultValue={form.getValues("status")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Employee Code */}
          <div>
            <Label>
              Employee Code <span className="text-red-500">*</span>
            </Label>
            <Input value="Auto generated upon save" disabled />
            <p className="text-xs text-muted-foreground mt-1">
              This code will be used by employees to join this company
            </p>
          </div>

          {/* Welcome Email */}
          <div className="col-span-2">
            <Label>Send Welcome Email</Label>
            <div className="flex items-center gap-2 mt-1">
              <Checkbox
                checked={form.watch("sendWelcome")}
                onCheckedChange={(c) => form.setValue("sendWelcome", !!c)}
              />
              <span className="text-sm text-muted-foreground">
                Send account activation instruction to user&apos;s email
              </span>
            </div>
          </div>

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
              Add user
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
