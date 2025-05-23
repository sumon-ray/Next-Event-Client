

import Loader from "@/components/ui/Loader/Loader";
import { getAllEvents } from "@/services/EventService";
;
import { Event, EventCard } from "./Card";
import Title from "@/components/shared/Title";
import NextButton from "@/components/shared/NextButton";
import Link from "next/link";

const HomeAllEvents = async() => {

  const upComing = await getAllEvents({eventStatus: "UPCOMING"}  );
  const onGoing = await getAllEvents({eventStatus: "ONGOING"}  );
  const ended = await getAllEvents({eventStatus: "ENDED"}  );
      
  const upComingEvents = upComing?.data?.data || [];
  const onGoingEvents =onGoing?.data?.data|| [];
  const endedEvents = ended?.data?.data|| [];           
         
  
    return (
        <div className="container mx-auto mt-40 ">
<div className="mx-4 xl:mx-0">
  {upComingEvents && onGoingEvents && endedEvents ? (
    upComingEvents.length > 0 || onGoingEvents.length > 0 || endedEvents.length > 0 ? (
      <>
        {upComingEvents.length > 0 && (
          <div >
           <div className="flex items-center justify-between my-8"><Title title="Upcoming Events" /> 
           <Link href="/events"><NextButton name="View Events ➡️" /></Link></div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {upComingEvents.map((event: Event, index: number) => (
                <EventCard key={index} event={event} />
              )).slice(0, 4)}
            </div>
          </div>
        )}

        {onGoingEvents.length > 0 && (
          <div>
            <div className="flex items-center justify-between my-8"><Title title="Ongoing Events" /> <Link href="/events"><NextButton name="View Events ➡️" /></Link></div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {onGoingEvents.map((event: Event, index: number) => (
                <EventCard key={index} event={event} />
              )).slice(0, 4)}
            </div>
          </div>
        )}

        {endedEvents.length > 0 ? (
          <div>
            <div className="flex items-center justify-between my-8"><Title title="Ended Events" /> <Link href="/events"><NextButton name="View Events ➡️" /></Link></div> 
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {endedEvents.map((event: Event, index: number) => (
                <EventCard key={index} event={event} />
              )).slice(0, 4)}
            </div>
          </div>
        ) : (
          <div className="flex items-center h-[60dvh] justify-center">
            <Loader />
          </div>
        )}
      </>
    ) : (
      <div>
        <Loader />
      </div>
    )
  ) : (
    <div>
      <Loader />
    </div>
  )}
</div>

        </div>
    );
};

export default HomeAllEvents;


export const dynamic = 'force-static'