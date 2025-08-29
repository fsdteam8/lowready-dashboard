"use client"

import { useState } from "react"
import { Filter, Star, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface ReviewFiltersProps {
  onFiltersChange: (filters: ReviewFilters) => void
}

export interface ReviewFilters {
  rating?: number
  facility?: string
  location?: string
  dateRange?: string
  sortBy?: string
}

export function ReviewFilters({ onFiltersChange }: ReviewFiltersProps) {
  const [filters, setFilters] = useState<ReviewFilters>({})
  const [isExpanded, setIsExpanded] = useState(false)

  const updateFilters = (newFilters: Partial<ReviewFilters>) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)
    onFiltersChange(updatedFilters)
  }

  const clearFilters = () => {
    setFilters({})
    onFiltersChange({})
  }

  const activeFiltersCount = Object.values(filters).filter(Boolean).length

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span className="font-medium">Filters</span>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="text-xs">
                {activeFiltersCount}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            {activeFiltersCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? "Less" : "More"} Filters
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Rating Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1">
              <Star className="h-3 w-3" />
              Rating
            </label>
            <Select
              value={filters.rating?.toString() || "any"}
              onValueChange={(value) => updateFilters({ rating: value !== "any" ? Number.parseInt(value) : undefined })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Any rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any rating</SelectItem>
                <SelectItem value="5">5 stars only</SelectItem>
                <SelectItem value="4">4+ stars</SelectItem>
                <SelectItem value="3">3+ stars</SelectItem>
                <SelectItem value="2">2+ stars</SelectItem>
                <SelectItem value="1">1+ stars</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Facility Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Facility</label>
            <Select
              value={filters.facility || "all"}
              onValueChange={(value) => updateFilters({ facility: value !== "all" ? value : undefined })}
            >
              <SelectTrigger>
                <SelectValue placeholder="All facilities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All facilities</SelectItem>
                <SelectItem value="Sunny Hills Assisted Living">Sunny Hills Assisted Living</SelectItem>
                <SelectItem value="Golden Years Care">Golden Years Care</SelectItem>
                <SelectItem value="Comfort Living Center">Comfort Living Center</SelectItem>
                <SelectItem value="Peaceful Gardens">Peaceful Gardens</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort By */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Sort By</label>
            <Select value={filters.sortBy || "newest"} onValueChange={(value) => updateFilters({ sortBy: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="highest">Highest Rating</SelectItem>
                <SelectItem value="lowest">Lowest Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Location Filter */}
          {isExpanded && (
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                Location
              </label>
              <Input
                placeholder="Filter by location..."
                value={filters.location || ""}
                onChange={(e) => updateFilters({ location: e.target.value || undefined })}
              />
            </div>
          )}
        </div>

        {/* Active Filters Display */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
            {filters.rating && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Star className="h-3 w-3" />
                {filters.rating}+ stars
              </Badge>
            )}
            {filters.facility && <Badge variant="outline">{filters.facility}</Badge>}
            {filters.location && (
              <Badge variant="outline" className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {filters.location}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
