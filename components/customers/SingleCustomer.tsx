"use client";

import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TourHistoryTable } from "@/components/tour-history-table";
import { BookingHistoryTable } from "@/components/booking-history-table";
import { useSingleCustomer, useVisitBooking } from "@/hooks/use-customers";
import { useParams } from "next/navigation";

export default function SingleCustomer() {
  const params = useParams();
  const {
    data: customer,
    isLoading,
    error,
  } = useSingleCustomer(params.id as string);
  const { data: visitBooking } = useVisitBooking(params.id as string);

//   console.log(visitBooking?.data);
  const customerData = customer?.data;

  if (isLoading) {
    return (
      <div className="flex h-screen">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-primary mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading customer details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !customerData) {
    return (
      <div className="flex h-screen">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-red-600">
            <p>Error loading customer details. Please try again.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-hidden">
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
                      src={
                        customerData?.avatar?.url ||
                        "/professional-woman-with-red-flower.png"
                      }
                      alt={`${customerData.firstName} ${customerData.lastName}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h2 className="text-xl font-semibold mb-2 text-[#28A745]">
                    {customerData.firstName} {customerData.lastName}
                  </h2>
                  <p className="text-[#68706A ] mb-6">{customerData.email}</p>

                  <div className="space-y-3 text-left">
                    <div>
                      <span className="text-white/80">Name:</span>
                      <p className="font-medium">
                        {customerData.firstName} {customerData.lastName}
                      </p>
                    </div>
                    {customerData.bio && (
                      <div>
                        <span className="text-white/80">Bio:</span>
                        <p className="font-medium">{customerData.bio}</p>
                      </div>
                    )}
                    <div>
                      <span className="text-white/80">Email:</span>
                      <p className="font-medium">{customerData.email}</p>
                    </div>
                    <div>
                      <span className="text-white/80">Phone:</span>
                      <p className="font-medium">{customerData.phoneNum}</p>
                    </div>
                    <div>
                      <span className="text-white/80">Gender:</span>
                      <p className="font-medium">{customerData.gender}</p>
                    </div>
                    <div>
                      <span className="text-white/80">Date of Birth:</span>
                      <p className="font-medium">
                        {new Date(
                          customerData.dateOfBirth
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <span className="text-white/80">Location:</span>
                      <p className="font-medium">
                        {customerData.street}, {customerData.postCode}
                      </p>
                    </div>
                    <div>
                      <span className="text-white/80">Joined:</span>
                      <p className="font-medium">
                        {new Date(customerData.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <span className="text-white/80">Subscription:</span>
                      <p className="font-medium">
                        {customerData.subscriptionStatus} (
                        {customerData.isSubscriptionActive
                          ? "Active"
                          : "Inactive"}
                        )
                      </p>
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
                  <TourHistoryTable tours={visitBooking?.data || []} />
                </CardContent>
              </Card>

              {/* Booking History */}
              <Card>
                <CardHeader>
                  <CardTitle>Booking History</CardTitle>
                </CardHeader>
                <CardContent>
                  <BookingHistoryTable
                    bookings={visitBooking?.data || []}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
