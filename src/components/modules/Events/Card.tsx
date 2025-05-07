"use client"

import Image from "next/image"
import { CalendarIcon, MapPinIcon, ClockIcon, TagIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import NextButton from "@/components/shared/NextButton"
import { motion } from "framer-motion"
import Link from "next/link"

export enum Category {
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
  id: string
  slug: string
  title: string
  description: string
  startDate: Date,
  endDate: Date,
  venue: string
  availableSit: number
  reseveredSit: number
  bannerImage?: string
  eventStatus: "UPCOMING" | "ONGOING" | "ENDED"
  type: "PUBLIC" | "PRIVATE"
  isPaid: boolean
  fee?: number
  organizerId: string
  category: Category
}

export function EventCard({ event }: { event: Event }) {

  const startTime = new Date(event.startDate)
  const endTime = new Date(event.endDate)

  return (
<motion.div
  initial={{ opacity: 0, y: 80 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
>
  <Card
    className={`flex flex-col h-[550px] overflow-hidden transition-transform duration-300 shadow-md ${
      !event.isPaid ? "bg-green-50 border-green-200" : "bg-white"
    }`}
  >

    <div className="relative w-full h-[190px]">
      <Image
        src={event.bannerImage || "https://res.cloudinary.com/dp8c6enec/image/upload/v1746463121/s1or7qauhmvo83ltfuwb.jpg"}
        alt={event.title}
        fill
        className="object-cover rounded-t-md"
      />

  
      <Badge
        className={`absolute top-4 left-4 text-white shadow ${
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
            : ""
        }`}
      >
        {event.category}
      </Badge>

 
      <Badge
        className={`absolute top-4 right-4 shadow-sm text-sm px-2 py-1 rounded ${
          event.eventStatus === "UPCOMING"
            ? "bg-blue-100 text-blue-700 border border-blue-300"
            : event.eventStatus === "ONGOING"
            ? "bg-green-100 text-green-700 border border-green-300"
            : "bg-gray-200 text-gray-700 border border-gray-300"
        }`}
      >
        {event.eventStatus}
      </Badge>
    </div>

    <CardHeader className="pb-2">
      <div className="flex items-start justify-between gap-2">
        <h3 className="flex-1 min-w-0 text-xl font-semibold tracking-wide text-transparent bg-gradient-to-r from-blue-800 via-blue-500 to-gray-900 bg-clip-text line-clamp-2">
          {event.title}
        </h3>
        {event.isPaid ? (
          <Badge className="px-2 py-1 font-bold text-purple-700 bg-purple-100 border border-purple-300">
            {event.fee} BDT
          </Badge>
        ) : (
          <Badge className="px-2 py-1 font-semibold text-green-700 bg-green-100 border border-green-300">
            Free
          </Badge>
        )}
      </div>
    </CardHeader>

    <CardContent className="flex-grow space-y-3 overflow-hidden">
      
      <p className="text-sm text-gray-600 line-clamp-4">
        {event.description} ...
      </p>

      <div className="space-y-2 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-purple-500" />
          <span>
            <strong>Start:</strong>{" "}
            {startTime.toLocaleString("en-US", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <ClockIcon className="w-4 h-4 text-purple-500" />
          <span>
            <strong>End:</strong>{" "}
            {endTime.toLocaleString("en-US", {
              timeStyle: "short",
            })}
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
            <strong>Type:</strong> {event.type}
          </span>
        </div>
      </div>
    </CardContent>

    <CardFooter className="flex justify-center pt-3 pb-8">
      <Link href={`/events/${event.slug}`}>
      <NextButton name="View Details" />
      </Link>
    </CardFooter>
  </Card>
</motion.div>

  )
}
