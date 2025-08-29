"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export default function NotificationsPage() {
  const [filter, setFilter] = useState("all");
  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: api.getNotifications,
  });

  if (isLoading) {
    return (
      <div className="flex h-screen">
        <div className="flex-1">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-primary mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading notifications...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            {/* Header with filter and actions */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Filter</span>
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Notifications</SelectItem>
                    <SelectItem value="properties-listing">
                      Properties Listing
                    </SelectItem>
                    <SelectItem value="properties-booking">
                      Properties Booking
                    </SelectItem>
                    <SelectItem value="tour-booking">Tour Booking</SelectItem>
                    <SelectItem value="reviews-ratings">
                      Reviews & Ratings
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  className="text-red-error border-red-error hover:bg-red-bg bg-transparent"
                >
                  Clear All
                </Button>
                <Button className="bg-green-primary hover:bg-green-secondary">
                  Mark as Read
                </Button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="space-y-4">
              {notifications?.map((notification) => (
                <Card key={notification.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-green-primary">
                          {notification.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.message}
                        </p>
                      </div>
                      <span className="text-sm text-gray-500">
                        {notification.time}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
