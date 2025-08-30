import { ChangePassword } from "@/components/changePassword/ChangePasswordForm";
import ProfileCard from "@/components/profile/ProfileCard";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="flex justify-between py-6 gap-10">
        <ProfileCard />
        <ChangePassword />
      </div>
    </div>
  );
};

export default page;
