"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Phone, Mail } from "lucide-react";
import { useAllBPayments } from "@/hooks/usePayments";
import { Button } from "../ui/button";

interface Facility {
  name: string;
  images?: { url: string }[];
}

interface Payment {
  amount: number;
}

interface PaymentItem {
  facility: Facility;
  payments: Payment[];
  totalAdminShare: number;
}

interface Meta {
  page: number;
  totalPages: number;
  total: number;
}

interface PaymentsResponse {
  data: PaymentItem[];
  meta: Meta;
}

export default function Payments() {
  const [paymentType] = useState<"booking" | "subscription">("booking");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useAllBPayments(
    paymentType,
    currentPage,
    10
  ) as {
    data: PaymentsResponse | undefined;
    isLoading: boolean;
    isError: boolean;
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;

  const payments: PaymentItem[] = data?.data || [];
  const meta: Meta | undefined = data?.meta;

  return (
    <div className="p-6 space-y-6">
      {/* Search & Filter */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search by name..."
            className="border rounded px-3 py-2 w-72"
          />
          <button className="bg-green-500 text-white px-4 py-2 rounded">
            Search
          </button>
        </div>

        <Button
          asChild
          className="bg-green-primary hover:bg-green-secondary cursor-pointer"
        >
          See All Subscriptions
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-lg overflow-hidden shadow">
          <thead>
            <tr className="bg-green-100 text-left">
              <th className="px-4 py-3">Service Providers</th>
              <th className="px-4 py-3">Total Revenue</th>
              <th className="px-4 py-3">Commissions (18%)</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 flex items-center gap-3">
                  <Image
                    src={item.facility.images?.[0]?.url || "/default.png"}
                    alt="facility"
                    width={40}
                    height={40}
                    className="rounded-full object-cover w-10 h-10"
                  />
                  <div>
                    <p className="font-medium">{item.facility.name}</p>
                  </div>
                </td>
                <td className="px-4 py-3">${item.payments[0]?.amount}</td>
                <td className="px-4 py-3">${item.totalAdminShare}</td>
                <td className="px-4 py-3 flex gap-3">
                  <button className="text-green-600 hover:text-green-800 cursor-pointer">
                    <Phone size={18} />
                  </button>
                  <button className="text-green-600 hover:text-green-800 cursor-pointer">
                    <Mail size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {meta && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Page {meta.page} of {meta.totalPages} | Total {meta.total} payments
          </p>
          <div className="flex items-center gap-1">
            <button
              className="px-3 py-1 border rounded cursor-pointer"
              onClick={() => setCurrentPage(meta.page - 1)}
              disabled={meta.page === 1}
            >
              &lt;
            </button>

            {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 border rounded ${
                    meta.page === page
                      ? "bg-green-500 text-white"
                      : "hover:bg-gray-50 text-gray-600"
                  }`}
                >
                  {page}
                </button>
              )
            )}

            <button
              className="px-3 py-1 border rounded cursor-pointer"
              onClick={() => setCurrentPage(meta.page + 1)}
              disabled={meta.page === meta.totalPages}
            >
              &gt;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
