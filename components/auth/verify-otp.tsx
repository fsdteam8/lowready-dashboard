"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

const VerifyOTPForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(59);
  const [loading, setLoading] = useState(false);

  // countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleChange = (value: string, index: number) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // auto focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        (nextInput as HTMLInputElement)?.focus();
      }
    }
  };

  const handleVerify = async () => {
    const enteredOtp = otp.join("");

    if (!email) {
      toast.error("Email is missing");
      return;
    }

    if (enteredOtp.length < 6) {
      toast.error("Please enter the full 6-digit OTP");
      return;
    }
    console.log(email, enteredOtp);

    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/otp/verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ email, otp: enteredOtp }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Verification failed");
      }

      toast.success("Email verified successfully!");
      router.push(`/reset-password?email=${email}&token=${data?.data}`);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setTimeLeft(59);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/resend-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      toast.success("OTP resent successfully!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };
  return (
    <section>
      <div className="">
        {/* Right side form */}
        <div className="flex items-center justify-center">
          <div className="">
            <h2 className="text-4xl font-playfair font-bold text-green-600 mb-2">
              Verify Email
            </h2>
            <p className="text-gray-500 mb-6 font-poppins">
              Enter OTP to verify your email address
            </p>

            {/* OTP inputs */}
            <div className="flex justify-center gap-5 mb-4">
              {otp?.map((digit, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, i)}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !otp[i] && i > 0) {
                      const prevInput = document.getElementById(`otp-${i - 1}`);
                      (prevInput as HTMLInputElement)?.focus();
                    }
                  }}
                  onPaste={(e) => {
                    e.preventDefault();
                    const pasteData = e.clipboardData
                      .getData("text")
                      .replace(/\D/g, "");
                    if (!pasteData) return;

                    const newOtp = [...otp];
                    for (let j = 0; j < 6 && j < pasteData.length; j++) {
                      newOtp[j] = pasteData[j];
                    }
                    setOtp(newOtp);

                    // focus last filled box
                    const nextIndex = Math.min(pasteData.length - 1, 5);
                    const nextInput = document.getElementById(
                      `otp-${nextIndex}`
                    );
                    (nextInput as HTMLInputElement)?.focus();
                  }}
                  className="w-16 h-16 border border-green-400 rounded text-center text-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              ))}
            </div>

            {/* Timer + resend */}
            <div className="flex justify-between items-center text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-1">
                <span>⏱</span>
                <span>
                  {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
                  {String(timeLeft % 60).padStart(2, "0")}
                </span>
              </div>
              <div>
                Didn&apos;t get a code?{" "}
                <button
                  onClick={handleResend}
                  disabled={timeLeft > 0}
                  className={`${
                    timeLeft > 0
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-green-600 hover:underline"
                  }`}
                >
                  Resend
                </button>
              </div>
            </div>

            {/* Verify button */}
            <button
              onClick={handleVerify}
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifyOTPForm;
