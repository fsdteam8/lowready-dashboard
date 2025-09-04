// import { useSession } from "next-auth/react";
"use client";
import React from "react";
import ProfileCard from "../profile/ProfileCard";
import { ChangePassword } from "./ChangePasswordForm";
import { useSession } from "next-auth/react";

export default function ProfileComponent() {
  const { data: session } = useSession();

  const userId = session?.user.id;

  return (
    <div className="flex justify-between py-6 gap-10">
      <ProfileCard userId={userId} />
      <ChangePassword />
    </div>
  );
}
