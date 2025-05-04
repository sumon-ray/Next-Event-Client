import Image from "next/image";
import { CalendarIcon, MapPinIcon, ClockIcon, TagIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import img from '../../../../public/images/img16.jpg'
import NextButton from "@/components/shared/NextButton";
import { motion } from "motion/react"
export enum EventType {
  CONFERENCE = "CONFERENCE",
  WORKSHOP = "WORKSHOP",
  SEMINAR = "SEMINAR",
  NETWORKING = "NETWORKING",
  PARTY = "PARTY",
  CONCERT = "CONCERT",
  EXHIBITION = "EXHIBITION",
  OTHER = "OTHER",
}

export interface Event {
  id: string;
  slug: string;
  title: string;
  description: string;
  dateTime: Date;
  venue: string;
  bannerImage?: string;

  type :'PUBLIC' | 'PRIVATE';
  isPaid: boolean;
  fee?: number;
  organizerId: string;
  eventType: EventType;
}

export function EventCard({ event }: { event: Event }) {
  

  const startTime = new Date(event.dateTime);
  const endTime = new Date(startTime.getTime() + 2 * 60 * 60 * 1000); 

  return (
    <motion.div
  initial={{ transform: "translateY(100px)", opacity: 0 }}
  animate={{ transform: "translateY(0px)" , opacity: 1}}
  transition={{
    duration: 0.8,
    
    ease: [0, 0.71, 0.2, 1.01],
  }}
>
    <Card
      className={`flex flex-col h-full overflow-hidden transition-transform duration-300  shadow-md ${
        !event.isPaid ? "bg-green-50 border-green-200" : "bg-white"
      }`}
    >
      <div className="relative w-full h-48">
        <Image
          src={img}
          alt={event.title}
          fill
          className="object-cover"
        />
        <Badge
          className={`absolute top-4 left-4 text-white shadow ${
            event.eventType === EventType.CONFERENCE
              ? "bg-blue-600"
              : event.eventType === EventType.WORKSHOP
              ? "bg-green-600"
              : event.eventType === EventType.SEMINAR
              ? "bg-yellow-600"
              : event.eventType === EventType.NETWORKING
              ? "bg-purple-600"
              : event.eventType === EventType.PARTY
              ? "bg-pink-600"
              : event.eventType === EventType.CONCERT
              ? "bg-red-600"
              : event.eventType === EventType.EXHIBITION
              ? "bg-orange-600"
              : ""
          }`}
        >
          {event.eventType}
        </Badge>
      </div>

      <CardHeader className="pb-2">
      <div className="flex items-start justify-between gap-2">
  <h3 className="text-lg font-semibold tracking-wide text-transparent drop-shadow-sm bg-gradient-to-r from-[#1E3A8A] via-[#3B82F6] to-[#1E293B] bg-clip-text line-clamp-2 flex-1 min-w-0">
    {event.title}
  </h3>
  {event.isPaid ? (
    <Badge className="font-bold text-purple-700 bg-purple-100 border border-purple-300 shrink-0 whitespace-nowrap">
      {event.fee} BDT
    </Badge>
  ) : (
    <Badge className="font-semibold text-green-700 bg-green-100 border border-green-300 shrink-0 whitespace-nowrap">
      Free
    </Badge>
  )}
</div>

      </CardHeader>

      <CardContent className="flex-grow space-y-3">
        <p className="text-sm text-gray-600 line-clamp-3">{event.description.slice(0, 200) + "..."}</p>

        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-purple-500" />
            <span>
              <strong>Start Time:</strong>{" "}
              {startTime.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <ClockIcon className="w-4 h-4 text-purple-500" />
            <span>
              <strong>End Time:</strong>{" "}
              {endTime.toLocaleString("en-US", { timeStyle: "short" })}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <MapPinIcon className="w-4 h-4 text-purple-500" />
            <span>
              <strong>Venue:</strong> {event.venue}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <TagIcon className="w-4 h-4 text-purple-500" />
            <span>
              <strong>Organizer:</strong> {event.organizerId}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <TagIcon className="w-4 h-4 text-purple-500" />
            <span>
              <strong>Type:</strong> {event.type}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-center pt-3">
        <NextButton name="View Details">
          
        </NextButton>
      </CardFooter>
    </Card>
    </motion.div>
  );
}
