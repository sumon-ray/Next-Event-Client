"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import type { IUser } from "@/app/types"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useUser } from "@/context/UserContext"
import { registerUser } from "@/services/AuthService"
import { zodResolver } from "@hookform/resolvers/zod"
import { jwtDecode } from "jwt-decode"
import {
  AtSign,
  Briefcase,
  Check,
  Eye,
  EyeOff,
  Facebook,
  Github,
  Loader2,
  Lock,
  MapPin,
  Phone,
  Twitter,
  Upload,
  User,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"
import { formSchema } from "./registerValidation"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const RegisterForm = () => {
  const { setUser } = useUser()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("account")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      phoneNumber: "",
      gender: "",
      occupation: "",
      address: "",
      bio: "",
      file: undefined,
    },
  })

  const {
    reset,
    formState: { isSubmitting, isValid, dirtyFields },
    watch,
    trigger,
  } = form

  const password = watch("password")
  const allFields = watch()

  // Calculate form completion percentage
  const calculateCompletion = () => {
    const requiredFields = ["name", "email", "password", "passwordConfirm"]
    const optionalFields = ["phoneNumber", "gender", "occupation", "address", "bio", "file"]

    const requiredFilled = requiredFields.filter((field) => dirtyFields[field as keyof typeof dirtyFields]).length
    const optionalFilled = optionalFields.filter((field) => dirtyFields[field as keyof typeof dirtyFields]).length

    const requiredWeight = 0.7 // Required fields account for 70% of completion
    const optionalWeight = 0.3 // Optional fields account for 30% of completion

    const requiredCompletion = (requiredFilled / requiredFields.length) * requiredWeight
    const optionalCompletion = (optionalFilled / optionalFields.length) * optionalWeight

    return Math.round((requiredCompletion + optionalCompletion) * 100)
  }

  // Calculate password strength
  useEffect(() => {
    if (!password) {
      setPasswordStrength(0)
      return
    }

    let strength = 0

    // Length check
    if (password.length >= 8) strength += 25

    // Uppercase check
    if (/[A-Z]/.test(password)) strength += 25

    // Lowercase check
    if (/[a-z]/.test(password)) strength += 25

    // Number check
    if (/[0-9]/.test(password)) strength += 25

    setPasswordStrength(strength)
  }, [password])

  // Handle file upload and preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (...event: any[]) => void) => {
    const file = e.target.files?.[0]
    if (file) {
      onChange(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 25) return "bg-red-500"
    if (passwordStrength <= 50) return "bg-orange-500"
    if (passwordStrength <= 75) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 25) return "Weak"
    if (passwordStrength <= 50) return "Fair"
    if (passwordStrength <= 75) return "Good"
    return "Strong"
  }

  const handleTabChange = async (value: string) => {
    if (value === "personal" && activeTab === "account") {
      // Validate account fields before allowing tab change
      const isValid = await trigger(["name", "email", "password", "passwordConfirm"])
      if (!isValid) return
    }

    setActiveTab(value)
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await registerUser(data)

      if (res?.success) {
        const token = res.data.accessToken
        if (token) {
          localStorage.setItem("accessToken", token)
          const decoded = jwtDecode<IUser>(token)
          setUser(decoded)
        }

        toast.success("Registration successful! Welcome aboard.")
        router.push("/")
        reset()
      } else {
        toast.error(res?.message || "Registration failed")
      }
    } catch (error) {
      console.error("Error:", error)
      toast.error("Something went wrong!")
    }
  }

  const completion = calculateCompletion()

  return (
    <div className="flex w-full min-h-screen items-center justify-center  px-4 ">
      <Card className="w-full max-w-6xl shadow-xl border-0 overflow-hidden ">
        <div className="flex flex-col md:flex-row ">
          {/* Left Panel - Hidden on mobile */}
          <div    style={{
    backgroundImage: "url('/images/meeting1.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "auto",
  }}
 className="hidden  md:block md:w-5/12 lg:w-1/2 relative bg-gradient-to-l  text-white">
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-10"></div>
            
            <div className="absolute inset-0 z-20 flex flex-col justify-between p-10">
              <div>
                <h2 className="text-3xl font-bold">Join our community</h2>
                <p className="mt-4 text-white/80 max-w-md">
                  Create an account to access exclusive features, personalized recommendations, and connect with other
                  members.
                </p>
              </div>

              <div className="space-y-6 mb-24">
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <Check className="h-5 w-5" />
                  </div>
                  <p>Access to premium content and resources</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <Check className="h-5 w-5" />
                  </div>
                  <p>Connect with like-minded professionals</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <Check className="h-5 w-5" />
                  </div>
                  <p>Personalized dashboard and notifications</p>
                </div>

                <div className="pt-6">
                  <p className="text-sm text-white/70">Already have an account?</p>
                  <Link
                    href="/login"
                    className="inline-block mt-2 text-white font-medium border-b-2 border-white/50 hover:border-white transition-colors"
                  >
                    Sign in to your account
                  </Link>
                </div>
              </div>
            </div>
            <Image
              src="/placeholder.svg?height=1080&width=720"
              alt="Registration"
              width={720}
              height={1080}
              className="object-cover h-full w-full mix-blend-overlay opacity-50"
              priority
            />
          </div>

          {/* Right Panel */}
          <div className="w-full md:w-7/12 lg:w-1/2 p-6 md:p-10 lg:pt-4 px-8">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
                  <p className="text-sm text-gray-500 mt-1">Fill in your details to get started</p>
                </div>
                <div className="hidden md:block">
                  <Badge
                    variant="outline"
                    className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1.5"
                  >
                    <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                    {completion}% Complete
                  </Badge>
                </div>
              </div>

              <div className="mt-4 mb-6">
                <Progress value={completion} className="h-1.5" />
              </div>

              {/* Mobile only - Sign in link */}
              <div className="md:hidden text-center mb-6">
                <p className="text-sm text-gray-500">
                  Already have an account?{" "}
                  <Link href="/login" className="text-blue-600 font-medium hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid grid-cols-2 mb-8">
                <TabsTrigger
                  value="account"
                  className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
                >
                  Account Details
                </TabsTrigger>
                <TabsTrigger
                  value="personal"
                  className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
                >
                  Personal Info
                </TabsTrigger>
              </TabsList>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <TabsContent value="account" className="space-y-5 mt-0">
                    {/* Social Login Options */}
                    <div className="flex flex-col space-y-4 mb-6">
                      <div className="flex justify-center gap-3">
                        <Button variant="outline" size="icon" className="rounded-full w-10 h-10">
                          <Facebook className="h-5 w-5 text-blue-600" />
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-full w-10 h-10">
                          <Github className="h-5 w-5" />
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-full w-10 h-10">
                          <Twitter className="h-5 w-5 text-sky-500" />
                        </Button>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <Separator />
                        </div>
                        <div className="relative flex justify-center">
                          <span className="bg-white px-2 text-xs text-gray-500">or continue with email</span>
                        </div>
                      </div>
                    </div>

                    {/* Name */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input
                                {...field}
                                value={field.value || ""}
                                placeholder="John Doe"
                                className="pl-10 h-12"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Email */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <AtSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input
                                {...field}
                                type="email"
                                value={field.value || ""}
                                placeholder="you@example.com"
                                className="pl-10 h-12"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Password */}
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input
                                {...field}
                                type={showPassword ? "text" : "password"}
                                value={field.value || ""}
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
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                            </div>
                          </FormControl>
                          {password && (
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
                      name="passwordConfirm"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input
                                {...field}
                                type={showConfirmPassword ? "text" : "password"}
                                value={field.value || ""}
                                placeholder="••••••••"
                                className="pl-10 pr-10 h-12"
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

                    <div className="pt-4">
                      <Button
                        type="button"
                        className="w-full h-12 bg-blue-600 hover:bg-blue-700"
                        onClick={() => handleTabChange("personal")}
                        disabled={
                          !form.formState.dirtyFields.name ||
                          !form.formState.dirtyFields.email ||
                          !form.formState.dirtyFields.password ||
                          !form.formState.dirtyFields.passwordConfirm
                        }
                      >
                        Continue to Personal Info
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="personal" className="space-y-5 mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Phone Number */}
                      <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input {...field} type="tel" placeholder="01XXXXXXXXX" className="pl-10 h-12" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Gender */}
                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gender</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-12">
                                  <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Male">Male</SelectItem>
                                <SelectItem value="Female">Female</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Occupation */}
                      <FormField
                        control={form.control}
                        name="occupation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Occupation</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Briefcase className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input {...field} placeholder="Developer, Student..." className="pl-10 h-12" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Address */}
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input {...field} placeholder="123 Main Street, Dhaka" className="pl-10 h-12" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Bio */}
                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Tell us a little about yourself"
                              className="min-h-[100px] resize-none"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Profile Image */}
                    <FormField
                      control={form.control}
                      name="file"
                      render={({ field: { value, onChange, ...fieldProps } }) => (
                        <FormItem>
                          <FormLabel>Profile Picture</FormLabel>
                          <FormControl>
                            <div className="flex items-center space-x-5">
                              <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center hover:bg-gray-50 transition cursor-pointer flex-1">
                                <Input
                                  {...fieldProps}
                                  id="profile-image"
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => handleFileChange(e, onChange)}
                                />
                                <label htmlFor="profile-image" className="cursor-pointer block">
                                  <div className="flex flex-col items-center justify-center py-3">
                                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                                    <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                                    <p className="text-xs text-gray-400 mt-1">SVG, PNG, JPG or GIF (max. 2MB)</p>
                                  </div>
                                </label>
                              </div>

                              {/* Preview */}
                              <div className="flex-shrink-0">
                                <Avatar className="h-20 w-20 border-2 border-gray-200">
                                  <AvatarImage src={previewImage || ""} />
                                  <AvatarFallback className="bg-blue-100 text-blue-800">
                                    {allFields.name ? allFields.name.substring(0, 2).toUpperCase() : "U"}
                                  </AvatarFallback>
                                </Avatar>
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex gap-4 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-1/2 h-12"
                        onClick={() => setActiveTab("account")}
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        className="w-1/2 h-12 bg-blue-600 hover:bg-blue-700"
                        disabled={!isValid || isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating Account...
                          </>
                        ) : (
                          "Complete Registration"
                        )}
                      </Button>
                    </div>
                  </TabsContent>
                </form>
              </Form>
            </Tabs>

            <div className="mt-8 text-center text-xs text-gray-500">
              By registering, you agree to our{" "}
              <Link href="/terms" className="text-blue-600 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default RegisterForm
