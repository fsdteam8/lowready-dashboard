"use client";

import { useState } from "react";
import { ServiceProvidersTable } from "@/components/service-providers-table";
import { useServiceProviders } from "@/hooks/use-service-providers";
import { Skeleton } from "@/components/ui/skeleton";

export default function ServiceProvidersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
     
  const { data, isLoading, error } = useServiceProviders(
    currentPage,
    10,
    searchQuery
  );

  // console.log(data)

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  if (error) {
    return (
      <div className="flex h-screen">
        <div className="flex-1">
          <div className="flex items-center justify-center h-96">
            <div className="text-center text-red-600">
              <p>Error loading service providers. Please try again.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  console.log("", data)

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="space-y-4">
              {/* Header skeleton */}
              <div className="flex justify-between items-center">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-10 w-64" />
              </div>
              
              {/* Table skeleton */}
              <div className="rounded-lg border bg-white">
                {/* Table header skeleton */}
                <div className="border-b p-4">
                  <div className="flex space-x-4">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
                
                {/* Table rows skeleton */}
                {[...Array(10)].map((_, index) => (
                  <div key={index} className="border-b p-4 last:border-b-0">
                    <div className="flex space-x-4">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-28" />
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Pagination skeleton */}
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-32" />
                <div className="flex space-x-2">
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                </div>
              </div>
            </div>
          ) : (
            <ServiceProvidersTable
              providers={data}
              total={data?.total || 0}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              onSearch={handleSearch}
            />
          )}
        </main>
      </div>
    </div>
  );
}