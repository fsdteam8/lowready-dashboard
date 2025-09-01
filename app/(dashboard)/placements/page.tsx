"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Plus, Edit, Eye, Calendar, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pagination } from "@/components/pagination";
import { PlacementStats } from "@/components/placement/placement-stats";
import {
  PlacementFilters,
  type PlacementFilters as PlacementFiltersType,
} from "@/components/placement/placement-filters";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import {
  type Placement,
  type TourBooking,
  PlacementStatus,
  TourBookingStatus,
} from "@/lib/types";

export default function PlacementsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<"placements" | "tours">(
    "placements"
  );
  const [filters, setFilters] = useState<PlacementFiltersType>({});

  const { data: placementStats, isLoading: statsLoading } = useQuery({
    queryKey: ["placement-stats"],
    queryFn: api.getPlacementStats,
  });

  const {
    data: placementsData,
    isLoading: placementsLoading,
    refetch: refetchPlacements,
  } = useQuery({
    queryKey: ["placements", currentPage, filters],
    queryFn: () =>
      api.getPlacements(currentPage, 10, filters.status as PlacementStatus),
    enabled: activeTab === "placements",
  });

  const {
    data: toursData,
    isLoading: toursLoading,
    refetch: refetchTours,
  } = useQuery({
    queryKey: ["tours", currentPage, filters],
    queryFn: () =>
      api.getTourBookings(currentPage, 10, filters.status as TourBookingStatus),
    enabled: activeTab === "tours",
  });

  const filteredPlacements = useMemo(() => {
    if (!placementsData?.placements) return [];

    let items: Placement[] = [...placementsData.placements];

    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      items = items.filter(
        (item) =>
          item.customer.name.toLowerCase().includes(searchTerm) ||
          item.facility.name.toLowerCase().includes(searchTerm) ||
          item.customer.email.toLowerCase().includes(searchTerm)
      );
    }

    // Apply sorting
    const sortBy = filters.sortBy || "newest";
    items.sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return (
            new Date(a.placementDate).getTime() -
            new Date(b.placementDate).getTime()
          );
        case "amount":
          return b.amount - a.amount;
        case "customer":
          return a.customer.name.localeCompare(b.customer.name);
        case "facility":
          return a.facility.name.localeCompare(b.facility.name);
        case "newest":
        default:
          return (
            new Date(b.placementDate).getTime() -
            new Date(a.placementDate).getTime()
          );
      }
    });

    return items;
  }, [placementsData?.placements, filters]);

  const filteredTours = useMemo(() => {
    if (!toursData?.tours) return [];

    let items: TourBooking[] = [...toursData.tours];

    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      items = items.filter(
        (item) =>
          item.customer.name.toLowerCase().includes(searchTerm) ||
          item.facility.name.toLowerCase().includes(searchTerm) ||
          item.customer.email.toLowerCase().includes(searchTerm)
      );
    }

    // Apply sorting
    const sortBy = filters.sortBy || "newest";
    items.sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return (
            new Date(a.scheduledDate).getTime() -
            new Date(b.scheduledDate).getTime()
          );
        case "customer":
          return a.customer.name.localeCompare(b.customer.name);
        case "facility":
          return a.facility.name.localeCompare(b.facility.name);
        case "newest":
        default:
          return (
            new Date(b.scheduledDate).getTime() -
            new Date(a.scheduledDate).getTime()
          );
      }
    });

    return items;
  }, [toursData?.tours, filters]);

  const getPlacementStatusColor = (status: PlacementStatus): string => {
    switch (status) {
      case PlacementStatus.PENDING:
        return "bg-yellow-100 text-yellow-700";
      case PlacementStatus.CONFIRMED:
        return "bg-blue-100 text-blue-700";
      case PlacementStatus.COMPLETED:
        return "bg-green-bg text-green-success";
      case PlacementStatus.CANCELLED:
        return "bg-red-bg text-red-error";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getTourStatusColor = (status: TourBookingStatus): string => {
    switch (status) {
      case TourBookingStatus.SCHEDULED:
        return "bg-blue-100 text-blue-700";
      case TourBookingStatus.CONFIRMED:
        return "bg-green-100 text-green-700";
      case TourBookingStatus.COMPLETED:
        return "bg-green-bg text-green-success";
      case TourBookingStatus.CANCELLED:
        return "bg-red-bg text-red-error";
      case TourBookingStatus.NO_SHOW:
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getTourTypeColor = (type: string): string => {
    switch (type) {
      case "In-Person":
        return "bg-purple-100 text-purple-700";
      case "Virtual":
        return "bg-cyan-100 text-cyan-700";
      case "Self-Guided":
        return "bg-indigo-100 text-indigo-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const totalPages = Math.ceil(
    (activeTab === "placements"
      ? placementsData?.total || 0
      : toursData?.total || 0) / 10
  );

  if (statsLoading) {
    return (
      <div className="flex h-screen">
        <div className="flex-1">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-primary mx-auto"></div>
              <p className="mt-2 text-gray-600">
                Loading placements and tours...
              </p>
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
          {/* Filters */}
          <div className="mb-6">
            <PlacementFilters onFiltersChange={setFilters} />
          </div>

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
                  className="flex items-center gap-2"
                >
                  <MapPin className="h-4 w-4" />
                  Placements ({filteredPlacements.length})
                </TabsTrigger>
                <TabsTrigger value="tours" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Tours ({filteredTours.length})
                </TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  View Reports
                </Button>
                <Button className="bg-green-primary hover:bg-green-secondary">
                  <Plus className="h-4 w-4 mr-2" />
                  {activeTab === "placements"
                    ? "New Placement"
                    : "Schedule Tour"}
                </Button>
              </div>
            </div>

            <TabsContent value="placements" className="space-y-4">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-green-bg">
                        <TableHead>Customer</TableHead>
                        <TableHead>Facility</TableHead>
                        <TableHead>Placement Date</TableHead>
                        <TableHead>Move-in Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Commission</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {placementsLoading ? (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-8">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-primary mx-auto"></div>
                          </TableCell>
                        </TableRow>
                      ) : filteredPlacements.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={8}
                            className="text-center py-8 text-gray-500"
                          >
                            No placements found matching your criteria.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredPlacements.map((placement) => (
                          <TableRow key={placement.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="relative h-10 w-10 rounded-full overflow-hidden">
                                  <Image
                                    src={
                                      placement.customer.avatar ||
                                      "/placeholder.svg?height=40&width=40&query=person"
                                    }
                                    alt={placement.customer.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <p className="font-medium">
                                    {placement.customer.name}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {placement.customer.email}
                                  </p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="relative h-10 w-10 rounded-lg overflow-hidden">
                                  <Image
                                    src={
                                      placement.facility.image ||
                                      "/placeholder.svg?height=40&width=40&query=building"
                                    }
                                    alt={placement.facility.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <p className="font-medium">
                                    {placement.facility.name}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {placement.facility.location}
                                  </p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              {new Date(
                                placement.placementDate
                              ).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              {placement.moveInDate
                                ? new Date(
                                    placement.moveInDate
                                  ).toLocaleDateString()
                                : "TBD"}
                            </TableCell>
                            <TableCell className="font-medium">
                              ${placement.amount.toLocaleString()}
                            </TableCell>
                            <TableCell className="font-medium text-green-600">
                              ${placement.commission.toLocaleString()}
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={getPlacementStatusColor(
                                  placement.status
                                )}
                              >
                                {placement.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tours" className="space-y-4">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-green-bg">
                        <TableHead>Customer</TableHead>
                        <TableHead>Facility</TableHead>
                        <TableHead>Scheduled Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {toursLoading ? (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-8">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-primary mx-auto"></div>
                          </TableCell>
                        </TableRow>
                      ) : filteredTours.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={8}
                            className="text-center py-8 text-gray-500"
                          >
                            No tours found matching your criteria.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredTours.map((tour) => (
                          <TableRow key={tour.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="relative h-10 w-10 rounded-full overflow-hidden">
                                  <Image
                                    src={
                                      tour.customer.avatar ||
                                      "/placeholder.svg?height=40&width=40&query=person"
                                    }
                                    alt={tour.customer.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <p className="font-medium">
                                    {tour.customer.name}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {tour.customer.email}
                                  </p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="relative h-10 w-10 rounded-lg overflow-hidden">
                                  <Image
                                    src={
                                      tour.facility.image ||
                                      "/placeholder.svg?height=40&width=40&query=building"
                                    }
                                    alt={tour.facility.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <p className="font-medium">
                                    {tour.facility.name}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {tour.facility.location}
                                  </p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              {new Date(
                                tour.scheduledDate
                              ).toLocaleDateString()}
                            </TableCell>
                            <TableCell>{tour.scheduledTime}</TableCell>
                            <TableCell>
                              <Badge
                                className={getTourTypeColor(tour.tourType)}
                              >
                                {tour.tourType}
                              </Badge>
                            </TableCell>
                            <TableCell>{tour.duration} min</TableCell>
                            <TableCell>
                              <Badge
                                className={getTourStatusColor(tour.status)}
                              >
                                {tour.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
