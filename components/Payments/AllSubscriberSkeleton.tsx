"use client";

import React from "react";

export default function AllSubscriberSkeleton() {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <div className="w-6 h-6 bg-gray-200 rounded"></div>
          <div className="h-6 w-48 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-[#E6F9EB] bg-white rounded-lg shadow">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-green-100 text-left">
              {["Subscriber", "Billing Month", "Subscription Type", "Amount", "Status"]?.map(
                (header, i) => (
                  <th
                    key={i}
                    className="px-4 py-3 text-[#343A40] text-base font-normal"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 6 })?.map((_, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                  <div>
                    <div className="h-4 w-28 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 w-20 bg-gray-200 rounded"></div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                </td>
                <td className="px-4 py-3">
                  <div className="h-4 w-20 bg-gray-200 rounded"></div>
                </td>
                <td className="px-4 py-3">
                  <div className="h-4 w-16 bg-gray-200 rounded"></div>
                </td>
                <td className="px-4 py-3">
                  <div className="h-4 w-14 bg-gray-200 rounded"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="h-4 w-40 bg-gray-200 rounded"></div>
        <div className="flex items-center gap-2">
          {Array.from({ length: 5 })?.map((_, i) => (
            <div key={i} className="w-8 h-8 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
