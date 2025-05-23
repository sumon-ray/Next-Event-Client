"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { Event, EventCard } from "@/components/modules/Events/Card";
import Title from "@/components/shared/Title";
import Link from "next/link";
import NextButton from "@/components/shared/NextButton";
import HeroSecton from "@/components/shared/HeroSecton";
import { getAllEvents } from "@/services/EventService";
import { toast } from "sonner";
import Loader from "@/components/ui/Loader/Loader";

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isPaid, setisPaid] = useState<boolean>();
  const [EventType, setEventType] = useState("");
  const [minFee, setMinFee] = useState(0);
  const [maxFee, setMaxFee] = useState(5000);
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);
  const [loading, setLoading] = useState(true);

  const handleApplyFilters = async () => {
    setLoading(true);
    const queryObj: any = {};

    if (searchTerm) {
      queryObj.searchTerm = searchTerm;
    }

    queryObj.isPaid = !isPaid;
    queryObj.EventType = EventType;

    if (minFee) {
      queryObj.minFee = minFee;
    }
    if (maxFee) {
      queryObj.maxFee = maxFee;
    }

    try {
      const data = await getAllEvents(queryObj);
      setEvents(data.data.data);
      setFilteredEvents(data.data.data);
    } catch (err: any) {
      toast.error(err?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getAllEvents({});
        setEvents(data.data.data);
        setFilteredEvents(data.data.data);
        setLoading(false);
      } catch (err) {
        console.error("🚀 ~ fetchEvents ~ err:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <main className="">
      <HeroSecton
        title1="Next Level Events"
        title2="Browse Top Experiences"
        title3="Be Part of the Celebration"
      />
      <div className="container flex min-h-[100vh] flex-col items-start justify-center gap-6 px-4 py-16 mx-auto md:px-0 lg:flex-row ">
        <div className="w-full space-y-6 lg:w-1/4">
          <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-2xl">
            <h2 className="mb-4 text-3xl font-bold tracking-wide text-transparent  drop-shadow-sm bg-gradient-to-r from-[#1E3A8A] via-[#3B82F6] to-[#1E293B] bg-clip-text">
              {" "}
              Filter Events
            </h2>

            <div className="mb-4 space-y-2">
              <Label
                htmlFor="search"
                className="text-lg font-medium text-gray-700"
              >
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
            </div>
            <div className="flex flex-col items-start gap-3 mb-4 transition rounded-lg bg-gray-50 ">
              <Label
                htmlFor="isFree"
                className="flex items-center gap-2 text-lg text-gray-700"
              >
                🗓️ Show Events
              </Label>
              <Select
                value={EventType}
                onValueChange={(value) => setEventType(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Events" />
                </SelectTrigger>
                <SelectContent className="bg-gradient-to-r from-white to-blue-300 decoration-transparent ">
                  {["PRIVATE", "PUBLIC"].map((price) => (
                    <SelectItem key={price} value={price.toString()}>
                      {price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="mb-4">
              <Label className="text-lg font-medium text-gray-700">
                💸 Pricing
              </Label>

              <div className="flex items-center gap-3 p-3 mt-2 transition border border-gray-200 rounded-lg bg-gray-50 hover:bg-gradient-to-r from-white to-blue-300 decoration-transparent ">
                <Checkbox
                  id="isFree"
                  checked={isPaid}
                  onCheckedChange={(checked) => setisPaid(!!checked)}
                />
                <Label htmlFor="isFree" className="text-lg text-gray-700">
                  Show only{" "}
                  <span className="font-semibold text-green-600">Free</span>{" "}
                  events
                </Label>
              </div>
            </div>

            <div className="">
              <Label className="block mt-2 text-lg font-medium text-gray-700">
                💰 Price Range
              </Label>
              <div className="space-y-3">
                <div className="flex justify-between mt-2 text-lg font-medium text-gray-600">
                  <span>Min: ৳ {minFee}</span>
                  <span>Max: ৳ {maxFee}</span>
                </div>
                <div className="mb-6">
                  <Label className="block mb-2 text-lg font-medium text-gray-700">
                    Price Range
                  </Label>
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
                          {[0, 100, 500, 1000, 2000].map((price) => (
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
                        <SelectContent>
                          {[100, 500, 1000, 2000, 5000].map((price) => (
                            <SelectItem
                              className="hover:bg-gradient-to-r from-white to-blue-300 decoration-transparent"
                              key={price}
                              value={price.toString()}
                            >
                              ৳ {price}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Select minimum and maximum price
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6 ">
              <NextButton
                name={loading ? "Loading..." : "Apply Filters"}
                onClick={handleApplyFilters}
              ></NextButton>
              <NextButton
                name={loading ? "Loading..." : "♻️ Reset"}
                onClick={async () => {
                  setLoading(true);
                  const data = await getAllEvents({});
                  setEvents(data.data.data);
                  setFilteredEvents(data.data.data);
                  setLoading(false);
                }}
              ></NextButton>
            </div>
          </div>
        </div>

        <div className="container px-4 mx-auto lg:w-3/4 lg:px-0">
          <div className="w-full ">
            <div className="flex items-center justify-between mb-6">
              <Title title="All Events" />
              <p className="hidden px-6 py-3 text-lg font-semibold text-center transition-all duration-300 rounded-full shadow-lg md:text-xl w-fit bg-gradient-to-r md:block from-white to-blue-300 decoration-transparent ">
                🎉 {filteredEvents.length} Events Found
              </p>

              <Link href="/profile/add-event">
                <NextButton name="Create Event" />
              </Link>
            </div>
            <div className="mt-16">
              {loading ? (
                <div className="flex items-center h-[60dvh] justify-center">
                  <Loader></Loader>
                </div>
              ) : filteredEvents.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredEvents.map((event, index) => (
                    <EventCard key={index} event={event} />
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center rounded-lg bg-gray-50">
                  <h3 className="text-lg font-medium text-gray-900">
                    No events found
                  </h3>
                  <p className="mt-2 text-gray-500">
                    Try adjusting your filters to find events.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}


export const dynamic = 'force-dynamic'