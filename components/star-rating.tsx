"use client"

import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  rating: number
  maxRating?: number
  readonly?: boolean
  onRatingChange?: (rating: number) => void
  size?: "sm" | "md" | "lg"
}

export function StarRating({ rating, maxRating = 5, readonly = false, onRatingChange, size = "md" }: StarRatingProps) {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: maxRating }, (_, index) => {
        const starValue = index + 1
        const isFilled = starValue <= rating

        return (
          <button
            key={index}
            type="button"
            disabled={readonly}
            onClick={() => !readonly && onRatingChange?.(starValue)}
            className={cn(
              "transition-colors",
              !readonly && "hover:scale-110 cursor-pointer",
              readonly && "cursor-default",
            )}
          >
            <Star
              className={cn(
                sizeClasses[size],
                isFilled ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200",
              )}
            />
          </button>
        )
      })}
    </div>
  )
}
