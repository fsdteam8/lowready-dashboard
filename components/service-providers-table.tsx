/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Eye, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pagination } from "@/components/pagination"
// import type { ServiceProvider } from "@/lib/types"

interface ServiceProvidersTableProps {
  providers: any 
  total: number
  currentPage: number
  onPageChange: (page: number) => void
  onSearch: (query: string) => void
}



// Avatar component for fallback
const Avatar = ({ src, alt, firstName, size = "h-10 w-10", shape = "rounded-full" }: {
  src?: string
  alt: string
  firstName: string
  size?: string
  shape?: string
}) => {
  if (src) {
    return (
      <div className={`relative ${size} ${shape} overflow-hidden`}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
      </div>
    );
  }
  
  // Fallback to first letter
  const initial = firstName?.charAt(0)?.toUpperCase() || '?';
  
  return (
    <div className={`${size} ${shape} bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center`}>
      <span className="text-white font-semibold text-sm">
        {initial}
      </span>
    </div>
  );
};

export function ServiceProvidersTable({
  providers,
  total,
  currentPage,
  onPageChange,
  onSearch,
}: ServiceProvidersTableProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const itemsPerPage = 10
  const totalPages = Math.ceil(total / itemsPerPage)
  

  // console.log("this is providers", providers)
  const handleSearch = () => {
    onSearch(searchQuery)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="flex items-center gap-4 max-w-md">
        <div className="relative flex-1">
          <Input
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pr-10"
          />
          <Button
            size="sm"
            onClick={handleSearch}
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 px-3 cursor-pointer bg-green-primary hover:bg-green-secondary"
          >
            <Search className="h-4 w-4 mr-1 " />
            Search
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-green-bg">
              <TableHead>Service Providers</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Facility</TableHead>
              <TableHead>Service Provided</TableHead>
              <TableHead>Subscription</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {providers?.map((provider: any) => (
              <TableRow key={provider._id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={provider?.avatar?.url}
                      alt={provider?.firstName + provider?.lastName || "user image"}
                      firstName={provider?.firstName}
                      size="h-10 w-10"
                      shape="rounded-full"
                    />
                    <div>
                      <p className="font-medium">{provider?.firstName +" "+ provider?.lastName}</p>
                      <p className="text-sm text-gray-600">{provider.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{provider.phoneNum || "-"}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={provider.avatar?.url}
                      alt={provider?.firstName +" "+ provider.lastName}
                      firstName={provider?.firstName}
                      size="h-10 w-10"
                      shape="rounded-lg"
                    />
                    <div>
                      <p className="font-medium">{provider?.firstName + provider.lastName}</p>
                      {/* <p className="text-sm text-gray-600">{provider.street}</p> */}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{provider.onboardingStatus ? "Active" : "Inactive"}</TableCell>
                <TableCell>
                  <Badge
                    variant={provider.subscriptionStatus === "Subscribed" ? "default" : "secondary"}
                    className={
                      provider.subscriptionStatus === "Subscribed"
                        ? "bg-green-bg text-green-success"
                        : "bg-gray-100 text-gray-600"
                    }
                  >
                    {provider?.subscriptionStatus}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Link href={`/service-providers/${provider?._id}`}>
                    <Button variant="ghost" className="bg-[#E6F9EB] text-[#28A745] cursor-pointer hover:bg-none ">
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
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  )
}