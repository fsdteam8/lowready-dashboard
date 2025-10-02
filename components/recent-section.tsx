"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { MapPin } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

interface User {
  _id: string;
  firstName: string;
  lastName?: string;
  email?: string;
  street?: string;
  phoneNum?: string;
  bio?: string;
  subscriptionStatus?: string;
  role?: string;
  postCode?: number;
  isSubscriptionActive?: boolean;
  avatar?: { url: string };
  verificationInfo?: { verified: boolean; token?: string };
}

interface RecentSectionProps {
  title: string;
  items: User[];
}

const DEFAULT_AVATAR = "/no-image.jpg";  

export function RecentSection({ title, items }: RecentSectionProps) {
  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader className="flex justify-between items-center pb-2 py-2">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableBody>
            {items?.map((user) => {
              const avatarUrl = user?.avatar?.url || DEFAULT_AVATAR;
              const displayName = `${user?.firstName} ${user?.lastName || ""}`.trim();
              const avatarFallback = user?.firstName?.charAt(0) || "U";

              return (
                <TableRow key={user?._id}>
                  {/* Avatar + Name */}
                  <TableCell className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border">
                      <AvatarImage src={avatarUrl} alt={displayName} />
                      <AvatarFallback>{avatarFallback}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900">{displayName}</p>
                      {user?.email && <p className="text-xs text-gray-600">{user?.email}</p>}
                    </div>
                  </TableCell>

                  {/* Street */}
                  <TableCell>
                    <p className="flex items-center text-xs text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      {user?.street || "N/A"}
                    </p>
                  </TableCell>

                  {/* View Details Button */}
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline" className="cursor-pointer">
                          View
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="sm:max-w-[500px] rounded-xl shadow-lg p-6">
                        <DialogHeader className="text-center">
                          <DialogTitle className="text-2xl font-bold">{displayName}</DialogTitle>
                          <DialogDescription className="text-gray-500">
                            Complete information about this user
                          </DialogDescription>
                        </DialogHeader>

                        <div className="flex flex-col items-center mt-4 space-y-4">
                          <Avatar className="h-24 w-24">
                            <AvatarImage src={avatarUrl} alt={displayName} />
                            <AvatarFallback>{avatarFallback}</AvatarFallback>
                          </Avatar>

                          <div className="w-full grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                            <span className="font-semibold text-gray-700">Name:</span>
                            <span>{displayName}</span>

                            {user?.email && (
                              <>
                                <span className="font-semibold text-gray-700">Email:</span>
                                <span>{user?.email}</span>
                              </>
                            )}

                            {user?.phoneNum && (
                              <>
                                <span className="font-semibold text-gray-700">Phone:</span>
                                <span>{user?.phoneNum}</span>
                              </>
                            )}

                            {user?.street && (
                              <>
                                <span className="font-semibold text-gray-700">Street:</span>
                                <span>{user?.street}</span>
                              </>
                            )}

                            {user?.postCode && (
                              <>
                                <span className="font-semibold text-gray-700">Post Code:</span>
                                <span>{user?.postCode}</span>
                              </>
                            )}

                            {user?.role && (
                              <>
                                <span className="font-semibold text-gray-700">Role:</span>
                                <span>{user?.role}</span>
                              </>
                            )}

                            {user?.subscriptionStatus && (
                              <>
                                <span className="font-semibold text-gray-700">Subscription:</span>
                                <span>{user?.subscriptionStatus}</span>
                              </>
                            )}

                            {user?.isSubscriptionActive !== undefined && (
                              <>
                                <span className="font-semibold text-gray-700">Active Subscription:</span>
                                <span>{user?.isSubscriptionActive ? "Yes" : "No"}</span>
                              </>
                            )}

                            {user?.verificationInfo?.verified !== undefined && (
                              <>
                                <span className="font-semibold text-gray-700">Verified:</span>
                                <span>{user?.verificationInfo?.verified ? "Yes" : "No"}</span>
                              </>
                            )}

                            {user?.bio && (
                              <>
                                <span className="font-semibold text-gray-700">Bio:</span>
                                <span>{user?.bio}</span>
                              </>
                            )}
                          </div>
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
