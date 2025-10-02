"use client";

import React from "react";

export default function CustomersSkeleton() {
  const skeletonRows = Array.from({ length: 5 }); // show 5 placeholder rows

  return (
    <div className="space-y-6">
      {/* Table Skeleton */}
      <div className="rounded-lg border bg-white">
        <div className="grid grid-cols-7 gap-4 p-4 bg-[#E6F9EB] text-center font-medium">
          <div>Service Providers</div>
          <div>Phone Number</div>
          <div>Location</div>
          <div>Total Tours</div>
          <div>Total Placements</div>
          <div>Joining Date</div>
          <div>Action</div>
        </div>

        <div className="space-y-2 p-4">
          {skeletonRows?.map((_, idx) => (
            <div
              key={idx}
              className="grid grid-cols-7 gap-4 items-center text-center animate-pulse"
            >
              {/* Avatar + Name */}
              <div className="flex items-center gap-3 justify-start col-span-1 text-left">
                <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                <div className="flex flex-col gap-1">
                  <div className="h-4 w-20 bg-gray-200 rounded"></div>
                  <div className="h-3 w-28 bg-gray-100 rounded"></div>
                </div>
              </div>

              <div className="h-4 w-full bg-gray-200 rounded mx-auto"></div>
              <div className="h-4 w-full bg-gray-200 rounded mx-auto"></div>
              <div className="h-4 w-full bg-gray-200 rounded mx-auto"></div>
              <div className="h-4 w-full bg-gray-200 rounded mx-auto"></div>
              <div className="h-4 w-full bg-gray-200 rounded mx-auto"></div>
              <div className="h-8 w-20 bg-gray-200 rounded mx-auto"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Skeleton */}
      <div className="flex justify-center space-x-2 animate-pulse">
        {Array.from({ length: 5 })?.map((_, idx) => (
          <div key={idx} className="h-8 w-8 bg-gray-200 rounded"></div>
        ))}
      </div>
    </div>
  );
}
