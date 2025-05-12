"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UpdateEventById } from "@/services/EventService";
import NextButton from "@/components/shared/NextButton";
import { toast } from "sonner";
import Image from "next/image";
import { IEvent } from "@/app/types";

interface FormValues {
  title?: string;
  slug?: string;
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

const UpdateEvent = ({event}: {  event:  IEvent })  => {

const eventData = event;

 
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<FormValues>();

  const [previewUrl, setPreviewUrl] = useState<string | null>(eventData.bannerImage);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
useEffect(() => {
  setValue("startDate", new Date(eventData.startDate));
  setValue("endDate", new Date(eventData.endDate));

  const start = new Date(eventData.startDate);
  const end = new Date(eventData.endDate);

  setValue("startTime", `${start.getHours().toString().padStart(2, "0")}:
  ${start.getMinutes().toString().padStart(2, "0")}`);
  setValue("endTime", `${end.getHours().toString().padStart(2, "0")}:
  ${end.getMinutes().toString().padStart(2, "0")}`);
}, [eventData, setValue])

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
        title: data.title || eventData.title,
        description: data.description || eventData.description,
        startDate: startDate.toISOString() || eventData.startDate,
        endDate: endDate.toISOString() || eventData.endDate,
        venue: data.venue || eventData.venue,
        type: data.type || eventData.type,
        isPaid: data.isPaid || eventData.isPaid,
      
        category: data.category || eventData.category,
        fee: data.fee ? Number(data.fee) :Number(eventData.fee),
        eventStatus: data.eventStatus || eventData.eventStatus,
        reseveredSit: Number(data.reseveredSit) || eventData.reseveredSit,
        availableSit: Number(data.availableSit) || eventData.availableSit,
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(payload));
      if (data.bannerImage) {
        formData.append("file", data.bannerImage[0]);
      }

      const updateEvent = await UpdateEventById(eventData.id!, formData);

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
    <div className="">
   
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-6 mb-12 ">
          <div className="space-y-6 ">
         
            <div className="border shadow-md rounded-xl">
              <div className="px-6 py-4 text-2xl font-semibold border-b text-[#1E3A8A]">
                Basic Info
              </div>
              <div className="p-6 space-y-5">
                <Input
                  {...register("title")}
                  placeholder={eventData.title}
                />
                <Textarea
                  rows={6}
                 
                  {...register("description")}
                  placeholder={eventData.description}
                />
                <div className="flex flex-col gap-4 ">
                  <div className="flex flex-col w-full gap-2">
                   
                    <label className="text-md font-medium text-[#475569]">
                      Start Date | Previous date :{startDate?.toLocaleString()}
                    </label>
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={(date) => setValue("startDate", date as Date)}
                      className="border rounded-md shadow-sm"
                      classNames={{
                        day_selected: "bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]",
                        day_today: "text-[#1E3A8A] font-bold",
                      }}
                    />
                    <Input
                      type="time"
                      {...register("startTime")}
                      placeholder="Start Time"
                    />
                  </div>

                  <div className="flex flex-col w-full gap-2">
                    <label className="text-md font-medium text-[#475569]">
                      End Date | Previous date {endDate?.toLocaleString()}
                    </label>
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={(date) => setValue("endDate", date as Date)}
                      className="border rounded-md shadow-sm"
                      classNames={{
                        day_selected: "bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]",
                        day_today: "text-[#1E3A8A] font-bold",
                      }}
                    />
                    <Input
                      type="time"
                      {...register("endTime")}
                      placeholder="End Time"
                    />
                  </div>
                </div>

                <Input
                  {...register("venue")}
                  placeholder={eventData.venue}
                />
              </div>
            </div>

          
            {eventData.isPaid && (
              <div className="border shadow-md rounded-xl">
                <div className="px-6 py-4 text-xl font-semibold border-b text-[#1E3A8A]">
                  Price Details
                </div>
                <div className="p-6 space-y-4">
                  <Input
                    {...register("fee")}
                    placeholder={eventData.fee?.toString()}
                  />
                </div>
              </div>
            )}
          </div>

        
          <div className="space-y-6">
       
            <div className="border shadow-md rounded-xl">
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
               <Image src={
                   previewUrl!
                 } alt="" width={5000} height={5000}
                  className="object-cover w-full mt-4 border rounded-md max-h-52"
                />
              </div>
            </div>

          
            <div className="border shadow-md rounded-xl">
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

           
            <div className="border shadow-md rounded-xl">
              <div className="px-6 py-4 text-xl font-semibold border-b text-[#1E3A8A]">
                Seats Details
              </div>
              <div className="p-6 space-y-5">
                <Input
                  type="number"
                  {...register("reseveredSit")}
                  placeholder={eventData.reseveredSit?.toString()}
                />
                <Input
                  type="number"
                  {...register("availableSit")}
                  placeholder={eventData.availableSit?.toString()}
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
