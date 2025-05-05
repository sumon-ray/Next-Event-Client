"use client"

import { getAccessToken } from "@/app/utils/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { changePassword } from "@/services/AuthService"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion, AnimatePresence } from "framer-motion"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Eye, EyeOff, Lock, CheckCircle, AlertCircle, ShieldCheck } from "lucide-react"
import { toast } from "sonner"

// Password validation schema
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
  })

type FormData = z.infer<typeof passwordSchema>

export default function ChangePasswordForm() {
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  const watchNewPassword = form.watch("newPassword")

  // Calculate password strength
  useEffect(() => {
    if (!watchNewPassword) {
      setPasswordStrength(0)
      return
    }

    let strength = 0

    // Length check
    if (watchNewPassword.length >= 8) strength += 25

    // Uppercase check
    if (/[A-Z]/.test(watchNewPassword)) strength += 25

    // Lowercase check
    if (/[a-z]/.test(watchNewPassword)) strength += 25

    // Number check
    if (/[0-9]/.test(watchNewPassword)) strength += 25

    setPasswordStrength(strength)
  }, [watchNewPassword])

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 25) return "Weak"
    if (passwordStrength <= 50) return "Fair"
    if (passwordStrength <= 75) return "Good"
    return "Strong"
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 25) return "bg-red-500"
    if (passwordStrength <= 50) return "bg-orange-500"
    if (passwordStrength <= 75) return "bg-yellow-500"
    return "bg-green-500"
  }

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true)
      const token = getAccessToken()

      if (!token) {
        toast.error("You are not authenticated. Please log in again.")
        return
      }

      // Extract the data we need to send to the API
      const { oldPassword, newPassword } = data

      await changePassword({ oldPassword, newPassword }, token)

      // Show success state
      setSuccess(true)
      toast.success("Password changed successfully!")

      // Reset form after a delay
      setTimeout(() => {
        form.reset()
        setSuccess(false)
      }, 3000)
    } catch (err) {
      toast.error(err.message || "Failed to change password. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Side - Illustration with gradient */}
      <div className="md:w-1/2 w-full h-64 md:h-auto bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=20&width=20')] opacity-5"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 p-8 max-w-md"
        >
          <div className="mb-8 flex justify-center">
            <div className="p-4 bg-blue-600 rounded-full shadow-lg">
              <ShieldCheck className="h-12 w-12 text-white" />
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">Secure Your Account</h2>

          <p className="text-gray-600 text-center mb-8">
            Regularly updating your password helps protect your account and personal information from unauthorized
            access.
          </p>

          <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
            <h3 className="font-medium text-gray-800 flex items-center">
              <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
              Password Best Practices
            </h3>

            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start">
                <div className="h-5 w-5 flex-shrink-0 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-2">
                  <span className="text-xs">1</span>
                </div>
                <span>Use a unique password for each of your important accounts</span>
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 flex-shrink-0 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-2">
                  <span className="text-xs">2</span>
                </div>
                <span>Use a mix of letters, numbers, and symbols</span>
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 flex-shrink-0 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-2">
                  <span className="text-xs">3</span>
                </div>
                <span>Avoid using easily guessable information</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 flex justify-center">
            {/* <Image
              src="/images/pass.svg"
              width={300}
              height={200}
              alt="Security Illustration"
              className="max-w-full h-auto"
              priority
            /> */}
          </div>
        </motion.div>
      </div>

      {/* Right Side - Form */}
      <div className="md:w-1/2 w-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 px-6 py-12">
        <AnimatePresence mode="wait">
          {!success ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-md"
            >
              <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl">
                <div className="mb-8">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Change Password</h1>
                  <p className="text-gray-500">Update your password to keep your account secure</p>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Current Password */}
                    <FormField
                      control={form.control}
                      name="oldPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Current Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input
                                {...field}
                                type={showOldPassword ? "text" : "password"}
                                placeholder="Enter your current password"
                                className="pl-10 pr-10 h-12 bg-gray-50 border-gray-200 focus:bg-white"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => setShowOldPassword(!showOldPassword)}
                                className="absolute right-2 top-2 h-8 w-8 text-gray-500"
                              >
                                {showOldPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* New Password */}
                    <FormField
                      control={form.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">New Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input
                                {...field}
                                type={showNewPassword ? "text" : "password"}
                                placeholder="Create a new password"
                                className="pl-10 pr-10 h-12 bg-gray-50 border-gray-200 focus:bg-white"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute right-2 top-2 h-8 w-8 text-gray-500"
                              >
                                {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                            </div>
                          </FormControl>

                          {watchNewPassword && (
                            <div className="mt-2 space-y-1">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-gray-500">Password strength:</span>
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

                    {/* Confirm Password */}
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Confirm New Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input
                                {...field}
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm your new password"
                                className="pl-10 pr-10 h-12 bg-gray-50 border-gray-200 focus:bg-white"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-2 top-2 h-8 w-8 text-gray-500"
                              >
                                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Password requirements */}
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-blue-800 mb-2 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-2" />
                        Password Requirements
                      </h4>
                      <ul className="space-y-1 text-xs text-blue-700">
                        <li
                          className={`flex items-center ${/^.{8,}$/.test(watchNewPassword || "") ? "text-green-600" : ""}`}
                        >
                          <div className="h-1 w-1 bg-current rounded-full mr-2"></div>
                          At least 8 characters
                        </li>
                        <li
                          className={`flex items-center ${/[A-Z]/.test(watchNewPassword || "") ? "text-green-600" : ""}`}
                        >
                          <div className="h-1 w-1 bg-current rounded-full mr-2"></div>
                          At least one uppercase letter
                        </li>
                        <li
                          className={`flex items-center ${/[a-z]/.test(watchNewPassword || "") ? "text-green-600" : ""}`}
                        >
                          <div className="h-1 w-1 bg-current rounded-full mr-2"></div>
                          At least one lowercase letter
                        </li>
                        <li
                          className={`flex items-center ${/[0-9]/.test(watchNewPassword || "") ? "text-green-600" : ""}`}
                        >
                          <div className="h-1 w-1 bg-current rounded-full mr-2"></div>
                          At least one number
                        </li>
                      </ul>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Updating Password...
                        </div>
                      ) : (
                        "Update Password"
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md bg-white p-8 md:p-10 rounded-2xl shadow-xl text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="bg-green-100 rounded-full p-6">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Password Updated!</h2>
              <p className="text-gray-500 mb-8">
                Your password has been changed successfully. Your account is now secure.
              </p>
              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-green-500"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3 }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
