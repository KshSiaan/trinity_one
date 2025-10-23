"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { changePasswordApi, updatePasswordApi } from "@/lib/api/auth";
import { idk } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

function PasswordField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex flex-col space-y-4">
      <Label>{label}</Label>
      <div className="relative">
        <Input
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="******"
          className="pr-10"
        />
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-600"
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}

export default function Page() {
  const [{ token }] = useCookies(["token"]);
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");

  const { mutate } = useMutation({
    mutationKey: ["change_pass"],
    mutationFn: () => {
      return updatePasswordApi({
        body: {
          current_password: current,
          password: newPass,
          password_confirmation: confirm,
        },
        token,
      });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      toast.success(res.message ?? "Success!");
    },
  });
  return (
    <section className="w-full mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Update password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <PasswordField
            label="Current password*"
            value={current}
            onChange={setCurrent}
          />
          <PasswordField
            label="New password*"
            value={newPass}
            onChange={setNewPass}
          />
          <PasswordField
            label="Confirm password*"
            value={confirm}
            onChange={setConfirm}
          />
        </CardContent>
        <CardFooter className="w-full">
          <Button
            className="w-full"
            size="lg"
            onClick={() => {
              mutate();
            }}
          >
            Update password
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
