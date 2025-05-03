"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { forgotPasswordSchema, ForgotPasswordType } from "@/app/types";
import { ForgetPassword } from "@/services/AuthService";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ForgotPasswordType>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const [success, setSuccess] = useState("");

  const onSubmit = async (data: ForgotPasswordType) => {
    try {
      await ForgetPassword(data);
      setSuccess("Check your email to reset your password.");
      toast.success("Reset link sent!");
    } catch (err) {
      toast.error(err.message || "Failed to send reset link");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="grid md:grid-cols-2 gap-8 items-center max-w-4xl w-full shadow-lg p-8 rounded-xl">
        {/* Left Section - Illustration */}
        <div className="flex flex-col items-center">
          <Image src="/images/forget-password.png" width={500} height={500} alt="Forget Password" />
        </div>

        {/* Right Section - Form */}
        <div className="w-full">
          <h2 className="text-3xl font-semibold text-gray-800 mb-2">
            Forgot <span className="text-black">Your Password</span>?
          </h2>
          <p className="text-gray-500 mb-6">Enter your email to reset it</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              type="email"
              placeholder="Email Address"
              {...register("email")}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}

            <Button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              {isSubmitting ? "Sending..." : "RESET PASSWORD"}
            </Button>

            {success && <p className="text-green-600 text-sm text-center">{success}</p>}

            <p className="text-center text-sm text-gray-400 mt-2">
              <a href="/login" className="hover:underline">Back to login</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
