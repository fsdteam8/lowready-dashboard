"use client";

import { useState, useMemo } from "react";
import { Star, Eye, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReviewDetailsModal } from "@/components/review/review-details-modal";
import { DeleteConfirmModal } from "@/components/review/delete-confirm-modal";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { getFacilitys } from "@/lib/api";
import { useSession } from "next-auth/react";

// -------- FacilityResponse Interface --------
export interface FacilityResponse {
  totalAdminShare?: string | number;
  facility?: FacilityResponse;
  _id: string;
  availability: boolean;
  name: string;
  location: string;
  description: string;
  price: number;
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  images: {
    public_id: string;
    url: string;
    _id: string;
  }[];
  base: string;
  careServices: string[];
  amenities: string[];
  amenitiesServices: {
    image: { public_id: string; url: string };
    name: string;
  }[];
  about: string;
  videoTitle?: string;
  videoDescription?: string;
  uploadVideo?: string;
  availableTime?: string[];
  facilityLicenseNumber?: string;
  medicaidPrograms: {
    public_id: string;
    url: string;
    _id: string;
  }[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  rating?: number;
  ratingCount?: number;
  address?: string;
  status?: string;
}

// -------- ReviewData for Table --------
interface ReviewData {
  id: string;
  customerName: string;
  customerEmail: string;
  customerAvatar: string;
  rating: number;
  comment: string;
  location: string;
  date: string;
}

export default function ReviewsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReview, setSelectedReview] = useState<ReviewData | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<ReviewData | null>(null);

  const { data: session } = useSession();

  // Fetch facilities data
  const { data: facilities = [] } = useQuery<FacilityResponse[]>({
    queryKey: ["facilities"],
    queryFn: () => getFacilitys(),
  });

  // Map FacilityResponse[] -> ReviewData[]
  const reviews: ReviewData[] = useMemo(() => {
    if (!facilities) return [];
    return facilities.map((f) => ({
      id: f._id,
      customerName: f.userId
        ? `${f.userId.firstName} ${f.userId.lastName}`
        : "Unknown User",
      customerEmail: f.userId?.email || "N/A",
      customerAvatar: f.images?.[0]?.url || "/placeholder.svg",
      rating: f.rating || 0,
      comment: f.description || "No description",
      location: f.location || "Unknown",
      date: new Date(f.createdAt).toLocaleDateString(),
    }));
  }, [facilities]);

  // Pagination
  const itemsPerPage = 5;
  const totalPages = Math.ceil(reviews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentReviews = reviews.slice(startIndex, startIndex + itemsPerPage);
  const totalResults = reviews.length;

  const handleViewReview = (review: ReviewData) => {
    setSelectedReview(review);
    setShowDetailsModal(true);
  };

  const handleDeleteClick = (review: ReviewData) => {
    setReviewToDelete(review);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (reviewToDelete) {
      toast.success("Review deleted successfully");
      setShowDeleteModal(false);
      setReviewToDelete(null);
    }
  };

  const renderStars = (rating: number) => (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            {[1, 2, 3, 4, 5].map((star) => {
              const count = reviews.filter((r) => r.rating === star).length;
              return (
                <Card key={star}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      {star} Star Ratings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {count}
                    </div>
                    <div className="text-xs text-green-600 flex items-center gap-1">
                      <span>↗</span>
                      <span>Updated</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
                        Customer
                      </th>
                      <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
                        Review
                      </th>
                      <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
                        Ratings
                      </th>
                      <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
                        Date
                      </th>
                      <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentReviews.map((review, index) => (
                      <tr
                        key={review.id}
                        className={
                          index !== currentReviews.length - 1 ? "border-b" : ""
                        }
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage
                                src={review.customerAvatar}
                                alt={review.customerName}
                              />
                              <AvatarFallback>
                                {review.customerName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-gray-900">
                                {review.customerName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {review.customerEmail}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-sm text-gray-900 max-w-xs truncate">
                            {review.comment}
                          </div>
                        </td>
                        <td className="py-4 px-6">{renderStars(review.rating)}</td>
                        <td className="py-4 px-6">{review.date}</td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewReview(review)}
                              className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteClick(review)}
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + itemsPerPage, totalResults)} of{" "}
              {totalResults} results
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="h-8 w-8 p-0"
              >
                ‹
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className={`h-8 w-8 p-0 ${
                    currentPage === page
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="h-8 w-8 p-0"
              >
                ›
              </Button>
            </div>
          </div>
        </main>
      </div>

      <ReviewDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        review={selectedReview}
      />

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        title="Are You Sure?"
        message="Are you sure you want to delete this review?"
      />
    </div>
  );
}
