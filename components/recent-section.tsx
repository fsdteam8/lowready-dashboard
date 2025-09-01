/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

// Helper function to get badge variant and styling
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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <Link href={seeAllHref}>
          <Button
            variant="ghost"
            size="sm"
            className="text-green-primary text-[#28A745] cursor-pointer"
          >
            See all
          </Button>
        </Link>
      </CardHeader>

      <CardContent className="space-y-4">
        {items?.map((item) => {
          // Determine which data to use (prioritize userId data if available)
          const avatarUrl =
            item.userId?.avatar?.url || item.avatar?.url || "/placeholder.svg";
          const displayName = item.userId?.firstName || item.firstName;
          const email = item.userId?.email || item.email;
          const street = item.userId?.street || item.street;
          const avatarFallback = displayName?.charAt(0) || "";

          return (
            <div key={item._id} className="flex items-center justify-between">
              {/* Left side - Avatar and user info */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={avatarUrl} alt={displayName} />
                    <AvatarFallback>{avatarFallback}</AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col">
                    <p className="font-medium text-gray-900">{displayName}</p>
                    {email && <p className="text-xs text-gray-600">{email}</p>}
                    {street && (
                      <p className="text-xs text-gray-600">{street}</p>
                    )}
                  </div>
                </div>

                {/* Middle section - Requirements and status badges */}
                <div className="flex items-center gap-2">
                  {item.residentialInfo?.[0]?.requirements && (
                    <span className="text-xs">
                      {item.residentialInfo[0].requirements}
                    </span>
                  )}

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
                      {getBadgeConfig(item.onboardingStatus, "onboarding").text}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Right side - Price, placement count, and action buttons */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">
                  ${item?.facility?.price || 0}
                </span>

                <span className="text-sm font-medium">
                  {item?.totalPlacement || 0}
                </span>

                {item.verificationInfo && (
                  <Badge
                    variant={
                      getBadgeConfig(
                        item.verificationInfo.verified,
                        "verification"
                      ).variant
                    }
                    className={
                      getBadgeConfig(
                        item.verificationInfo.verified,
                        "verification"
                      ).className
                    }
                  >
                    {
                      getBadgeConfig(
                        item.verificationInfo.verified,
                        "verification"
                      ).text
                    }
                  </Badge>
                )}

                {item.facility?.status && (
                  <Badge
                    variant={
                      getBadgeConfig(item.facility.status, "facility").variant
                    }
                    className={
                      getBadgeConfig(item.facility.status, "facility").className
                    }
                  >
                    {getBadgeConfig(item.facility.status, "facility").text}
                  </Badge>
                )}

                {item.action && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-green-primary hover:text-green-secondary"
                  >
                    {item.action}
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
