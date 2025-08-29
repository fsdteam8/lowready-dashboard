"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"

export function useFacilities(page = 1, limit = 10) {
  return useQuery({
    queryKey: ["facilities", page, limit],
    queryFn: () => api.getFacilities(page, limit),
  })
}

export function useFacility(id: string) {
  return useQuery({
    queryKey: ["facility", id],
    queryFn: () => api.getFacility(id),
    enabled: !!id,
  })
}

export function usePendingListings() {
  return useQuery({
    queryKey: ["pending-listings"],
    queryFn: api.getPendingListings,
  })
}

export function useApproveListing() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: api.approveListing,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pending-listings"] })
      queryClient.invalidateQueries({ queryKey: ["facilities"] })
    },
  })
}

export function useDeclineListing() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: api.declineListing,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pending-listings"] })
    },
  })
}
