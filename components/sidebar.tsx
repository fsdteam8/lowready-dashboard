"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Building2,
  Users,
  UserCheck,
  MapPin,
  MessageSquare,
  FileText,
  DollarSign,
  LogOut,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Facilities Management",
    href: "/facilities",
    icon: Building2,
  },
  {
    name: "Service Providers",
    href: "/service-providers",
    icon: UserCheck,
  },
  {
    name: "Customers",
    href: "/customers",
    icon: Users,
  },
  {
    name: "Placements & Tours",
    href: "/placements",
    icon: MapPin,
  },
  {
    name: "Reviews & Ratings",
    href: "/reviews",
    icon: MessageSquare,
  },
  {
    name: "Blogs Management",
    href: "/blogs",
    icon: FileText,
  },
  {
    name: "Referral Fees",
    href: "/referral-fees",
    icon: DollarSign,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-64 flex-col bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="flex h-16 items-center px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="text-2xl font-bold">
            <span className="text-green-primary">Aln</span>
            <span className="text-gray-600">Hub</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-6 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg p-3 text-base leading-[150%] tracking-[0%]  font-semibold transition-colors",
                isActive
                  ? "bg-green-primary text-white"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-gray-200 p-3">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50">
          <LogOut className="h-5 w-5" />
          Log out
        </button>
      </div>
    </div>
  );
}
