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
      console.error(err)
      toast.error("Failed to send reset link");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gradient-to-br from-slate-50 to-slate-100">
      <Card className="w-full max-w-4xl overflow-hidden border-0 shadow-xl">
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
                    <CardTitle className="mb-2 text-2xl font-bold text-gray-900">
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
                                <Mail className="absolute w-4 h-4 text-gray-400 left-3 top-3" />
                                <Input
                                  placeholder="you@example.com"
                                  className="h-12 pl-10"
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
                        className="w-full h-12 text-white bg-blue-600 hover:bg-blue-700"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Send Reset Link
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>

                  <div className="mt-8 text-center">
                    <Link
                      href="/login"
                      className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
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
                  className="flex flex-col items-center py-6 text-center"
                >
                  <div className="flex items-center justify-center w-16 h-16 mb-6 bg-green-100 rounded-full">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>

                  <CardTitle className="mb-2 text-2xl font-bold text-gray-900">
                    Check your email
                  </CardTitle>
                  <CardDescription className="max-w-xs mb-6 text-gray-500">
                    We have sent a password reset link to:
                    <div className="mt-2 font-medium text-gray-900">
                      {userEmail}
                    </div>
                  </CardDescription>

                  <div className="w-full p-4 mb-6 rounded-lg bg-gray-50">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">
                        Did not receive the email?
                      </span>{" "}
                      Check your spam folder or
                      <Button
                        variant="link"
                        className="h-auto px-1 text-blue-600"
                        onClick={() => setStep("request")}
                      >
                        try again
                      </Button>
                      with a different email address.
                    </p>
                  </div>

                  <Link href="/login">
                    <Button variant="outline" className="h-12">
                      <ArrowLeft className="w-4 h-4 mr-2" />
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
