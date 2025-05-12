/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Title from "@/components/shared/Title";
import { IEvent } from "@/app/types";
import { InviteModal } from "@/components/modules/Invite/InviteModal";
import { UpdateModal } from "@/components/modules/Events/UpdateModal";
import { DeleteModal } from "@/components/modules/Events/DeleteModal";
import Link from "next/link";
import NextButton from "@/components/shared/NextButton";
import { ShowParticipantsModal } from "./ShowParticipantsModal";

const MyEvents = ({ events }: { events: IEvent[] | any }) => {
  return (
    <div className="w-full md:w-[80%] mx-auto px-4 md:px-2 py-6 mb-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <Title title="Manage My Own Events" />
        <Link href="/profile/my-events/add-event">
          <NextButton name="Create Event" />
        </Link>
      </div>

      {/* Table */}
      <div className="w-full  overflow-x-auto border border-white rounded-lg shadow-md">
        <table className="w-full text-left text-base">
          <thead className="text-sm font-medium text-gray-500 uppercase border-b border-white">
            <tr>
              <th className="px-4 py-3 w-[200px] pl-10">Title</th>
              <th className="px-4 py-3 w-[200px] border-2">Venue</th>
              <th className="px-4 py-3 w-[140px] border-2">Event Type</th>
              <th className="px-4 py-3 w-[180px] border-2">Paid / Free</th>
              <th className="px-4 py-3 w-[120px] border-2 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {events?.map((event: IEvent) => (
              <tr key={event.id} className="border-white">
                <td className="flex items-center gap-3 px-4 py-3 border-2">
                  <div className="relative w-10 h-10">
                    <Image
                      src={event.bannerImage || "/placeholder.svg"}
                      alt={event.title}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <Link href={`/events/${event.slug}`}>
                    <span className="font-medium text-gray-800">
                      {event.title}
                    </span>
                  </Link>
                </td>
                <td className="px-4 py-3 truncate border-2">{event.venue}</td>
                <td className="px-4 py-3 border-2">{event.type}</td>
                <td className="px-4 py-3 border-2">
                  {event.isPaid ? "Paid" : "Free"}
                </td>
                <td className="px-4 py-3 border-2">
                  <div className="flex items-center justify-center gap-2">
                    <ShowParticipantsModal event={event} id={event.id!} />
                    <InviteModal id={event.id!} />
                    <UpdateModal event={event} />
                    <DeleteModal id={event.id!} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyEvents;
