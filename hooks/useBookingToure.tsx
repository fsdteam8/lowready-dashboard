"use client";

import { getRecentAllBooking, getRecentAllTours } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

// Get All Recent Booking
export function useAllRecentBooking(page: number, limit: number) {
  return useQuery({
    queryKey: ["recentBookings", page, limit],
    queryFn: () => getRecentAllBooking(page, limit),
  });
}

// Get All Recent Tours
export function useAllRecentTours(page: number, limit: number) {
  return useQuery({
    queryKey: ["recentTours", page, limit],
    queryFn: () => getRecentAllTours(page, limit),
  });
}

