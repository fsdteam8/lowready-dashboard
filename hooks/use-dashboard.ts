"use client";
import { getRecentBooking, reviewRating } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: api.getDashboardStats,
  });
}

export function useChartData() {
  return useQuery({
    queryKey: ["chart-data"],
    queryFn: api.getChartData,
  });
}

export function useRecentReviews() {
  return useQuery({
    queryKey: ["recent-reviews"],
    queryFn: () => reviewRating,
  });
}

export function useRecentBookings(page: number, limit: number) {
  return useQuery({
    queryKey: ["recent-bookings", page, limit],
    queryFn: () => getRecentBooking(page, limit),
  });
}
