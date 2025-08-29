"use client";

import { useState } from "react";
import Image from "next/image";
import { DollarSign, TrendingUp, Calendar } from "lucide-react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pagination } from "@/components/pagination";

export default function ReferralFeesPage() {
  const [currentPage, setCurrentPage] = useState(1);

  // Mock referral data
  const referrals = Array.from({ length: 20 }, (_, i) => ({
    id: `referral-${i + 1}`,
    referrerName: "Olivia Rhye",
    referrerAvatar: "/diverse-group.png",
    referrerEmail: "olivia@untitledui.com",
    customerName: "John Smith",
    facilityName: "Sunny Hills Assisted Living",
    facilityImage: "/assisted-living-facility.png",
    referralDate: "06/01/2025",
    placementDate: "06/15/2025",
    feeAmount: Math.floor(Math.random() * 500) + 200,
    status:
      i % 4 === 0
        ? "Pending"
        : i % 4 === 1
        ? "Paid"
        : i % 4 === 2
        ? "Processing"
        : "Cancelled",
    commission: "5%",
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-bg text-green-success";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Processing":
        return "bg-blue-100 text-blue-700";
      case "Cancelled":
        return "bg-red-bg text-red-error";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const itemsPerPage = 10;
  const totalPages = Math.ceil(referrals.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentReferrals = referrals.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Calculate totals
  const totalEarnings = referrals.reduce(
    (sum, ref) => sum + (ref.status === "Paid" ? ref.feeAmount : 0),
    0
  );
  const pendingEarnings = referrals.reduce(
    (sum, ref) => sum + (ref.status === "Pending" ? ref.feeAmount : 0),
    0
  );
  const totalReferrals = referrals.length;
  const successfulReferrals = referrals.filter(
    (ref) => ref.status === "Paid"
  ).length;

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Earnings
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-success">
                  ${totalEarnings.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  +12% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pending Payments
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  ${pendingEarnings.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Awaiting processing
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Referrals
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalReferrals}</div>
                <p className="text-xs text-muted-foreground">
                  All time referrals
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Success Rate
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-success">
                  {Math.round((successfulReferrals / totalReferrals) * 100)}%
                </div>
                <p className="text-xs text-muted-foreground">Conversion rate</p>
              </CardContent>
            </Card>
          </div>

          {/* Referrals Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-green-bg">
                    <TableHead>Referrer</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Facility</TableHead>
                    <TableHead>Referral Date</TableHead>
                    <TableHead>Commission</TableHead>
                    <TableHead>Fee Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentReferrals.map((referral) => (
                    <TableRow key={referral.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="relative h-10 w-10 rounded-full overflow-hidden">
                            <Image
                              src={
                                referral.referrerAvatar || "/placeholder.svg"
                              }
                              alt={referral.referrerName}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">
                              {referral.referrerName}
                            </p>
                            <p className="text-sm text-gray-600">
                              {referral.referrerEmail}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{referral.customerName}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="relative h-8 w-8 rounded-lg overflow-hidden">
                            <Image
                              src={referral.facilityImage || "/placeholder.svg"}
                              alt={referral.facilityName}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <p className="font-medium">{referral.facilityName}</p>
                        </div>
                      </TableCell>
                      <TableCell>{referral.referralDate}</TableCell>
                      <TableCell>{referral.commission}</TableCell>
                      <TableCell className="font-medium">
                        ${referral.feeAmount}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(referral.status)}>
                          {referral.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Pagination */}
          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
