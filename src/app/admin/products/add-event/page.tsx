"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  title: string;
  description: string;
  dateTime: string;
  venue: string;
  type: "PUBLIC" | "PRIVATE";
  isPaid: boolean;
  fee?: string;
  bannerImage?: FileList;
};

const AddEvent = () => {
  const {
    register,
    handleSubmit,
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      type: "PUBLIC",
      isPaid: false,
    },
  });

  const isPaid = watch("isPaid");

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const onSubmit = (data: FormValues) => {
    const formData = new FormData();
   // console.log(data)
  
    Object.entries(data).forEach(([key, value]) => {
      if (key === "bannerImage" && value instanceof FileList && value.length > 0) {
        formData.append("bannerImage", value[0]); // Append only first file
      } else if (typeof value === "boolean") {
        formData.append(key, value.toString());
      } else if (typeof value === "string") {
        formData.append(key, value);
      }
    });

    // console.log("Form Data:");
    // for (let pair of formData.entries()) {
    //   console.log(`${pair[0]}: ${pair[1]}`);
    // }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Add Event</h1>
      <p className="text-gray-600 mb-6">Add your event for your customers</p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-6 lg:grid-cols-3"
      >
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-lg border bg-white shadow-sm">
            <div className="border-b px-6 py-4 font-semibold">Basic Info</div>
            <div className="p-6 space-y-4">
              <input
                {...register("title", { required: true })}
                placeholder="Event Title"
                className="w-full rounded-md border border-gray-300 p-2.5"
              />
              <textarea
                {...register("description", { required: true })}
                placeholder="Description"
                rows={4}
                className="w-full rounded-md border border-gray-300 p-2.5"
              />
              <input
                type="datetime-local"
                {...register("dateTime", { required: true })}
                className="w-full rounded-md border border-gray-300 p-2.5"
              />
              <input
                {...register("venue", { required: true })}
                placeholder="Venue"
                className="w-full rounded-md border border-gray-300 p-2.5"
              />
            </div>
          </div>

          <div className="rounded-lg border bg-white shadow-sm">
            <div className="border-b px-6 py-4 font-semibold">Price</div>
            <div className="p-6 space-y-4">
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" {...register("isPaid")} />
                <span>Is Paid?</span>
              </label>
              {isPaid && (
                <input
                  type="number"
                  step="0.01"
                  {...register("fee")}
                  placeholder="Event Fee"
                  className="w-full rounded-md border border-gray-300 p-2.5"
                />
              )}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <div className="rounded-lg border bg-white shadow-sm">
            <div className="border-b px-6 py-4 font-semibold">Event Banner</div>
            <div className="p-6">
              <input
                type="file"
                accept="image/*"
                {...register("bannerImage")}
                onChange={onImageChange}
                className="mb-4"
              />
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="rounded-md border w-full object-cover max-h-40"
                />
              )}
            </div>
          </div>

          <div className="rounded-lg border bg-white shadow-sm">
            <div className="border-b px-6 py-4 font-semibold">Event Type</div>
            <div className="p-6">
              <select
                {...register("type")}
                className="w-full rounded-md border border-gray-300 p-2.5"
              >
                <option value="PUBLIC">Public</option>
                <option value="PRIVATE">Private</option>
              </select>
            </div>
          </div>

          <div className="p-6">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 font-semibold"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddEvent;
