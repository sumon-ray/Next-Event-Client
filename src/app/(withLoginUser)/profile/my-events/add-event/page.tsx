"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Title from "@/components/shared/Title";
import { createEvent } from "@/services/EventService";
import NextButton from "@/components/shared/NextButton";
import { toast } from "sonner";
import Image from "next/image";

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
;

const AddEvent = () => {
  const {
    register,
    handleSubmit,
    watch,reset,
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
try{
  setLoading(true);
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
    isPaid: data.isPaid ||false ,
    fee: data.fee ? Number(data.fee) : 0,
    eventStatus: data.eventStatus || "UPCOMING",
    category: data.category || "OTHER",
    reseveredSit: Number(data.reservedSites),
    availableSit: Number(data.availableSites)

  }


  formData.append("data", JSON.stringify(payload));
  if (data.bannerImage) {
    formData.append("file", data.bannerImage[0]);
  }
  const uploadEvent = await createEvent(formData);
  if(!uploadEvent.succcess){
    toast.error(uploadEvent.message || 'Failed to upload event');  setLoading(false);
  }
  else{
    setLoading(false);
    toast.success(uploadEvent.message || 'Event uploaded successfully');
    reset();
  }
  

}
catch(err:any){
  console.log("🚀 ~ onSubmit ~ err:", err)
  reset();
  toast.error(err.message || 'Failed to upload event');
  setLoading(false); 
}



  }

  return (
    <div className="p-4 sm:p-6 md:px-10 ">
      <Title title="Add Event" />
      <p className="mb-6 text-lg text-[#475569]">Add your event for your customers</p>

      <form
        onSubmit={handleSubmit(onSubmit)}

      >

        <div className="grid grid-cols-1 gap-6 mb-12 xl:grid-cols-3">
          <div className="space-y-6 xl:col-span-2">
            <div className="bg-[#FFFFFF] border rounded-xl shadow-md">
              <div className="px-6 py-4 text-2xl font-semibold border-b text-[#1E3A8A]">
                Basic Info
              </div>
              <div className="p-6 space-y-5">
                <Input
                  className="w-full focus:ring-2 ring-[#1E3A8A]"
                  {...register("title", { required: true })}
                  placeholder="Event Title"
                />
                <Input
                  className="w-full focus:ring-2 ring-[#1E3A8A]"
                  {...register("slug", { required: true })}
                  placeholder="An Unique Event Title"
                />

                <Textarea
                  rows={6}
                  className="w-full focus:ring-2 ring-[#1E3A8A]"
                  {...register("description", { required: true })}
                  placeholder="Description"
                />

                <div className="flex flex-col justify-between gap-4 lg:flex-row ">
                  <div className="flex flex-col space-y-2 w-fit">
                    <label className="text-md  font-medium text-[#475569]">
                      Start Date
                    </label>
                    <Button
                      type="button"
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal rounded-md",
                        !startDate && "text-muted-foreground"
                      )}
                    ><CalendarIcon className="w-4 h-4 mr-2" />
                      {startDate ? format(startDate, "PPP") : "Pick a date"}
                    </Button>
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={(date) => setValue("startDate", date as Date)}
                      className="flex items-center justify-center py-4 border-2 rounded-md shadow-sm"
                      classNames={{
                        day_selected: "bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]",
                        day_today: "text-[#1E3A8A] font-bold",
                      }}
                    />
                    <Input
                      type="time"
                      placeholder="Start Time"
                      {...register("startTime", { required: true })}
                      className="w-full focus:ring-2 ring-[#1E3A8A]"
                    />
                  </div>

                  <div className="flex flex-col space-y-2 w-fit">
                    <label className="text-md font-medium text-[#475569]">
                      End Date
                    </label>
                    <Button
                      type="button"
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal rounded-md",
                        !endDate && "text-muted-foreground"
                      )}
                    >  <CalendarIcon className="w-4 h-4 mr-2" />
                      {endDate ? format(endDate, "PPP") : "Pick a date"}
                    </Button>
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={(date) => setValue("endDate", date as Date)}
                      className="flex items-center justify-center py-4 border-2 rounded-md shadow-sm"
                      classNames={{
                        day_selected: "bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]",
                        day_today: "text-[#1E3A8A] font-bold",
                      }}
                    />
                    <Input
                      type="time"
                      placeholder="End Time"
                      {...register("endTime", { required: true })}
                      className="w-full focus:ring-2 ring-[#1E3A8A]"
                    />
                  </div>

                </div>

                <Input
                  className="w-full focus:ring-2 ring-[#1E3A8A]"
                  {...register("venue", { required: true })}
                  placeholder="Venue"
                />
              </div>
            </div>
            <div className="bg-[#FFFFFF] border rounded-xl shadow-md">
              <div className="px-6 py-4 text-xl font-semibold border-b text-[#1E3A8A]">
                Price Details
              </div>
              <div className="p-6 space-y-4 shadow-sm ">
                <div className="flex items-center justify-start gap-4 text-[#475569]">
                  <Checkbox
                    id="isFree"
                    checked={isPaid}
                    onCheckedChange={(checked) => setValue("isPaid", !!checked)}
                  >
                    Is Paid?
                  </Checkbox>
                  Is It Paid?
                </div>

                {isPaid && (
                  <Input
                    type="number"
                    step="0.01"
                    {...register("fee")}
                    placeholder="Event Fee"
                    className="w-full focus:ring-2 ring-[#1E3A8A]"
                  />
                )}
              </div>
            </div>

          </div>


          <div className="space-y-6">
            <div className="bg-[#FFFFFF] border rounded-xl shadow-md">
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
                {previewUrl && (
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    className="object-cover w-full mt-4 border rounded-md max-h-52"
                  />
                )}
              </div>
            </div>

            <div className="bg-[#FFFFFF] border rounded-xl shadow-md">
              <div className="px-6 py-4 text-xl font-semibold border-b text-[#1E3A8A]">
                Event Type
              </div>
              <div className="p-6">
                <Select
                  defaultValue="PUBLIC"
                  onValueChange={(value) => setValue("type", value as "PUBLIC" | "PRIVATE")}
                >
                  <SelectTrigger className="w-full focus:ring-2 ring-[#1E3A8A]">
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PUBLIC">Public</SelectItem>
                    <SelectItem value="PRIVATE">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>

            </div>


            <div className="bg-[#FFFFFF] border rounded-xl shadow-md">
              <div className="px-6 py-4 text-xl font-semibold border-b text-[#1E3A8A]">
                Event Details
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block  text-md  py-1 text-[#475569]">
                    Event Status
                  </label>
                  <Select
                    defaultValue="UPCOMING"
                    onValueChange={(value) => setValue("eventStatus", value as FormValues["eventStatus"])}
                  >
                    <SelectTrigger className="w-full focus:ring-2 ring-[#1E3A8A]">
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem className="hover:bg-gradient-to-r from-white to-blue-300 decoration-transparent " value="UPCOMING">Upcoming</SelectItem>
                      <SelectItem className="hover:bg-gradient-to-r from-white to-blue-300 decoration-transparent " value="ONGOING">Ongoing</SelectItem>
                      <SelectItem className="hover:bg-gradient-to-r from-white to-blue-300 decoration-transparent " value="ENDED">Ended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block  text-md  py-1 text-[#475569]">
                    Category
                  </label>
                  <Select
                    onValueChange={(value) => setValue("category", value as FormValues["category"])}
                  >
                    <SelectTrigger className="w-full focus:ring-2 ring-[#1E3A8A]">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem className="hover:bg-gradient-to-r from-white to-blue-300 decoration-transparent" value="CONFERENCE">Conference</SelectItem>
                      <SelectItem className="hover:bg-gradient-to-r from-white to-blue-300 decoration-transparent" value="WORKSHOP">Workshop</SelectItem>
                      <SelectItem className="hover:bg-gradient-to-r from-white to-blue-300 decoration-transparent" value="SEMINAR">Seminar</SelectItem>
                      <SelectItem className="hover:bg-gradient-to-r from-white to-blue-300 decoration-transparent" value="NETWORKING">Networking</SelectItem>
                      <SelectItem className="hover:bg-gradient-to-r from-white to-blue-300 decoration-transparent" value="PARTY">Party</SelectItem>
                      <SelectItem className="hover:bg-gradient-to-r from-white to-blue-300 decoration-transparent" value="CONCERT">Concert</SelectItem>
                      <SelectItem className="hover:bg-gradient-to-r from-white to-blue-300 decoration-transparent" value="EXHIBITION">Exhibition</SelectItem>
                      <SelectItem className="hover:bg-gradient-to-r from-white to-blue-300 decoration-transparent" value="OTHER">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>


            <div className="bg-[#FFFFFF] border rounded-xl shadow-md">
              <div className="px-6 py-4 text-xl font-semibold border-b text-[#1E3A8A]">
                Site Capacity
              </div>
              <div className="p-6 space-y-4">
                <Input
                  type="number"
                  {...register("reservedSites", { required: "Reserved Sites is required" })}
                  placeholder="Reserved Sites"
                  className="w-full focus:ring-2 ring-[#1E3A8A]"
                />
                <Input
                  type="number"
                  {...register("availableSites", { required: "Available Sites is required" })}
                  placeholder="Available Sites"
                  className="w-full focus:ring-2 ring-[#1E3A8A]"
                />
              </div>
            </div>


          </div>
        </div>
        <div className="flex items-center justify-center mb-16 ">

          <NextButton name="Submit" disabled={loading} />
        </div>
      </form>
    </div>
  );
};

export default AddEvent;
