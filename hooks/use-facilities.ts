"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { approveListing, getAllFacilityData, getpendingFacilityData, getSingleFacility } from "@/lib/api"
import { toast } from "sonner"

export function useFacilities(page = 1, limit = 10) {
  return useQuery({
    queryKey: ["facilities", page, limit],
    queryFn: () => getAllFacilityData(),
  })
}



export function useFacility(id: string) {
  return useQuery({
    queryKey: ["facility", id],
    queryFn: () => getSingleFacility(id),
    enabled: !!id,
    select: (data) => data?.data
  })
}

export function usePendingListings(page:number,limit:number) {
  return useQuery({
    queryKey: ["pending-listings"],
    queryFn:()=> getpendingFacilityData(page,limit)
  })
}

export function useApproveListing() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>approveListing(id, status),
    onSuccess: () => {
      toast.success('Successfuly Approve you Item')
      queryClient.invalidateQueries({ queryKey: ["pending-listings"] });
      queryClient.invalidateQueries({ queryKey: ["facilities"] });
    },
    onError:()=>{
      toast.error('something is Wrong')
    }
  });
}

export function useDeclineListing() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>approveListing(id, status), // same API but with decline status
    onSuccess: () => {
      toast.success('Successfuly DeclineListing')
      queryClient.invalidateQueries({ queryKey: ["pending-listings"] });
      queryClient.invalidateQueries({ queryKey: ["facilities"] });
    },
    onError() {
      toast.error(`SomeThing  is Wrong`)
    },
  });
}