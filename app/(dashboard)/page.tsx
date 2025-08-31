"use client";

import { StatsCard } from "@/components/stats-card";
import { RecentSection } from "@/components/recent-section";
import { ReviewsSection } from "@/components/reviews-section";
import { useDashboardStats, useRecentReviews } from "@/hooks/use-dashboard";
import { Building2, UserCheck, Users, MapPin, DollarSign } from "lucide-react";
import ChartBarInteractive from "@/components/chart-bar-interactive";

export default function DashboardPage() {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: reviews, isLoading: reviewsLoading } = useRecentReviews();

  // Mock data for recent sections
  const recentServiceProviders = [
    {
      id: "1",
      name: "Olivia Rhye",
      email: "example@example.com",
      avatar: "/professional-person.png",
      location: "2715 Ash Dr, San Jose, So...",
      value: "$2,000",
      status: "18%",
      action: "Details",
    },
    {
      id: "2",
      name: "Olivia Rhye",
      email: "example@example.com",
      avatar: "/professional-person.png",
      location: "2715 Ash Dr, San Jose, So...",
      value: "$2,000",
      status: "18%",
      action: "Details",
    },
    {
      id: "3",
      name: "Olivia Rhye",
      email: "example@example.com",
      avatar: "/professional-person.png",
      location: "2715 Ash Dr, San Jose, So...",
      value: "$2,000",
      status: "18%",
      action: "Details",
    },
  ];

  const recentBookings = [
    {
      id: "1",
      name: "Olivia Rhye",
      email: "example@example.com",
      avatar: "/diverse-group.png",
      location: "2715 Ash Dr, San Jose, South Dako...",
      value: "$2,000",
      status: "+123",
    },
    {
      id: "2",
      name: "Olivia Rhye",
      email: "example@example.com",
      avatar: "/diverse-group.png",
      location: "2715 Ash Dr, San Jose, South Dako...",
      value: "$2,000",
      status: "+123",
    },
    {
      id: "3",
      name: "Olivia Rhye",
      email: "example@example.com",
      avatar: "/diverse-group.png",
      location: "2715 Ash Dr, San Jose, South Dako...",
      value: "$2,000",
      status: "+123",
    },
  ];

  const recentCustomers = [
    {
      id: "1",
      name: "Olivia Rhye",
      email: "example@example.com",
      avatar: "/diverse-group.png",
      location: "2715 Ash Dr, San Jose, South Dakota 83475",
      action: "Details",
    },
    {
      id: "2",
      name: "Olivia Rhye",
      email: "example@example.com",
      avatar: "/diverse-group.png",
      location: "2715 Ash Dr, San Jose, South Dakota 83475",
      action: "Details",
    },
    {
      id: "3",
      name: "Olivia Rhye",
      email: "example@example.com",
      avatar: "/diverse-group.png",
      location: "2715 Ash Dr, San Jose, South Dakota 83475",
      action: "Details",
    },
  ];

  if (statsLoading || reviewsLoading) {
    return (
      <div className="flex h-screen">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-primary mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-col h-screen bg-gray-50 pt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <StatsCard
          title="Total Facilities"
          value={stats?.totalFacilities || 0}
          growth={stats?.facilitiesGrowth || 0}
          icon={<Building2 className="h-6 w-6" />}
        />
        <StatsCard
          title="Total Service Providers"
          value={stats?.totalServiceProviders || 0}
          growth={stats?.serviceProvidersGrowth || 0}
          icon={<UserCheck className="h-6 w-6" />}
        />
        <StatsCard
          title="Total Customers"
          value={stats?.totalCustomers || 0}
          growth={stats?.customersGrowth || 0}
          icon={<Users className="h-6 w-6" />}
        />
        <StatsCard
          title="Total Placements"
          value={stats?.totalBookings || 0}
          growth={stats?.bookingsGrowth || 0}
          icon={<MapPin className="h-6 w-6" />}
        />
        <StatsCard
          title="Earnings"
          value={`$${stats?.totalEarnings?.toLocaleString() || 0}`}
          growth={stats?.earningsGrowth || 0}
          icon={<DollarSign className="h-6 w-6" />}
        />
      </div>

      {/* Chart */}
      <div className="mb-8">
        <ChartBarInteractive />
      </div>

      {/* Recent Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentSection
          title="Recent Service Provider"
          items={recentServiceProviders}
          seeAllHref="/service-providers"
        />
        <RecentSection
          title="Recent Bookings"
          items={recentBookings}
          seeAllHref="/placements"
        />
        <RecentSection
          title="Recent Customers"
          items={recentCustomers}
          seeAllHref="/customers"
        />
        <ReviewsSection reviews={reviews || []} />
      </div>
    </div>
  );
}
