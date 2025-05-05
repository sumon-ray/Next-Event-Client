"use client";

import type { IUser } from "@/app/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/context/UserContext";
import { loginUser } from "@/services/AuthService";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";
import {
  AtSign,
  Eye,
  EyeOff,
  Facebook,
  Github,
  Loader2,
  Lock,
  LogIn,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { loginSchema } from "./loginValidation";
import Image from "next/image";

const LoginForm = () => {
  const { setUser } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const {
    formState: { isSubmitting },

    watch,
  } = form;

  const watchEmail = watch("email");
  const watchPassword = watch("password");

  // Clear login error when user types
  useEffect(() => {
    if (loginError && (watchEmail || watchPassword)) {
      setLoginError("");
    }
  }, [watchEmail, watchPassword, loginError]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    setLoginError("");

    try {
      const res = await loginUser(data);

      if (res?.success) {
        const token = res.data.accessToken;
        if (token) {
          if (data.rememberMe) {
            localStorage.setItem("accessToken", token);
          } else {
            sessionStorage.setItem("accessToken", token);
          }
          const decoded = jwtDecode<IUser>(token);
          setUser(decoded);
        }

        toast.success(res?.message || "Login successful!");

        // Redirect after a short delay for better UX
        setTimeout(() => {
          if (redirect) {
            router.push(redirect);
          } else {
            router.push("/");
          }
        }, 500);
      } else {
        setLoginError(res?.message || "Invalid email or password");
        toast.error(res?.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      setLoginError(error.message || "An unexpected error occurred");
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast.info(`${provider} login coming soon!`);
  };

  return (
    <div className=" w-full max-h-full flex items-center justify-center p-4">
      <div className="w-full max-w-7xl  border-0 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left side - Welcome section */}
     
          <div className="w-full md:w-1/2 hidden md:flex  p-8 md:p-12 text-white relative overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative z-10  h-full"
            >
                        <Image 
            src="/images/login.jpg"
            width={600}
            height={600}
            alt="Forget Password"
            className="h-full"
          />
             
            </motion.div>

            {/* Decorative elements */}
            {/* <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-blue-500/30 rounded-full blur-xl"></div>
            <div className="absolute top-1/4 -right-8 w-40 h-40 bg-indigo-500/20 rounded-full blur-xl"></div>
            <div className="absolute bottom-1/3 left-1/4 w-32 h-32 bg-blue-400/20 rounded-full blur-lg"></div> */}
          </div>

          {/* Right side - Login form */}
          <div className="w-full md:w-1/2  md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-md mx-auto"
            >
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Sign in to your account
                </h2>
                <p className="text-gray-500">
                  Enter your credentials to access your account
                </p>
              </div>

              {/* Social login options */}
              <div className="flex flex-col space-y-4 mb-6">
                <div className="flex justify-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full w-10 h-10"
                    onClick={() => handleSocialLogin("Facebook")}
                  >
                    <Facebook className="h-5 w-5 text-blue-600" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full w-10 h-10"
                    onClick={() => handleSocialLogin("Google")}
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27c3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10c5.35 0 9.25-3.67 9.25-9.09c0-1.15-.15-1.81-.15-1.81Z"
                      />
                    </svg>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full w-10 h-10"
                    onClick={() => handleSocialLogin("Github")}
                  >
                    <Github className="h-5 w-5" />
                  </Button>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-2 text-xs text-gray-500">
                      or continue with email
                    </span>
                  </div>
                </div>
              </div>

              {loginError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-md"
                >
                  {loginError}
                </motion.div>
              )}

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  {/* Email Field */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <AtSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              type="email"
                              className="pl-10 h-12 bg-gray-50 border-gray-200 focus:bg-white"
                              placeholder="you@example.com"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Password Field */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex justify-between items-center">
                          <FormLabel>Password</FormLabel>
                          <Link
                            href="/forget-password"
                            className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
                          >
                            Forgot password?
                          </Link>
                        </div>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              type={showPassword ? "text" : "password"}
                              className="pl-10 pr-10 h-12 bg-gray-50 border-gray-200 focus:bg-white"
                              placeholder="••••••••"
                              {...field}
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Remember me */}
                  <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-normal">
                            Remember me for 30 days
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  {/* Sign in button */}
                  <Button
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                    type="submit"
                    disabled={isSubmitting || isLoading}
                  >
                    {isSubmitting || isLoading ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center"
                      >
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center justify-center"
                      >
                        <LogIn className="mr-2 h-4 w-4" />
                        Sign in
                      </motion.div>
                    )}
                  </Button>
                </form>
              </Form>

              {/* Sign up link */}
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    href="/register"
                    className="text-blue-600 font-medium hover:underline"
                  >
                    Create an account
                  </Link>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
