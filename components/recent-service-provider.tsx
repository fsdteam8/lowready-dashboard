import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RecentSectionProps {
  title: string;
  items: Array<{
    avatar?: {
      public_id?: string;
      url?: string;
    };
    verificationInfo?: {
      token?: string;
      verified?: boolean;
    };
    subscriptionStatus?: "active" | "expired" | "canceled" | string; // extend if needed
    isSubscriptionActive?: boolean;
    _id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: "organization" | "user" | "admin" | string; // extend if needed
    gender?: "male" | "female" | "other" | string;
    avatars?: string;
    bio?: string;
    street?: string;
    postCode?: number;
    phoneNum?: string;
    dateOfBirth?: string; // ISO Date string
    createdAt?: string; // ISO Date string
    updatedAt?: string; // ISO Date string
    onboardingStatus?: boolean;
    stripeAccountId?: string;
    accountLink?: string;
    totalPlacement?: number;
    totalTour?: number;
  }>;
  seeAllHref: string;
}

export function RecentServiceProvider({
  title,
  items,
  seeAllHref,
}: RecentSectionProps) {
  return (
    <Card className="bg-[#FFF] border border-[#E6E7E6] px- py-3">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
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
        {items.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between border-b pb-3"
          >
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={item?.avatar?.url} alt={item?.firstName} />
                <AvatarFallback>{item?.firstName?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                {item?.firstName && (
                  <p className="font-medium text-gray-900">{item?.firstName}</p>
                )}
                {item?.email && (
                  <p className="text-sm text-gray-600">{item?.email}</p>
                )}
                {item?.street && (
                  <p className="text-sm text-gray-600">{item?.street}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* <span className="text-sm font-medium">
                {item?.totalPlacement || "0"}
              </span> */}
              {item?.subscriptionStatus && (
                <Badge
                  variant={
                    item?.subscriptionStatus === "active" ||
                    item?.subscriptionStatus === "expired" ||
                    item?.subscriptionStatus === "canceled"
                      ? "default"
                      : "secondary"
                  }
                  className={
                    item?.subscriptionStatus === "active" ||
                    item?.subscriptionStatus === "expired" ||
                    item?.subscriptionStatus === "canceled"
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  }
                >
                  {item?.subscriptionStatus.charAt(0).toUpperCase() +
                    item?.subscriptionStatus.slice(1)}
                </Badge>
              )}
              {/* {seeAllHref && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-green-primary hover:text-green-secondary"
                >
                  {seeAllHref}
                </Button>
              )} */}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
