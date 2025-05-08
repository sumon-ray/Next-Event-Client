import EventDetails from "@/components/modules/Events/EventDetails";
import { getSingleEvent } from "@/services/EventService";

const SingleEventPage = async ({ params }: { params: { slug: string } }) => {
  const slug = params?.slug; 
  const data = await getSingleEvent(slug);
  const event = data?.data;
  const organizer = event?.organizer;

  return (
    <div className="">
      <EventDetails event={event} organizer={organizer} />
    </div>
  );
};

export default SingleEventPage;
