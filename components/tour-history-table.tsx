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

// Define a fully typed Tour interface
export interface Tour {
  _id: string;
  visitDate?: string;
  visitTime?: string;
  status: "upcoming" | "completed" | "cancelled" | string;
  userId?: {
    firstName?: string;
    lastName?: string;
    street?: string;
    avatar?: {
      url?: string;
    };
  };
  facility?: {
    name?: string;
    location?: string;
  };
}

interface TourHistoryTableProps {
  tours: Tour[];
}

export function TourHistoryTable({ tours }: TourHistoryTableProps) {
  const getStatusColor = (status: Tour["status"]) => {
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
            <TableHead>Location</TableHead>
            <TableHead>Scheduled Date</TableHead>
            <TableHead>Scheduled Time</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tours.slice(0, 5).map((tour) => (
            <TableRow key={tour._id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 rounded-lg overflow-hidden">
                    <Image
                      src={
                        tour.userId?.avatar?.url ||
                        "/assisted-living-facility.png"
                      }
                      alt={`${tour.userId?.firstName ?? ""} ${
                        tour.userId?.lastName ?? ""
                      }`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-black">
                      {tour.facility?.name ?? "N/A"}
                    </p>
                    <p className="text-sm text-gray-600">
                      {tour.facility?.location ?? "N/A"}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>{tour.userId?.street ?? "N/A"}</TableCell>
              <TableCell>
                {tour.visitDate
                  ? new Date(tour.visitDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })
                  : "N/A"}
              </TableCell>
              <TableCell>{tour.visitTime ?? "N/A"}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(tour.status)}>
                  {tour.status.charAt(0).toUpperCase() + tour.status.slice(1)}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
