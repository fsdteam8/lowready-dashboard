"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pagination } from "@/components/pagination"
import type { Facility } from "@/lib/types"

interface FacilitiesTableProps {
  facilities: Facility[]
  total: number
  currentPage: number
  onPageChange: (page: number) => void
}

export function FacilitiesTable({ facilities, total, currentPage, onPageChange }: FacilitiesTableProps) {
  const [sortBy, setSortBy] = useState("name")
  const itemsPerPage = 10
  const totalPages = Math.ceil(total / itemsPerPage)

  return (
    <div className="space-y-4">
      {/* Header with sort and actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Sort by</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select a option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="created">Created Date</SelectItem>
                <SelectItem value="earnings">Earnings</SelectItem>
                <SelectItem value="status">Status</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Link href="/facilities/pending">
          <Button className="bg-green-primary hover:bg-green-secondary">Pending Listings (123)</Button>
        </Link>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-green-bg">
              <TableHead>Facility</TableHead>
              <TableHead>Created On</TableHead>
              <TableHead>Total Placements</TableHead>
              <TableHead>Total Tours</TableHead>
              <TableHead>Total Earnings</TableHead>
              <TableHead>Option</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {facilities.map((facility) => (
              <TableRow key={facility.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 rounded-lg overflow-hidden">
                      <Image src="/assisted-living-facility.png" alt={facility.name} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="font-medium">{facility.name}</p>
                      <p className="text-sm text-gray-600">{facility.location}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{facility.createdOn}</TableCell>
                <TableCell>{facility.totalPlacements}</TableCell>
                <TableCell>{facility.totalTours}</TableCell>
                <TableCell>${facility.totalEarnings.toLocaleString()}</TableCell>
                <TableCell>
                  <Link href={`/facilities/${facility.id}`}>
                    <Button variant="ghost" className="text-green-primary hover:text-green-secondary">
                      View Details
                    </Button>
                  </Link>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={facility.status === "Available" ? "default" : "secondary"}
                    className={
                      facility.status === "Available" ? "bg-green-bg text-green-success" : "bg-red-bg text-red-error"
                    }
                  >
                    {facility.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  )
}
