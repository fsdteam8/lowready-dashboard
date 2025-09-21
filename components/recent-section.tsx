"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { MapPin } from "lucide-react";

interface RecentSectionProps {
  title: string;
  items: Array<{
    onboardingStatus?: boolean;
    verificationInfo?: {
      verified: boolean | string;
    };
    avatar?: {
      url: string;
    };
    residentialInfo?: Array<{
      requirements: string;
    }>;
    facility?: {
      price: number;
      location?: string;
      status: "approved" | "pending" | "declined" | "canceled";
    };
    userId?: {
      avatar?: {
        url: string;
      };
      firstName: string;
      email: string;
      street: string;
    };
    subscriptionStatus?: string;
    totalPlacement?: string | number;
    street?: string;
    _id: string;
    firstName: string;
    lastName: string;
    email?: string;
    avatars?: string;
    location?: string;
    value?: string | number;
    status?: string;
    action?: string;
  }>;
  seeAllHref: string;
}

const getBadgeConfig = (
  status: string | boolean,
  type: "onboarding" | "verification" | "facility"
) => {
  const configs = {
    onboarding: {
      variant: "default" as const,
      className:
        status === true
          ? "bg-green-500 text-white"
          : "bg-gray-200 text-gray-600",
      text: status === true ? "Onboarded" : "Pending",
    },
    verification: {
      variant:
        status === "active" || status === "expired" || status === "canceled"
          ? ("default" as const)
          : ("secondary" as const),
      className:
        status === true
          ? "bg-green-500 text-white"
          : "bg-gray-200 text-gray-600",
      text: status === true ? "Verified" : "Unverified",
    },
    facility: {
      variant:
        status === "approved" || status === "canceled" || status === "declined"
          ? ("default" as const)
          : ("secondary" as const),
      className:
        status === "approved" || status === "pending" || status === "declined"
          ? "bg-green-500 text-white"
          : "bg-gray-200 text-gray-600",
      text:
        typeof status === "string"
          ? status.charAt(0).toUpperCase() + status.slice(1)
          : "",
    },
  };

  return configs[type];
};

export function RecentSection({
  title,
  items,
  seeAllHref,
}: RecentSectionProps) {
  return (
    <Card className="bg-[#FFF] border border-[#E6E7E6]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <Link href={seeAllHref}>
          <Button
            variant="ghost"
            size="sm"
            className="text-green-primary text-[#28A745] cursor-pointer mt-3"
          >
            See all
          </Button>
        </Link>
      </CardHeader>

      <CardContent>
        <Table>
          <TableBody>
            {items?.map((item) => {
              const avatarUrl = item.userId?.avatar?.url || item.avatar?.url;
              const displayName = item.userId?.firstName || item?.firstName;
              const email = item.userId?.email || item.email;
              const street =
                item.userId?.street || item.street || item.facility?.location;
              const avatarFallback = displayName?.charAt(0) || "";

              return (
                <TableRow key={item._id}>
                  {/* User */}
                  <TableCell className="flex text-left gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={avatarUrl} alt={displayName} />
                      <AvatarFallback>{avatarFallback}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900">{displayName}</p>
                      {email && (
                        <p className="text-xs text-gray-600">{email}</p>
                      )}
                    </div>
                  </TableCell>

                  {/* Location */}
                  <TableCell>
                    <p className="flex items-center text-xs text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      {street || "N/A"}
                    </p>
                  </TableCell>

                  {/* Onboarding */}
                  <TableCell>
                    {item.onboardingStatus !== undefined && (
                      <Badge
                        variant={
                          getBadgeConfig(item.onboardingStatus, "onboarding")
                            .variant
                        }
                        className={
                          getBadgeConfig(item.onboardingStatus, "onboarding")
                            .className
                        }
                      >
                        {
                          getBadgeConfig(item.onboardingStatus, "onboarding")
                            .text
                        }
                      </Badge>
                    )}
                  </TableCell>

                  {/* Facility Status */}
                  <TableCell>
                    {item.facility?.status && (
                      <Badge
                        variant={
                          getBadgeConfig(item.facility.status, "facility")
                            .variant
                        }
                        className={
                          getBadgeConfig(item.facility.status, "facility")
                            .className
                        }
                      >
                        {getBadgeConfig(item.facility.status, "facility").text}
                      </Badge>
                    )}
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
