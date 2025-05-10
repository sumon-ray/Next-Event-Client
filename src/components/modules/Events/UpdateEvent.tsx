"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";

import { toast } from "sonner";
import { DialogFooter } from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import NextButton from "@/components/shared/NextButton";
import { UpdateEvent } from "@/services/EventService";

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
  category: "CONFERENCE" | "WORKSHOP" | "SEMINAR" | "NETWORKING" | "PARTY" | "CONCERT" | "EXHIBITION" | "OTHER";
  reservedSites?: number;
  availableSites?: number;
}

const UpdateEventForm = ({id}: {id:string}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
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
  const [loading, setLoading] = useState(false);

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

      const formData = new FormData();
    
      const start = combineDateTime(data.startDate!, data.startTime!);
      const end = combineDateTime(data.endDate!, data.endTime!);
      const payload: any = {
        title: data?.title,
        slug: data?.slug,
        venue: data?.venue,
        type: data?.type,
        isPaid: data?.isPaid,
        startDate: start.toISOString(),
        endDate: end.toISOString(),
      };
      if (data?.description) payload.description = data.description;
if (data?.fee) payload.fee = Number(data.fee);
if (data?.eventStatus) payload.eventStatus = data.eventStatus;
if (data?.category) payload.category = data.category;
if (data?.reservedSites) payload.reseveredSit = Number(data.reservedSites);
if (data?.availableSites) payload.availableSit = Number(data.availableSites);
      console.log("🚀 ~ onSubmit ~ payload:", payload)

      formData.append("data", JSON.stringify(payload));

      if (data?.bannerImage?.[0]) {
        formData.append("file", data.bannerImage[0]);
      }

      const updateEvent = await UpdateEvent(id,formData);
      console.log("🚀 ~ onSubmit ~ updateEvent:", updateEvent)

      if (!updateEvent.succcess) {
        toast.error(updateEvent.message || "Failed to upload event");
      } else {
        toast.success(updateEvent.message || "Event updated successfully");
      }
    } catch (err) {
      toast.error("An error occurred while updating the event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form id="updateEventForm" onSubmit={handleSubmit(onSubmit)} className="py-4 space-y-6">
      <div className="grid grid-cols-1 gap-6 ">
     
        <div className="space-y-4">
          <Input {...register("title")} placeholder="Event Title" />
          <Input {...register("slug")} placeholder="Unique Event Slug" />
          <Textarea rows={5} {...register("description")} placeholder="Event Description" />
        </div>

        <div className="space-y-4">
          <label className="text-sm font-medium">Start Date & Time</label>
          <Button type="button" variant="outline" className="justify-start w-full">
            <CalendarIcon className="w-4 h-4 mr-2" />
            {startDate ? format(startDate, "PPP") : "Pick a date"}
          </Button>
          <Calendar
            mode="single"
            selected={startDate}
            onSelect={(date) => setValue("startDate", date as Date)}
            classNames={{
                day_selected: "bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]",
                day_today: "text-[#1E3A8A] font-bold",
              }}
          />
          <Input type="time" {...register("startTime")} />

          <label className="mt-4 text-sm font-medium">End Date & Time</label>
          <Button type="button" variant="outline" className="justify-start w-full">
            <CalendarIcon className="w-4 h-4 mr-2" />
            {endDate ? format(endDate, "PPP") : "Pick a date"}
          </Button>
          <Calendar
            mode="single"
            selected={endDate}
            onSelect={(date) => setValue("endDate", date as Date)}
            classNames={{
                day_selected: "bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]",
                day_today: "text-[#1E3A8A] font-bold",
              }}
          />
          <Input type="time" {...register("endTime")} />
        </div>
      </div>


      <Input {...register("venue")} placeholder="Venue" />

   
      <div>
        <Input type="file" accept="image/*" {...register("bannerImage")} onChange={onImageChange} />
        {previewUrl && (
          <img src={previewUrl} alt="Banner Preview" className="object-cover w-full h-40 mt-2 border rounded-md" />
        )}
      </div>

 
      <Select onValueChange={(value) => setValue("category", value as any)}>
        <SelectTrigger>
          <SelectValue placeholder="Select Event Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="CONFERENCE">Conference</SelectItem>
          <SelectItem value="WORKSHOP">Workshop</SelectItem>
          <SelectItem value="SEMINAR">Seminar</SelectItem>
          <SelectItem value="NETWORKING">Networking</SelectItem>
          <SelectItem value="PARTY">Party</SelectItem>
          <SelectItem value="CONCERT">Concert</SelectItem>
          <SelectItem value="EXHIBITION">Exhibition</SelectItem>
          <SelectItem value="OTHER">Other</SelectItem>
        </SelectContent>
      </Select>

 
      <Select defaultValue="PUBLIC" onValueChange={(val) => setValue("type", val as "PUBLIC" | "PRIVATE")}>
        <SelectTrigger>
          <SelectValue placeholder="Select Event Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="PUBLIC">Public</SelectItem>
          <SelectItem value="PRIVATE">Private</SelectItem>
        </SelectContent>
      </Select>

   
      <Select onValueChange={(val) => setValue("eventStatus", val as any)}>
        <SelectTrigger>
          <SelectValue placeholder="Select Event Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="UPCOMING">Upcoming</SelectItem>
          <SelectItem value="ONGOING">Ongoing</SelectItem>
          <SelectItem value="ENDED">Ended</SelectItem>
        </SelectContent>
      </Select>

      
      <div className="flex items-center gap-2">
        <Checkbox checked={isPaid} onCheckedChange={(val) => setValue("isPaid", !!val)} />
        <span>Is Paid?</span>
      </div>
      {isPaid && <Input type="number" {...register("fee")} placeholder="Event Fee" />}

      
      <div className="grid grid-cols-2 gap-4">
        <Input type="number" {...register("reservedSites")} placeholder="Reserved Sits" />
        <Input type="number" {...register("availableSites")} placeholder="Available Sits" />
      </div>
      <div className="flex items-center justify-between gap-2">
      <DialogFooter>
          <DialogClose asChild className="">
            <Button variant="secondary" className="px-6 py-8 mt-2 text-center md:mt-0">Cancel</Button>
          </DialogClose>
          </DialogFooter>
          <NextButton name={loading  ? "Saving..." : "Save Changes"} ></NextButton>
      </div>
        
    </form>
  );
};

export default UpdateEventForm;
