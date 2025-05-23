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
import Title from "@/components/shared/Title";

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
    mode: "onChange",
  });

  const watchNewPassword = form.watch("newPassword");
  const watchConfirmPassword = form.watch("confirmPassword");
  const formState = form.formState;

  useEffect(() => {
    if (!watchNewPassword) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;
    if (watchNewPassword.length >= 8) strength += 20;
    if (/[A-Z]/.test(watchNewPassword)) strength += 20;
    if (/[a-z]/.test(watchNewPassword)) strength += 20;
    if (/[0-9]/.test(watchNewPassword)) strength += 20;
    if (/[^A-Za-z0-9]/.test(watchNewPassword)) strength += 20;

    setPasswordStrength(strength);
  }, [watchNewPassword]);

  const getPasswordStrengthIcon = () => {
    if (passwordStrength <= 20) return <ShieldX className="w-5 h-5 text-red-500" />;
    if (passwordStrength <= 40) return <ShieldAlert className="w-5 h-5 text-orange-500" />;
    if (passwordStrength <= 60) return <Shield className="w-5 h-5 text-yellow-500" />;
    if (passwordStrength <= 80) return <Shield className="w-5 h-5 text-blue-500" />;
    return <ShieldCheck className="w-5 h-5 text-green-500" />;
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

      setSuccess(true);
      toast.success("Password changed successfully!");

      setTimeout(() => {
        form.reset();
        setSuccess(false);
      }, 5000);
    } catch (err: any) {
      toast.error(err.message || "Failed to change password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const passwordsMatch =
    watchNewPassword &&
    watchConfirmPassword &&
    watchNewPassword === watchConfirmPassword;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }} 
      className="pt-12 md:px-0"
    >
      <div className="mx-auto">
        <div className="mb-8">
          <Title title="Change Password" />
          <p className="text-[#475569]">Update your account password securely</p>
        </div>

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
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
             
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="lg:col-span-7"
                >
                   
                  <Card className="border-[#BBDEFB]">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 mb-4">
                        <ShieldCheck className="h-5 w-5 text-[#1E3A8A]" />
                        <h3 className="text-lg font-medium text-[#1E3A8A]">
                          Security Recommendations
                        </h3>
                      </div>
                      <ul className="space-y-3 text-sm text-[#475569]">
                        <li className="flex items-start gap-2">
                          <span className="text-[#1E3A8A]">•</span>
                          <span>Use a unique password for each account</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#1E3A8A]">•</span>
                          <span>Consider using a password manager</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#1E3A8A]">•</span>
                          <span>Enable two-factor authentication for added security</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#1E3A8A]">•</span>
                          <span>Change your password every 3-6 months</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#1E3A8A]">•</span>
                          <span>Never share your password with anyone</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card className="border-[#BBDEFB] mt-6">
                    <CardContent className="pt-6">
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
               
                          <FormField
                            control={form.control}
                            name="oldPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-[#475569] font-medium">
                                  Current Password
                                </FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <div className="absolute z-10 left-3 top-3">
                                      <Lock className="h-5 w-5 text-[#1E3A8A]" />
                                    </div>
                                    <Input
                                      {...field}
                                      type={showOldPassword ? "text" : "password"}
                                      placeholder="Enter your current password"
                                      className="pl-11 pr-11 py-6 bg-white border-[#BBDEFB] focus:border-[#1E3A8A] rounded-lg"
                                      onFocus={() => setActiveField("oldPassword")}
                                      onBlur={() => setActiveField(null)}
                                    />
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => setShowOldPassword(!showOldPassword)}
                                      className="absolute right-2 top-2 h-8 w-8 text-[#475569] hover:text-[#1E3A8A]"
                                      aria-label={
                                        showOldPassword ? "Hide password" : "Show password"
                                      }
                                    >
                                      {showOldPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                      ) : (
                                        <Eye className="w-5 h-5" />
                                      )}
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

                      
                          <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-[#475569] font-medium flex items-center justify-between">
                                  <span>New Password</span>
                                  {watchNewPassword && (
                                    <div className="flex items-center gap-1 text-xs font-normal">
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
                                    </div>
                                  )}
                                </FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <div className="absolute z-10 left-3 top-3">
                                      <Lock className="h-5 w-5 text-[#1E3A8A]" />
                                    </div>
                                    <Input
                                      {...field}
                                      type={showNewPassword ? "text" : "password"}
                                      placeholder="Create a new password"
                                      className="pl-11 pr-11 py-6 bg-white border-[#BBDEFB] focus:border-[#1E3A8A] rounded-lg"
                                      onFocus={() => setActiveField("newPassword")}
                                      onBlur={() => setActiveField(null)}
                                    />
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => setShowNewPassword(!showNewPassword)}
                                      className="absolute right-2 top-2 h-8 w-8 text-[#475569] hover:text-[#1E3A8A]"
                                      aria-label={
                                        showNewPassword ? "Hide password" : "Show password"
                                      }
                                    >
                                      {showNewPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                      ) : (
                                        <Eye className="w-5 h-5" />
                                      )}
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

                  
                          <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-[#475569] font-medium flex items-center justify-between">
                                  <span>Confirm New Password</span>
                                  {watchConfirmPassword && watchNewPassword && (
                                    <div className="flex items-center gap-1 text-xs font-normal">
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
                                            Passwords do not match
                                          </span>
                                        </>
                                      )}
                                    </div>
                                  )}
                                </FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <div className="absolute z-10 left-3 top-3">
                                      <Lock className="h-5 w-5 text-[#1E3A8A]" />
                                    </div>
                                    <Input
                                      {...field}
                                      type={showConfirmPassword ? "text" : "password"}
                                      placeholder="Confirm your new password"
                                      className={`pl-11 pr-11 py-6 bg-white border-[#BBDEFB] focus:border-[#1E3A8A] rounded-lg ${
                                        watchConfirmPassword && watchNewPassword
                                          ? passwordsMatch
                                            ? "border-green-300 focus:border-green-400"
                                            : "border-red-300 focus:border-red-400"
                                          : ""
                                      }`}
                                      onFocus={() => setActiveField("confirmPassword")}
                                      onBlur={() => setActiveField(null)}
                                    />
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="icon"
                                      onClick={() =>
                                        setShowConfirmPassword(!showConfirmPassword)
                                      }
                                      className="absolute right-2 top-2 h-8 w-8 text-[#475569] hover:text-[#1E3A8A]"
                                      aria-label={
                                        showConfirmPassword
                                          ? "Hide password"
                                          : "Show password"
                                      }
                                    >
                                      {showConfirmPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                      ) : (
                                        <Eye className="w-5 h-5" />
                                      )}
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
                            <Button
                              className="w-full h-12 font-medium text-white nextButton"
                              type="submit"
                              disabled={isSubmitting || !form.formState.isValid}
                            >
                              {isSubmitting ? (
                                <div className="flex items-center">
                                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                  Updating...
                                </div>
                              ) : (
                                "Update Password"
                              )}
                            </Button>
                          </motion.div>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                </motion.div>

               
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="space-y-6 lg:col-span-5"
                >
                
                  <Card className="border-[#BBDEFB]">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Shield className="h-5 w-5 text-[#1E3A8A]" />
                        <h3 className="text-lg font-medium text-[#1E3A8A]">
                          Password Requirements
                        </h3>
                      </div>
                      <PasswordRequirements password={watchNewPassword} />
                    </CardContent>
                  </Card>

                
                  <Card className="border-[#BBDEFB]">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Info className="h-5 w-5 text-[#1E3A8A]" />
                        <h3 className="text-lg font-medium text-[#1E3A8A]">
                          Password Tips
                        </h3>
                      </div>
                      <PasswordTips />
                    </CardContent>
                  </Card>

                 
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <div className="flex items-center justify-center h-full pt-12">
              <SuccessAnimation />
            </div>
          )}
          
        </AnimatePresence>
      </div>
    </motion.div>
  );
}