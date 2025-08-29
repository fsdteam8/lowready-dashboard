"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

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

export function ReviewDetailsModal({ isOpen, onClose, review }: ReviewDetailsModalProps) {
  if (!review) return null

  const fullReviewText =
    "I've been ordering from TABLEFRESH for over year now, and the quality of their organic produce is consistently excellent. The convenience of having fresh, organic food delivered to my door has made healthy eating so much easier for my family."

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-0 gap-0">
        <div className="flex items-center justify-between p-6 pb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={review.customerAvatar || "/placeholder.svg"} alt={review.customerName} />
              <AvatarFallback>{review.customerName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Connect Directly</h2>
              <p className="text-sm text-gray-500">{review.location}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="px-6 pb-6">
          <div className="flex items-center gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-6 w-6 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
              />
            ))}
          </div>

          <p className="text-gray-600 leading-relaxed text-sm italic">{fullReviewText}</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
