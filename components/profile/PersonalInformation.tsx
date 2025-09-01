"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
 

// ✅ Zod Schema for Validation
const profileSchema = z.object({
  gender: z.enum(["male", "female"]),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  bio: z.string().optional(),
  address: z.string().min(5, "Address is required"),
  location: z.string().min(2, "Location is required"),
  postCode: z.string().min(3, "Postal code is required"),
  phoneNum: z.string().min(10, "Phone number is required"),
  dateOfBirth: z.string().optional(),
  photo: z.any().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

// ✅ Initial Values
const initialValues: ProfileFormData = {
  gender: "female",
  firstName: "Olivia",
  lastName: "Rhye",
  email: "bessieedwards@gmail.com",
  bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et ante sed sem feugiat tristique at sed mauris.",
  address: "1234 Oak Avenue, San Francisco, CA 94102A",
  location: "Florida, USA",
  postCode: "30301",
  phoneNum: "+1 (555) 123-4567",
  dateOfBirth: "1995-02-01",
  photo: null,
};

// ✅ API call
const updateUserProfile = async (userData: ProfileFormData, accessToken: string) => {
  if (!accessToken) throw new Error("Session expired. Please login again.");

  const formData = new FormData();
  Object.entries(userData).forEach(([key, value]) => {
    if (key === "photo" && value instanceof File) {
      formData.append("photo", value);
    } else {
      formData.append(key, value as string);
    }
  });

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/update`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });

  if (!response.ok) throw new Error("Failed to update profile");
  return response.json();
};

export function PersonalInformationForm() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [hasChanges, setHasChanges] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: initialValues,
  });

  const mutation = useMutation({
    mutationFn: (data: ProfileFormData) =>
      updateUserProfile(data, session?.accessToken || ""),
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      setHasChanges(false);
    },
    onError: (error: unknown) => {
      const msg = error instanceof Error ? error.message : "Failed to update profile";
      toast.error(msg);
    },
  });

  const onSubmit = (data: ProfileFormData) => mutation.mutate(data);
  const handleDiscard = () => {
    reset(initialValues);
    setHasChanges(false);
  };

  // Watch for changes
  watch(() => setHasChanges(true));

  return (
    <div className="overflow-hidden w-full">
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
            <p className="text-sm text-gray-600">
              Manage your personal information and profile details.
            </p>
          </div>
          
        </CardHeader>

        <CardContent className="space-y-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Gender */}
            <RadioGroup
              value={watch("gender")}
              onValueChange={(val) => setValue("gender", val as "male" | "female")}
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">Female</Label>
              </div>
            </RadioGroup>

            {/* First & Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>First Name</Label>
                <Input {...register("firstName")} />
                {errors.firstName && (
                  <p className="text-red-500 text-xs">{errors.firstName.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Last Name</Label>
                <Input {...register("lastName")} />
                {errors.lastName && (
                  <p className="text-red-500 text-xs">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input {...register("email")} disabled className="bg-gray-100" />
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label>Bio</Label>
              <Textarea rows={3} {...register("bio")} />
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label>Street Address</Label>
              <Input {...register("address")} />
            </div>

            {/* Location & Postal Code */}
            <div className="grid grid-cols-2 gap-4">
              {/* <div>
                <Label>Location</Label>
                <Input {...register("location")} />
              </div> */}
              <div className="space-y-2">
                <Label>Postal Code</Label>
                <Input {...register("postCode")} />
              </div>
            </div>

            {/* Phone & DOB */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input {...register("phoneNum")} />
              </div>
              <div className="space-y-2">
                <Label>Date of Birth</Label>
                <Input type="date" {...register("dateOfBirth")} />
              </div>
            </div>

            {/* Photo */}
            <div className="space-y-2">
              <Label>Profile Photo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setValue("photo", e.target.files?.[0] || null)
                }
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                className="text-red-500 border-red-500 hover:bg-red-50"
                onClick={handleDiscard}
                disabled={!hasChanges}
              >
                Discard Changes
              </Button>
              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white"
                disabled={!hasChanges || mutation.isPending}
              >
                {mutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
