"use client";

import { IUser } from "@/app/types";
import { useUser } from "@/context/UserContext";
import { updateProfile } from "@/services/ProfileService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormValues, profileValidationSchema } from "./profileValidation";

const PersonalInfoComponent = () => {
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(profileValidationSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address ?? "",
        occupation: user.occupation ?? "",
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
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-semibold mb-2">Personal Information</h1>
      <p className="text-gray-500 mb-8">
        Update your photo and personal details here.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-blue-100 overflow-hidden">
            <img
              src={`${
                user?.profileImage || "/default-avatar.png"
              }?${new Date().getTime()}`}
              alt="Profile"
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <label htmlFor="profileImage" className="block text-sm mb-2">
              Upload New Profile Image
            </label>
            <input
              {...register("profileImage")}
              type="file"
              accept="image/*"
              className="w-full"
            />
            {errors.profileImage && (
              <p className="text-red-500 text-sm mt-1">
                {errors.profileImage.message as string}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="firstName" className="block text-sm mb-2">
              First Name
            </label>
            <input
              {...register("firstName")}
              className="w-full px-3 py-2 border rounded-md"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="relative group">
            <label htmlFor="email" className="block text-sm mb-2">
              Email
            </label>
            <input
              {...register("email")}
              disabled
              type="email"
              className="w-full px-3 bg-zinc-100 py-2 border rounded-md"
            />
            <div className="absolute -top-1 left-0 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
              You can't change your email address
            </div>
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-sm mb-2">
              Phone Number
            </label>
            <input
              {...register("phoneNumber")}
              type="tel"
              className="w-full px-3 py-2 border rounded-md"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <label htmlFor="address" className="block text-sm mb-2">
              Address
            </label>
            <input
              {...register("address")}
              className="w-full px-3 py-2 border rounded-md"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="occupation" className="block text-sm mb-2">
              Occupation
            </label>
            <input
              {...register("occupation")}
              className="w-full px-3 py-2 border rounded-md"
            />
            {errors.occupation && (
              <p className="text-red-500 text-sm mt-1">
                {errors.occupation.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-primary text-white rounded-md transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoComponent;
