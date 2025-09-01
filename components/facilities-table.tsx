"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FacilityResponse } from "@/lib/types";
import { Pagination } from "./pagination";

import { useQuery } from "@tanstack/react-query";
import { getpendingallFacilityData } from "@/lib/api";

interface FacilitiesTableProps {
  facilities: FacilityResponse[];
  onPageChange: (page: number) => void;
}

export function FacilitiesTable({
  facilities,
  onPageChange,
}: FacilitiesTableProps) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter facilities based on status
  const filteredFacilities = useMemo(() => {
    if (statusFilter === "all") return facilities;

    return facilities.filter((facility) => {
      // Check both possible locations for availability
      const isAvailable =
        facility?.facility?.availability ?? facility?.availability;

      if (statusFilter === "available") return isAvailable === true;
      if (statusFilter === "unavailable") return isAvailable === false;
      return true;
    });
  }, [facilities, statusFilter]);

  // pending fetch
  const { data: pendingListings } = useQuery({
    queryKey: ["pending-listings"],
    queryFn: getpendingallFacilityData,
  });
  // console.log(pendingListings.meta.total,'pending');

  // Pagination logic
  const totalItems = filteredFacilities.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFacilities = filteredFacilities.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  // Get availability status for display
  const getAvailabilityStatus = (facility: FacilityResponse) => {
    return facility?.facility?.availability ?? facility?.availability;
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Filter by</span>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48 cursor-pointer">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="cursor-pointer">
                <SelectItem className="cursor-pointer" value="all">
                  All Statuses
                </SelectItem>
                <SelectItem className="cursor-pointer" value="available">
                  Available
                </SelectItem>
                <SelectItem className="cursor-pointer" value="unavailable">
                  Unavailable
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Link className="cursor-pointer" href="/facilities/pending">
          <Button className="bg-green-primary cursor-pointer hover:bg-green-secondary">
            Pending Listings ({pendingListings?.meta?.total || 0})
          </Button>
        </Link>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#E6FAEE] text-[#343A40] text-[14px] font-normal ">
              <TableHead>Facility</TableHead>
              <TableHead>Created On</TableHead>
              <TableHead>Total Booking</TableHead>
              <TableHead>Total Tours</TableHead>
              <TableHead>Total Earnings</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedFacilities.length > 0 ? (
              paginatedFacilities.map((facility) => {
                const isAvailable = getAvailabilityStatus(facility);

                return (
                  <TableRow key={facility?.facility?._id}>
                    {/* Facility Info */}
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 rounded-lg overflow-hidden">
                          <Image
                            src={
                              facility.facility?.images?.[0]?.url ||
                              "/assisted-living-facility.png"
                            }
                            alt={facility.name || "Facility"}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{facility.name}</p>
                          <p className="text-sm text-gray-600">
                            {facility.facility?.location ?? "No address"}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Created On */}
                    <TableCell className="text-[#68706A] text-[16px] font-normal">
                      {facility.facility?.createdAt
                        ? new Date(
                            facility.facility.createdAt
                          ).toLocaleDateString()
                        : "—"}
                    </TableCell>

                    {/* Total Booking */}
                    <TableCell>
                      {facility.facility?.totalPlacement ?? 0}
                    </TableCell>

                    {/* Total Tours */}
                    <TableCell>{facility.facility?.totalTour ?? 0}</TableCell>

                    {/* Total Earnings */}
                    <TableCell className="text-[#68706A] text-[16px] leading-[150%]">
                      ${facility.totalAdminShare ?? 0}
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <Badge
                        variant={isAvailable ? "default" : "secondary"}
                        className={
                          isAvailable
                            ? "bg-[#E6FAEE] text-[#27BE69] px-6 py-2"
                            : "bg-[#FEECEE] text-[#E5102E] px-6 py-2"
                        }
                      >
                        {isAvailable ? "Available" : "Unavailable"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-10 text-gray-500"
                >
                  No facilities found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
