import UpdateEvent from '@/components/modules/Events/UpdateEvent';
import { getSingleEvent } from '@/services/EventService';
import Link from 'next/link';
import React from 'react';

const UpdateEventPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const data = await getSingleEvent(slug);

  if (!data.data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800">Event Not Found</h2>
          <p className="mt-2 text-gray-600">
            We could not find the event you are looking for. It may have been removed or the URL is incorrect.
          </p>
          <Link href="/events" className="mt-4 inline-block px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md">
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <UpdateEvent eventData={data.data} eventSlug={slug} />
    </div>
  );
};

export default UpdateEventPage;
