"use client";

import { forgotPasswordSchema, type ForgotPasswordType } from "@/app/types";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ForgetPassword } from "@/services/AuthService";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Loader2, Mail, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<"request" | "success">("request");
  const [userEmail, setUserEmail] = useState("");

  const form = useForm<ForgotPasswordType>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: ForgotPasswordType) => {
    try {
      await ForgetPassword(data);
      setUserEmail(data.email);
      toast.success("Reset link sent successfully!");
      setStep("success");
    } catch (err) {
      toast.error(err.message || "Failed to send reset link");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-12">
      <Card className="max-w-4xl w-full shadow-xl border-0 overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Left Section - Illustration with Overlay */}
          <Image
            src="/images/forget.jpg"
            width={500}
            height={500}
            alt="Forget Password"
          />

          {/* Right Section - Form */}
          <div className="p-6 md:p-10">
            <AnimatePresence mode="wait">
              {step === "request" ? (
                <motion.div
                  key="request"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-8">
                    <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                      Forgot your password?
                    </CardTitle>
                    <CardDescription className="text-gray-500">
                      Enter your email address and we will send you a link to
                      reset your password.
                    </CardDescription>
                  </div>

                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                  placeholder="you@example.com"
                                  className="pl-10 h-12"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Send Reset Link
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>

                  <div className="mt-8 text-center">
                    <Link
                      href="/login"
                      className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to login
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center text-center py-6"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>

                  <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                    Check your email
                  </CardTitle>
                  <CardDescription className="text-gray-500 mb-6 max-w-xs">
                    We have sent a password reset link to:
                    <div className="font-medium text-gray-900 mt-2">
                      {userEmail}
                    </div>
                  </CardDescription>

                  <div className="bg-gray-50 rounded-lg p-4 w-full mb-6">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">
                        Did not receive the email?
                      </span>{" "}
                      Check your spam folder or
                      <Button
                        variant="link"
                        className="px-1 h-auto text-blue-600"
                        onClick={() => setStep("request")}
                      >
                        try again
                      </Button>
                      with a different email address.
                    </p>
                  </div>

                  <Link href="/login">
                    <Button variant="outline" className="h-12">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Return to login
                    </Button>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Card>
    </div>
  );
}
