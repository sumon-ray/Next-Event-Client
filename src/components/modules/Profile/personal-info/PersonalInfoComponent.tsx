"use client";

import { useUser } from "@/context/UserContext";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FiUpload } from "react-icons/fi";

type FormValues = {
  firstName: string;
  email: string;
  phoneNumber: string;
  address: string;
  occupation: string;
};

const PersonalInfoComponent = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const { user} = useUser();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
        occupation: user.occupation,
      });
      setLoading(false);
    }
  }, [user, reset]);

  const onSubmit = async (data: FormValues) => {
    try {
      const formData = new FormData();
      formData.append("name", data.firstName);
      formData.append("email", data.email);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("address", data.address);
      formData.append("occupation", data.occupation);

      if (fileInputRef.current?.files?.[0]) {
        formData.append("profileImage", fileInputRef.current.files[0]);
      }

      const updatedData = await updateProfile({
        name: data.firstName,
        email: data.email,
        profileImage: profileImage || "",
        phoneNumber: data.phoneNumber,
        address: data.address,
        occupation: data.occupation,
      });

      if (updatedData) {
        alert("Profile updated successfully!");
      } else {
        setError("Something went wrong while updating.");
      }
    } catch (error) {
      setError("Something went wrong while updating.");
    }
  };

  if (loading) return <p className="text-gray-500">Loading user data...</p>;
  if (error)
    return <p className="text-red-500 text-2xl font-semibold">{error}</p>;

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-semibold mb-2">Personal Information</h1>
      <p className="text-gray-500 mb-8">
        Update your photo and personal details here.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center gap-4 mb-8">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-blue-100 overflow-hidden relative">
              <Image
                src={
                  profileImage || user?.profileImage || "/default-avatar.png"
                }
                alt="Profile"
                width={64}
                height={64}
                className="object-cover"
              />
            </div>
          </div>
          <div>
            <button
              type="button"
              onClick={handleImageUploadClick}
              className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors"
            >
              <FiUpload className="w-4 h-4" />
              <span>Change photo</span>
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="firstName" className="block text-sm mb-2">
              First Name
            </label>
            <input
              {...register("firstName", { required: "First name is required" })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <label htmlFor="email" className="block text-sm mb-2">
              Email
            </label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-sm mb-2">
              Phone Number
            </label>
            <input
              {...register("phoneNumber", {
                required: "Phone number is required",
              })}
              type="tel"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <label htmlFor="address" className="block text-sm mb-2">
              Address
            </label>
            <input
              {...register("address", { required: "Address is required" })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="occupation" className="block text-sm mb-2">
              Occupation
            </label>
            <input
              {...register("occupation", {
                required: "Occupation is required",
              })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded-md transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoComponent;
