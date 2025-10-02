"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import Image from "next/image";

// ====================== TYPES ======================
interface User {
  firstName?: string;
  lastName?: string;
  email?: string;
  avatar?: { url?: string };
  phoneNum?: string;
  postCode?: string | null;
  street?: string;
}

interface Facility {
  name?: string;
  about?: string;
  address?: string;
  description?: string;
  amenities?: string[];
  careServices?: string[];
  rating?: number;
  status?: string;
  uploadVideo?: string;
  videoTitle?: string;
  videoDescription?: string;
  images?: { url: string }[];
  availableTime?: string[];
  facilityLicenseNumber?: string;
  userId?: User;
}

interface Booking {
  _id?: string;
  name?: string;
  paymentStatus?: "pending" | "paid" | "cancelled" | string;
  totalPrice?: number;
  base?: string;
  facility?: Facility;
  startingDate?: string;
  userId?: User;
}

interface RecentBookingsProps {
  items: Booking[];
}

// ====================== COMPONENT ======================
const DEFAULT_AVATAR = "/no-avatar.png";

export default function RecentBookings({ items }: RecentBookingsProps) {
 
  return (
    <Card className="bg-white border border-gray-200 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-800 py-2">
          Recent Bookings
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableBody>
            {items?.map((booking) => {
              const userName = booking?.userId
                ? `${booking?.userId?.firstName ?? ""} ${
                    booking?.userId?.lastName ?? ""
                  }`.trim()
                : "N/A";
              const userEmail = booking?.userId?.email || "N/A";
              const userAvatar = booking?.userId?.avatar?.url || DEFAULT_AVATAR;
              const facilityName = booking?.facility?.name || "N/A";
              const amenities = booking?.facility?.amenities ?? [];
              const careServices = booking?.facility?.careServices ?? [];

              return (
                <TableRow
                  key={booking?._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <TableCell>
                    <p className="font-medium">{facilityName}</p>
                  </TableCell>

                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-white text-xs ${
                        booking?.paymentStatus === "pending"
                          ? "bg-red-500"
                          : booking?.paymentStatus === "paid"
                          ? "bg-green-500"
                          : "bg-gray-400"
                      }`}
                    >
                      {booking?.paymentStatus}
                    </span>
                  </TableCell>

                  <TableCell>${booking?.totalPrice}</TableCell>
                  <TableCell>{booking?.base}</TableCell>

                  <TableCell className="flex items-center space-x-2">
                    <Image
                      src={userAvatar}
                      alt={userName}
                      width={32}
                      height={32}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium">{userName}</p>
                      <p className="text-xs text-gray-500">{userEmail}</p>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="cursor-pointer"
                        >
                          View
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="sm:max-w-[650px] max-h-[80vh] overflow-y-auto rounded-xl shadow-lg p-6">
                        <DialogHeader className="text-center">
                          <DialogTitle className="text-2xl font-bold text-gray-800">
                            Booking Details
                          </DialogTitle>
                          <DialogDescription className="text-gray-500">
                            Complete information for this booking
                          </DialogDescription>
                        </DialogHeader>

                        <div className="grid grid-cols-2 gap-4 mt-6 text-gray-700">
                          {/* Booking & User Info */}
                          <h3 className="col-span-2 text-lg font-semibold text-indigo-600 border-b pb-1">
                            Booking & User Info
                          </h3>
                          <span className="font-semibold">User Name:</span>
                          <span>{userName}</span>

                          <span className="font-semibold">User Email:</span>
                          <span>{userEmail}</span>

                          <span className="font-semibold">Payment Status:</span>
                          <span
                            className={`px-2 py-1 rounded-full text-md ${
                              booking?.paymentStatus === "pending"
                                ? "text-red-500"
                                : booking?.paymentStatus === "paid"
                                ? "text-green-500"
                                : "text-gray-400"
                            }`}
                          >
                            {booking?.paymentStatus}
                          </span>

                          <span className="font-semibold">Total Price:</span>
                          <span>${booking?.totalPrice}</span>

                          {/* Facility Owner Info */}
                          <h3 className="col-span-2 text-lg font-semibold text-indigo-600 border-b pb-1 mt-4">
                            Facility Owner Info
                          </h3>

                          <span className="font-semibold">Owner Name:</span>
                          <span>
                            {booking?.facility?.userId?.firstName}{" "}
                            {booking?.facility?.userId?.lastName}
                          </span>

                          <span className="font-semibold">Owner Email:</span>
                          <span>{booking?.facility?.userId?.email}</span>

                          <span className="font-semibold">Phone Number:</span>
                          <span>
                            {booking?.facility?.userId?.phoneNum || "N/A"}
                          </span>

                          <span className="font-semibold">Post Code:</span>
                          <span>
                            {booking?.facility?.userId?.postCode || "N/A"}
                          </span>

                          <span className="font-semibold">Street:</span>
                          <span>
                            {booking?.facility?.userId?.street || "N/A"}
                          </span>

                          {booking?.facility?.userId?.avatar?.url && (
                            <>
                              <span className="font-semibold">
                                Owner Avatar:
                              </span>
                              <Image
                                src={booking?.facility?.userId?.avatar?.url}
                                alt="Owner Avatar"
                                width={50}
                                height={50}
                                className="rounded-full object-cover"
                              />
                            </>
                          )}

                          {/* Facility Info */}
                          <h3 className="col-span-2 text-lg font-semibold text-indigo-600 border-b pb-1 mt-4">
                            Facility Info
                          </h3>

                          <span className="font-semibold">Facility Name:</span>
                          <span>{booking?.facility?.name}</span>

                          {booking?.facility?.address && (
                            <>
                              <span className="font-semibold">Address:</span>
                              <span>{booking?.facility?.address}</span>
                            </>
                          )}

                          {booking?.facility?.description && (
                            <>
                              <span className="font-semibold">
                                Description:
                              </span>
                              <span>{booking?.facility?.description}</span>
                            </>
                          )}

                          {booking?.facility?.facilityLicenseNumber && (
                            <>
                              <span className="font-semibold">License No:</span>
                              <span>
                                {booking?.facility?.facilityLicenseNumber}
                              </span>
                            </>
                          )}

                          {amenities.length > 0 && (
                            <>
                              <span className="font-semibold">Amenities:</span>
                              <span>{amenities.join(", ")}</span>
                            </>
                          )}

                          {careServices.length > 0 && (
                            <>
                              <span className="font-semibold">
                                Care Services:
                              </span>
                              <span>{careServices.join(", ")}</span>
                            </>
                          )}

                          {booking?.facility?.availableTime?.length ? (
                            <>
                              <span className="font-semibold">
                                Available Time:
                              </span>
                              <span>
                                {booking?.facility?.availableTime.join(", ")}
                              </span>
                            </>
                          ) : null}

                          {booking?.facility?.status && (
                            <>
                              <span className="font-semibold">Status:</span>
                              <span>{booking?.facility?.status}</span>
                            </>
                          )}

                          {booking?.facility?.uploadVideo && (
                            <>
                              <span className="font-semibold">Video:</span>
                              <span>
                                <a
                                  href={booking?.facility?.uploadVideo}
                                  target="_blank"
                                  className="text-blue-500 underline"
                                >
                                  {booking?.facility?.videoTitle ||
                                    "Watch Video"}
                                </a>
                              </span>
                            </>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
