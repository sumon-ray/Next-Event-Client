"use client";

import type { IUser } from "@/app/types";
import { useUser } from "@/context/UserContext";
import { updateProfile } from "@/services/ProfileService";
import { zodResolver } from "@hookform/resolvers/zod";
import { Briefcase, Camera, FileText, Loader2, Mail, MapPin, Phone, User } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { profileValidationSchema, type FormValues } from "./profileValidation";
import { motion } from "framer-motion";
import NextButton from "@/components/shared/NextButton";
import Title from "@/components/shared/Title";

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
          <Loader2 className="w-8 h-8 animate-spin text-[#1E3A8A]" />
          <p className="text-sm text-[#475569]">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 mx-auto ">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className=""
      >
        <div className="mb-8">
         <Title title="Personal Information" />
          <p className="mt-2 text-lg text-[#475569]">
            Update your photo and personal details here
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
         
          <div className="flex flex-col items-start gap-6 p-6 bg-white shadow-sm rounded-xl sm:flex-row sm:items-center">
            <div className="relative group">
              <div className="flex items-center justify-center w-24 h-24 overflow-hidden bg-gray-100 border-2 border-[#BBDEFB] rounded-full shadow-inner">
                <Image
                  src={
                    imagePreview ||
                    `${user?.profileImage || "/default-avatar.png"}?${new Date().getTime()}`
                  }
                  alt="Profile"
                  className="object-cover w-full h-full"
                  width={500}
                  height={500}
                />
                {!user?.isSocialLogin && (
                  <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 rounded-full opacity-0 bg-black/40 group-hover:opacity-100">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 w-full">
              <label
                htmlFor="profileImage"
                className="block font-medium text-[#1E293B]"
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
                  className={`w-full px-4 py-2 border  rounded-lg text-sm text-[#475569] focus:ring-2 focus:ring-[#1E3A8A] 
                    focus:border-[#1E3A8A] transition-all ${
                    user?.isSocialLogin
                      ? "cursor-not-allowed opacity-70 bg-gray-100"
                      : "bg-white hover:border-[#1E40AF]"
                  }`}
                />
                {errors.profileImage && (
                  <p className="mt-1 text-sm text-[#EF4444]">
                    {errors.profileImage.message as string}
                  </p>
                )}
              </div>
              {user?.isSocialLogin && (
                <p className="mt-1 text-xs text-[#EF4444]">
                  Profile image cannot be changed for social login accounts
                </p>
              )}
            </div>
          </div>

       
          <div className="grid grid-cols-1 gap-6 p-6 bg-white shadow-sm rounded-xl md:grid-cols-2">
       
            <div className="space-y-2">
              <label
                htmlFor="firstName"
                className="flex items-center gap-2  font-medium text-[#1E293B]"
              >
                <User className="w-4 h-4 text-[#3B82F6]" />
                Full Name
              </label>
              <input
                id="firstName"
                disabled={user?.isSocialLogin}
                placeholder={
                  user?.isSocialLogin ? "Cannot be changed" : "Enter your name"
                }
                {...register("firstName")}
                className={`w-full px-4 py-2 border border-[#BBDEFB] rounded-lg text-sm text-[#475569] focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] transition-all ${
                  user?.isSocialLogin
                    ? "cursor-not-allowed opacity-70 bg-gray-100"
                    : "bg-white hover:border-[#1E40AF]"
                }`}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-[#EF4444]">
                  {errors.firstName.message}
                </p>
              )}
            </div>

          
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="flex items-center gap-2 font-medium text-[#1E293B]"
              >
                <Mail className="w-4 h-4 text-[#3B82F6]" />
                Email Address
              </label>
              <input
                id="email"
                {...register("email")}
                disabled
                type="email"
                className="w-full px-4 py-2 text-sm bg-gray-100 border border-[#BBDEFB] rounded-lg cursor-not-allowed text-[#475569]"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-[#EF4444]">
                  {errors.email.message}
                </p>
              )}
            </div>

        
            <div className="space-y-2">
              <label
                htmlFor="phoneNumber"
                className="flex items-center gap-2  font-medium text-[#1E293B]"
              >
                <Phone className="w-4 h-4 text-[#3B82F6]" />
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
                className={`w-full px-4 py-2 border border-[#BBDEFB] rounded-lg text-sm text-[#475569] focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] transition-all ${
                  user?.isSocialLogin
                    ? "cursor-not-allowed opacity-70 bg-gray-100"
                    : "bg-white hover:border-[#1E40AF]"
                }`}
              />
              {errors.phoneNumber && (
                <p className="mt-1 text-sm text-[#EF4444]">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="occupation"
                className="flex items-center gap-2  font-medium text-[#1E293B]"
              >
                <Briefcase className="w-4 h-4 text-[#3B82F6]" />
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
                className={`w-full px-4 py-2 border border-[#BBDEFB] rounded-lg text-sm text-[#475569] focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] transition-all ${
                  user?.isSocialLogin
                    ? "cursor-not-allowed opacity-70 bg-gray-100"
                    : "bg-white hover:border-[#1E40AF]"
                }`}
              />
              {errors.occupation && (
                <p className="mt-1 text-sm text-[#EF4444]">
                  {errors.occupation.message}
                </p>
              )}
            </div>

  
            <div className="space-y-2">
              <label
                htmlFor="address"
                className="flex items-center gap-2  font-medium text-[#1E293B]"
              >
                <MapPin className="w-4 h-4 text-[#3B82F6]" />
                Address
              </label>
              <input
                id="address"
                disabled={user?.isSocialLogin}
                placeholder={
                  user?.isSocialLogin ? "Address not found" : "Enter your address"
                }
                {...register("address")}
                className={`w-full px-4 py-2 border border-[#BBDEFB] rounded-lg text-sm text-[#475569] focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] transition-all ${
                  user?.isSocialLogin
                    ? "cursor-not-allowed opacity-70 bg-gray-100"
                    : "bg-white hover:border-[#1E40AF]"
                }`}
              />
              {errors.address && (
                <p className="mt-1 text-sm text-[#EF4444]">
                  {errors.address.message}
                </p>
              )}
            </div>

          
            <div className="space-y-2 md:col-span-2">
              <label
                htmlFor="bio"
                className="flex items-center gap-2  font-medium text-[#1E293B]"
              >
                <FileText className="w-4 h-4 text-[#3B82F6]" />
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
                rows={3}
                className={`w-full px-4 py-2 border border-[#BBDEFB] rounded-lg text-sm text-[#475569] focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] transition-all ${
                  user?.isSocialLogin
                    ? "cursor-not-allowed opacity-70 bg-gray-100"
                    : "bg-white hover:border-[#1E40AF]"
                }`}
              />
              {errors.bio && (
                <p className="mt-1 text-sm text-[#EF4444]">{errors.bio.message}</p>
              )}
            </div>
          </div>

       
          <div className="flex justify-end pt-4 mt-6">
            <NextButton
           
              disabled={isSubmitting || user?.isSocialLogin}
             name=  {isSubmitting  ?(
              <p className="flex items-center text-white">
               
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />  <p>Saving</p>
              </p>
               
              )
               : (
                "Save Changes"
              )
            }
            >
            
            </NextButton>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default PersonalInfoComponent;