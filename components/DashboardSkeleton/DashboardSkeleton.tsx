"use client";

import React from "react";

export default function DashboardSkeleton() {
  return (
    <div className="flex-col h-screen bg-gray-50 pt-6 animate-pulse space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {[...Array(5)]?.map((_, i) => (
          <div
            key={i}
            className="h-24 bg-white rounded-md shadow p-4 flex flex-col justify-between"
          >
            <div className="h-5 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-300 rounded w-1/2 mt-2"></div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="h-64 bg-white rounded-md shadow mb-8"></div>

      {/* Recent Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Service Provider */}
        <div className="bg-white rounded-md shadow p-4 space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          {[...Array(3)]?.map((_, i) => (
            <div
              key={i}
              className="h-12 bg-gray-200 rounded w-full"
            ></div>
          ))}
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-md shadow p-4 space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          {[...Array(3)]?.map((_, i) => (
            <div
              key={i}
              className="h-12 bg-gray-200 rounded w-full"
            ></div>
          ))}
        </div>

        {/* Recent Customers */}
        <div className="bg-white rounded-md shadow p-4 space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          {[...Array(3)]?.map((_, i) => (
            <div
              key={i}
              className="h-12 bg-gray-200 rounded w-full"
            ></div>
          ))}
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-md shadow p-4 space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          {[...Array(3)]?.map((_, i) => (
            <div
              key={i}
              className="h-12 bg-gray-200 rounded w-full"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
