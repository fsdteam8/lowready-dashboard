"use client"
import React from "react";
import ProfileCard from "./ProfileCard";
import { PersonalInformationForm } from "./PersonalInformation";
import { useSession } from "next-auth/react";

export default function ProfileComponent() {
  const { data: session } = useSession();

  const userId = session?.user.id;

  return (
    <div className="flex justify-between py-6 gap-10">
      <ProfileCard userId={userId}/>
      <PersonalInformationForm />
    </div>
  );
}
