"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pagination } from "@/components/pagination";
import { Eye } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

// ---- Define Customer type ----
export interface Customer {
  _id: string; 
  firstName: string;
  lastName: string;
  email: string;
  phoneNum?: string;
  street?: string;
  avatar?: {
    url?: string;
  };
  totalTour?: number;
  totalPlacement?: number;
  createdAt: string;
}

interface CustomersTableProps {
  customers: Customer[];
  total: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function CustomersTable({
  customers,
  total,
  currentPage,
  onPageChange,
}: CustomersTableProps) {
  const itemsPerPage = 10;
  const totalPages = Math.ceil(total / itemsPerPage);
  console.log(customers);
  return (
    <div className="space-y-6">
      {/* Table */}
      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#E6F9EB] hover:bg-[#E6F9EB] text-center">
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
            {customers?.map((customer) => (
              <TableRow key={customer._id}>
                <TableCell>
                  <div className="flex items-center gap-3 text-left">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden">
                      <Avatar className="h-12 w-12 border-4 border-white shadow-lg rounded-full">
                        <AvatarImage
                          src={customer.avatar?.url || "/diverse-group.png"}
                          alt={`${customer?.firstName} ${customer?.lastName}`}
                        />
                        <AvatarFallback className="text-sm font-semibold">
                          {customer?.firstName?.[0]?.toUpperCase() || ""}
                          {customer?.lastName?.[0]?.toUpperCase() || ""}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="">
                      <p className="font-medium ">
                        {`${customer?.firstName} ${customer?.lastName}`}
                      </p>
                      <p className="text-sm text-gray-600">{customer?.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-[#68706A]">
                  {customer?.phoneNum || "-"}
                </TableCell>
                <TableCell>{customer.street || "-"}</TableCell>
                <TableCell>{customer.totalTour ?? 0}</TableCell>
                <TableCell>{customer.totalPlacement ?? 0}</TableCell>
                <TableCell>
                  {customer.createdAt
                    ? new Date(customer.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      })
                    : "-"}
                </TableCell>
                <TableCell>
                  <Link href={`/customers/${customer?._id}`}>
                    <Button
                      variant="ghost"
                      className="bg-[#E6F9EB] text-[#28A745] hover:text-[#28A745] hover:bg-[#E6F9EB] cursor-pointer"
                    >
                      <Eye /> Details
                    </Button>
                  </Link>
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
        onPageChange={onPageChange}
      />
    </div>
  );
}
