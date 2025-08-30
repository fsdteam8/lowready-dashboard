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
import { Pagination } from "@/components/pagination";
import { FacilityResponse } from "@/lib/types";

interface FacilitiesTableProps {
  facilities: FacilityResponse[];
  total: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function FacilitiesTable({
  facilities,
  total,
  currentPage,
  onPageChange,
}: FacilitiesTableProps) {
  const [sortBy, setSortBy] = useState("name");
  const itemsPerPage = 10;
  const totalPages = Math.ceil(total / itemsPerPage);

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
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="created">Created Date</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
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
              <TableHead>Price</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Option</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {facilities.length > 0 ? (
              facilities.map((facility) => (
                <TableRow key={facility?._id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 rounded-lg overflow-hidden">
                        <Image
                          src={
                            facility?.images?.[0]?.url ||
                            "/assisted-living-facility.png"
                          }
                          alt={facility?.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{facility?.name}</p>
                        <p className="text-sm text-gray-600">
                          {facility?.location}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(facility?.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>${facility?.price}</TableCell>
                  <TableCell>{facility?.rating ?? "N/A"}</TableCell>
                  <TableCell>
                    <Link href={`/facilities/${facility?._id}`}>
                      <Button
                        variant="ghost"
                        className="text-green-primary hover:text-green-secondary"
                      >
                        View Details
                      </Button>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={facility.availability  ? "default" : "secondary"}
                      className={
                        facility.availability
                          ? "bg-green-bg text-green-success"
                          : "bg-red-bg text-red-error"
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

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}
