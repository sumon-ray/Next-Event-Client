import Image from "next/image"
import { CalendarIcon, MapPinIcon, Clock, Tag } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Define the EventType enum to match your schema
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

// Define the Event interface based on your schema
export interface Event {
  id: string
  slug: string
  title: string
  description: string
  dateTime: Date
  venue: string
  bannerImage?: string
  type: EventType
  isPaid: boolean
  fee?: number
  organizerId:string
}

export function EventCard({ event }: { event: Event }) {
    function formatCurrency(amount: number): React.ReactNode {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "BDT",
        }).format(amount);
    }

  return (
    <Card className="flex flex-col h-full overflow-hidden">
      <div className="relative w-full h-48">
        <Image
          src={event.bannerImage || "/placeholder.svg?height=200&width=400"}
          alt={event.title}
          fill
          className="object-cover"
        />
        <Badge
          className={`absolute top-4 right-4 ${
            event.type === EventType.CONFERENCE
              ? "bg-blue-500"
              : event.type === EventType.WORKSHOP
                ? "bg-green-500"
                : event.type === EventType.SEMINAR
                  ? "bg-yellow-500"
                  : event.type === EventType.NETWORKING
                    ? "bg-purple-500"
                    : event.type === EventType.PARTY
                      ? "bg-pink-500"
                      : event.type === EventType.CONCERT
                        ? "bg-red-500"
                        : event.type === EventType.EXHIBITION
                          ? "bg-orange-500"
                          : "bg-gray-500"
          }`}
        >
          {event.type}
        </Badge>
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold line-clamp-2">{event.title}</h3>
          {event.isPaid ? (
            <Badge variant="outline" className="text-purple-700 border-purple-200 bg-purple-50">
              {formatCurrency(event.fee || 0)}
            </Badge>
          ) : (
            <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">
              Free
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-grow">
        <p className="mb-4 text-sm text-gray-600 line-clamp-3">{event.description}</p>

        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <CalendarIcon className="w-4 h-4 mr-2 text-purple-500" />
            <span>{new Date(event.dateTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-2 text-purple-500" />
            <span>{new Date(event.dateTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <MapPinIcon className="w-4 h-4 mr-2 text-purple-500" />
            <span className="line-clamp-1">{event.venue}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Tag className="w-4 h-4 mr-2 text-purple-500" />
            <span className="line-clamp-1">By {event.organizerId}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-2">
        <Button className="w-full bg-purple-600 hover:bg-purple-700">View Details</Button>
      </CardFooter>
    </Card>
  )
}
