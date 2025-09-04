"use client";

import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MapPin, Calendar } from "lucide-react";
import RecentBookings from "./RecentBookings";
import RecentTours from "./RecentTours";

export default function BookingsTours() {
  const [activeTab, setActiveTab] = useState<"placements" | "tours">(
    "placements"
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          {/* Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={(value) =>
              setActiveTab(value as "placements" | "tours")
            }
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger
                  value="placements"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <MapPin className="h-4 w-4" />
                  Bookings
                </TabsTrigger>
                <TabsTrigger
                  value="tours"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Calendar className="h-4 w-4" />
                  Tours
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="placements" className="space-y-4">
              <div className="text-center text-[#343A40] text-[22px] font-bold">
                Recent Bookings
              </div>
              <RecentBookings />
            </TabsContent>

            <TabsContent value="tours" className="space-y-4">
              <div className="text-center text-[#343A40] text-[22px] font-bold">Recent Tours</div>
              <RecentTours />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
