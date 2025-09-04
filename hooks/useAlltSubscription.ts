"use client";
import { createSubscriptionPlan, deleteSubscriptionPlan, getAllSubscriptionPlan } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Get All SubscriptionPlan
export function useSubscriptionPlan() {
  return useQuery({
    queryKey: ["subscriptionPlan"],
    queryFn: () => getAllSubscriptionPlan(),
  });
}

// delete Subscription Plan with auto-refresh
export function useDeleteSubscriptionPlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteSubscriptionPlan(id),
    onSuccess: () => {
      // Invalidate the subscription plans query to refetch automatically
      queryClient.invalidateQueries({
        queryKey: ["subscriptionPlan"],
      });
    },
    onError: (error) => {
      console.error("Subscription Plan delete failed:", error);
    },
  });
}


// Create Subscription Plan with auto-refresh
export function useCreateSubscriptionPlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      name: string;
      description: string;
      price: number;
      currency: string;
      billingCycle: "monthly";
      isActive: boolean;
      features: string[];
    }) => createSubscriptionPlan(data),

    onSuccess: () => {
      // Invalidate so list refetches automatically
      queryClient.invalidateQueries({
        queryKey: ["subscriptionPlan"],
      });
    },

    onError: (error) => {
      console.error("Subscription Plan create failed:", error);
    },
  });
}