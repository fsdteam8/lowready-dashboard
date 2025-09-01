"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { NewDocument } from "@/lib/types";

export function useServiceProviders(page = 1, limit = 10, search?: string) {
  return useQuery({
    queryKey: ["service-providers", page, limit, search],
    queryFn: () => api.getServiceProviders(page, limit, search),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useServiceProvider() {
  return useQuery({
    queryKey: ["service-provider"],
    queryFn: () => api.getServiceProvider(),

    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

export function useDocumentByID(uploaderId: string) {
  return useQuery<NewDocument[], Error>({
    queryKey: ["documents", uploaderId],
    queryFn: async () => api.getDocumentByID(uploaderId),
    // response.data has { success: true, data: [...] }
  });
}
