import EventDetails from "@/components/modules/Events/EventDetails";
import { getSingleEvent } from "@/services/EventService";
import Link from "next/link";

const SingleEventPage = async ({ params }: { params: { slug: string } }) => {
  const slug = params?.slug; 
  const data = await getSingleEvent(slug);
  const event = data?.data;
  const organizer = event?.organizer;


    if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800">Event Not Found</h2>
          <p className="mt-2 text-gray-600">We could not find the event you are re looking for. It may have been removed or the URL is incorrect.</p>
          <Link href="/events" className="mt-4 inline-block px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md">
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <EventDetails event={event} organizer={organizer} />
    </div>
  );
};

export default SingleEventPage;