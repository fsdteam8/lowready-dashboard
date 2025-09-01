"use client";

import { getAllPayment } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

// Get All Booking Payments with Pagination
export function useAllBPayments(type: string, page: number, limit: number) {
  return useQuery({
    queryKey: ["allPayments", type, page, limit],  
    queryFn: () => getAllPayment(type, page, limit),
  });
}
