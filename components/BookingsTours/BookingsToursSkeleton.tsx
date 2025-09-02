"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function BookingsToursSkeleton() {
  return (
    <div className="space-y-6">
      {/* Table Skeleton */}
      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#E6F9EB] hover:bg-[#E6F9EB]">
              <TableHead className="text-start">Customer</TableHead>
              <TableHead>Facility Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(6)].map((_, i) => (
              <TableRow key={i} className="animate-pulse">
                {/* Customer */}
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                    <div className="space-y-2">
                      <div className="h-4 w-28 bg-gray-200 rounded"></div>
                      <div className="h-3 w-40 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </TableCell>

                {/* Facility Name */}
                <TableCell>
                  <div className="h-4 w-32 bg-gray-200 rounded"></div>
                </TableCell>

                {/* Location */}
                <TableCell>
                  <div className="h-4 w-28 bg-gray-200 rounded"></div>
                </TableCell>

                {/* Duration */}
                <TableCell>
                  <div className="h-4 w-20 bg-gray-200 rounded"></div>
                </TableCell>

                {/* Price */}
                <TableCell>
                  <div className="h-4 w-16 bg-gray-200 rounded"></div>
                </TableCell>

                {/* Status */}
                <TableCell>
                  <div className="h-6 w-14 bg-gray-200 rounded-full"></div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Skeleton */}
      <div className="flex justify-center gap-2 animate-pulse">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-8 w-8 rounded-md bg-gray-200"
          ></div>
        ))}
      </div>
    </div>
  );
}
