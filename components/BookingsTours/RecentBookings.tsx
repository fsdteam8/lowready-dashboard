"use client";

import { useState } from "react";
import { useAllRecentBooking } from "@/hooks/useBookingToure";
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

// ---------- Types ----------
interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email?: string;
  street?: string;
  avatar?: {
    url?: string;
  };
}

interface Facility {
  _id: string;
  name: string;
}

interface Booking {
  _id: string;
  userId: User;
  facility?: Facility;
  duration?: string;
  totalPrice?: number;
  isPaid: boolean;
}

// ---------- Component ----------
export default function RecentBookings() {
  const [page, setPage] = useState<number>(1);
  const limit = 10;

  const { data, isLoading, isError } = useAllRecentBooking(page, limit);

  if (isLoading) return <div>Loading recent bookings...</div>;
  if (isError) return <div>Failed to load bookings 😢</div>;

  const bookings: Booking[] = data?.data || [];
  const totalPages: number = data?.meta?.totalPages || 1;
  const currentPage: number = data?.meta?.page || page;

  return (
    <div className="space-y-6">
      {/* Table */}
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
            {bookings?.map((booking) => (
              <TableRow key={booking._id}>
                {/* Customer Info */}
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={booking.userId?.avatar?.url || "/placeholder.svg"}
                        alt={booking.userId?.firstName || "User"}
                      />
                      <AvatarFallback>
                        {booking.userId?.firstName?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <p className="font-medium">
                        {booking.userId?.firstName} {booking.userId?.lastName}
                      </p>
                      <p className="text-sm text-gray-600">
                        {booking.userId?.email || "-"}
                      </p>
                    </div>
                  </div>
                </TableCell>

                {/* Facility Name */}
                <TableCell>{booking.facility?.name || "-"}</TableCell>

                {/* Location */}
                <TableCell>{booking.userId?.street || "-"}</TableCell>

                {/* Duration */}
                <TableCell>{booking.duration || "-"}</TableCell>

                {/* Price */}
                <TableCell>
                  {booking.totalPrice !== undefined
                    ? `$${booking.totalPrice}`
                    : "-"}
                </TableCell>

                {/* Status */}
                <TableCell>
                  {booking.isPaid ? (
                    <Badge className="bg-green-100 text-green-700">Paid</Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-700">Unpaid</Badge>
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
