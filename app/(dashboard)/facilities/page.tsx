"use client";

import { useState } from "react";
import { FacilitiesTable } from "@/components/facilities-table";
import { useFacilities } from "@/hooks/use-facilities";

export default function FacilitiesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error } = useFacilities(currentPage, 10);

  if (isLoading) {
    return (
      <div className="flex h-screen">
        <div className="flex-1">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-primary mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading facilities...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen">
        <div className="flex-1">
          <div className="flex items-center justify-center h-96">
            <div className="text-center text-red-600">
              <p>Error loading facilities. Please try again.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <FacilitiesTable
            facilities={data?.data || []}
            total={data?.total || 0}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </main>
      </div>
    </div>
  );
}
