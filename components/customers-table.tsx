"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pagination } from "@/components/pagination"
import type { Customer } from "@/lib/types"

interface CustomersTableProps {
  customers: Customer[]
  total: number
  currentPage: number
  onPageChange: (page: number) => void
}

export function CustomersTable({ customers, total, currentPage, onPageChange }: CustomersTableProps) {
  const itemsPerPage = 10
  const totalPages = Math.ceil(total / itemsPerPage)

  return (
    <div className="space-y-6">
      {/* Table */}
      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-green-bg">
              <TableHead>Service Providers</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Total Tours</TableHead>
              <TableHead>Total Placements</TableHead>
              <TableHead>Joining Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 rounded-full overflow-hidden">
                      <Image
                        src={customer.avatar || "/diverse-group.png"}
                        alt={customer.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-sm text-gray-600">{customer.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{customer.phone || "-"}</TableCell>
                <TableCell>{customer.location}</TableCell>
                <TableCell>{customer.totalTours}</TableCell>
                <TableCell>{customer.totalPlacements}</TableCell>
                <TableCell>{customer.joiningDate}</TableCell>
                <TableCell>
                  <Link href={`/customers/${customer.id}`}>
                    <Button variant="ghost" className="text-green-primary hover:text-green-secondary">
                      Details
                    </Button>
                  </Link>
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
