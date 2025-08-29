"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { forgatePassword } from "@/lib/auth"; // ✅ Your API call
import { useState } from "react";

// ✅ Zod validation schema
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type LoginSchema = z.infer<typeof loginSchema>;

const ForgotPasswordForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "" },
  });

  // ✅ React Query mutation
  const forgateMutation = useMutation({
    mutationFn: (email: string) => forgatePassword(email),
    onSuccess: (data: { message: string; email: string }) => {
      toast.success(data.message || "OTP sent to your email");
      router.push(`/verify-otp?email=${email}`);
    },
    onError: (error: { message: string }) => {
      toast.error(error.message || "Failed to send OTP");
    },
  });

  const onSubmit = (values: LoginSchema) => {
    setEmail(values.email);
    forgateMutation.mutate(values.email);
  };

  return (
    <section className="">

      {/* Right side form */}
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center"
      >
        <div className="w-xl mx-auto space-y-1.5">
          <h2 className="text-4xl font-playfair font-bold text-green-600 mb-2">
            Forgot Password
          </h2>
          <p className="text-gray-500 mb-6">
            Enter your email to recover your password
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                      className="h-12"
                        type="email"
                        placeholder="hello@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit */}
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 cursor-pointer"
                disabled={forgateMutation.isPending}
              >
                {forgateMutation.isPending ? "Sending..." : "Send OTP"}
              </Button>
            </form>
          </Form>
        </div>
      </motion.div>
    </section>
  );
};

export default ForgotPasswordForm;
