import MyEvents from "@/components/modules/Events/MyEvents";
import NextButton from "@/components/shared/NextButton";
import { getEventsOfUser } from "@/services/EventService";
import Link from "next/link";
import React from "react";

const MyEventsPage = async () => {
  const events = await getEventsOfUser();

  return (
    <div>
      {events && events.length > 0 ? (
        <MyEvents events={events} />
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            You haven’t created any events yet.
          </h2>
          <p className="text-gray-500 mb-6">
            Start by creating your first event to invite others and manage your
            event details.
          </p>
          <Link href="/events/create">
            <NextButton name="Create Event" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyEventsPage;
