"use client"

import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TourHistoryTable } from "@/components/tour-history-table"
import { BookingHistoryTable } from "@/components/booking-history-table"
import { useCustomer } from "@/hooks/use-customers"

interface CustomerDetailsPageProps {
  params: {
    id: string
  }
}

export default function CustomerDetailsPage({ params }: CustomerDetailsPageProps) {
  const { data: customer, isLoading, error } = useCustomer(params.id)

  if (isLoading) {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1">
          <Header
            title="Customers Details"
            subtitle="Keep track of all your facilities, update details, and stay organized."
          />
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-primary mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading customer details...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !customer) {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1">
          <Header
            title="Customers Details"
            subtitle="Keep track of all your facilities, update details, and stay organized."
          />
          <div className="flex items-center justify-center h-96">
            <div className="text-center text-red-600">
              <p>Error loading customer details. Please try again.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title="Customers Details"
          subtitle="Keep track of all your facilities, update details, and stay organized."
        />

        <main className="flex-1 overflow-y-auto p-6">
          {/* Back button */}
          <div className="mb-6">
            <Link href="/customers">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Customers
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Profile */}
            <div className="lg:col-span-1">
              <Card className="bg-gradient-to-br from-green-primary to-green-secondary text-white">
                <CardContent className="p-6 text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white/20">
                    <Image
                      src={customer.avatar || "/professional-woman-with-red-flower.png"}
                      alt={customer.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">{customer.name}</h2>
                  <p className="text-white/80 mb-6">{customer.email}</p>

                  <div className="space-y-3 text-left">
                    <div>
                      <span className="text-white/80">Name:</span>
                      <p className="font-medium">{customer.name}</p>
                    </div>
                    {customer.bio && (
                      <div>
                        <span className="text-white/80">Bio:</span>
                        <p className="font-medium">{customer.bio}</p>
                      </div>
                    )}
                    <div>
                      <span className="text-white/80">Email:</span>
                      <p className="font-medium">{customer.email}</p>
                    </div>
                    <div>
                      <span className="text-white/80">Phone:</span>
                      <p className="font-medium">{customer.phone}</p>
                    </div>
                    <div>
                      <span className="text-white/80">Location:</span>
                      <p className="font-medium">{customer.location}</p>
                    </div>
                    <div>
                      <span className="text-white/80">Since:</span>
                      <p className="font-medium">{customer.joiningDate}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - History */}
            <div className="lg:col-span-2 space-y-6">
              {/* Tour History */}
              <Card>
                <CardHeader>
                  <CardTitle>Tour History</CardTitle>
                </CardHeader>
                <CardContent>
                  <TourHistoryTable tours={customer.tourHistory} />
                </CardContent>
              </Card>

              {/* Booking History */}
              <Card>
                <CardHeader>
                  <CardTitle>Booking History</CardTitle>
                </CardHeader>
                <CardContent>
                  <BookingHistoryTable bookings={customer.bookingHistory} />
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
