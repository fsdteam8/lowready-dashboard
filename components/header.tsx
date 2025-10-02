"use client";

import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "@/lib/api";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    description: "Welcome back! Here's what's happening with your app today.",
  },
  {
    name: "Facilities Management",
    href: "/facilities",
    description: "Manage your facilities and their details.",
  },
  {
    name: "Service Providers",
    href: "/service-providers",
    description: "Manage your service providers and their details.",
  },
  {
    name: "Customers",
    href: "/customers",
    description: "Manage your customers and their details.",
  },
  {
    name: "Placements & Tours",
    href: "/placements",
    description: "Manage placements and tours.",
  },
  {
    name: "Reviews & Ratings",
    href: "/reviews",
    description: "Manage reviews and ratings.",
  },
  {
    name: "Bookings & Tours",
    href: "/bookings-tours",
    description: "Welcome back! Here's what's happening with your app today.",
  },
  {
    name: "Blogs Management",
    href: "/blogs",
    description: "Manage your blog posts and their details.",
  },
  {
    name: "Payments",
    href: "/payments",
    description: "Track your facility growth and community engagement easily.",
  },
  {
    name: "Subscriptions",
    href: "/subscriptions",
    description:
      "Keep track of all your facilities, update details, and stay organized..",
  },
];

export function Header() {
  const { data: session } = useSession();

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserProfile(session?.user?.id as string),
    select: (data) => data?.data,
    enabled: !!session?.user?.id,
  });

  const pathname = usePathname();

  const activePage = navigation.find((nav) => nav.href === pathname);

  //   const activePage = navigation.find((nav) => {
  //   if (nav.href === "/") return pathname === "/";
  //   console.log("Checking nav:", nav.href, "with pathname:", pathname);

  //   return pathname?.startsWith(nav.href);
  // });

  return (
    <div className="flex text-[16px] h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#28A745]">
          {activePage?.name || "Dashboard"}
        </h1>
        <p className="text-sm text-gray-600">
          {activePage?.description || "Welcome to your dashboard."}
        </p>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <DropdownMenu>
          <Link href={`/notifications`}>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-red-500 p-0 text-xs text-white">
                0
              </Badge>
            </Button>
          </Link>

          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuItem>
              <div className="flex flex-col gap-1">
                <p className="font-medium">New facility listing</p>
                <p className="text-sm text-gray-600">
                  Sunny Hills Assisted Living submitted for approval
                </p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-3 px-3 cursor-pointer"
            >
              <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarImage src={user?.avatar?.url} alt="Olivia Rhye" />
                <AvatarFallback className="cursor-pointer">
                  {user?.firstName?.charAt(0)}
                  {user?.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="text-left cursor-pointer">
                <p className="text-sm font-medium">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-600">{user?.email}</p>
              </div>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="cursor-pointer">
            <Link href="/profile">
              <DropdownMenuItem className="cursor-pointer">
                Profile
              </DropdownMenuItem>
            </Link>
            <Link href="/change-password">
              <DropdownMenuItem className="cursor-pointer">
                Change Password
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              onClick={() => {
                import("next-auth/react").then(({ signOut }) => signOut());
              }}
              className="cursor-pointer"
            >
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
