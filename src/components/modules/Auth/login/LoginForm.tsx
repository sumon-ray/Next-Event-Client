"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { loginUser } from "@/services/AuthService"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderIcon, User, Lock } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"
import { loginSchema } from "./loginValidation"

const LoginForm = () => {
  // Add missing state variables
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirectPath")
  const form = useForm({ resolver: zodResolver(loginSchema) })
  const {
    formState: { isSubmitting },
  } = form

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await loginUser(data)
      //   console.log(res)
      if (res?.success) {
        toast.success(res?.message)
        if (redirect) {
          router.push(redirect)
        } else {
          router.push("/")
        }
      } else {
        toast.error(res?.message)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div 
    // style={{
    //     backgroundImage: "url('/banner1.png')",
    //     backgroundSize: "cover",
    //     backgroundPosition: "center",
    //     position: "relative",
    //   }}
    className="min-h-screen  w-full bg-gradient-to-b from-blue-500 to-blue-800 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left side - Blue welcome section */}
        <div className="w-full md:w-1/2 bg-blue-500 p-10 text-white relative">
          <div className="relative z-10">
            <h1 className="text-4xl font-bold mt-16 mb-2">WELCOME</h1>
            <h2 className="text-xl font-semibold mb-4">YOUR HEADLINE NAME</h2>
            <p className="text-sm opacity-90 mb-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
            <p className="text-sm opacity-90">
              Ut enim ad minim veniam, quis nostrud exercitation ut labore space magna aliquip ex ea commodo. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>

          {/* Decorative circles */}
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-600 rounded-full opacity-70 transform translate-y-1/2 -translate-x-1/4"></div>
          <div className="absolute bottom-1/3 left-1/3 w-32 h-32 bg-blue-600 rounded-full opacity-70"></div>
        </div>

        {/* Right side - Sign in form */}
        <div className="w-full md:w-1/2 bg-white p-10 relative">
          <div className="max-w-sm mx-auto pt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Sign in</h2>
            <p className="text-sm text-gray-500 mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                          </div>
                          <Input type="email" className="bg-gray-100 pl-10" {...field} />
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
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                          </div>
                          <Input
                            type={showPassword ? "text" : "password"}
                            className="bg-gray-100 pl-10 pr-16"
                            {...field}
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-3 flex items-center text-gray-700 font-semibold text-sm"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            SHOW
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Remember me and forgot password */}
                <div className="flex justify-between items-center">
                  <label className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                      className="rounded border-gray-300"
                    />
                    <span>Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-gray-600 hover:underline">
                    Forgot Password?
                  </a>
                </div>

                {/* Sign in button */}
                <Button
                  className="w-full bg-blue-800 hover:bg-blue-700 text-white py-6 h-12 rounded-md font-medium"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <LoaderIcon className="h-5 w-5 animate-spin" /> : "Sign in"}
                </Button>

                {/* Sign in with other */}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border border-gray-300 text-gray-700 py-6 h-12 rounded-md font-medium"
                >
                  Sign in with other
                </Button>

                {/* Sign up link */}
                <p className="text-center mt-2 text-sm">
                  <span className="text-gray-600">Do not have an account?</span>{" "}
                  <span className="text-blue-800 font-medium hover:underline">
                    <Link href="/register">Sign Up</Link>
                  </span>
                </p>
              </form>
            </Form>
          </div>

          {/* Decorative circle */}
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500 rounded-full opacity-70 transform translate-y-1/2 translate-x-1/4"></div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
