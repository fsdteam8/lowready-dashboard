"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { getSession, signIn } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react"; // 👈 added icons

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
import { Checkbox } from "@/components/ui/checkbox";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean().optional(),
});

type LoginSchema = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  // ✅ Handle login with NextAuth
  const onSubmit = async (values: LoginSchema) => {
    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (res?.error) {
        toast.error(res.error || "Invalid email or password");
      } else {
        toast.success("Login successful!");

        type SessionUserWithRole = {
          name?: string | null;
          email?: string | null;
          image?: string | null;
          role?: string | null;
        };

        const session = await getSession();
        console.log("session: ", session);

        const user = session?.user as SessionUserWithRole | undefined;

        if (user?.role === "admin") {
          router.push("/");
        } else {
          toast.error("You do not have access to this application.");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="">
      {/* Right side form */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center w-full"
      >
        <div className="w-xl space-y-8 font-poppins">
          <div className="space-y-4">
            <h2 className="text-4xl font-playfair font-bold text-green-600 mb-2">
              Welcome
            </h2>
            <p className="text-gray-500 mb-6 font-poppins">
              Access your account to manage tours, leads, and listings
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="hello@example.com"
                        className="h-12 rounded-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password with toggle */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="********"
                          className="h-12 rounded-sm"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 cursor-pointer"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Remember + Forgot */}
              <div className="flex justify-between items-center">
                <FormField
                  control={form.control}
                  name="remember"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 space-y-1.5">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm">Remember me</FormLabel>
                    </FormItem>
                  )}
                />

                <a
                  href="/forgot-password"
                  className="text-green-600 text-sm hover:underline cursor-pointer"
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Log In"}
              </Button>
            </form>
          </Form>
        </div>
      </motion.div>
    </section>
  );
};

export default LoginForm;
