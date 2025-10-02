"use client";
import React from "react";

export default function SubscriptionsSkeleton() {
  return (
    <div className="p-6">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center mb-4">
        <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-9 w-24 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Table Skeleton */}
      <div className="overflow-x-auto border border-[#E6E7E6] bg-white rounded-xl">
        <table className="w-full border-collapse rounded-lg overflow-hidden shadow">
          <thead>
            <tr className="bg-green-100 text-left text-[#343A40]">
              <th className="px-4 py-3">Subscriptions Packages</th>
              <th className="px-4 py-3">Amenities</th>
              <th className="px-4 py-3">Subscription Type</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)]?.map((_, i) => (
              <tr key={i} className="border-b">
                <td className="px-4 py-3">
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                </td>
                <td className="px-4 py-3">
                  <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
                </td>
                <td className="px-4 py-3">
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                </td>
                <td className="px-4 py-3">
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                </td>
                <td className="px-4 py-3 flex gap-3">
                  <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
