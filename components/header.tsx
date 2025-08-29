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
    name: "Blogs Management",
    href: "/blogs",
    description: "Manage your blog posts and their details.",
  },
  {
    name: "Referral Fees",
    href: "/referral-fees",
    description: "Manage referral fees and their details.",
  },
];

export function Header() {
  const { data: session } = useSession();

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserProfile(session?.user.id as string),
    select: (data) => data.data,
  });

  const pathname = usePathname();

  const isActivePath = pathname;

  return (
    <div className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <div>
        <h1 className="text-2xl font-semibold text-green-primary">
          {navigation.find((nav) => nav.href === isActivePath)?.name ||
            "Unknown"}
        </h1>
        <p className="text-sm text-gray-600">
          {navigation.find((nav) => nav.href === isActivePath)?.description}
        </p>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-red-500 p-0 text-xs text-white">
                1
              </Badge>
            </Button>
          </DropdownMenuTrigger>
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
            <Button variant="ghost" className="flex items-center gap-3 px-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar?.url} alt="Olivia Rhye" />
                <AvatarFallback>
                  {user?.firstName?.charAt(0)}
                  {user?.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="text-sm font-medium">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-600">{user?.email}</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
