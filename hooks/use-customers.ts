"use client"

import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"

export function useCustomers(page = 1, limit = 10) {
  return useQuery({
    queryKey: ["customers", page, limit],
    queryFn: () => api.getCustomers(page, limit),
  })
}

export function useCustomer(id: string) {
  return useQuery({
    queryKey: ["customer", id],
    queryFn: () => api.getCustomer(id),
    enabled: !!id,
  })
}
