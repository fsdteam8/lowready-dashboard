import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

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
  console.log(",,", items);
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
        {items?.map((item) => (
          <div
            key={item?._id}
            className="flex items-center justify-between border-b pb-3"
          >
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={item?.avatar?.url} alt={item?.firstName} />
                <AvatarFallback>{item?.firstName?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                {item?.firstName && (
                  <p className="font-medium text-gray-900">
                    {item?.firstName} {item?.lastName}
                  </p>
                )}
                {item?.email && (
                  <p className="text-sm text-gray-600">{item?.email}</p>
                )}
                {item?.street && (
                  <p className="text-sm text-gray-600">{item?.street}</p>
                )}
              </div>
            </div>

            <div className="flex gap-3">
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

                <DialogContent className="sm:max-w-[500px] rounded-xl shadow-lg p-6">
                  <DialogHeader className="text-center">
                    <DialogTitle className="text-2xl font-bold">
                      {item?.firstName} {item?.lastName}
                    </DialogTitle>
                    <DialogDescription className="text-gray-500">
                      Complete information about this user
                    </DialogDescription>
                  </DialogHeader>

                  <div className="flex flex-col items-center mt-4 space-y-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage
                        src={item?.avatar?.url}
                        alt={item?.firstName}
                      />
                      <AvatarFallback>
                        {item?.firstName?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>

                    <div className="w-full grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                      <span className="font-semibold text-gray-700">Name:</span>
                      <span>
                        {item?.firstName} {item?.lastName}
                      </span>

                      {item?.email && (
                        <>
                          <span className="font-semibold text-gray-700">
                            Email:
                          </span>
                          <span>{item?.email}</span>
                        </>
                      )}

                      {item?.phoneNum && (
                        <>
                          <span className="font-semibold text-gray-700">
                            Phone:
                          </span>
                          <span>{item?.phoneNum}</span>
                        </>
                      )}

                      {item?.street && (
                        <>
                          <span className="font-semibold text-gray-700">
                            Street:
                          </span>
                          <span>{item?.street}</span>
                        </>
                      )}

                      {item?.postCode && (
                        <>
                          <span className="font-semibold text-gray-700">
                            Post Code:
                          </span>
                          <span>{item?.postCode}</span>
                        </>
                      )}

                      {item?.role && (
                        <>
                          <span className="font-semibold text-gray-700">
                            Role:
                          </span>
                          <span>{item?.role}</span>
                        </>
                      )}

                      {item?.subscriptionStatus && (
                        <>
                          <span className="font-semibold text-gray-700">
                            Subscription:
                          </span>
                          <span>{item?.subscriptionStatus}</span>
                        </>
                      )}

                      {item?.isSubscriptionActive !== undefined && (
                        <>
                          <span className="font-semibold text-gray-700">
                            Active Subscription:
                          </span>
                          <span>
                            {item?.isSubscriptionActive ? "Yes" : "No"}
                          </span>
                        </>
                      )}

                      {item?.verificationInfo?.verified !== undefined && (
                        <>
                          <span className="font-semibold text-gray-700">
                            Verified:
                          </span>
                          <span>
                            {item?.verificationInfo?.verified ? "Yes" : "No"}
                          </span>
                        </>
                      )}

                      {item?.bio && (
                        <>
                          <span className="font-semibold text-gray-700">
                            Bio:
                          </span>
                          <span>{item?.bio}</span>
                        </>
                      )}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
