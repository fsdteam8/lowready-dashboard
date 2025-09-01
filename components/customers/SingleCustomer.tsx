"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TourHistoryTable } from "@/components/tour-history-table";
import { BookingHistoryTable } from "@/components/booking-history-table";
import { useSingleCustomer, useVisitBooking } from "@/hooks/use-customers";
import { useParams } from "next/navigation";
import ProfileCard from "../profile/ProfileCard";

export default function SingleCustomer() {
  const params = useParams();
  const {
    data: customer,
    isLoading,
    error,
  } = useSingleCustomer(params.id as string);
  const { data: visitBooking } = useVisitBooking(params.id as string);

  const customerData = customer?.data;
  const userId = customerData?._id;

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
              <ProfileCard userId={userId}/>
            </div>

            {/* Right Column - History */}
            <div className="lg:col-span-2 space-y-6">
              {/* Tour History */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-[#343A40]">Tour History</CardTitle>
                </CardHeader>
                <CardContent>
                  <TourHistoryTable tours={visitBooking?.data || []} />
                </CardContent>
              </Card>

              {/* Booking History */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-[#343A40]">Booking History</CardTitle>
                </CardHeader>
                <CardContent>
                  <BookingHistoryTable bookings={visitBooking?.data || []} />
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
