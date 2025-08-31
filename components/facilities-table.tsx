"use client";

import { useState } from "react";
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
// import { Pagination } from "@/components/pagination"; // keep if you need it
import { FacilityResponse } from "@/lib/types";

interface FacilitiesTableProps {
  facilities: FacilityResponse[];

  onPageChange: (page: number) => void;
}

export function FacilitiesTable({ facilities }: FacilitiesTableProps) {
  const [sortBy, setSortBy] = useState("name");

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Sort by</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Available</SelectItem>
                <SelectItem value="created">Unavailable</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Link href="/facilities/pending">
          <Button className="bg-green-primary hover:bg-green-secondary">
            Pending Listings (123)
          </Button>
        </Link>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-green-bg">
              <TableHead>Facility</TableHead>
              <TableHead>Created On</TableHead>
              <TableHead>Total Booking</TableHead>
              <TableHead>Total Tours</TableHead>
              <TableHead>Total Earnings</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {facilities.length > 0 ? (
              facilities.map((facility) => (
                <TableRow key={facility._id}>
                  {/* Facility Info */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 rounded-lg overflow-hidden">
                        <Image
                          src={
                            facility.facility?.images?.[0]?.url ||
                            "/assisted-living-facility.png"
                          }
                          alt={facility.name}
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
                  <TableCell>
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
                  <TableCell>${facility.totalAdminShare ?? 0}</TableCell>

                  {/* Status */}
                  <TableCell>
                    <Badge
                      variant={facility.availability ? "default" : "secondary"}
                      className={
                        facility.availability
                          ? "bg-[#E6FAEE] text-[#27BE69] px-4 py-1"
                          : "bg-[#FEECEE] text-[#E5102E] px-4 py-1"
                      }
                    >
                      {facility.availability ? "Available" : "Unavailable"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
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

      {/* Pagination (uncomment when needed) */}
      {/* 
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(total / 10)}
        onPageChange={onPageChange}
      /> 
      */}
    </div>
  );
}
