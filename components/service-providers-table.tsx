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
import type { ServiceProvider } from "@/lib/types"
import { projectOnExit } from "next/dist/build/swc/generated-native"

interface ServiceProvidersTableProps {
  providers: ServiceProvider[] 
  total: number
  currentPage: number
  onPageChange: (page: number) => void
  onSearch: (query: string) => void
}




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
  console.log(providers)
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
            
            {providers.map((provider) => (
              <TableRow key={provider._id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 rounded-full overflow-hidden">
                      <Image
                        src={provider.avatar?.url || "/professional-person.png"}
                        alt={provider.firstName + provider.lastName || "user image"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{provider.firstName +" "+ provider.lastName}</p>
                      <p className="text-sm text-gray-600">{provider.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{provider.phoneNum || "-"}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 rounded-lg overflow-hidden">
                      <Image
                        src={provider.avatar?.url || "/assisted-living-facility.png"}
                        alt={provider.firstName +" "+ provider.lastName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{provider.firstName + provider.lastName}</p>
                      <p className="text-sm text-gray-600">{provider.stree}</p>
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
                    {provider.subscriptionStatus}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Link href={`/service-providers/${provider._id}`}>
                    <Button variant="ghost" className="bg-green-200 text-green-500 hover:bg-green-400 cursor-pointer hover:text-white ">
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
