import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Review } from "@/lib/types";
import Link from "next/link";

interface ReviewsSectionProps {
  reviews: Review[];
}

export function ReviewsSection({ reviews }: ReviewsSectionProps) {
  return (
    <Card className="bg-[#FFF] border border-[#E6E7E6]  py-3">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">Recent Reviews</CardTitle>
        <Link href="/reviews">
          <Button
            variant="ghost"
            size="sm"
            className="text-green-primary hover: cursor-pointer text-[#28A745]"
          >
            See all
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="space-y-4">
        {reviews.map((review) => (
          <div key={review._id} className="space-y-3 border-b pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={review.customerAvatar || "/placeholder.svg"}
                    alt={review?.userId?.firstName}
                  />
                  <AvatarFallback>
                    {review?.userId?.firstName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900">
                    {review?.userId?.firstName} {review?.userId?.lastName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {review.facility.address}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.star
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-600 pl-2">{review.comment}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
