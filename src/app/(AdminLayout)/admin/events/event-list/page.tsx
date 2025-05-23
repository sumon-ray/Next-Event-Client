"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Title from "@/components/shared/Title";
import { getAllEvents } from "@/services/EventService";
import { DeleteModal } from "@/components/modules/Events/DeleteModal";
import { IEvent } from "@/app/types";
import { debounce } from "@/app/utils/debounce";
import Loader from "@/components/ui/Loader/Loader";
import Link from "next/link";

const EventList = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false); 
  const limit = 10;

  const [filters, setFilters] = useState({
    isPaid: "",
    isPrivate: "",
    minFee: "",
    maxFee: "",
    searchTerm: "",
  });

  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); 
      try {
        const query = {
          page,
          limit,
          isPaid: filters.isPaid || undefined,
          isPrivate: filters.isPrivate || undefined,
          minFee: filters.minFee ? Number(filters.minFee) : undefined,
          maxFee: filters.maxFee ? Number(filters.maxFee) : undefined,
          searchTerm: filters.searchTerm || undefined,
        };

        const res = await getAllEvents(query);
        setEvents(res?.data?.data || []);
        setTotal(res?.data?.meta?.total || 0);
      } catch (error) {
        console.error("Failed to fetch events:", error);
        setEvents([]);
        setTotal(0);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, [filters, page]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setPage(1);
  };

  const handleSearchChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, searchTerm: e.target.value }));
    setPage(1);
  }, 300);

  return (
    <div className="px-10 py-6 mb-20">
      <div className="flex items-center justify-between mb-4">
        <Title title="Manage All Events" />
      </div>

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title..."
          onChange={handleSearchChange}
          className="p-2 border border-gray-300 rounded w-[200px]"
        />

        <select
          name="isPrivate"
          value={filters.isPrivate}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">All Types</option>
          <option value="PUBLIC">Public</option>
          <option value="PRIVATE">Private</option>
        </select>

        <select
          name="isPaid"
          value={filters.isPaid}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">All Prices</option>
          <option value="true">Paid</option>
          <option value="false">Free</option>
        </select>

        <input
          type="number"
          name="minFee"
          placeholder="Min Price"
          value={filters.minFee}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded"
        />

        <input
          type="number"
          name="maxFee"
          placeholder="Max Price"
          value={filters.maxFee}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Loading indicator */}
      {loading ? (
         <div className='flex items-center justify-center min-h-screen'>
            <Loader />
        </div>
      ) : events.length > 0 ? (
        <div className="w-full overflow-x-auto border-t border-white rounded-lg shadow-md border-1">
          <table className="min-w-[900px] w-full text-left text-base">
            <thead className="text-sm font-medium text-gray-500 uppercase border-b border-white">
              <tr>
                <th className="px-4 py-3 w-[200px] pl-10">Title</th>
                <th className="px-4 py-3 w-[200px] border-2">Venue</th>
                <th className="px-4 py-3 w-[200px] border-2">Price</th>
                <th className="px-4 py-3 w-[140px] border-2">Event Type</th>
                <th className="px-4 py-3 w-[180px] border-2">Paid / Free</th>
                <th className="px-4 py-3 w-[120px] border-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="border-white">
                  <td className="flex items-center h-full gap-3 px-4 border-2 py-9">
                    <div className="relative w-10 h-10">
                      <Image
                        src={event.bannerImage || "/placeholder.svg"}
                        alt={event.title}
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                    <Link href={`/events/${event.slug}`}>
                    <span className="font-medium text-gray-800">{event.title}</span>
                    </Link>
                  </td>
                  <td className="h-full px-4 py-4 truncate border-2">{event.venue}</td>
                  <td className="h-full px-4 py-4 truncate border-2">{event.fee}</td>
                  <td className="h-full px-4 py-4 border-2">{event.type}</td>
                  <td className="h-full px-4 py-4 border-2">{event.isPaid ? "Paid" : "Free"}</td>
                  <td className="flex items-center justify-center h-full gap-4 my-4">
                    <DeleteModal id={event.id!} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-semibold text-center text-gray-500">No Events Found</h1>
        </div>
      )}

      <div className="flex justify-center mt-6 space-x-2">
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => setPage(idx + 1)}
            className={`px-4 py-2 border rounded ${
              page === idx + 1 ? "bg-gray-800 text-white" : "bg-white text-gray-800"
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EventList;
