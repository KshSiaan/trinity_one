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
import {
  X,
  Plus,
  DollarSignIcon,
  TimerResetIcon,
  Loader2Icon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notFound, useParams, useRouter } from "next/navigation";
import { getSubsAPI, updateSubsAPI } from "@/lib/api/admin";
import { useCookies } from "react-cookie";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { toast } from "sonner";
import { idk } from "@/lib/utils";

interface Feature {
  id: string | number;
  name: string;
}

export default function Page() {
  const navig = useRouter();
  const qcl = useQueryClient();
  const [{ token }] = useCookies(["token"]);
  const [planName, setPlanName] = useState("");
  const [intervalAmm, setIntervalAmm] = useState<string>("");
  const [monthlyPrice, setMonthlyPrice] = useState(0);
  const [accessibleFeatures, setAccessibleFeatures] = useState<Feature[]>([]);
  const [accessibleInput, setAccessibleInput] = useState("");
  const [isActive, setIsActive] = useState(true);
  const { id } = useParams<{ id: string }>();
  const { data, isPending } = useQuery({
    queryKey: ["subs"],
    queryFn: () => {
      return getSubsAPI(token);
    },
    enabled: !!id,
  });

  const { mutate } = useMutation({
    mutationKey: ["update_plan", id],
    mutationFn: (body: any) => {
      return updateSubsAPI(token, id, body);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      toast.success(res.message ?? "Success!");
      navig.push("/admin/subscription");
      qcl.invalidateQueries({ queryKey: ["subs"] });
    },
  });
  useEffect(() => {
    if (!isPending) {
      const inPlan = data?.data.plans.find((x) => id === String(x.id));
      console.log(inPlan);
      if (inPlan?.name) {
        setPlanName(inPlan.name);
      }
      if (inPlan?.price) {
        setMonthlyPrice(parseInt(inPlan.price));
      }
      if (inPlan?.is_active) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
      if (inPlan?.features) {
        const currPlan =
          inPlan?.features?.map((x, i) => ({
            id: i,
            name: x,
          })) ?? [];
        setAccessibleFeatures(currPlan);
      }
      if (inPlan?.interval) {
        setIntervalAmm(inPlan.interval);
      }
    }
  }, [isPending, data, id]);

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
    id: string | number
  ) => {
    setFeatures(features.filter((f) => f.id !== id));
  };
  if (!id || Number.isNaN(parseInt(id))) {
    return notFound();
  }

  const submitter = () => {
    const currPlan = accessibleFeatures?.map((x) => x.name) ?? [];

    const payload = {
      name: planName,
      price: monthlyPrice,
      interval: intervalAmm,
      features: currPlan,
      is_active: isActive ? "1" : "0",
    };
    mutate(payload);
  };
  if (isPending) {
    return (
      <div className={`flex justify-center items-center h-24 mx-auto`}>
        <Loader2Icon className={`animate-spin`} />
      </div>
    );
  }
  return (
    <div className=" p-8">
      <Card className="h-full w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Update Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Pricing Section */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
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
              <div className="space-y-2">
                <Label
                  htmlFor="monthly-price"
                  className="text-base font-medium"
                >
                  Price
                </Label>
                <InputGroup>
                  <InputGroupInput
                    id="monthly-price"
                    value={monthlyPrice}
                    onChange={(e) => {
                      const iot = parseInt(e.target.value);
                      setMonthlyPrice(iot);
                    }}
                    className="text-base"
                  />
                  <InputGroupAddon>
                    <DollarSignIcon />
                  </InputGroupAddon>
                </InputGroup>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="intervl" className="text-base font-medium">
              Interval
            </Label>
            <InputGroup>
              <InputGroupInput
                id="intervl"
                value={intervalAmm}
                onChange={(e) => setIntervalAmm(e.target.value)}
                className="text-base"
              />
              <InputGroupAddon>
                <TimerResetIcon />
              </InputGroupAddon>
            </InputGroup>
          </div>
          <div className="space-y-4">
            <h3 className="text-base font-semibold">Features</h3>
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
          <Button className="cursor-pointer" onClick={submitter}>
            Save Plan
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
