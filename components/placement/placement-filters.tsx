"use client"

import { useState } from "react"
import { Filter, Search, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface PlacementFiltersProps {
  onFiltersChange: (filters: PlacementFilters) => void
}

export interface PlacementFilters {
  status?: string
  dateRange?: string
  search?: string
  sortBy?: string
  type?: string
}

export function PlacementFilters({ onFiltersChange }: PlacementFiltersProps) {
  const [filters, setFilters] = useState<PlacementFilters>({})

  const updateFilters = (newFilters: Partial<PlacementFilters>) => {
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
          {activeFiltersCount > 0 && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear All
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1">
              <Search className="h-3 w-3" />
              Search
            </label>
            <Input
              placeholder="Customer or facility..."
              value={filters.search || ""}
              onChange={(e) => updateFilters({ search: e.target.value || undefined })}
            />
          </div>

          {/* Status Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select
              value={filters.status || "all"}
              onValueChange={(value) => updateFilters({ status: value !== "all" ? value : undefined })}
            >
              <SelectTrigger>
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Type Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Type</label>
            <Select
              value={filters.type || "all"}
              onValueChange={(value) => updateFilters({ type: value !== "all" ? value : undefined })}
            >
              <SelectTrigger>
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                <SelectItem value="placements">Placements</SelectItem>
                <SelectItem value="tours">Tours</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Range */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Date Range
            </label>
            <Select
              value={filters.dateRange || "all"}
              onValueChange={(value) => updateFilters({ dateRange: value !== "all" ? value : undefined })}
            >
              <SelectTrigger>
                <SelectValue placeholder="All time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This week</SelectItem>
                <SelectItem value="month">This month</SelectItem>
                <SelectItem value="quarter">This quarter</SelectItem>
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
                <SelectItem value="amount">Amount</SelectItem>
                <SelectItem value="customer">Customer Name</SelectItem>
                <SelectItem value="facility">Facility Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active Filters Display */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
            {filters.status && <Badge variant="outline">Status: {filters.status}</Badge>}
            {filters.type && <Badge variant="outline">Type: {filters.type}</Badge>}
            {filters.dateRange && <Badge variant="outline">Date: {filters.dateRange}</Badge>}
            {filters.search && <Badge variant="outline">Search: &apos;{filters.search}&apos;</Badge>}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
