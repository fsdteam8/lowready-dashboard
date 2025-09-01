/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RecentSectionProps {
  title: string;
  items: Array<{
    onboardingStatus: any;
    verificationInfo: any;
    avatar: any;
    residentialInfo: any;
    facility: any;
    userId: any;
    subscriptionStatus: string;
    totalPlacement: string | number;
    street: string;
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
            className="text-green-primary hover:text-green-secondary"
          >
            See all
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="space-y-4">
        {items?.map((item) => (
          <div key={item._id} className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center justify-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={item.userId?.avatar?.url || "/placeholder.svg"}
                    alt={item.firstName}
                  />
                  <AvatarFallback>
                    {item.userId?.firstName?.charAt(0)}
                  </AvatarFallback>

                  <AvatarImage
                    src={item.avatar?.url || "/placeholder.svg"}
                    alt={item.firstName}
                  />
                  <AvatarFallback>{item.firstName?.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="flex flex-col justify-between">
                  <p className="font-medium text-gray-900">{item.firstName}</p>
                  <p className="font-medium text-gray-900">
                    {item.userId?.firstName}
                  </p>

                  {item?.userId?.email && (
                    <p className="text-xs text-gray-600">
                      {item.userId?.email}
                    </p>
                  )}
                  {item?.email && (
                    <p className="text-xs text-gray-600">{item.email}</p>
                  )}

                  {item?.userId?.street && (
                    <p className="text-xs text-gray-600">
                      {item.userId?.street}
                    </p>
                  )}
                  {item?.street && (
                    <p className="text-xs text-gray-600">{item.street}</p>
                  )}
                </div>
              </div>
              <div className="">
                {item.residentialInfo?.[0]?.requirements && (
                  <span className="text-xs">
                    {item.residentialInfo?.[0]?.requirements}
                  </span>
                )}
                {item.onboardingStatus && (
                  <span className="text-xs text-blue-500"></span>
                )}
                {item.verificationInfo && (
                  <Badge
                    variant={
                      item.onboardingStatus === true ||
                      item.onboardingStatus === false
                        ? "default"
                        : "secondary"
                    }
                    className={
                      item.onboardingStatus === true
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-600"
                    }
                  >
                    {item?.onboardingStatus == true ? "Onboreded" : "Pending"}
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {item?.facility?.price && (
                <span className="text-sm font-medium">
                  ${item?.facility?.price}
                </span>
              )}

              {item.totalPlacement && (
                <span className="text-sm font-medium">
                  {item.totalPlacement}
                </span>
              )}
              {item.verificationInfo && (
                <Badge
                  variant={
                    item.verificationInfo?.verified === "active" ||
                    item.verificationInfo?.verified === "expired" ||
                    item.verificationInfo?.verified === "canceled"
                      ? "default"
                      : "secondary"
                  }
                  className={
                    item.verificationInfo?.verified === true
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  }
                >
                  {item?.verificationInfo?.verified == true
                    ? "Verified"
                    : "Unverified"}
                </Badge>
              )}
              {item.facility?.status && (
                <Badge
                  variant={
                    item.facility?.status === "approved" ||
                    item.facility?.status === "canceled" ||
                    item.facility?.status === "declined"
                      ? "default"
                      : "secondary"
                  }
                  className={
                    item.facility?.status === "approved" ||
                    item.facility?.status === "pending" ||
                    item.facility?.status === "declined"
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  }
                >
                  {item.facility?.status.charAt(0).toUpperCase() +
                    item.facility?.status.slice(1)}
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
        ))}
      </CardContent>
    </Card>
  );
}
