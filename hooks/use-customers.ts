"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getBookingHistory,
  getCustomers,
  getSingleCustomer,
  getVisitBooking,
  reviewReting,
} from "@/lib/api";

export function useCustomers(page = 1, limit = 10) {
  return useQuery({
    queryKey: ["customers", page, limit],
    queryFn: () => getCustomers(page, limit),
  });
}

// get single customers data
export function useSingleCustomer(id: string) {
  return useQuery({
    queryKey: ["customer", id],
    queryFn: () => getSingleCustomer(id),
    enabled: !!id,
  });
}

// get visit bokking detailes
export function useVisitBooking(id: string) {
  return useQuery({
    queryKey: ["visitBooking", id],
    queryFn: () => getVisitBooking(id),
    enabled: !!id,
  });
}

// get Booking History
export function useBookingHistory(id: string, page = 1, limit = 10) {
  return useQuery({
    queryKey: ["bookingHistory", id, page, limit],
    queryFn: () => getBookingHistory(id, page, limit),
  });
}

export function useReviewRatings(page = 1, limit = 10) {
  return useQuery({
    queryKey: ["reviewRatings"],
    queryFn: () => reviewReting(page, limit),
  });
}
