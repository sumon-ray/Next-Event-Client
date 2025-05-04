"use client";

import { getAccessToken } from "@/app/utils/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { changePassword } from "@/services/AuthService";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface FormData {
  oldPassword: string;
  newPassword: string;
}

export default function ChangePasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const [message, setMessage] = useState("");

  const onSubmit = async (data: FormData) => {
    try {
      const token = getAccessToken();
      if (!token) {
        setMessage("User is not authenticated.");
        return;
      }

      await changePassword(data, token);
      setMessage("✅ Password changed successfully!");
      reset();
    } catch (err) {
      setMessage(err.message || "❌ Something went wrong!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 max-w-md w-full p-6 bg-white rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Change Your Password
        </h2>

        <div className="space-y-4">
          <div>
            <Input
              type="password"
              placeholder="Old Password"
              className={`w-full p-3 rounded-md border ${
                errors.oldPassword ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              {...register("oldPassword", {
                required: "Old password is required",
              })}
            />
            {errors.oldPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.oldPassword.message}
              </p>
            )}
          </div>

          <div>
            <Input
              type="password"
              placeholder="New Password"
              className={`w-full p-3 rounded-md border ${
                errors.newPassword ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              {...register("newPassword", {
                required: "New password is required",
              })}
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.newPassword.message}
              </p>
            )}
          </div>
        </div>

        <Button
          type="submit"
          className="w-full py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Change Password
        </Button>

        {message && (
          <p className="text-center text-sm mt-4 text-green-600">{message}</p>
        )}
      </form>
    </div>
  );
}
