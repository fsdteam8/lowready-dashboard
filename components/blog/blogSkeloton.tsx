import React from "react";

export default function BlogSkeleton() {
  return (
    <div className="p-6 space-y-6">
      {/* Search + Add Blog Skeleton */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 max-w-md space-y-2">
          <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Table Skeleton */}
      <div className="bg-white rounded-lg border">
        <div className="grid grid-cols-12 gap-4 p-4 bg-green-50 border-b font-medium text-gray-700">
          <div className="col-span-4 h-6 bg-gray-200 rounded animate-pulse"></div>
          <div className="col-span-2 h-6 bg-gray-200 rounded animate-pulse"></div>
          <div className="col-span-2 h-6 bg-gray-200 rounded animate-pulse"></div>
          <div className="col-span-4 h-6 bg-gray-200 rounded animate-pulse"></div>
        </div>

        <div className="divide-y">
          {Array.from({ length: 5 })?.map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-12 gap-4 p-4 items-center"
            >
              {/* Image + Title + Description */}
              <div className="col-span-4 flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-full animate-pulse"></div>
                </div>
              </div>

              {/* Created On */}
              <div className="col-span-2 h-4 bg-gray-200 rounded animate-pulse"></div>

              {/* Reading Time */}
              <div className="col-span-2 h-4 bg-gray-200 rounded animate-pulse"></div>

              {/* Actions */}
              <div className="col-span-4 flex items-center justify-center gap-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Skeleton */}
      <div className="flex items-center justify-between mt-4">
        <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
        <div className="flex items-center gap-2">
          {Array.from({ length: 3 })?.map((_, i) => (
            <div
              key={i}
              className="w-8 h-8 bg-gray-200 rounded animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
