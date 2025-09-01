"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Inbox } from "lucide-react";


interface BookingHistoryTableProps {
  bookings: Booking[];
}

export interface FacilityImage {
  _id: string;
  public_id: string;
  url: string;
}

export interface Facility {
  _id: string;
  name: string;
  location: string;
  images: FacilityImage[];
}

export type BookingStatus = "upcoming" | "completed" | "cancelled";

export interface Booking {
  id?: string;
  _id: string;
  facility?: Facility;
  placeName?: string;
  visitDate?: string;
  visitTime?: string;
  status: BookingStatus;
  createdAt?: string;
  updatedAt?: string;
}

export function BookingHistoryTable({ bookings }: BookingHistoryTableProps) {
  const getStatusColor = (status: Booking["status"]) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-700 p-3 text-[14px]";
      case "completed":
        return "bg-green-100 text-green-700 p-3 text-[14px]";
      case "cancelled":
        return "bg-red-100 text-red-700 p-3 text-[14px]";
      default:
        return "bg-gray-100 text-gray-600 p-3 text-[14px]";
    }
  };

  return (
    <div className="rounded-lg border bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#E6F9EB] hover:bg-[#E6F9EB] text-[#343A40] text-[14px]">
            <TableHead>Place Name</TableHead>
            <TableHead>Booked Date</TableHead>
            <TableHead>Check-In Time</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.length > 0 ? (
            bookings.slice(0, 5).map((booking) => (
              <TableRow key={booking.id || booking._id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 rounded-lg overflow-hidden">
                      <Image
                        src={
                          booking.facility?.images?.[0]?.url ||
                          "/assisted-living-facility.png"
                        }
                        alt={booking.facility?.name || "Facility"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">{booking.facility?.name}</p>
                      <p className="text-sm text-[#68706A]">
                        {booking.facility?.location}
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="text-[#68706A]">
                  {booking.visitDate
                    ? new Date(booking.visitDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      })
                    : "N/A"}
                </TableCell>

                <TableCell className="text-[#68706A]">
                  {booking.visitTime || "N/A"}
                </TableCell>

                <TableCell>
                  <Badge className={getStatusColor(booking.status)}>
                    {booking.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="py-8">
                <div className="flex flex-col items-center justify-center gap-3 text-gray-500">
                  <Inbox className="text-4xl" />
                  <p className="text-lg font-medium">No bookings History found</p>
                  <p className="text-sm text-gray-400">
                    You haven’t made any bookings yet.
                  </p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
