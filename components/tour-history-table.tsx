"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Tour } from "@/lib/types"

interface TourHistoryTableProps {
  tours: Tour[]
}

export function TourHistoryTable({ tours }: TourHistoryTableProps) {
  const getStatusColor = (status: Tour["status"]) => {
    switch (status) {
      case "Upcoming":
        return "bg-blue-100 text-blue-700"
      case "Completed":
        return "bg-green-bg text-green-success"
      case "Cancelled":
        return "bg-red-bg text-red-error"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  return (
    <div className="rounded-lg border bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-green-bg">
            <TableHead>Place Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Scheduled Date</TableHead>
            <TableHead>Scheduled Time</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tours.map((tour) => (
            <TableRow key={tour.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 rounded-lg overflow-hidden">
                    <Image
                      src={tour.placeImage || "/assisted-living-facility.png"}
                      alt={tour.placeName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{tour.placeName}</p>
                    <p className="text-sm text-gray-600">Florida, USA</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>{tour.location}</TableCell>
              <TableCell>{tour.scheduledDate}</TableCell>
              <TableCell>{tour.scheduledTime}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(tour.status)}>{tour.status}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
