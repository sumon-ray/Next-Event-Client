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

import { loginSchema } from "./loginValidation"
import { toast } from "sonner"

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
    className="flex items-center justify-center w-full min-h-screen p-4 bg-gradient-to-b from-blue-500 to-blue-800">
      <div className="flex flex-col w-full max-w-4xl overflow-hidden bg-white shadow-2xl rounded-3xl md:flex-row">
        {/* Left side - Blue welcome section */}
        <div className="relative w-full p-10 text-white bg-blue-500 md:w-1/2">
          <div className="relative z-10">
            <h1 className="mt-16 mb-2 text-4xl font-bold">WELCOME</h1>
            <h2 className="mb-4 text-xl font-semibold">YOUR HEADLINE NAME</h2>
            <p className="mb-2 text-sm opacity-90">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
            <p className="text-sm opacity-90">
              Ut enim ad minim veniam, quis nostrud exercitation ut labore space magna aliquip ex ea commodo. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>

          <div className="absolute bottom-0 left-0 w-40 h-40 transform translate-y-1/2 bg-blue-600 rounded-full opacity-70 -translate-x-1/4"></div>
          <div className="absolute w-32 h-32 bg-blue-600 rounded-full bottom-1/3 left-1/3 opacity-70"></div>
        </div>

        <div className="relative w-full p-10 bg-white md:w-1/2">
          <div className="max-w-sm pt-8 mx-auto">
            <h2 className="mb-1 text-2xl font-bold text-gray-800">Sign in</h2>
            <p className="mb-6 text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>

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
                          <div className="absolute inset-y-0 flex items-center pointer-events-none left-3">
                            <User className="w-5 h-5 text-gray-400" />
                          </div>
                          <Input type="email" className="pl-10 bg-gray-100" {...field} />
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
                          <div className="absolute inset-y-0 flex items-center pointer-events-none left-3">
                            <Lock className="w-5 h-5 text-gray-400" />
                          </div>
                          <Input
                            type={showPassword ? "text" : "password"}
                            className="pl-10 pr-16 bg-gray-100"
                            {...field}
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 flex items-center text-sm font-semibold text-gray-700 right-3"
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
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                      className="border-gray-300 rounded"
                    />
                    <span>Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-gray-600 hover:underline">
                    Forgot Password?
                  </a>
                </div>

                {/* Sign in button */}
                <Button
                  className="w-full h-12 py-6 font-medium text-white bg-blue-800 rounded-md hover:bg-blue-700"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <LoaderIcon className="w-5 h-5 animate-spin" /> : "Sign in"}
                </Button>

                {/* Sign in with other */}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 py-6 font-medium text-gray-700 border border-gray-300 rounded-md"
                >
                  Sign in with other
                </Button>

                {/* Sign up link */}
                <p className="mt-2 text-sm text-center">
                  <span className="text-gray-600">Do not have an account?</span>{" "}
                  <span className="font-medium text-blue-800 hover:underline">
                    <Link href="/register">Sign Up</Link>
                  </span>
                </p>
              </form>
            </Form>
          </div>

          {/* Decorative circle */}
          <div className="absolute bottom-0 right-0 w-32 h-32 transform translate-y-1/2 bg-blue-500 rounded-full opacity-70 translate-x-1/4"></div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
