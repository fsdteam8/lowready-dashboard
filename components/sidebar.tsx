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
  LogOut,
  CircleDollarSign,
  Crown,
} from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { signOut } from "next-auth/react";
import Image from "next/image";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Facilities Management", href: "/facilities", icon: Building2 },
  { name: "Service Providers", href: "/service-providers", icon: UserCheck },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Bookings & Tours", href: "/bookings-tours", icon: MapPin },
  { name: "Reviews & Ratings", href: "/reviews", icon: MessageSquare },
  { name: "Blogs Management", href: "/blogs", icon: FileText },
  { name: "Payments", href: "/payments", icon: CircleDollarSign },
  { name: "Subscription", href: "/subscriptions", icon: Crown },
];

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    // NextAuth signOut with redirect to login page
    signOut({ callbackUrl: "/login" });
    setOpen(false);
  };

  return (
    <div className="flex h-screen w-64 flex-col bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="flex h-16 items-center px-6">
        <Link href="/" className="flex items-center ml-5">
          {/* <div className="text-2xl font-bold">
            <span className="text-green-primary">Aln</span>
            <span className="text-gray-600">Hub</span>
          </div> */}
          <Image
            src={"/alhub-logo.svg"}
            alt="This is Alhub Logo"
            width={150}
            height={150}
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-6 px-3 py-4">
        {navigation.map((item) => {
          // Active logic
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname?.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg p-3 text-base leading-[150%] tracking-[0%] font-semibold transition-colors",
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
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-12 px-4 cursor-pointer rounded-lg font-medium text-[#e5102e] hover:bg-[#feecee] hover:text-[#e5102e] transition-all duration-200"
            >
              <LogOut className="h-5 w-5" />
              Log Out
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Logout</DialogTitle>
              <DialogDescription>
                Are you sure you want to log out?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex justify-end gap-2">
              <Button
                className="cursor-pointer"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="cursor-pointer"
                variant="destructive"
                onClick={handleLogout}
              >
                Log Out
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
