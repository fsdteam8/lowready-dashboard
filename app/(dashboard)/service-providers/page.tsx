"use client";

import { useState } from "react";
import { ServiceProvidersTable } from "@/components/service-providers-table";
import { useServiceProviders } from "@/hooks/use-service-providers";

export default function ServiceProvidersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data, isLoading, error } = useServiceProviders(
    currentPage,
    10,
    searchQuery
  );

  console.log(data)

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }


  if (isLoading) {
    return (
      <div className="flex h-screen">
        <div className="flex-1">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-primary mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading service providers...</p>
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
              <p>Error loading service providers. Please try again.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  console.log("",data)

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          
          <ServiceProvidersTable
            providers ={data || []}
            total={data?.total || 0}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onSearch={handleSearch}
          />
        </main>
      </div>
    </div>
  );
}
