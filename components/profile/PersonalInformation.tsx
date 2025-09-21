"use client";

import { useState, useEffect } from "react";
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
import { useUserProfile } from "@/hooks/useUserProfile";

// ✅ Zod Schema for Validation
const profileSchema = z.object({
  gender: z.enum(["male", "female"]).optional(),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  bio: z.string().optional(),
  address: z.string().optional(),
  postCode: z.union([z.string(), z.number()]).optional(),
  phoneNum: z.string().optional(),
  dateOfBirth: z.string().optional(),
  photo: z.any().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

// ✅ API call
const updateUserProfile = async (
  userData: ProfileFormData,
  accessToken: string
) => {
  if (!accessToken) throw new Error("Session expired. Please login again.");

  const formData = new FormData();
  Object.entries(userData).forEach(([key, value]) => {
    if (key === "photo" && value instanceof File) {
      formData.append("photo", value);
    } else {
      formData.append(key, value as string);
    }
  });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/update`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    }
  );

  if (!response.ok) throw new Error("Failed to update profile");
  return response.json();
};

export function PersonalInformationForm() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [hasChanges, setHasChanges] = useState(false);

  const userId = session?.user.id;
  const { data: userProfile, isLoading } = useUserProfile(userId as string);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (userProfile?.data) {
      reset({
        gender: "male", 
        firstName: userProfile?.data?.firstName || "",
        lastName: userProfile?.data?.lastName || "",
        email: userProfile?.data?.email || "",
        bio: userProfile.data.bio || "",
        address: userProfile.data.street || "",
        postCode: userProfile.data.postCode?.toString() || "",
        phoneNum: userProfile.data.phoneNum || "",
        dateOfBirth: "",  
        photo: null,
      });
    }
  }, [userProfile, reset]);

  const mutation = useMutation({
    mutationFn: (data: ProfileFormData) =>
      updateUserProfile(data, session?.accessToken || ""),
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      setHasChanges(false);
    },
    onError: (error: unknown) => {
      const msg =
        error instanceof Error ? error.message : "Failed to update profile";
      toast.error(msg);
    },
  });

  const onSubmit = (data: ProfileFormData) => mutation.mutate(data);

  const handleDiscard = () => {
    if (userProfile?.data) {
      // reset(userProfile.data);
      setHasChanges(false);
    }
  };

  // Watch for changes
  watch(() => setHasChanges(true));

  if (isLoading) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="overflow-hidden w-full">
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Personal Information
            </h3>
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
              onValueChange={(val) =>
                setValue("gender", val as "male" | "female")
              }
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
                {errors?.firstName && (
                  <p className="text-red-500 text-xs">
                    {errors?.firstName?.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Last Name</Label>
                <Input {...register("lastName")} />
                {errors.lastName && (
                  <p className="text-red-500 text-xs">
                    {errors.lastName.message}
                  </p>
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

            {/* Postal Code */}
            <div className="space-y-2">
              <Label>Postal Code</Label>
              <Input {...register("postCode")} />
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
                onChange={(e) => setValue("photo", e.target.files?.[0] || null)}
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                className="text-red-500 border-red-500 hover:bg-red-50 cursor-pointer"
                onClick={handleDiscard}
                disabled={!hasChanges}
              >
                Discard Changes
              </Button>
              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white cursor-pointer"
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
