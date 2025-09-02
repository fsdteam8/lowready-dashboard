"use client";

import { useState, useMemo } from "react";
import { Star, Eye, Trash2, ArrowUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ReviewDetailsModal } from "@/components/review/review-details-modal";
import { DeleteConfirmModal } from "@/components/review/delete-confirm-modal";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteReview } from "@/lib/api";
import { useReviewRatings } from "@/hooks/use-customers";

// -------- API Response Types --------
interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
}

interface Facility {
  _id: string;
  address: string;
}

interface ReviewApiData {
  _id: string;
  userId: User;
  star: number;
  comment: string;
  facility: Facility;
  createdAt: string;
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

// -------- Pagination Component --------
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalResults: number;
  itemsPerPage: number;
  startIndex: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalResults,
  itemsPerPage,
  startIndex,
  onPageChange,
}) => (
  <div className="flex items-center justify-between mt-6">
    <div className="text-sm text-gray-600">
      Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, totalResults)} of{" "}
      {totalResults} results
    </div>
    <div className="flex items-center gap-1">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="h-8 w-8 p-0 cursor-pointer"
      >
        ‹
      </Button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? "default" : "outline"}
          size="sm"
          onClick={() => onPageChange(page)}
          className={`h-8 w-8 p-0 ${
            currentPage === page
              ? "bg-green-600 text-white hover:bg-green-700 cursor-pointer"
              : "text-gray-600 hover:text-gray-900 cursor-pointer"
          }`}
        >
          {page}
        </Button>
      ))}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="h-8 w-8 p-0 cursor-pointer"
      >
        ›
      </Button>
    </div>
  </div>
);

// -------- Stars Component --------
const Stars: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "fill-[#8E938F] text-[#8E938F]"}`}
      />
    ))}
  </div>
);

// -------- Stats Cards Component --------
interface StatsCardsProps {
  reviews: ReviewData[];
}

const StatsCards: React.FC<StatsCardsProps> = ({ reviews }) => (
  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
    {[1, 2, 3, 4, 5].map((star) => {
      const count = reviews.filter((r) => r.rating === star).length;
      return (
        <Card key={star} className="h-full p-4 border">
          <CardHeader>
            <CardTitle className="text-sm lg:text-[20px] text-[#343A40] font-semibold">
              {star} Star Ratings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl lg:text-[32px] font-semibold text-[#10421B] mb-1">
              {count}
            </div>
            <div className="text-xs text-green-600 flex items-center gap-1">
              <span>+ 36% from the last month</span>
              <ArrowUp className="w-3 h-3" />
            </div>
          </CardContent>
        </Card>
      );
    })}
  </div>
);

// -------- Reviews Table Component --------
interface ReviewsTableProps {
  reviews: ReviewData[];
  onViewReview: (review: ReviewData) => void;
  onDeleteReview: (review: ReviewData) => void;
}

const ReviewsTable: React.FC<ReviewsTableProps> = ({ reviews, onViewReview, onDeleteReview }) => (
  <Card className="overflow-x-auto border">
    <CardContent className="p-0">
      <table className="w-full">
        <thead className="bg-[#E6F9EB] border-b pt-0 my-0">
          <tr>
            <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Customer</th>
            <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Review</th>
            <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Ratings</th>
            <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Date</th>
            <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Action</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review, index) => (
            <tr key={review.id} className={index !== reviews.length - 1 ? "border-b" : ""}>
              <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={review.customerAvatar} alt={review.customerName} />
                    <AvatarFallback>{review.customerName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-gray-900">{review.customerName}</div>
                    <div className="text-sm text-gray-500">{review.customerEmail}</div>
                  </div>
                </div>
              </td>
              <td className="py-4 px-6">
                <div className="text-sm text-gray-900 max-w-xs truncate">{review.comment}</div>
              </td>
              <td className="py-4 px-6">
                <Stars rating={review.rating} />
              </td>
              <td className="py-4 px-6">{review.date}</td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewReview(review)}
                    className="h-8 w-8 p-0 text-green-600 hover:text-green-700 cursor-pointer hover:bg-green-50"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteReview(review)}
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700 cursor-pointer hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 cursor-pointer" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </CardContent>
  </Card>
);

// -------- Main Page --------
export default function ReviewsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReview, setSelectedReview] = useState<ReviewData | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<ReviewData | null>(null);

  const queryClient = useQueryClient();
  const { data: reviewApi, isLoading } = useReviewRatings();

  const reviews: ReviewData[] = useMemo(() => {
    if (!reviewApi?.data) return [];
    return reviewApi.data.map((r: ReviewApiData) => ({
      id: r._id,
      customerName: `${r.userId?.firstName || ""} ${r.userId?.lastName || ""}`.trim(),
      customerEmail: r.userId?.email || "",
      customerAvatar: r.userId?.avatar || "",
      rating: r.star,
      comment: r.comment,
      location: r.facility?.address || "",
      date: new Date(r.createdAt).toLocaleDateString(),
    }));
  }, [reviewApi]);

  const reviewDeleteMutation = useMutation({
    mutationKey: ["review"],
    mutationFn: (id: string) => DeleteReview(id),
    onSuccess: (data) => {
      toast.success(data.message);
      setShowDeleteModal(false);
      setReviewToDelete(null);
      queryClient.invalidateQueries({ queryKey: ["review"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
      setShowDeleteModal(false);
      setReviewToDelete(null);
    },
  });

  const itemsPerPage = 5;
  const totalPages = Math.ceil(reviews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentReviews = reviews.slice(startIndex, startIndex + itemsPerPage);
  const totalResults = reviews.length;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <main className="flex-1 overflow-y-auto p-6">
        {/* Stats Cards */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Card key={i} className="h-40 p-4 space-y-3">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-3 w-2/3" />
              </Card>
            ))}
          </div>
        ) : (
          <StatsCards reviews={reviews} />
        )}

        {/* Reviews Table */}
        {isLoading ? (
          <Card>
            <CardContent className="p-6 space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </CardContent>
          </Card>
        ) : (
          <>
            <ReviewsTable
              reviews={currentReviews}
              onViewReview={(review) => {
                setSelectedReview(review);
                setShowDetailsModal(true);
              }}
              onDeleteReview={(review) => {
                setReviewToDelete(review);
                setShowDeleteModal(true);
              }}
            />

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalResults={totalResults}
              itemsPerPage={itemsPerPage}
              startIndex={startIndex}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </main>

      {/* Modals */}
      <ReviewDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        review={selectedReview}
      />
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => reviewToDelete && reviewDeleteMutation.mutate(reviewToDelete.id)}
        title="Are You Sure?"
        message="Are you sure you want to delete this review?"
      />
    </div>
  );
}
