"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useSession } from "next-auth/react";

interface userIdProps {
  userId?: string;
}

export function ProfileCard(userId: userIdProps) {
  const session = useSession();
  // console.log(session);
  const user = userId !== null ? userId?.userId : session?.data?.user?.id;
  // console.log(user)
  const {
    data: userProfile,
    isLoading,
    error,
  } = useUserProfile(user as string);

  //   } = useUserProfile(session.data?.user.id as string);

  // console.log("Received id:", userId)

  if (isLoading) {
    return (
      <Card className="overflow-hidden">
        <div className="h-fit bg-gradient-to-r from-[#28A745CC] to-[#6DBC8B]"></div>
        <div className="relative px-6 pb-6">
          <div className="relative -mt-12 mb-4">
            <div className="h-24 w-24 border-4 border-white shadow-lg rounded-full bg-gray-200 animate-pulse"></div>
          </div>
          <div className="space-y-4">
            <div className="text-center space-y-2">
              <div className="h-6 bg-gray-200 rounded animate-pulse w-32 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-48 mx-auto"></div>
            </div>
            <div className="space-y-3">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-4 bg-gray-200 rounded animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-red-400 to-red-500"></div>
        <div className="relative px-6 pb-6">
          <div className="text-center py-8">
            <p className="text-red-600">Failed to load profile data</p>
            <p className="text-sm text-gray-500 mt-2">
              Please try refreshing the page
            </p>
          </div>
        </div>
      </Card>
    );
  }

  const userData = userProfile?.data;
  if (!userData) return null;

  const fullName = `${userData?.firstName} ${userData?.lastName}`.trim();
  const avatarUrl = userData?.avatar?.url || userData?.avatars || "";

  const joinDate = new Date(userData.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const location =
    userData?.street && userData?.postCode
      ? `${userData?.street}, ${userData?.postCode}`
      : userData?.street || "Not specified";

  return (
    <Card className=" w-[410px] h-[670px]   rounded-2xl py-0 overflow-hidden shadow-md border border-gray-200">
      {/* Gradient Header */}
      {/* <div className="h-28 bg-gradient-to-r from-green-400 to-green-500"></div> */}
      <div className="h-[140px] rounded-t-lg opacity-80 bg-[linear-gradient(282deg,rgba(40,167,69,0.80)_-0.29%,#51B8A0_48.99%,#6DBC8B_101.56%)]"></div>

      {/* Avatar with Edit Button */}
      <div className="relative flex justify-center -mt-16">
        <Avatar className="h-28 w-28 border-4 border-white shadow-lg rounded-full">
          <AvatarImage src={avatarUrl} alt={fullName} />
          <AvatarFallback className="text-xl font-semibold">
            {userData.firstName[0]?.toUpperCase() || ""}
            {userData.lastName[0]?.toUpperCase() || ""}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* User Info */}
      <div className="text-center mt-1">
        <h2 className="text-2xl font-semibold text-[#28A745]">{fullName}</h2>
        <p className="text-sm text-[#68706A]">{userData?.email}</p>
      </div>

      {/* Details Section */}
      <div className="px-6 py-6 space-y-4 text-sm text-gray-700 ">
        <div>
          <span className="font-semibold">Name:</span>{" "}
          <span className="text-[#68706A]">{fullName}</span>
        </div>
        <div>
          <span className="font-semibold">Bio:</span>{" "}
          <span className="text-[#68706A]">
            {userData.bio || "No bio available"}
          </span>
        </div>
        <div>
          <span className="font-semibold">Email:</span>{" "}
          <span className="text-[#68706A]">{userData?.email}</span>
        </div>
        <div>
          <span className="font-semibold">Phone:</span>{" "}
          <span className="text-[#68706A]">
            {" "}
            {userData?.phoneNum || "Not specified"}
          </span>
        </div>
        <div>
          <span className="font-semibold">Location:</span>{" "}
          <span className="text-[#68706A]">{location}</span>
        </div>
        {/* <div>
          <span className="font-semibold">Role:</span>{" "}
          <span className="capitalize">{userData.role}</span>
        </div> */}
        <div>
          <span className="font-semibold">Since:</span> {joinDate}
        </div>
        {/* <div>
          <span className="font-semibold">Verified:</span>{" "}
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              userData.verificationInfo?.verified
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {userData.verificationInfo?.verified ? "Verified" : "Pending"}
          </span>
        </div> */}
      </div>
    </Card>
  );
}

export default ProfileCard;
