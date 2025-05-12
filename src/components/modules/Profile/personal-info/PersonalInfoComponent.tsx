"use client";

import type { IUser } from "@/app/types";
import { useUser } from "@/context/UserContext";
import { updateProfile } from "@/services/ProfileService";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Briefcase,
  Camera,
  FileText,
  Loader2,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { profileValidationSchema, type FormValues } from "./profileValidation";

const PersonalInfoComponent = () => {
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(profileValidationSchema),
    mode: "onChange",
  });

  // Watch for file changes to create preview
  const profileImageFile = watch("profileImage");

  useEffect(() => {
    if (profileImageFile && profileImageFile.length > 0) {
      const file = profileImageFile[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  }, [profileImageFile]);

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address ?? "",
        occupation: user.occupation ?? "",
        bio: user.bio ?? "",
      });
      setLoading(false);
    }
  }, [user, reset]);

  const onSubmit = async (data: FormValues) => {
    try {
      const formData = new FormData();
      formData.append("userId", user?.id || "");
      formData.append("name", data.firstName);
      formData.append("email", data.email);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("address", data.address);
      formData.append("occupation", data.occupation);
      formData.append("bio", data.bio);

      if (data.profileImage && data.profileImage.length > 0) {
        formData.append("profileImage", data.profileImage[0]);
      }

      const updatedData = await updateProfile(formData);

      if (user && updatedData?.data) {
        const userData = updatedData.data;
        const mergedUser: IUser = {
          ...user,
          ...userData,
          password: user.password,
          bio: user?.bio,
          gender: user.gender,
          profileImage: userData?.profileImage || user.profileImage,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };

        setUser(mergedUser);
        localStorage.setItem("userProfile", JSON.stringify(mergedUser));
        toast.success("Profile updated successfully!");
      } else {
        toast.error("Something went wrong while updating.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-gray-500">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full  mx-auto  rounded-xl shadow-sm">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Personal Information
        </h1>
        <p className="text-gray-500 mt-1">
          Update your photo and personal details here
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Profile Image Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-4 bg-gray-50 rounded-lg">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200 flex items-center justify-center">
              <Image
                src={
                  imagePreview ||
                  `${
                    user?.profileImage || "/default-avatar.png"
                  }?${new Date().getTime()}`
                }
                alt="Profile"
                className="object-cover w-full h-full"
                width={500}
                height={500}
              />
              {!user?.isSocialLogin && (
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-full">
                  <Camera className="w-6 h-6 text-white" />
                </div>
              )}
            </div>
          </div>

          <div className="flex-1">
            <label
              htmlFor="profileImage"
              className="block text-sm font-medium text-gray-700"
            >
              Profile Image
            </label>
            <div className="mt-2">
              <input
                id="profileImage"
                disabled={user?.isSocialLogin}
                {...register("profileImage")}
                type="file"
                accept="image/*"
                className={`w-full px-3 py-2 border border-gray-300 rounded-md text-sm ${
                  user?.isSocialLogin
                    ? "cursor-not-allowed opacity-70 bg-gray-100"
                    : ""
                }`}
              />
              {errors.profileImage && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.profileImage.message as string}
                </p>
              )}
            </div>
            {user?.isSocialLogin && (
              <p className="text-xs text-red-300 mt-1">
                Profile image cannot be changed for social login accounts
              </p>
            )}
          </div>
        </div>

        <div className="border-t border-gray-200  my-6"></div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6  ">
          {/* Name Field */}
          <div className="space-y-2">
            <label
              htmlFor="firstName"
              className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1"
            >
              <User className="h-4 w-4 text-gray-400" />
              Full Name
            </label>
            <input
              id="firstName"
              disabled={user?.isSocialLogin}
              placeholder={
                user?.isSocialLogin ? "Cannot be changed" : "Enter your name"
              }
              {...register("firstName")}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors ${
                user?.isSocialLogin
                  ? "cursor-not-allowed opacity-70 bg-gray-100"
                  : ""
              }`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1"
            >
              <Mail className="h-4 w-4 text-gray-400" />
              Email Address
            </label>
            <input
              id="email"
              {...register("email")}
              disabled
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-100 cursor-not-allowed"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone Number Field */}
          <div className="space-y-2">
            <label
              htmlFor="phoneNumber"
              className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1"
            >
              <Phone className="h-4 w-4 text-gray-400" />
              Phone Number
            </label>
            <input
              id="phoneNumber"
              disabled={user?.isSocialLogin}
              placeholder={
                user?.isSocialLogin
                  ? "Phone number not found"
                  : "Enter your phone number"
              }
              {...register("phoneNumber")}
              type="tel"
              className={`w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors ${
                user?.isSocialLogin
                  ? "cursor-not-allowed opacity-70 bg-gray-100"
                  : ""
              }`}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          {/* Occupation Field */}
          <div className="space-y-2">
            <label
              htmlFor="occupation"
              className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1"
            >
              <Briefcase className="h-4 w-4 text-gray-400" />
              Occupation
            </label>
            <input
              id="occupation"
              disabled={user?.isSocialLogin}
              placeholder={
                user?.isSocialLogin
                  ? "Occupation not found"
                  : "Enter your occupation"
              }
              {...register("occupation")}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors ${
                user?.isSocialLogin
                  ? "cursor-not-allowed opacity-70 bg-gray-100"
                  : ""
              }`}
            />
            {errors.occupation && (
              <p className="text-red-500 text-sm mt-1">
                {errors.occupation.message}
              </p>
            )}
          </div>

          {/* Address Field */}
          <div className="space-y-2">
            <label
              htmlFor="address"
              className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1"
            >
              <MapPin className="h-4 w-4 text-gray-400" />
              Address
            </label>
            <input
              id="address"
              disabled={user?.isSocialLogin}
              placeholder={
                user?.isSocialLogin ? "Address not found" : "Enter your address"
              }
              {...register("address")}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors ${
                user?.isSocialLogin
                  ? "cursor-not-allowed opacity-70 bg-gray-100"
                  : ""
              }`}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Bio Field - Full Width */}
          <div className="space-y-2">
            <label
              htmlFor="bio"
              className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1"
            >
              <FileText className="h-4 w-4 text-gray-400" />
              Bio
            </label>
            <textarea
              id="bio"
              disabled={user?.isSocialLogin}
              placeholder={
                user?.isSocialLogin
                  ? "Bio not available"
                  : "Tell us about yourself"
              }
              {...register("bio")}
              rows={1}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors ${
                user?.isSocialLogin
                  ? "cursor-not-allowed opacity-70 bg-gray-100"
                  : ""
              }`}
            />
            {errors.bio && (
              <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4 border-t border-gray-200 mt-6">
          <button
            type="submit"
            disabled={isSubmitting || user?.isSocialLogin}
            className={`px-6 py-2 rounded-md text-white font-medium transition-all ${
              isSubmitting || user?.isSocialLogin
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary hover:bg-primary/90 active:scale-[0.98]"
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </span>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoComponent;
