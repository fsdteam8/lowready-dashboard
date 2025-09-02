import VerifyOTPForm from "@/components/auth/verify-otp";
import React, { Suspense } from "react";

export default function page() {
  return (
    <div>
      <Suspense fallback={<div>loading...</div>}>
      <VerifyOTPForm />   
      </Suspense>
    </div>
  );
}
