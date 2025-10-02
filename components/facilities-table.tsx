"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { Switch } from "@/components/ui/switch";
import { useUpdateFacilityFeatured } from "@/hooks/use-facilities";
import { toast } from "sonner";

interface FacilitiesTableProps {
  facilities: FacilityResponse[];
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function FacilitiesTable({
  facilities,
  totalPages,
  currentPage,
  onPageChange,
}: FacilitiesTableProps) {
  const { data: pendingListings } = useQuery({
    queryKey: ["pending-listings"],
    queryFn: getpendingallFacilityData,
  });

  const { mutate: updateFeatured, isPending } = useUpdateFacilityFeatured();

  // Facilities Management Featured True / False Update
  const handleFeaturedToggle = (facilityId: string) => {
    updateFeatured(
      { id: facilityId },
      {
        onSuccess: () => {
          toast.success("Facility featured status updated ✅");
        },
        onError: () => {
          toast.error("Something went wrong while updating ❌");
        },
      }
    );
  };
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Approved Facilities
        </h1>
        <Link href="/facilities/pending" className="cursor-pointer">
          <Button className="bg-green-primary hover:bg-green-secondary cursor-pointer">
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
              <TableHead>View Details</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Facilities Featured</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {facilities?.length > 0 ? (
              facilities?.map((facility) => (
                <TableRow key={facility._id}>
                  {/* Facility Info */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 rounded-lg overflow-hidden">
                        <Image
                          src={
                            facility?.images?.[0]?.url ||
                            "/assisted-living-facility.png"
                          }
                          alt={facility?.name || "Facility"}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="text-left">
                        <Link href={`/facilities/${facility._id}`}>
                          <p className="font-medium hover:underline hover:text-[#27BE69]">
                            {facility?.name}
                          </p>
                        </Link>
                        <p className="text-sm text-gray-600">
                          {facility?.location ?? "No address"}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  {/* Created On */}
                  <TableCell className="text-[#68706A] text-[16px] font-normal">
                    {facility?.createdAt
                      ? new Date(facility.createdAt).toLocaleDateString()
                      : "—"}
                  </TableCell>

                  {/* Total Booking */}
                  <TableCell>{facility?.totalPlacement ?? 0}</TableCell>

                  {/* Total Tours */}
                  <TableCell>{facility?.totalTour ?? 0}</TableCell>

                  {/* Total Earnings */}
                  <TableCell className="text-[#68706A] text-[16px] leading-[150%]">
                    ${(facility?.totalPlacement ?? 0) * (facility?.price ?? 0)}
                  </TableCell>

                  {/* View Details */}
                  <TableCell className="text-[#68706A] text-[16px] leading-[150%] cursor-pointer">
                    <Link
                      href={`/facilities/${facility._id}`}
                      className="font-medium underline text-[#27BE69] hover:text-[#31e980]"
                    >
                      Details
                    </Link>
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <Badge className="bg-[#E6FAEE] text-[#27BE69] px-6 py-2">
                      Approved
                    </Badge>
                  </TableCell>

                  {/* Facilities Featured (Switch) */}
                  <TableCell>
                    <Switch
                      checked={facility?.isFeatured}
                      disabled={isPending}
                      className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500 cursor-pointer"
                      onCheckedChange={() => handleFeaturedToggle(facility._id)}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-10 ">
                  No approved facilities found.
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
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}
