"use client";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
      profileImage: "",
      address: "",
      bio: "",
    },
  });
  const {
    formState: { isSubmitting },
    watch,
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log(data);

    try {
      const res = await registerUser(data);
      if (res?.success) {
        toast(res?.message);
      } else {
        toast("User registration failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="border border-gray-200 shadow-md rounded-2xl max-w-lg w-full mx-auto p-8 bg-white">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Create Your Account
        </h1>
        <p className="text-sm text-gray-500">
          Join us today and start your journey!
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Basic Info */}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                      placeholder="Full Name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                      value={field.value || ""}
                      placeholder="you@example.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        value={field.value || ""}
                        placeholder="••••••••"
                      />
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
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        value={field.value || ""}
                        placeholder="••••••••"
                      />
                    </FormControl>
                    {watch("passwordConfirm") &&
                    watch("password") !== watch("passwordConfirm") ? (
                      <FormMessage>Passwords do not match</FormMessage>
                    ) : (
                      <FormMessage />
                    )}
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Extra Profile Details */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      {...field}
                      value={field.value || ""}
                      placeholder="01XXXXXXXXX"
                    />
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
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                      placeholder="Male/Female/Other"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="occupation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Occupation</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                      placeholder="Developer, Student, etc."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="profileImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Image URL</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                      placeholder="https://..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ""}
                    placeholder="123 Main Street, Dhaka"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short Bio</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ""}
                    placeholder="Tell us a little about yourself"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={watch("password") !== watch("passwordConfirm")}
          >
            {isSubmitting ? (
              <LoaderIcon className="animate-spin" />
            ) : (
              "Register"
            )}
          </Button>
        </form>
      </Form>

      <p className="text-sm text-center text-gray-600 mt-6">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-primary hover:underline font-medium"
        >
          Login here
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
