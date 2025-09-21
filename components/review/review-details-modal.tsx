"use client"

import { Star } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ReviewDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  review: {
    id: string
    customerName: string
    customerEmail: string
    customerAvatar: string
    rating: number
    comment: string
    location: string
    date: string
  } | null
}

export function ReviewDetailsModal({
  isOpen,
  onClose,
  review,
}: ReviewDetailsModalProps) {
  if (!review) return null

  const fullReviewText =
    "I've been ordering from TABLEFRESH for over year now, and the quality of their organic produce is consistently excellent. The convenience of having fresh, organic food delivered to my door has made healthy eating so much easier for my family."

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-0 gap-0">
        <DialogHeader className="p-6 pb-4 flex flex-row items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={review.customerAvatar }
              alt={review.customerName}
            />
            <AvatarFallback>{review.customerName.charAt(0)}</AvatarFallback>
          </Avatar>

          <div>
            {/* h2 এর বদলে DialogTitle ব্যবহার */}
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Connect Directly
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              {review.location}
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="px-6 pb-6">
          <div className="flex items-center gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-6 w-6 ${
                  i < 4
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-200 text-gray-200"
                }`}
              />
            ))}
          </div>

          <p className="text-gray-600 leading-relaxed text-sm italic">
            {fullReviewText}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
