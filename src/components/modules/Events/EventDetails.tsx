"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  TagIcon,
  UserIcon,
} from "lucide-react";
import { Category } from "@/components/modules/Events/Card";
import HeroSecton from "@/components/shared/HeroSecton";
import img from "../../../../public/images/img7.jpg";
import NextButton from "@/components/shared/NextButton";
import { useState } from "react";
import { makePayment } from "@/services/PaymentService";
import { toast } from "sonner";

const EventDetails = ({ event, organizer }: { event: any; organizer: any }) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async (id: string) => {
    // console.log(id);
    try {
      setLoading(true);
      const response = await makePayment({
        eventId: id,
        method: "Online",
      });

      if (response?.success) {
        const redirectUrl = response.data.paymentUrl;
        window.location.href = redirectUrl;
        // Optionally redirect or update UI
      } else {
         toast.error( response.message || "payment failed");
        console.error("Payment failed", response);
      }
    } catch (error) {
      console.error("handlePayment error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#E3F2FD] via-[#BBDEFB] to-[#29B6F6] md:pb-20">
      <HeroSecton
        img={img}
        title1="Next Level Events Await You"
        title2="Discover Your Next Adventure"
        title3="Celebrate Moments, Join Experiences"
      />

      <div className="min-h-screen px-4 py-10 md:px-20">
        <div className="container w-full mx-auto">
          <div className="relative w-full overflow-hidden shadow-xl h-[50dvh] rounded-2xl">
            <Image
              src={
                event.bannerImage ||
                "https://res.cloudinary.com/dp8c6enec/image/upload/v1746463121/s1or7qauhmvo83ltfuwb.jpg"
              }
              alt={event.title}
              fill
              className="object-fill rounded-2xl"
            />

            <div className="absolute p-6 text-white rounded-xl bottom-4 left-4 bg-black/60 backdrop-blur-md">
              <h1 className="text-3xl font-bold md:text-5xl drop-shadow-md text-shadow-lg">
                {event.title}
              </h1>
              <div className="flex items-center gap-3 mt-4">
                <Badge
                  className={`px-3 py-1 text-white text-xl font-medium shadow-lg rounded-full ${
                    event.category === Category.CONFERENCE
                      ? "bg-blue-600"
                      : event.category === Category.WORKSHOP
                      ? "bg-green-600"
                      : event.category === Category.SEMINAR
                      ? "bg-yellow-600"
                      : event.category === Category.NETWORKING
                      ? "bg-purple-600"
                      : event.category === Category.PARTY
                      ? "bg-pink-600"
                      : event.category === Category.CONCERT
                      ? "bg-red-600"
                      : event.category === Category.EXHIBITION
                      ? "bg-orange-600"
                      : "bg-gray-600"
                  }`}
                >
                  {event.category}
                </Badge>

                <Badge
                  className={`text-xs px-3 py-1 shadow rounded-full font-semibold ${
                    event.eventStatus === "UPCOMING"
                      ? "bg-blue-200 text-blue-800"
                      : event.eventStatus === "ONGOING"
                      ? "bg-green-200 text-green-800"
                      : "bg-gray-300 text-gray-800"
                  }`}
                >
                  {event.eventStatus}
                </Badge>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 mt-12 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <Card className="bg-white shadow-md rounded-2xl">
                <CardHeader>
                  <h2 className="text-3xl font-bold text-[#424242]">
                    About this Event
                  </h2>
                </CardHeader>
                <CardContent>
                  <p className="text-xl leading-relaxed text-[#616161]">
                    {event.description}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md rounded-2xl">
                <CardHeader>
                  <h2 className="text-3xl font-bold text-[#424242]">
                    Event Details
                  </h2>
                </CardHeader>
                <CardContent className="space-y-4 text-xl text-[#424242]">
                  <div className="flex items-center gap-3">
                    <CalendarIcon className="w-5 h-5 text-[#7CB342]" />
                    <span>
                      <strong>Start :</strong>{" "}
                      {new Date(event.startDate).toLocaleString("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ClockIcon className="w-5 h-5 text-[#42A5F5]" />
                    <span>
                      <strong>End :</strong>{" "}
                      {new Date(event.endDate).toLocaleString("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPinIcon className="w-5 h-5 text-[#F4511E]" />
                    <span>
                      <strong>Venue :</strong> {event.venue}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <TagIcon className="w-5 h-5 text-[#9575CD]" />
                    <span>
                      <strong>Type :</strong> {event.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <UserIcon className="w-5 h-5 text-[#FF7043]" />
                    <span>
                      <strong>Total Seats :</strong> {event.availableSit}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <UserIcon className="w-5 h-5 text-[#FF7043]" />
                    <span>
                      <strong>Reserved Seats :</strong> {event.reseveredSit}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <UserIcon className="w-5 h-5 text-[#FF7043]" />
                    <span>
                      <strong>Available Seats :</strong>{" "}
                      {Number(event.availableSit) - Number(event.reseveredSit)}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between ">
                  <div>
                    {event.isPaid ? (
                      <Badge className="bg-[#FFF3E0] text-[#F4511E] border border-[#F8BBD0] text-xl font-semibold">
                        Fee : {event.fee?.toString()} BDT
                      </Badge>
                    ) : (
                      <Badge className="bg-[#C8E6C9] text-[#388E3C] border border-[#A5D6A7] text-xl font-semibold">
                        Free Event
                      </Badge>
                    )}
                  </div>
                  <div>
                    {Number(event.availableSit) - Number(event.reseveredSit) >
                    0 ? (
                      event.isPaid ? (
                        <NextButton
                          onClick={() => handlePayment(event.id)}
                          name={
                            loading ? "Processing..." : "Payment & Register"
                          }
                          disabled={loading}
                        />
                      ) : (
                        <NextButton name="Free Register" />
                      )
                    ) : (
                      <Badge className="bg-[#F8BBD0] text-[#F4511E] border border-[#F8BBD0] text-xl font-semibold">
                        Full
                      </Badge>
                    )}
                  </div>
                </CardFooter>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="rounded-2xl shadow-md border border-[#E0E0E0] bg-white">
                <CardHeader>
                  <h2 className="text-3xl font-bold text-[#424242]">
                    Organizer
                  </h2>
                </CardHeader>
                <CardContent className="flex items-center gap-4">
                  <Image
                    src={
                      organizer?.profileImage ||
                      "https://res.cloudinary.com/dp8c6enec/image/upload/v1746463121/s1or7qauhmvo83ltfuwb.jpg"
                    }
                    alt={organizer?.name}
                    width={6000}
                    height={6000}
                    className="object-fill w-32 border border-gray-300 rounded-md"
                  />
                  <div>
                    <p className="font-semibold text-lg text-[#212121]">
                      {organizer?.name}
                    </p>
                    <p className="text-xl text-[#616161]">
                      {organizer?.occupation || "Organizer"}
                    </p>
                    <p className="text-md text-[#424242]">{organizer?.email}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl shadow-md border border-[#E0E0E0] bg-white">
                <CardHeader>
                  <h2 className="text-3xl font-bold text-[#424242]">
                    Contact Info
                  </h2>
                </CardHeader>
                <CardContent className="space-y-2 text-xl text-[#424242]">
                  <p>
                    <strong>Phone:</strong> {organizer?.phoneNumber}
                  </p>
                  {organizer?.address && (
                    <p>
                      <strong>Address:</strong> {organizer?.address}
                    </p>
                  )}
                  {organizer?.bio && (
                    <p className="italic text-[#757575]">{organizer?.bio}</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
