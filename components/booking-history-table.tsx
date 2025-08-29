"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Booking } from "@/lib/types"

interface BookingHistoryTableProps {
  bookings: Booking[]
}

export function BookingHistoryTable({ bookings }: BookingHistoryTableProps) {
  const getStatusColor = (status: Booking["status"]) => {
    switch (status) {
      case "Paid":
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
            <TableHead>Booked Date</TableHead>
            <TableHead>Check-In Time</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 rounded-lg overflow-hidden">
                    <Image
                      src={booking.placeImage || "/assisted-living-facility.png"}
                      alt={booking.placeName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{booking.placeName}</p>
                    <p className="text-sm text-gray-600">Florida, USA</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>{booking.bookedDate}</TableCell>
              <TableCell>{booking.checkInTime}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
