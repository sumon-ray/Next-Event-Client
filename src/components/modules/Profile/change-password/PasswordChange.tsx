"use client";

import { getAccessToken } from "@/app/utils/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { changePassword } from "@/services/AuthService";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  Info,
  Loader2,
  Lock,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldX,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import PasswordRequirements from "./password-requirements";
import PasswordStrengthMeter from "./password-strength-meter";
import PasswordTips from "./password-tips";
import SuccessAnimation from "./success-animation";

const passwordSchema = z
  .object({
    oldPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof passwordSchema>;

export default function PasswordChange() {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange", // Enable real-time validation
  });

  const watchNewPassword = form.watch("newPassword");
  const watchConfirmPassword = form.watch("confirmPassword");
  const formState = form.formState;

  // Calculate password strength
  useEffect(() => {
    if (!watchNewPassword) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;

    // Length check (8+ characters)
    if (watchNewPassword.length >= 8) strength += 20;

    // Uppercase check
    if (/[A-Z]/.test(watchNewPassword)) strength += 20;

    // Lowercase check
    if (/[a-z]/.test(watchNewPassword)) strength += 20;

    // Number check
    if (/[0-9]/.test(watchNewPassword)) strength += 20;

    // Special character check
    if (/[^A-Za-z0-9]/.test(watchNewPassword)) strength += 20;

    setPasswordStrength(strength);
  }, [watchNewPassword]);

  const getPasswordStrengthIcon = () => {
    if (passwordStrength <= 20)
      return <ShieldX className="h-5 w-5 text-red-500" />;
    if (passwordStrength <= 40)
      return <ShieldAlert className="h-5 w-5 text-orange-500" />;
    if (passwordStrength <= 60)
      return <Shield className="h-5 w-5 text-yellow-500" />;
    if (passwordStrength <= 80)
      return <Shield className="h-5 w-5 text-blue-500" />;
    return <ShieldCheck className="h-5 w-5 text-green-500" />;
  };

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      const token = getAccessToken();

      if (!token) {
        toast.error("You are not authenticated. Please log in again.");
        return;
      }

      const { oldPassword, newPassword } = data;

      await changePassword({ oldPassword, newPassword }, token);

      // Show success state
      setSuccess(true);
      toast.success("Password changed successfully!");

      setTimeout(() => {
        form.reset();
        setSuccess(false);
      }, 5000);
    } catch (err: any) {
      toast.error(
        err.message || "Failed to change password. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Password match indicator
  const passwordsMatch =
    watchNewPassword &&
    watchConfirmPassword &&
    watchNewPassword === watchConfirmPassword;

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!success ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column - Password Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="lg:col-span-7"
              >
                <Card className=" border-blue-100">
                  <CardContent className="pt-6">
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-5"
                      >
                        {/* Current Password */}
                        <FormField
                          control={form.control}
                          name="oldPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 font-medium">
                                Current Password
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <motion.div
                                    animate={
                                      activeField === "oldPassword"
                                        ? {
                                            scale: [1, 1.1, 1],
                                            rotate: [0, -5, 0],
                                          }
                                        : { scale: 1, rotate: 0 }
                                    }
                                    transition={{ duration: 0.3 }}
                                    className="absolute left-3 top-3 z-10"
                                  >
                                    <Lock className="h-5 w-5 text-gray-400" />
                                  </motion.div>
                                  <Input
                                    {...field}
                                    type={showOldPassword ? "text" : "password"}
                                    placeholder="Enter your current password"
                                    className="pl-11 pr-11 py-6 bg-gray-50 border-gray-200 focus:bg-white rounded-xl transition-all duration-300 focus:shadow-[0_0_0_2px_rgba(59,130,246,0.3)]"
                                    onFocus={() =>
                                      setActiveField("oldPassword")
                                    }
                                    onBlur={() => setActiveField(null)}
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() =>
                                      setShowOldPassword(!showOldPassword)
                                    }
                                    className="absolute right-2 top-2 h-8 w-8 text-gray-500 hover:text-gray-700 transition-colors"
                                    aria-label={
                                      showOldPassword
                                        ? "Hide password"
                                        : "Show password"
                                    }
                                  >
                                    <motion.div
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.95 }}
                                      transition={{ duration: 0.2 }}
                                    >
                                      {showOldPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                      ) : (
                                        <Eye className="h-5 w-5" />
                                      )}
                                    </motion.div>
                                  </Button>
                                </div>
                              </FormControl>
                              <FormMessage className="text-red-500 flex items-center gap-1 mt-1.5 text-sm">
                                {formState.errors.oldPassword && (
                                  <AlertCircle className="h-3.5 w-3.5 text-red-500" />
                                )}
                                {formState.errors.oldPassword?.message}
                              </FormMessage>
                            </FormItem>
                          )}
                        />

                        {/* New Password */}
                        <FormField
                          control={form.control}
                          name="newPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 font-medium flex items-center justify-between">
                                <span>New Password</span>
                                {watchNewPassword && (
                                  <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex items-center gap-1 text-xs font-normal"
                                  >
                                    {getPasswordStrengthIcon()}
                                    <span
                                      className={`${
                                        passwordStrength <= 20
                                          ? "text-red-500"
                                          : passwordStrength <= 40
                                          ? "text-orange-500"
                                          : passwordStrength <= 60
                                          ? "text-yellow-600"
                                          : passwordStrength <= 80
                                          ? "text-blue-600"
                                          : "text-green-600"
                                      }`}
                                    >
                                      {passwordStrength <= 20
                                        ? "Very Weak"
                                        : passwordStrength <= 40
                                        ? "Weak"
                                        : passwordStrength <= 60
                                        ? "Fair"
                                        : passwordStrength <= 80
                                        ? "Good"
                                        : "Strong"}
                                    </span>
                                  </motion.div>
                                )}
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <motion.div
                                    animate={
                                      activeField === "newPassword"
                                        ? {
                                            scale: [1, 1.1, 1],
                                            rotate: [0, -5, 0],
                                          }
                                        : { scale: 1, rotate: 0 }
                                    }
                                    transition={{ duration: 0.3 }}
                                    className="absolute left-3 top-3 z-10"
                                  >
                                    <Lock className="h-5 w-5 text-gray-400" />
                                  </motion.div>
                                  <Input
                                    {...field}
                                    type={showNewPassword ? "text" : "password"}
                                    placeholder="Create a new password"
                                    className="pl-11 pr-11 py-6 bg-gray-50 border-gray-200 focus:bg-white rounded-xl transition-all duration-300 focus:shadow-[0_0_0_2px_rgba(59,130,246,0.3)]"
                                    onFocus={() =>
                                      setActiveField("newPassword")
                                    }
                                    onBlur={() => setActiveField(null)}
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() =>
                                      setShowNewPassword(!showNewPassword)
                                    }
                                    className="absolute right-2 top-2 h-8 w-8 text-gray-500 hover:text-gray-700 transition-colors"
                                    aria-label={
                                      showNewPassword
                                        ? "Hide password"
                                        : "Show password"
                                    }
                                  >
                                    <motion.div
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.95 }}
                                      transition={{ duration: 0.2 }}
                                    >
                                      {showNewPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                      ) : (
                                        <Eye className="h-5 w-5" />
                                      )}
                                    </motion.div>
                                  </Button>
                                </div>
                              </FormControl>

                              {watchNewPassword && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  transition={{ duration: 0.3 }}
                                  className="mt-3 overflow-hidden"
                                >
                                  <PasswordStrengthMeter
                                    strength={passwordStrength}
                                  />
                                </motion.div>
                              )}

                              <FormMessage className="text-red-500 flex items-center gap-1 mt-1.5 text-sm">
                                {formState.errors.newPassword && (
                                  <AlertCircle className="h-3.5 w-3.5 text-red-500" />
                                )}
                                {formState.errors.newPassword?.message}
                              </FormMessage>
                            </FormItem>
                          )}
                        />

                        {/* Confirm Password */}
                        <FormField
                          control={form.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 font-medium flex items-center justify-between">
                                <span>Confirm New Password</span>
                                {watchConfirmPassword && watchNewPassword && (
                                  <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex items-center gap-1 text-xs font-normal"
                                  >
                                    {passwordsMatch ? (
                                      <>
                                        <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                                        <span className="text-green-600">
                                          Passwords match
                                        </span>
                                      </>
                                    ) : (
                                      <>
                                        <AlertCircle className="h-3.5 w-3.5 text-red-500" />
                                        <span className="text-red-500">
                                          Passwords don't match
                                        </span>
                                      </>
                                    )}
                                  </motion.div>
                                )}
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <motion.div
                                    animate={
                                      activeField === "confirmPassword"
                                        ? {
                                            scale: [1, 1.1, 1],
                                            rotate: [0, -5, 0],
                                          }
                                        : { scale: 1, rotate: 0 }
                                    }
                                    transition={{ duration: 0.3 }}
                                    className="absolute left-3 top-3 z-10"
                                  >
                                    <Lock className="h-5 w-5 text-gray-400" />
                                  </motion.div>
                                  <Input
                                    {...field}
                                    type={
                                      showConfirmPassword ? "text" : "password"
                                    }
                                    placeholder="Confirm your new password"
                                    className={`pl-11 pr-11 py-6 bg-gray-50 border-gray-200 focus:bg-white rounded-xl transition-all duration-300 focus:shadow-[0_0_0_2px_rgba(59,130,246,0.3)] ${
                                      watchConfirmPassword && watchNewPassword
                                        ? passwordsMatch
                                          ? "border-green-300 focus:border-green-400 focus:shadow-[0_0_0_2px_rgba(74,222,128,0.3)]"
                                          : "border-red-300 focus:border-red-400 focus:shadow-[0_0_0_2px_rgba(248,113,113,0.3)]"
                                        : ""
                                    }`}
                                    onFocus={() =>
                                      setActiveField("confirmPassword")
                                    }
                                    onBlur={() => setActiveField(null)}
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() =>
                                      setShowConfirmPassword(
                                        !showConfirmPassword
                                      )
                                    }
                                    className="absolute right-2 top-2 h-8 w-8 text-gray-500 hover:text-gray-700 transition-colors"
                                    aria-label={
                                      showConfirmPassword
                                        ? "Hide password"
                                        : "Show password"
                                    }
                                  >
                                    <motion.div
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.95 }}
                                      transition={{ duration: 0.2 }}
                                    >
                                      {showConfirmPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                      ) : (
                                        <Eye className="h-5 w-5" />
                                      )}
                                    </motion.div>
                                  </Button>
                                </div>
                              </FormControl>
                              <FormMessage className="text-red-500 flex items-center gap-1 mt-1.5 text-sm">
                                {formState.errors.confirmPassword && (
                                  <AlertCircle className="h-3.5 w-3.5 text-red-500" />
                                )}
                                {formState.errors.confirmPassword?.message}
                              </FormMessage>
                            </FormItem>
                          )}
                        />

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.9 }}
                          className="pt-2"
                        >
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Button
                              className="w-full h-12 font-medium text-white nextButton "
                              type="submit"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  className="flex items-center"
                                >
                                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                  Updating...
                                </motion.div>
                              ) : (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  className="flex items-center justify-center"
                                >
                                  {/* <LogIn className="w-4 h-4 mr-2" /> */}
                                 Update password
                                </motion.div>
                              )}
                            </Button>

                            {/* <Button
                              type="submit"
                              className="w-full py-6 w-full h-12 font-medium text-white nextButton "
                              disabled={isSubmitting || !form.formState.isValid}
                            >
                              {isSubmitting ? (
                              <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="flex items-center"
                            >
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Signing in...
                            </motion.div>
                              ) : (
                                <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center justify-center"
                      >
                        {/* <LogIn className="w-4 h-4 mr-2" /> */}
                            {/* updating
                      </motion.div>
                              )}
                            </Button> */}
                          </motion.div>
                        </motion.div>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Right Column - Guidance and Support */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="lg:col-span-5"
              >
                <div className="space-y-6">
                  {/* Password Requirements */}
                  <Card className=" border-blue-100">
                    <CardContent className="pt-2">
                      <div className="flex items-center gap-2 mb-4">
                        {/* <Shield className="h-5 w-5 text-blue-600" />
                        <h3 className="text-lg font-medium text-gray-800">
                          Password Requirements
                        </h3> */}
                      </div>
                      <PasswordRequirements password={watchNewPassword} />
                    </CardContent>
                  </Card>

                  {/* Password Tips */}
                  <Card className=" border-blue-100">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Info className="h-5 w-5 text-blue-600" />
                        <h3 className="text-lg font-medium text-gray-800">
                          Password Tips
                        </h3>
                      </div>
                      <PasswordTips />
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <SuccessAnimation />
        )}
      </AnimatePresence>
    </div>
  );
}
