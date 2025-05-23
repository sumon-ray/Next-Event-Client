"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Title from "@/components/shared/Title";
import { createEvent } from "@/services/EventService";
import { toast } from "sonner";
import Image from "next/image";
import NextButton from "@/components/shared/NextButton";

interface FormValues {
  title: string;
  slug: string;
  description: string;
  startDate: Date;
  startTime: string;
  endDate: Date;
  endTime: string;
  venue: string;
  type: "PUBLIC" | "PRIVATE";
  isPaid?: boolean;
  fee?: number;
  bannerImage?: FileList;
  eventStatus: "UPCOMING" | "ONGOING" | "ENDED";
  category: "CONFERENCE" | "WORKSHOP" | "SEMINAR" | "NETWORKING" | "PARTY" | "CONCERT" | "EXHIBITION" | "OTHER";
  reservedSites: number;
  availableSites: number;
}

const AddEvent = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      type: "PUBLIC",
      isPaid: false,
    },
  });

  const isPaid = watch("isPaid");
  const startDate = watch("startDate");
  const endDate = watch("endDate");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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
      const formData = new FormData();
      const startDate = combineDateTime(data.startDate, data.startTime);
      const endDate = combineDateTime(data.endDate, data.endTime);

      const payload = {
        title: data.title,
        slug: data.slug,
        description: data.description,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        venue: data.venue,
        type: data.type,
        isPaid: data.isPaid || false,
        fee: data.fee ? Number(data.fee) : 0,
        eventStatus: data.eventStatus || "UPCOMING",
        category: data.category || "OTHER",
        reseveredSit: Number(data.reservedSites),
        availableSit: Number(data.availableSites)
      };

      formData.append("data", JSON.stringify(payload));
      if (data.bannerImage) {
        formData.append("file", data.bannerImage[0]);
      }
      
      const uploadEvent = await createEvent(formData);
      if (!uploadEvent.succcess) {
        toast.error(uploadEvent.message || 'Failed to upload event');
      } else {
        toast.success(uploadEvent.message || 'Event uploaded successfully');
        reset();
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Failed to upload event');
    }
  };

  return (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }} className="pt-12 md:px-0">
      <div className="mx-auto ">
        <div className="mb-8">
         <Title title="Create Event" />
          <p className="text-[#475569]">Fill in the details to create your event</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-8 mb-12 xl:grid-cols-3">
          
            <div className="space-y-8 xl:col-span-2">
            
              <div className="space-y-6 ">
                <h2 className="text-2xl font-semibold text-[#1E3A8A] pb-2  border-b-2 border-[#BBDEFB]">
                  Basic Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-[#475569]">Event Title</label>
                    <Input
                      className="w-full border-[#BBDEFB] focus:border-[#1E3A8A]"
                      {...register("title", { required: true })}
                      placeholder="Enter event title"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-[#475569]">Unique Slug</label>
                    <Input
                      className="w-full border-[#BBDEFB] focus:border-[#1E3A8A]"
                      {...register("slug", { required: true })}
                      placeholder="Enter unique slug"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-[#475569]">Description</label>
                    <Textarea
                      rows={6}
                      className="w-full border-[#BBDEFB] focus:border-[#1E3A8A]"
                      {...register("description", { required: true })}
                      placeholder="Enter event description"
                    />
                  </div>
                </div>
              </div>

          
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-[#1E3A8A]  border-b-2 pb-2  border-[#BBDEFB]">
                  Date & Time
                </h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-[#475569]">Start Date & Time</label>
                    <div className="flex flex-col gap-3">
                      <div className="relative">
                        <Button
                          type="button"
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal border-[#BBDEFB] ",
                            !startDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="w-4 h-4 mr-2 text-[#1E3A8A]" />
                          {startDate ? format(startDate, "PPP") : "Pick a date"}
                        </Button>
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={(date) => setValue("startDate", date as Date)}
                          className=" z-10 my-2 border border-[#BBDEFB] rounded-md shadow-lg"
                          classNames={{
                            day_selected: "bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]",
                            day_today: "border border-[#1E3A8A] text-[#1E3A8A]",
                            head_cell: "text-[#475569]",
                            button: "hover:bg-gradient-to-br from-[#E3F2FD] via-[#BBDEFB] to-[#E3F2FD]",
                          }}
                        />
                      </div>
                      <Input
                        type="time"
                        {...register("startTime", { required: true })}
                        className="border-[#BBDEFB] focus:border-[#1E3A8A] "
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-[#475569]">End Date & Time</label>
                    <div className="flex flex-col gap-3">
                      <div className="relative">
                        <Button
                          type="button"
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal border-[#BBDEFB] ",
                            !endDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="w-4 h-4 mr-2 text-[#1E3A8A]" />
                          {endDate ? format(endDate, "PPP") : "Pick a date"}
                        </Button>
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={(date) => setValue("endDate", date as Date)}
                          className=" z-10 my-2 border border-[#BBDEFB] rounded-md shadow-lg"
                         classNames={{
                            day_selected: "bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]",
                            day_today: "border border-[#1E3A8A] text-[#1E3A8A]",
                            head_cell: "text-[#475569]",
                            button: "hover:bg-gradient-to-br from-[#E3F2FD] via-[#BBDEFB] to-[#E3F2FD]",
                          }}
                        />
                      </div>
                      <Input
                        type="time"
                        {...register("endTime", { required: true })}
                        className="border-[#BBDEFB] focus:border-[#1E3A8A] text-white "
                      />
                    </div>
                  </div>
                </div>
              </div>

              
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-[#1E3A8A] pb-2  ">
                  Venue
                </h2>
                <Input
                  className="w-full  border-[#98cffc]focus:border-[#1E3A8A]"
                  {...register("venue", { required: true })}
                  placeholder="Enter venue location"
                />
              </div>

            
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-[#1E3A8A] pb-2 ">
                  Pricing Details
                </h2>
                <div className="flex items-center space-x-2 border-2 border-[#98cffc] p-2 rounded-md">
                  <Checkbox
                    id="isPaid"
                    checked={isPaid}
                    onCheckedChange={(checked) => setValue("isPaid", !!checked)}
                    className="border-[#BBDEFB] data-[state=checked]:bg-[#1E3A8A]  data-[state=checked]:text-white focus-visible:outline-1 bg-white"
                  />
                  <label htmlFor="isPaid" className="font-medium text-[#475569]">
                   Click if this is a paid event
                  </label>
                </div>

                {isPaid && (
                  <div className="mt-4 ">
                    <label className="block mb-2 text-sm font-medium text-[#475569]">Entry Price</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">BDT</span>
                      <Input
                        type="number"
                        
                        {...register("fee")}
                        placeholder="0.00"
                        className="w-full pl-12  border-[#98cffc] focus:border-[#1E3A8A]"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

        
            <div className="space-y-8">
             
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-[#1E3A8A] pb-2  border-b-2 border-[#BBDEFB]">
                  Event Banner
                </h2>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg cursor-pointer border-[#BBDEFB] hover:bg-[#E3F2FD]">
                    <div className="flex flex-col items-center justify-center">
                      <UploadIcon className="w-8 h-8 mb-2 text-[#1E3A8A]" />
                      <p className="text-sm text-[#475569]">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-[#94A3B8]">PNG, JPG, GIF (MAX. 5MB)</p>
                    </div>
                    <Input
                      type="file"
                      accept="image/*"
                      {...register("bannerImage")}
                      onChange={onImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
                {previewUrl && (
                  <div className="mt-4 overflow-hidden rounded-lg">
                    <Image
                      width={400}
                      height={200}
                      src={previewUrl}
                      alt="Preview"
                      className="object-cover w-full h-48"
                    />
                  </div>
                )}
              </div>

             
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-[#1E3A8A] pb-2 border-b border-[#BBDEFB]">
                  Event Settings
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-[#475569]">Event Type</label>
                    <Select
                      defaultValue="PUBLIC"
                      onValueChange={(value) => setValue("type", value as "PUBLIC" | "PRIVATE")}
                    >
                      <SelectTrigger className="w-full border-[#BBDEFB] ">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className=" bg-white border-[#BBDEFB]">
                        <SelectItem value="PUBLIC" className="hover:bg-gradient-to-br from-[#E3F2FD] via-[#BBDEFB] to-[#E3F2FD]">Public</SelectItem>
                        <SelectItem value="PRIVATE" className="hover:bg-gradient-to-br from-[#E3F2FD] via-[#BBDEFB] to-[#E3F2FD]">Private</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-[#475569]">Event Status</label>
                    <Select
                      defaultValue="UPCOMING"
                      onValueChange={(value) => setValue("eventStatus", value as FormValues["eventStatus"])}
                    >
                      <SelectTrigger className="w-full border-[#BBDEFB]">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent className="border-[#BBDEFB] bg-white">
                        <SelectItem value="UPCOMING" className="hover:bg-gradient-to-br from-[#E3F2FD] via-[#BBDEFB] to-[#E3F2FD]">Upcoming</SelectItem>
                        <SelectItem value="ONGOING" className="hover:bg-gradient-to-br from-[#E3F2FD] via-[#BBDEFB] to-[#E3F2FD]">Ongoing</SelectItem>
                        <SelectItem value="ENDED" className="hover:bg-gradient-to-br from-[#E3F2FD] via-[#BBDEFB] to-[#E3F2FD]">Ended</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-[#475569]">Category</label>
                    <Select
                      onValueChange={(value) => setValue("category", value as FormValues["category"])}
                    >
                      <SelectTrigger className="w-full border-[#BBDEFB]">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-[#BBDEFB]">
                        <SelectItem value="CONFERENCE" className="hover:bg-gradient-to-br from-[#E3F2FD] via-[#BBDEFB] to-[#E3F2FD]">Conference</SelectItem>
                        <SelectItem value="WORKSHOP" className="hover:bg-gradient-to-br from-[#E3F2FD] via-[#BBDEFB] to-[#E3F2FD]">Workshop</SelectItem>
                        <SelectItem value="SEMINAR" className="hover:bg-gradient-to-br from-[#E3F2FD] via-[#BBDEFB] to-[#E3F2FD]">Seminar</SelectItem>
                        <SelectItem value="NETWORKING" className="hover:bg-gradient-to-br from-[#E3F2FD] via-[#BBDEFB] to-[#E3F2FD]">Networking</SelectItem>
                        <SelectItem value="PARTY" className="hover:bg-gradient-to-br from-[#E3F2FD] via-[#BBDEFB] to-[#E3F2FD]">Party</SelectItem>
                        <SelectItem value="CONCERT" className="hover:bg-gradient-to-br from-[#E3F2FD] via-[#BBDEFB] to-[#E3F2FD]">Concert</SelectItem>
                        <SelectItem value="EXHIBITION" className="hover:bg-gradient-to-br from-[#E3F2FD] via-[#BBDEFB] to-[#E3F2FD]">Exhibition</SelectItem>
                        <SelectItem value="OTHER" className="hover:bg-gradient-to-br from-[#E3F2FD] via-[#BBDEFB] to-[#E3F2FD]">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-[#1E3A8A] pb-2 border-b border-[#BBDEFB]">
                  Capacity
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-[#475569]">Reserved Seats</label>
                    <Input
                      type="number"
                      {...register("reservedSites", { required: "Reserved Sites is required" })}
                      placeholder="Enter number"
                      className="w-full border-[#BBDEFB] focus:border-[#1E3A8A]"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-[#475569]">Available Seats</label>
                    <Input
                      type="number"
                      {...register("availableSites", { required: "Available Sites is required" })}
                      placeholder="Enter number"
                      className="w-full border-[#BBDEFB] focus:border-[#1E3A8A]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

      
          <div className="flex justify-center mb-16">
            <NextButton
             
              disabled={isSubmitting}
             name= {isSubmitting ? (
                <p className="flex items-center">
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating Event...
                </p>
              ) 
              : 
              (
                "Create Event"
              )
            }
            >
             
            </NextButton>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

// Simple upload icon component
const UploadIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
    />
  </svg>
);

export default AddEvent;