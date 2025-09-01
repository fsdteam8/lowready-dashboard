"use client";

import React, { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useCreateSubscriptionPlan } from "@/hooks/useAlltSubscription";

const formSchema = z.object({
  name: z.string().min(2, "Title is required"),
  description: z.string().min(5, "Description is required"),
  price: z.number().min(0.01, "Price must be greater than 0"),
  billingCycle: z.enum(["monthly"]),
  isActive: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

export default function AddSubscriptions() {
  const [amenity, setAmenity] = useState("");
  const [features, setFeatures] = useState<string[]>([]);

  const createPlan = useCreateSubscriptionPlan();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      billingCycle: "monthly",
      isActive: false,
    },
  });

  // Load amenities from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("features");
    if (stored) {
      setFeatures(JSON.parse(stored));
    }
  }, []);

  // Save amenities in localStorage
  useEffect(() => {
    localStorage.setItem("features", JSON.stringify(features));
  }, [features]);

  const addAmenity = () => {
    if (amenity.trim()) {
      setFeatures([...features, amenity.trim()]);
      setAmenity("");
    }
  };

  const removeAmenity = (item: string) => {
    const updated = features.filter((f) => f !== item);
    setFeatures(updated);
  };

  const onSubmit = async (data: FormValues) => {
    const subscription = {
      name: data.name,
      description: data.description,
      price: data.price,
      currency: "USD",
      billingCycle: data.billingCycle,
      isActive: data.isActive,
      features: features,
    };

    try {
      await createPlan.mutateAsync(subscription);

      console.log("Subscription created:", subscription);

      // Clear localStorage & reset form after save
      localStorage.removeItem("features");
      setFeatures([]);
      reset();
    } catch (error) {
      console.error("Create subscription failed:", error);
    }
  };

  return (
    <Card className="mt-6 bg-none">
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Availability */}
          <Label htmlFor="isActive" className="text-[#343A40] text-base">
            Availability
          </Label>
          <div className="flex items-center justify-between bg-[#FFF] p-4 rounded-xl">
            <Label htmlFor="isActive" className="text-[#6C757D] text-base">
              Unavailable
            </Label>

            <Switch
              id="isActive"
              checked={watch("isActive")}
              onCheckedChange={(val) => setValue("isActive", val)}
              className="cursor-pointer"
            />
          </div>

          {/* Title */}
          <div>
            <Label className="mt-6">Subscriptions Title</Label>
            <Input
              placeholder="Name here"
              {...register("name")}
              className="mt-2 h-12"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <Label className="mt-6">Description</Label>
            <Textarea
              placeholder="Description here"
              {...register("description")}
              className="mt-2 h-26"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Price & Billing */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="mt-6">Price</Label>
              <Input
                type="number"
                step="0.01"
                placeholder="$0.00"
                {...register("price", { valueAsNumber: true })}
                className="mt-2 h-12"
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price.message}</p>
              )}
            </div>
            <div>
              <Label className="mt-6">Based</Label>
              <Select
                onValueChange={(val) =>
                  setValue("billingCycle", val as "monthly")
                }
                defaultValue="monthly"
              >
                <SelectTrigger className="h-12 mt-2 w-full">
                  <SelectValue placeholder="Select billing cycle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <Label>Amenities</Label>
            <div className="flex gap-2">
              <Input
                value={amenity}
                onChange={(e) => setAmenity(e.target.value)}
                placeholder="Write Here"
                className="mt-2 h-12"
              />
              <Button
                type="button"
                onClick={addAmenity}
                variant="outline"
                className="mt-2 h-11 bg-green-200 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {/* Show amenities */}
            <div className="flex flex-wrap gap-2 mt-2">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1 border px-3 py-2 rounded-full text-sm bg-gray-200"
                >
                  {f}
                  <button
                    type="button"
                    onClick={() => removeAmenity(f)}
                    className="text-red-500"
                  >
                    <X className="w-3 h-3 cursor-pointer" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Save button */}
          <div className="flex justify-end cursor-pointer">
            <Button
              type="submit"
              disabled={createPlan.isPending}
              className="bg-green-500 hover:bg-green-600 cursor-pointer"
            >
              {createPlan.isPending ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
