"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useAllBPayments } from "@/hooks/usePayments";
import { Button } from "../ui/button";
import Link from "next/link";
import AllSubscriberSkeleton from "./AllSubscriberSkeleton";

interface Facility {
  name: string;
  images?: { url: string }[];
    base: string;
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
 
  if (isLoading)
    return (
      <div>
        <AllSubscriberSkeleton />
      </div>
    );
  if (isError) return <p>Something went wrong</p>;

  const payments: PaymentItem[] = data?.data || [];
  const meta: Meta | undefined = data?.meta;

  return (
    <div className="p-6 space-y-6">
      {/* Search & Filter */}
      <div className="flex justify-end items-center">
        {/* <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search by name..."
            className="border rounded px-3 py-2 w-72"
          />
          <button className="bg-green-500 text-white px-4 py-2 rounded">
            Search
          </button>
        </div> */}

        <Link href={"/all-subscriber"}>
          <Button className="bg-green-primary hover:bg-green-secondary cursor-pointer">
            See All Subscriptions
          </Button>
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-[#E6E7E6] bg-[#FFF] rounded-xl">
        <table className="w-full border-collapse rounded-lg overflow-hidden shadow">
          <thead>
            <tr className="bg-green-100 text-left ">
              <th className="px-4 py-3 text-[#343A40] text-base font-normal">
                Service Providers
              </th>
              <th className="px-4 py-3 text-[#343A40] text-base font-normal">
                Total Revenue
              </th>
              <th className="px-4 py-3 text-[#343A40] text-base font-normal">
                Commissions (18%)
              </th>
              <th className="px-4 py-3 text-[#343A40] text-base font-normal">
                Subscription Type
              </th>
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
                <td className="px-4 py-3 flex gap-3">{item?.facility?.base}</td>
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
