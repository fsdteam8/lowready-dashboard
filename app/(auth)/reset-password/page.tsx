import ResetPassword from "@/components/auth/reset-password";
import React, { Suspense } from "react";

export default function page() {
  return (
    <div>
      <Suspense fallback={<div>loading...</div>}>
        <ResetPassword />
      </Suspense>
    </div>
  );
}
