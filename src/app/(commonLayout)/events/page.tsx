'use client'
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Event, EventCard, EventType } from "@/components/modules/Events/Card"
import img from '../../../../public/images/img16.jpg'
import Title from "@/components/shared/Title"
import Link from "next/link"
import NextButton from "@/components/shared/NextButton"
import HeroSecton from "@/components/shared/HeroSecton"
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
   eventType: EventType.CONFERENCE,
    isPaid: true,
    fee: 299,
    organizerId:'12',
    type: "PUBLIC",
  },
  {
    id: "2",
    slug: "summer-music-festival",
    title: "Summer Music Festival",
    description: "A weekend of amazing music performances, food, and fun activities for the whole family.",
    dateTime: new Date("2023-07-22T16:00:00"),
    venue: "Central Park, New York",
    bannerImage: "/placeholder.svg?height=200&width=400&text=Music+Festival",
   eventType: EventType.CONCERT,
    isPaid: true,
    fee: 150,
    organizerId:'12',
    type: "PUBLIC",
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
   eventType: EventType.NETWORKING,
    isPaid: false,
    organizerId:'12',
    type: "PUBLIC",
  },
  {
    id: "4",
    slug: "digital-marketing-workshop",
    title: "Digital Marketing Workshop",
    description: "Learn the latest digital marketing strategies and tools to grow your business online.",
    dateTime: new Date("2023-09-12T10:00:00"),
    venue: "Business Center, Chicago",
    bannerImage: "/placeholder.svg?height=200&width=400&text=Marketing+Workshop",
   eventType: EventType.WORKSHOP,
    isPaid: true,
    fee: 75,
    organizerId:'12',
    type: "PRIVATE",
  },
  {
    id: "5",
    slug: "art-exhibition-modern",
    title: "Modern Art Exhibition",
    description: "Explore contemporary art pieces from emerging artists around the world.",
    dateTime: new Date("2023-10-08T11:00:00"),
    venue: "Metropolitan Gallery, Boston",
    bannerImage: "/placeholder.svg?height=200&width=400&text=Art+Exhibition",
   eventType: EventType.EXHIBITION,
    isPaid: true,
    fee: 25,
    organizerId:'12',
    type: "PRIVATE",
  },
  {
    id: "6",
    slug: "charity-gala-dinner",
    title: "Annual Charity Gala Dinner",
    description: "An elegant evening of dining and entertainment to raise funds for children's education.",
    dateTime: new Date("2023-12-03T19:00:00"),
    venue: "Grand Hotel, Miami",
    bannerImage: "/placeholder.svg?height=200&width=400&text=Charity+Gala",
   eventType: EventType.PARTY,
    isPaid: true,
    fee: 200,
    organizerId:'12',
    type: "PRIVATE",
  },
]

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isFreeOnly, setIsFreeOnly] = useState(false)
  const [minFee, setMinFee] = useState(0)
  const [maxFee, setMaxFee] = useState(300)


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
      const matchesPaid = !isFreeOnly || event.isPaid

      // Fee range filter (only for paid events)
      const matchesFee = !event.isPaid || (event.fee !== undefined && event.fee >= minFee && event.fee <= maxFee)

      return matchesSearch && matchesPaid && matchesFee
    })

    setFilteredEvents(filtered)
  }, [searchTerm, isFreeOnly, minFee, maxFee])
  // Filter states
   const [filteredEvents, setFilteredEvents] = useState<Event[]>(dummyEvents)

  return (
    <main className="">
    <HeroSecton img={img} title1="Next Level Events" title2="Browse Top Experiences" title3="Be Part of the Celebration" />
    <div className="container flex flex-col items-start justify-center gap-6 px-4 py-16 mx-auto md:px-0 lg:flex-row ">
    <div className="w-full space-y-6 lg:w-1/4">
  <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-2xl">
    <h2 className="mb-4 text-3xl font-bold tracking-wide text-transparent  drop-shadow-sm bg-gradient-to-r from-[#1E3A8A] via-[#3B82F6] to-[#1E293B] bg-clip-text"> Filter Events</h2>


    <div className="mb-4 space-y-2">
      <Label htmlFor="search" className="text-lg font-medium text-gray-700">
        🔍 Search
      </Label>
      <div className="relative ">
        <Search className="absolute left-3 top-2.5 h-4 w-4  text-gray-400" />
        <Input
          id="search"
          placeholder="Search by title, venue, description."
          className="w-full p-3 rounded-lg pl-9 focus-visible:ring-1 focus-visible:ring-purple-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <p className="text-xs text-gray-500 ">Search by title, description, or venue</p>
    </div>

   
    <div className="mb-4">
      <Label className="text-lg font-medium text-gray-700">💸 Pricing</Label>
      <div className="flex items-center gap-3 p-3 mt-2 transition border border-gray-200 rounded-lg bg-gray-50 hover:bg-gradient-to-r from-white to-blue-300 decoration-transparent ">
        <Checkbox
          id="isFree"
          checked={isFreeOnly}
          onCheckedChange={(checked) => setIsFreeOnly(!!checked)}
        />
        <Label htmlFor="isFree" className="text-lg text-gray-700">
          Show only <span className="font-semibold text-green-600">Free</span> events
        </Label>
      </div>
    </div>

   
    <div className="">
      <Label className="block mt-2 text-lg font-medium text-gray-700">💰 Price Range</Label>
      <div className="space-y-3">
        <div className="flex justify-between mt-2 text-lg font-medium text-gray-600">
          <span>Min: ৳{minFee}</span>
          <span>Max: ৳{maxFee}</span>
        </div>
        <div className="mb-6">
  <Label className="block mb-2 text-lg font-medium text-gray-700">Price Range</Label>
  <div className="flex items-center space-x-4">
 
    <div className="flex-1">
      <Select
        value={minFee.toString()}
        onValueChange={(value) => setMinFee(Number(value))}
      >
        <SelectTrigger>
          <SelectValue placeholder="Min" />
        </SelectTrigger>
        <SelectContent className="bg-gradient-to-r from-white to-blue-300 decoration-transparent ">
          {[0, 100, 500, 1000,2000].map((price) => (
            <SelectItem key={price} value={price.toString()}>
              ৳ {price}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>


    <div className="flex-1">
      <Select
        value={maxFee.toString()}
        onValueChange={(value) => setMaxFee(Number(value))}
      >
        <SelectTrigger>
          <SelectValue placeholder="Max" />
        </SelectTrigger>
        <SelectContent className="bg-gradient-to-r from-white to-blue-300 decoration-transparent ">
          {[100, 500, 1000, 2000, 5000].map((price) => (
            <SelectItem key={price} value={price.toString()}>
              ৳ {price}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  </div>
  <p className="mt-1 text-xs text-gray-500">Select minimum and maximum price</p>
</div>
      </div>
    </div>


    <div className="flex items-center justify-center mt-6"><NextButton
      name=" ♻️ Reset Filters"
      onClick={() => {
        setSearchTerm("")
        setIsFreeOnly(false)
        setMinFee(0)
        setMaxFee(300)
      }}
      
    >
     
    </NextButton></div>
  </div>
</div>

      <div className="container px-4 mx-auto lg:w-3/4 lg:px-0">
       
          

          <div className="w-full ">
            <div className="flex items-center justify-between mb-6">
              <Title title="All Events" />
              <p className="px-6 py-3 text-lg font-semibold text-center transition-all duration-300 rounded-full shadow-lg md:text-xl w-fit bg-gradient-to-r from-white to-blue-300 decoration-transparent ">
  🎉 {filteredEvents.length} Events Found
</p>

              <Link href="/dashboard/events/create" ><NextButton name="Create Event" /></Link>
            </div>
<div className="mt-16">
  
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
      </div>
  
    </main>
  )
}
