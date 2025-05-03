"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Event, EventCard, EventType } from "@/components/modules/EventCard/Card"
import img from '../../../../public/images/img16.jpg'
import Title from "@/components/shared/Title"
// Sample data for demonstration
const dummyEvents: Event[] = [
  {
    id: "1",
    slug: "tech-conference-2023",
    title: "Tech Conference 2023",
    description:
      "Join us for the biggest tech conference of the year featuring industry leaders and innovative workshops.",
    dateTime: new Date("2023-11-15T09:00:00"),
    venue: "Tech Convention Center, New York",
    bannerImage: "/placeholder.svg?height=200&width=400&text=Tech+Conference",
    type: EventType.CONFERENCE,
    isPaid: true,
    fee: 299,
    organizerId:'12',
  },
  {
    id: "2",
    slug: "summer-music-festival",
    title: "Summer Music Festival",
    description: "A weekend of amazing music performances, food, and fun activities for the whole family.",
    dateTime: new Date("2023-07-22T16:00:00"),
    venue: "Central Park, New York",
    bannerImage: "/placeholder.svg?height=200&width=400&text=Music+Festival",
    type: EventType.CONCERT,
    isPaid: true,
    fee: 150,
    organizerId:'12',
  },
  {
    id: "3",
    slug: "startup-networking-event",
    title: "Startup Networking Event",
    description:
      "Connect with fellow entrepreneurs, investors, and industry experts in this exclusive networking event.",
    dateTime: new Date("2023-08-05T18:30:00"),
    venue: "Innovation Hub, San Francisco",
    bannerImage: "/placeholder.svg?height=200&width=400&text=Networking+Event",
    type: EventType.NETWORKING,
    isPaid: false,
    organizerId:'12',
  },
  {
    id: "4",
    slug: "digital-marketing-workshop",
    title: "Digital Marketing Workshop",
    description: "Learn the latest digital marketing strategies and tools to grow your business online.",
    dateTime: new Date("2023-09-12T10:00:00"),
    venue: "Business Center, Chicago",
    bannerImage: "/placeholder.svg?height=200&width=400&text=Marketing+Workshop",
    type: EventType.WORKSHOP,
    isPaid: true,
    fee: 75,
    organizerId:'12',
  },
  {
    id: "5",
    slug: "art-exhibition-modern",
    title: "Modern Art Exhibition",
    description: "Explore contemporary art pieces from emerging artists around the world.",
    dateTime: new Date("2023-10-08T11:00:00"),
    venue: "Metropolitan Gallery, Boston",
    bannerImage: "/placeholder.svg?height=200&width=400&text=Art+Exhibition",
    type: EventType.EXHIBITION,
    isPaid: true,
    fee: 25,
    organizerId:'12',
  },
  {
    id: "6",
    slug: "charity-gala-dinner",
    title: "Annual Charity Gala Dinner",
    description: "An elegant evening of dining and entertainment to raise funds for children's education.",
    dateTime: new Date("2023-12-03T19:00:00"),
    venue: "Grand Hotel, Miami",
    bannerImage: "/placeholder.svg?height=200&width=400&text=Charity+Gala",
    type: EventType.PARTY,
    isPaid: true,
    fee: 200,
    organizerId:'12',
  },
]

export default function EventsPage() {
  // Filter states
  const [searchTerm, setSearchTerm] = useState("")
  const [isPaidOnly, setIsPaidOnly] = useState(false)
  const [minFee, setMinFee] = useState(0)
  const [maxFee, setMaxFee] = useState(300)
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(dummyEvents)

  // Apply filters when any filter changes
  useEffect(() => {
    const filtered = dummyEvents.filter((event) => {
      // Search term filter (title, description, venue)
      const matchesSearch =
        searchTerm === "" ||
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.venue.toLowerCase().includes(searchTerm.toLowerCase())

      // Paid filter
      const matchesPaid = !isPaidOnly || event.isPaid

      // Fee range filter (only for paid events)
      const matchesFee = !event.isPaid || (event.fee !== undefined && event.fee >= minFee && event.fee <= maxFee)

      return matchesSearch && matchesPaid && matchesFee
    })

    setFilteredEvents(filtered)
  }, [searchTerm, isPaidOnly, minFee, maxFee])

  return (
    <main>
    

      <div className="relative w-full h-[50dvh]">
        <Image
          src={img}
          alt="Events Banner"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-left bg-black/60">
         
           <div className="container px-4 py-12 mx-auto">
           <h1 className="text-3xl font-extrabold leading-tight tracking-wide text-white md:text-5xl lg:text-6xl">
      <span className="my-2 text-[#3B82F6]">Next-Level Events</span><br />
      <span className="text-[#FACC15]">Browse Top Experiences</span><br />
      <span className="text-[#FACC15]">Be Part of the Celebration</span><br />
    
    </h1>
           </div>
        </div>
      </div>

      <div className="container px-4 py-12 mx-auto">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Left Sidebar - Filters */}
          <div className="w-full space-y-6 lg:w-1/4">
            <div className="p-6 bg-white border rounded-lg shadow-sm">
              <h2 className="mb-4 text-xl font-semibold">Filter Events</h2>

              {/* Search */}
              <div className="mb-6">
                <Label htmlFor="search" className="block mb-2">
                  Search
                </Label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Search events..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">Search by title, description or venue</p>
              </div>

              {/* Paid Filter */}
              <div className="mb-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isPaid"
                    checked={isPaidOnly}
                    onCheckedChange={(checked) => setIsPaidOnly(checked === true)}
                  />
                  <Label htmlFor="isPaid">Paid events only</Label>
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <Label className="block mb-2">Price Range</Label>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Min: ${minFee}</span>
                      <span>Max: ${maxFee}</span>
                    </div>
                    <Slider
                      defaultValue={[minFee, maxFee]}
                      min={0}
                      max={500}
                      step={10}
                      onValueChange={(values) => {
                        setMinFee(values[0])
                        setMaxFee(values[1])
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Reset Filters */}
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSearchTerm("")
                  setIsPaidOnly(false)
                  setMinFee(0)
                  setMaxFee(300)
                }}
              >
                Reset Filters
              </Button>
            </div>
          </div>

          {/* Right Side - Event Cards */}
          <div className="w-full lg:w-3/4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">All Events</h2>
              <p className="text-gray-500">{filteredEvents.length} events found</p>
            </div>

            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredEvents.map((event,index) => (
                  <EventCard key={index} event={event} />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center rounded-lg bg-gray-50">
                <h3 className="text-lg font-medium text-gray-900">No events found</h3>
                <p className="mt-2 text-gray-500">Try adjusting your filters to find events.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
