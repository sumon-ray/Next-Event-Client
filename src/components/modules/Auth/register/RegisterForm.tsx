"use client";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  // FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerUser } from "@/services/AuthService";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon } from "lucide-react";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { formSchema } from "./registerValidation";
const RegisterForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
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
    },
  });
  const {reset,
    formState: { isSubmitting},
    watch,
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await registerUser(data);
      if (res?.success) {
        toast.success("Registration successful");
        reset()
      } else {
        toast.error(res?.message || "Registration failed");
      }
    } catch (error) {
      toast.error(error?.message || "Server error");
      console.error("Error:", error);
    }
  };

  return (
    <div  className="flex w-full min-h-screen items-center justify-center bg-gray-100 px-4 py-8">
    <div className="flex max-w-6xl w-full shadow-lg rounded-2xl overflow-hidden bg-white">
      {/* Left Panel */}
      <div className="w-1/2 bg-[#1E40AF] text-white flex flex-col items-center justify-center p-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-sm mb-6">
            To keep connected with us please login with your personal info
          </p>
          <Link
            href="/login"
            className="border border-white px-6 py-2 rounded-full font-medium hover:bg-white hover:text-[#1E40AF] transition"
          >
            SIGN IN
          </Link>
        </div>
      </div>
  
      {/* Right Panel */}
      <div className="w-1/2 p-10 overflow-y-auto">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Create Account
          </h1>
          <div className="flex justify-center gap-4 mb-4">
            <button className="border rounded-full p-2 hover:bg-gray-100 transition">f</button>
            <button className="border rounded-full p-2 hover:bg-gray-100 transition">G+</button>
            <button className="border rounded-full p-2 hover:bg-gray-100 transition">in</button>
          </div>
          <p className="text-sm text-gray-500">or use your email for registration:</p>
        </div>
  
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} value={field.value || ""} placeholder="Full Name" />
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
                  <FormControl>
                    <Input {...field} type="email" value={field.value || ""} placeholder="you@example.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
  
            {/* Passwords */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} type="password" value={field.value || ""} placeholder="Password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passwordConfirm"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} type="password" value={field.value || ""} placeholder="Confirm Password" />
                    </FormControl>
                    {watch("password") !== watch("passwordConfirm") ? (
                      <FormMessage>Passwords do not match</FormMessage>
                    ) : (
                      <FormMessage />
                    )}
                  </FormItem>
                )}
              />
            </div>
  
            {/* Contact Info */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} type="tel" placeholder="01XXXXXXXXX" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
          <FormField
  control={form.control}
  name="gender"
  render={({ field }) => (
    <FormItem>
      <FormControl>
        <select
          {...field}
          className="w-full px-4 py-2 border rounded-md text-sm text-gray-700 focus:outline-none focus:ring-black focus:bg-none"
        >
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

            </div>
  
            {/* Occupation & Profile Image */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="occupation"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="Developer, Student..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField 
              
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormControl >
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const selectedFile = e.target.files?.[0];
                          field.onChange(selectedFile);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
  
            {/* Address */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="123 Main Street, Dhaka" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
  
            {/* Bio */}
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Tell us a little about yourself" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
  
            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-[#1E40AF] hover:bg-[#112a7c] text-white"
              disabled={watch("password") !== watch("passwordConfirm")}
            >
              {isSubmitting ? <LoaderIcon className="animate-spin" /> : "SIGN UP"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  </div>
  
  );
};

export default RegisterForm;
