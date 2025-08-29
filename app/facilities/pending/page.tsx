"use client"

import { ArrowLeft, Check, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Pagination } from "@/components/pagination"
import { usePendingListings, useApproveListing, useDeclineListing } from "@/hooks/use-facilities"
import { useState } from "react"

export default function PendingListingsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const { data: pendingListings, isLoading } = usePendingListings()
  const approveMutation = useApproveListing()
  const declineMutation = useDeclineListing()

  const handleApprove = async (id: string) => {
    try {
      await approveMutation.mutateAsync(id)
    } catch (error) {
      console.error("Failed to approve listing:", error)
    }
  }

  const handleDecline = async (id: string) => {
    try {
      await declineMutation.mutateAsync(id)
    } catch (error) {
      console.error("Failed to decline listing:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1">
          <Header
            title="Pending Listings (123)"
            subtitle="Keep track of all your facilities, update details, and stay organized."
          />
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-primary mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading pending listings...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const itemsPerPage = 10
  const totalPages = Math.ceil((pendingListings?.length || 0) / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentItems = pendingListings?.slice(startIndex, startIndex + itemsPerPage) || []

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title="Pending Listings (123)"
          subtitle="Keep track of all your facilities, update details, and stay organized."
        />

        <main className="flex-1 overflow-y-auto p-6">
          {/* Back button */}
          <div className="mb-6">
            <Link href="/facilities">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Facilities
              </Button>
            </Link>
          </div>

          {/* Header */}
          <div className="bg-green-bg rounded-lg p-4 mb-6">
            <div className="grid grid-cols-6 gap-4 text-sm font-medium text-gray-700">
              <div>Facility</div>
              <div>Created On</div>
              <div>Option</div>
              <div>Status</div>
              <div className="col-span-2 text-center">Actions</div>
            </div>
          </div>

          {/* Listings */}
          <div className="space-y-4">
            {currentItems.map((listing) => (
              <Card key={listing.id}>
                <CardContent className="p-4">
                  <div className="grid grid-cols-6 gap-4 items-center">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 rounded-lg overflow-hidden">
                        <Image
                          src="/assisted-living-facility.png"
                          alt={listing.facility.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{listing.facility.name}</p>
                        <p className="text-sm text-gray-600">{listing.facility.location}</p>
                      </div>
                    </div>

                    <div className="text-sm">{listing.createdOn}</div>

                    <div>
                      <Link href={`/facilities/${listing.facility.id}`}>
                        <Button variant="ghost" className="text-green-primary hover:text-green-secondary">
                          View Details
                        </Button>
                      </Link>
                    </div>

                    <div className="text-sm text-gray-600">{listing.status}</div>

                    <div className="col-span-2 flex items-center justify-center gap-2">
                      <Button
                        size="sm"
                        className="bg-green-primary hover:bg-green-secondary"
                        onClick={() => handleApprove(listing.id)}
                        disabled={approveMutation.isPending}
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-error border-red-error hover:bg-red-bg bg-transparent"
                        onClick={() => handleDecline(listing.id)}
                        disabled={declineMutation.isPending}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Decline
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
