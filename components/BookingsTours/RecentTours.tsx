"use client";

import { useState } from "react";
import { useAllRecentTours } from "@/hooks/useBookingToure";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Pagination } from "../pagination";
import BookingsToursSkeleton from "./BookingsToursSkeleton";

// ---------- Types ----------
interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatars?: string;
}

interface Facility {
  _id: string;
  name: string;
  location?: string;
  images?: string[];
}

interface Tour {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  visitDate: string;
  visitTime: string;
  status: string;
  createdAt: string;
  userId: User;
  facility: Facility;
  message?: string;
  relationWith?: string;
  rating?: number;
}

// ---------- Component ----------
export default function RecentTours() {
  const [page, setPage] = useState<number>(1);
  const limit = 10;

  const { data, isLoading, isError } = useAllRecentTours(page, limit);

  if (isLoading) return <div><BookingsToursSkeleton/></div>;
  if (isError) return <div>Failed to load tours 😢</div>;

  const tours: Tour[] = data?.data || [];
  const totalPages: number = data?.meta?.totalPages || 1;
  const currentPage: number = data?.meta?.page || page;

  return (
    <div className="space-y-6">
      {/* Table */}
      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#E6F9EB] hover:bg-[#E6F9EB]">
              <TableHead className="text-start">Visitor</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Facility</TableHead>
              <TableHead>Visit Time</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tours?.map((tour) => (
              <TableRow key={tour._id}>
                {/* Visitor Info */}
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={tour.userId?.avatars }
                        alt={tour.name || "Visitor"}
                      />
                      <AvatarFallback>
                        {tour.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <p className="font-medium">{tour.name}</p>
                      <p className="text-sm text-gray-600">
                        {tour.email || "-"}
                      </p>
                    </div>
                  </div>
                </TableCell>

                {/* Phone */}
                <TableCell>{tour.phoneNumber || "-"}</TableCell>

                {/* Facility */}
                <TableCell>{tour.facility?.name || "-"}</TableCell>

                {/* Visit Time */}
                <TableCell>
                  {tour.visitDate
                    ? new Date(tour.visitDate).toLocaleDateString()
                    : "-"}{" "}
                  at {tour.visitTime || "-"}
                </TableCell>

                {/* Status */}
                <TableCell>
                  {tour.status === "completed" ? (
                    <Badge className="bg-green-100 text-green-700">
                      Completed
                    </Badge>
                  ) : tour.status === "pending" ? (
                    <Badge className="bg-yellow-100 text-yellow-700">
                      Pending
                    </Badge>
                  ) : (
                    <Badge className="bg-gray-100 text-gray-700">
                      {tour.status}
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setPage(page)}
      />
    </div>
  );
}
