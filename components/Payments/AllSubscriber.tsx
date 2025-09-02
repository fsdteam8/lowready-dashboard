"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useAllBPayments } from "@/hooks/usePayments";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import AllSubscriberSkeleton from "./AllSubscriberSkeleton";

interface User {
  firstName: string;
  lastName: string;
  avatar?: { url: string };
  email?: string;
}

interface Payment {
  amount: number;
  billingCycle: string;
  status: string;
  createdAt: string;
  userId: User;
}

interface PaymentItem {
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

export default function AllSubscriber() {
  const [paymentType] = useState<"subscription">("subscription");
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const { data, isLoading, isError } = useAllBPayments(
    paymentType,
    currentPage,
    8
  ) as {
    data: PaymentsResponse | undefined;
    isLoading: boolean;
    isError: boolean;
  };

  if (isLoading) return <div><AllSubscriberSkeleton /></div>;
  if (isError) return <p>Something went wrong</p>;

  const payments: PaymentItem[] = data?.data || [];
  const meta: Meta | undefined = data?.meta;

  // 🔹 Total Income Calculation
  const totalIncome = payments.reduce((sum, item) => {
    const amount = item.payments[0]?.amount || 0;
    return sum + amount;
  }, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <p className="flex gap-2 text-2xl font-bold text-[#28A745]">
          <ChevronLeft
            className="mt-1 cursor-pointer hover:text-black"
            onClick={() => router.back()}  
          />
          Total Income (${totalIncome.toFixed(2)})
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-[#E6F9EB] bg-[#FFF]">
        <table className="w-full border-collapse rounded-lg overflow-hidden shadow">
          <thead>
            <tr className="bg-green-100 text-[#343A40] text-left">
              <th className="px-4 py-3 text-[#343A40] text-base font-normal">Subscriber</th>
              <th className="px-4 py-3 text-[#343A40] text-base font-normal">Billing Month</th>
              <th className="px-4 py-3 text-[#343A40] text-base font-normal">Subscription Type</th>
              <th className="px-4 py-3 text-[#343A40] text-base font-normal">Amount</th>
              <th className="px-4 py-3 text-[#343A40] text-base font-normal">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((item, index) => {
              const payment = item.payments[0];
              const user = payment?.userId;
              return (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 flex items-center gap-3">
                    <Image
                      src={user?.avatar?.url || "/default.png"}
                      alt="user"
                      width={40}
                      height={40}
                      className="rounded-full object-cover w-10 h-10"
                    />
                    <div>
                      <p className="font-medium">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {new Date(payment?.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 capitalize">
                    {payment?.billingCycle || "-"}
                  </td>
                  <td className="px-4 py-3">${payment?.amount}</td>
                  <td
                    className={`px-4 py-3 font-medium ${
                      payment?.status === "paid"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {payment?.status}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {meta && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Page {meta.page} of {meta.totalPages} | Total {meta.total}{" "}
            subscribers
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
                      ? "bg-green-500 text-white cursor-pointer"
                      : "hover:bg-gray-50 text-gray-600 cursor-pointer"
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
