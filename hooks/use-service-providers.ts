"use client"

import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"

export function useServiceProviders(page = 1, limit = 10, search?: string) {
  return useQuery({
    queryKey: ["service-providers", page, limit, search],
    queryFn: () => api.getServiceProviders(page, limit),
  })
}

export function useServiceProvider(id: string) {
  return useQuery({
    queryKey: ["service-provider", id],
    queryFn: () => api.getServiceProvider(id),
    enabled: !!id,
  })
}
