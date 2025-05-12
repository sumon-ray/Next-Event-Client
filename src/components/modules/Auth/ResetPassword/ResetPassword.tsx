"use client";

import { resetPasswordSchema, type ResetPasswordType } from "@/app/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ResetPassword } from "@/services/AuthService";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Eye, EyeOff, Lock, LockKeyhole, X } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ResetPasswordComponent() {
  const params = useSearchParams();
  const router = useRouter();
  const userId = params.get("userId");
  const token = params.get("token");

  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [tokenValid, setTokenValid] = useState(true);
  const [tokenChecked, setTokenChecked] = useState(false);

  const form = useForm<ResetPasswordType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;
  const watchPassword = form.watch("newPassword");

  useEffect(() => {
    const validateToken = async () => {
      try {
        if (!userId || !token) {
          setTokenValid(false);
        } else {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          setTokenValid(true);
        }
        setTokenChecked(true);
      } catch (error) {
        console.log(error);
        setTokenValid(false);
        setTokenChecked(true);
      }
    };

    validateToken();
  }, [userId, token]);

  // Calculate password strength
  useEffect(() => {
    if (!watchPassword) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;

    // Length check
    if (watchPassword.length >= 8) strength += 25;

    // Uppercase check
    if (/[A-Z]/.test(watchPassword)) strength += 25;

    // Lowercase check
    if (/[a-z]/.test(watchPassword)) strength += 25;

    // Number or special character check
    if (/[0-9!@#$%^&*(),.?":{}|<>]/.test(watchPassword)) strength += 25;

    setPasswordStrength(strength);
  }, [watchPassword]);

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 25) return "Weak";
    if (passwordStrength <= 50) return "Fair";
    if (passwordStrength <= 75) return "Good";
    return "Strong";
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 25) return "bg-red-500";
    if (passwordStrength <= 50) return "bg-orange-500";
    if (passwordStrength <= 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  const onSubmit = async (data: ResetPasswordType) => {
    try {
      if (!userId || !token) {
        toast.error("Invalid or expired reset link.");
        return;
      }

      await ResetPassword({ ...data, userId, token });
      setSuccess(true);
      toast.success("Your password has been updated successfully!");

      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error) {
      toast.error("Failed to reset password");
    }
  };

  if (!tokenChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
        <Card className="w-full max-w-md shadow-xl border-0">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Verifying Reset Link
            </CardTitle>
            <CardDescription>
              Please wait while we verify your reset link...
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!tokenValid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
        <Card className="w-full max-w-md shadow-xl border-0">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto bg-red-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
              <X className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Invalid Reset Link
            </CardTitle>
            <CardDescription className="text-gray-500 mt-2">
              This password reset link is invalid or has expired.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center pt-4 pb-2">
            <p className="text-gray-600 text-sm mb-6">
              Please request a new password reset link to continue.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center pb-6">
            <Link href="/forgot-password">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Request New Link
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <Card className="w-full max-w-md shadow-xl border-0">
        <AnimatePresence mode="wait">
          {!success ? (
            <motion.div
              key="reset-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CardHeader className="text-center pb-2">
                <div className="mx-auto bg-blue-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                  <LockKeyhole className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Create New Password
                </CardTitle>
                <CardDescription className="text-gray-500 mt-2">
                  Your new password must be different from previously used
                  passwords.
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-4">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-5"
                  >
                    <FormField
                      control={form.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input
                                {...field}
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="pl-10 pr-10 h-12"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 top-2 h-8 w-8 text-gray-500"
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </FormControl>

                          {watchPassword && (
                            <div className="mt-2 space-y-1">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-gray-500">
                                  Password strength:
                                </span>
                                <span
                                  className={`font-medium ${
                                    passwordStrength <= 25
                                      ? "text-red-500"
                                      : passwordStrength <= 50
                                      ? "text-orange-500"
                                      : passwordStrength <= 75
                                      ? "text-yellow-600"
                                      : "text-green-600"
                                  }`}
                                >
                                  {getPasswordStrengthText()}
                                </span>
                              </div>
                              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div
                                  className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`}
                                  style={{ width: `${passwordStrength}%` }}
                                ></div>
                              </div>
                            </div>
                          )}

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="pt-2">
                      <h4 className="text-lg font-medium text-gray-700 mb-2">
                        Password Requirements:
                      </h4>
                      <ul className="space-y-2 text-sm">
                        <li
                          className={`flex items-center ${
                            watchPassword?.length >= 8
                              ? "text-green-600"
                              : "text-gray-500"
                          }`}
                        >
                          <div
                            className={`mr-2 rounded-full p-1 ${
                              watchPassword?.length >= 8
                                ? "bg-green-100"
                                : "bg-gray-100"
                            }`}
                          >
                            {watchPassword?.length >= 8 ? (
                              <CheckCircle2 className="h-3 w-3" />
                            ) : (
                              <div className="h-3 w-3" />
                            )}
                          </div>
                          At least 8 characters
                        </li>
                        <li
                          className={`flex items-center ${
                            /[A-Z]/.test(watchPassword || "")
                              ? "text-green-600"
                              : "text-gray-500"
                          }`}
                        >
                          <div
                            className={`mr-2 rounded-full p-1 ${
                              /[A-Z]/.test(watchPassword || "")
                                ? "bg-green-100"
                                : "bg-gray-100"
                            }`}
                          >
                            {/[A-Z]/.test(watchPassword || "") ? (
                              <CheckCircle2 className="h-3 w-3" />
                            ) : (
                              <div className="h-3 w-3" />
                            )}
                          </div>
                          At least one uppercase letter
                        </li>
                        <li
                          className={`flex items-center ${
                            /[a-z]/.test(watchPassword || "")
                              ? "text-green-600"
                              : "text-gray-500"
                          }`}
                        >
                          <div
                            className={`mr-2 rounded-full p-1 ${
                              /[a-z]/.test(watchPassword || "")
                                ? "bg-green-100"
                                : "bg-gray-100"
                            }`}
                          >
                            {/[a-z]/.test(watchPassword || "") ? (
                              <CheckCircle2 className="h-3 w-3" />
                            ) : (
                              <div className="h-3 w-3" />
                            )}
                          </div>
                          At least one lowercase letter
                        </li>
                        <li
                          className={`flex items-center ${
                            /[0-9!@#$%^&*(),.?":{}|<>]/.test(
                              watchPassword || ""
                            )
                              ? "text-green-600"
                              : "text-gray-500"
                          }`}
                        >
                          <div
                            className={`mr-2 rounded-full p-1 ${
                              /[0-9!@#$%^&*(),.?":{}|<>]/.test(
                                watchPassword || ""
                              )
                                ? "bg-green-100"
                                : "bg-gray-100"
                            }`}
                          >
                            {/[0-9!@#$%^&*(),.?":{}|<>]/.test(
                              watchPassword || ""
                            ) ? (
                              <CheckCircle2 className="h-3 w-3" />
                            ) : (
                              <div className="h-3 w-3" />
                            )}
                          </div>
                          At least one number or special character
                        </li>
                      </ul>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 bg-blue-600 hover:bg-blue-700"
                      disabled={!isValid || isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Updating Password...
                        </>
                      ) : (
                        "Reset Password"
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CardHeader className="text-center pb-2">
                <div className="mx-auto bg-green-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Password Reset Successful
                </CardTitle>
                <CardDescription className="text-gray-500 mt-2">
                  Your password has been reset successfully.
                </CardDescription>
              </CardHeader>

              <CardContent className="text-center pt-4 pb-2">
                <p className="text-gray-600 mb-6">
                  You can now use your new password to log in to your account.
                </p>
                <div className="w-full bg-blue-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-blue-700">
                    You will be redirected to the login page in a few seconds...
                  </p>
                  <Progress value={100} className="h-1 mt-2 bg-blue-100">
                    <div className="h-full bg-blue-600 rounded-full animate-progress"></div>
                  </Progress>
                </div>
              </CardContent>

              <CardFooter className="flex justify-center pb-6">
                <Link href="/login">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Go to Login
                  </Button>
                </Link>
              </CardFooter>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </div>
  );
}
