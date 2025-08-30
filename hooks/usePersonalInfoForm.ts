// hooks/usePersonalInfoForm.ts
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

// Zod Schema
export const profileSchema = z.object({
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

export type ProfileFormData = z.infer<typeof profileSchema>;

// Initial Values
export const initialValues: ProfileFormData = {
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

// API call
export const updateUserProfile = async (userData: ProfileFormData, accessToken: string) => {
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

export const usePersonalInfoForm = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [hasChanges, setHasChanges] = useState(false);

  const form = useForm<ProfileFormData>({
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

  // Watch for changes
  form.watch(() => setHasChanges(true));

  const onSubmit = (data: ProfileFormData) => mutation.mutate(data);
  const handleDiscard = () => {
    form.reset(initialValues);
    setHasChanges(false);
  };

  return {
    form,
    mutation,
    hasChanges,
    onSubmit,
    handleDiscard,
  };
};
