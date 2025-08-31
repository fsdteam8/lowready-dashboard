"use client";

import { ArrowLeft, Check, X, Eye } from "lucide-react";
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
import { Pagination } from "@/components/pagination";
import {
  usePendingListings,
  useApproveListing,
  useDeclineListing,
} from "@/hooks/use-facilities";
import { useState } from "react";
import { FacilityResponse } from "@/lib/types";

export default function PendingListingsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: pendingListings, isLoading } = usePendingListings(
    currentPage,
    itemsPerPage
  );
  const approveMutation = useApproveListing();
  const declineMutation = useDeclineListing();

  const handleApprove = (id: string) => {
    approveMutation.mutate({ id, status: "approved" });
  };

  const handleDecline = (id: string) => {
    declineMutation.mutate({ id, status: "decline" });
  };

  if (isLoading) {
    return (
      <div className="flex h-screen">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-primary mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading pending listings...</p>
          </div>
        </div>
      </div>
    );
  }

  const currentItems = pendingListings?.data || [];
  const totalPages = pendingListings?.totalPages || 1;

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Pending Listings
            </h1>
            <Badge
              variant="outline"
              className="px-3 py-1 bg-amber-100 text-amber-800"
            >
              {pendingListings?.totalCount || 0} Pending
            </Badge>
          </div>

          {/* Table */}
          <div className="rounded-lg border bg-white">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#E6FAEE] text-[#343A40] text-[14px] font-normal">
                  <TableHead>Facility</TableHead>
                  <TableHead>Created On</TableHead>
                  <TableHead>Option</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.length > 0 ? (
                  currentItems.map((listing: FacilityResponse) => (
                    <TableRow key={listing._id}>
                      {/* Facility Info */}
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="relative h-12 w-12 rounded-lg overflow-hidden">
                            <Image
                              src={
                                listing.images?.[0]?.url ||
                                "/assisted-living-facility.png"
                              }
                              alt={listing?.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{listing.name}</p>
                            <p className="text-sm text-gray-600">
                              {listing.location}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      {/* Created On */}
                      <TableCell className="text-[#68706A] text-[16px] font-normal">
                        {new Date(listing.createdAt).toLocaleDateString()}
                      </TableCell>

                      {/* Option */}
                      <TableCell>
                        <Link href={`/facilities/${listing._id}`}>
                          <Button
                            variant="ghost"
                            className="text-[#208436] rounded-none border-b-1 border-[#208436] cursor-pointer hover:bg-white hover:text-black p-0 h-auto"
                          >
                            View Details
                          </Button>
                        </Link>
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-amber-100 text-amber-800 px-3 py-1"
                        >
                          {listing.status}
                        </Badge>
                      </TableCell>

                      {/* Actions */}
                      <TableCell>
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            size="sm"
                            className="bg-green-primary cursor-pointer hover:bg-green-secondary"
                            onClick={() => handleApprove(listing._id)}
                            disabled={approveMutation.isPending}
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-error border-red-error cursor-pointer hover:bg-red-bg"
                            onClick={() => handleDecline(listing._id)}
                            disabled={declineMutation.isPending}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Decline
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-10 text-gray-500"
                    >
                      <div className="mx-auto max-w-md">
                        <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Check className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          No Facilities Pending 
                        </h3>
                       
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
