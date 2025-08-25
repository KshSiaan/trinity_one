import React from "react";
import { CompanyInfoCard } from "./company-info";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function Page() {
  return (
    <section className="space-y-6">
      <CompanyInfoCard />
      <Card>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">
                Manager Full Name<span className="text-red-500">*</span>
              </label>
              <Input placeholder="e.g. zetanest" className="border-gray-300" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">
                Manager Email<span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="e.g. contact@gmail.com"
                type="email"
                className="border-gray-300"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">
                Manager Phone<span className="text-red-500">*</span>
              </label>
              <Input placeholder="e.g. zetanest" className="border-gray-300" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">
                Manager Code*<span className="text-red-500">*</span>
              </label>
              <Input
                // placeholder=
                value="Auto Generated Upon Save"
                type="email"
                disabled
                className="border-gray-300"
              />
              <p className="text-xs">
                This code will be used by employees to join this company
              </p>
            </div>
          </div>
          <div className="">
            <p>Send Welcome Email</p>
            <div className="flex items-center gap-2 mt-4">
              <Checkbox defaultChecked />
              <Label className="">
                Send account activation instruction to user’s email
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
