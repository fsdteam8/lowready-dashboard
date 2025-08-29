"use client";

import { useState } from "react";
import { CustomersTable } from "@/components/customers-table";
import { useCustomers } from "@/hooks/use-customers";
import { clear } from "console";

export default function CustomersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error } = useCustomers(currentPage, 10);

  if (isLoading) {
    return (
      <div className="flex h-screen">
        <div className="flex-1">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-primary mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading customers...</p>
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
              <p>Error loading customers. Please try again.</p>
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
          <CustomersTable
            customers={data?.customers || []}
            total={data?.total || 0}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </main>
      </div>
    </div>
  );
}
