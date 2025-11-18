"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { X, Plus } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";

interface Feature {
  id: string;
  name: string;
}

export default function Page() {
  const [planName, setPlanName] = useState("Active");
  const [monthlyPrice, setMonthlyPrice] = useState("Active");
  const [yearlyPrice, setYearlyPrice] = useState("Active");
  const [accessibleFeatures, setAccessibleFeatures] = useState<Feature[]>([]);
  const [inaccessibleFeatures, setInaccessibleFeatures] = useState<Feature[]>(
    []
  );
  const [accessibleInput, setAccessibleInput] = useState("");
  const [inaccessibleInput, setInaccessibleInput] = useState("");
  const [isActive, setIsActive] = useState(true);

  const addFeature = (
    features: Feature[],
    setFeatures: React.Dispatch<React.SetStateAction<Feature[]>>,
    input: string,
    setInput: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (input.trim()) {
      setFeatures([...features, { id: Date.now().toString(), name: input }]);
      setInput("");
    }
  };

  const removeFeature = (
    features: Feature[],
    setFeatures: React.Dispatch<React.SetStateAction<Feature[]>>,
    id: string
  ) => {
    setFeatures(features.filter((f) => f.id !== id));
  };

  return (
    <div className="min-h-screen p-8">
      <Card className="h-full w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create New Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Plan Name */}
          <div className="space-y-2">
            <Label htmlFor="plan-name" className="text-base font-medium">
              Plan Name
            </Label>
            <Input
              id="plan-name"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              className="text-base"
            />
          </div>

          {/* Pricing Section */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold">Pricing</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="monthly-price" className="text-sm font-medium">
                  Monthly Price
                </Label>
                <Input
                  id="monthly-price"
                  value={monthlyPrice}
                  onChange={(e) => setMonthlyPrice(e.target.value)}
                  className="text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="yearly-price" className="text-sm font-medium">
                  Yearly Price
                </Label>
                <Input
                  id="yearly-price"
                  value={yearlyPrice}
                  onChange={(e) => setYearlyPrice(e.target.value)}
                  className="text-base"
                />
              </div>
            </div>
          </div>

          {/* Accessible Features */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold">Accessible Features</h3>
            <div className="flex gap-2">
              <Input
                placeholder="Enter feature..."
                value={accessibleInput}
                onChange={(e) => setAccessibleInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    addFeature(
                      accessibleFeatures,
                      setAccessibleFeatures,
                      accessibleInput,
                      setAccessibleInput
                    );
                  }
                }}
                className="text-base flex-1"
              />
              <Button
                onClick={() =>
                  addFeature(
                    accessibleFeatures,
                    setAccessibleFeatures,
                    accessibleInput,
                    setAccessibleInput
                  )
                }
                variant="outline"
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Feature
              </Button>
            </div>
            <div className="space-y-2">
              {accessibleFeatures.map((feature) => (
                <div
                  key={feature.id}
                  className="flex items-center justify-between bg-muted p-3 rounded-md"
                >
                  <span className="text-sm">{feature.name}</span>
                  <Button
                    onClick={() =>
                      removeFeature(
                        accessibleFeatures,
                        setAccessibleFeatures,
                        feature.id
                      )
                    }
                    variant={"ghost"}
                    className="text-destructive hover:bg-destructive/10 p-1 rounded"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Inaccessible Features */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold">Inaccessible Features</h3>
            <div className="flex gap-2">
              <Input
                placeholder="Enter feature..."
                value={inaccessibleInput}
                onChange={(e) => setInaccessibleInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    addFeature(
                      inaccessibleFeatures,
                      setInaccessibleFeatures,
                      inaccessibleInput,
                      setInaccessibleInput
                    );
                  }
                }}
                className="text-base flex-1"
              />
              <Button
                onClick={() =>
                  addFeature(
                    inaccessibleFeatures,
                    setInaccessibleFeatures,
                    inaccessibleInput,
                    setInaccessibleInput
                  )
                }
                variant="outline"
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Feature
              </Button>
            </div>
            <div className="space-y-2">
              {inaccessibleFeatures.map((feature) => (
                <div
                  key={feature.id}
                  className="flex items-center justify-between bg-muted p-3 rounded-md"
                >
                  <span className="text-sm">{feature.name}</span>
                  <Button
                    onClick={() =>
                      removeFeature(
                        inaccessibleFeatures,
                        setInaccessibleFeatures,
                        feature.id
                      )
                    }
                    variant={"ghost"}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Status Toggle */}
          <div className="flex items-center justify-between pt-4 border-t">
            <Label htmlFor="status" className="text-base font-medium">
              Status
            </Label>
            <Switch
              id="status"
              checked={isActive}
              onCheckedChange={setIsActive}
            />
          </div>
        </CardContent>
        <CardFooter className="gap-2 justify-end">
          <Button variant={"outline"} asChild>
            <Link href={"/admin/subscription"}>Cancel</Link>
          </Button>
          <Button>Save Plan</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
