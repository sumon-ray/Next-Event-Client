"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Title from "@/components/shared/Title";
import { UpdateEventBySlug } from "@/services/EventService";
import NextButton from "@/components/shared/NextButton";
import { toast } from "sonner";
import Image from "next/image";

interface FormValues {
  title?: string;
  description?: string;
  startDate?: Date;
  startTime?: string;
  endDate?: Date;
  endTime?: string;
  venue?: string;
  type?: "PUBLIC" | "PRIVATE";
  isPaid?: boolean;
  fee?: number;
  bannerImage?: FileList;
  eventStatus?: "UPCOMING" | "ONGOING" | "ENDED";
  category?:
    | "CONFERENCE"
    | "WORKSHOP"
    | "SEMINAR"
    | "NETWORKING"
    | "PARTY"
    | "CONCERT"
    | "EXHIBITION"
    | "OTHER";
  reseveredSit?: number;
  availableSit?: number;
}

const UpdateEvent = ({
  eventData,
  eventSlug,
}: {
  eventData: any;
  eventSlug: string;
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<FormValues>();

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setValue("title", eventData.title);
    setValue("description", eventData.description);
    setValue("startDate", new Date(eventData.startDate));
    setValue("endDate", new Date(eventData.endDate));
    setValue("startTime", format(new Date(eventData.startDate), "HH:mm"));
    setValue("endTime", format(new Date(eventData.endDate), "HH:mm"));
    setValue("venue", eventData.venue);
    setValue("type", eventData.type);
    setValue("isPaid", eventData.isPaid);
    setValue("fee", eventData.fee);
    setValue("eventStatus", eventData.eventStatus);
    setValue("category", eventData.category);
    setValue("reseveredSit", eventData.reseveredSit);
    setValue("availableSit", eventData.availableSit);
  }, [eventData, setValue]);

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const combineDateTime = (date: Date, time: string): Date => {
    const [hours, minutes] = time.split(":").map(Number);
    const newDate = new Date(date);
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    return newDate;
  };

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);

      const startDate = combineDateTime(
        data.startDate as Date,
        data.startTime as string
      );
      const endDate = combineDateTime(
        data.endDate as Date,
        data.endTime as string
      );

      const payload = {
        title: data.title,
        description: data.description,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        venue: data.venue,
        type: data.type,
        isPaid: data.isPaid || false,
        fee: data.fee ? Number(data.fee) : 0,
        eventStatus: data.eventStatus || "UPCOMING",
        category: data.category || "OTHER",
        reseveredSit: Number(data.reseveredSit),
        availableSit: Number(data.availableSit),
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(payload));
      if (data.bannerImage) {
        formData.append("file", data.bannerImage[0]);
      }

      const updateEvent = await UpdateEventBySlug(eventSlug, formData);

      if (updateEvent.success) {
        toast.success(updateEvent.message || "Event updated successfully");
        router.push(`/events/${updateEvent.data.slug}`);
      } else {
        toast.error(updateEvent.message || "Failed to update event");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update event");
    } finally {
      setLoading(false);
    }
  };

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  return (
    <div className="p-4 sm:p-6 md:px-10">
      <Title title="Update Event" />
      <p className="mb-6 text-lg text-[#475569]">Update your event details</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-6 mb-12 xl:grid-cols-3">
          <div className="space-y-6 xl:col-span-2">
            {/* Basic Info Section */}
            <div className="bg-white border rounded-xl shadow-md">
              <div className="px-6 py-4 text-2xl font-semibold border-b text-[#1E3A8A]">
                Basic Info
              </div>
              <div className="p-6 space-y-5">
                <Input
                  {...register("title", { required: true })}
                  placeholder="Event Title"
                />
                <Textarea
                  rows={6}
                  {...register("description", { required: true })}
                  placeholder="Description"
                />
                <div className="flex flex-col gap-4 lg:flex-row">
                  <div className="flex flex-col gap-2 w-full">
                    <label className="text-md font-medium text-[#475569]">
                      Start Date
                    </label>
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={(date) => setValue("startDate", date as Date)}
                      className="rounded-md border shadow-sm"
                    />
                    <Input
                      type="time"
                      {...register("startTime", { required: true })}
                      placeholder="Start Time"
                    />
                  </div>

                  <div className="flex flex-col gap-2 w-full">
                    <label className="text-md font-medium text-[#475569]">
                      End Date
                    </label>
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={(date) => setValue("endDate", date as Date)}
                      className="rounded-md border shadow-sm"
                    />
                    <Input
                      type="time"
                      {...register("endTime", { required: true })}
                      placeholder="End Time"
                    />
                  </div>
                </div>

                <Input
                  {...register("venue", { required: true })}
                  placeholder="Venue"
                />
              </div>
            </div>

            {/* Price Details Section */}
            {eventData.isPaid && (
              <div className="bg-white border rounded-xl shadow-md">
                <div className="px-6 py-4 text-xl font-semibold border-b text-[#1E3A8A]">
                  Price Details
                </div>
                <div className="p-6 space-y-4">
                  <Input
                    {...register("fee", { required: true })}
                    placeholder="Fee"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Banner, Status, Seats */}
          <div className="space-y-6">
            {/* Event Banner */}
            <div className="bg-white border rounded-xl shadow-md">
              <div className="px-6 py-4 text-xl font-semibold border-b text-[#1E3A8A]">
                Event Banner
              </div>
              <div className="p-6">
                <Input
                  type="file"
                  accept="image/*"
                  {...register("bannerImage")}
                  onChange={onImageChange}
                />
                <Image
                  height={300}
                  width={300}
                  src={
                    previewUrl ||
                    eventData.bannerImage
                  }
                  alt="Event Banner"
                  className="object-cover w-full mt-4 border rounded-md max-h-52"
                />
              </div>
            </div>

            {/* Event Status */}
            <div className="bg-white border rounded-xl shadow-md">
              <div className="px-6 py-4 text-xl font-semibold border-b text-[#1E3A8A]">
                Event Status
              </div>
              <div className="p-6">
                <Select
                  defaultValue={eventData.eventStatus}
                  onValueChange={(value) => setValue("eventStatus", value as any)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UPCOMING">Upcoming</SelectItem>
                    <SelectItem value="ONGOING">Ongoing</SelectItem>
                    <SelectItem value="ENDED">Ended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Seats Details */}
            <div className="bg-white border rounded-xl shadow-md">
              <div className="px-6 py-4 text-xl font-semibold border-b text-[#1E3A8A]">
                Seats Details
              </div>
              <div className="p-6 space-y-5">
                <Input
                  type="number"
                  {...register("reseveredSit", { required: true })}
                  placeholder="Reserved Seats"
                />
                <Input
                  type="number"
                  {...register("availableSit", { required: true })}
                  placeholder="Available Seats"
                />
              </div>
            </div>
          </div>
        </div>

        <NextButton name="Update Event" disabled={loading} />
      </form>
    </div>
  );
};

export default UpdateEvent;
