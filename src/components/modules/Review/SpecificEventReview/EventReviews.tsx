'use client';

import { useEffect, useState } from 'react';
import ReviewCarosal from './ReviewCarousal';
import { Review } from '@/app/types';
import { getReviewsByEvent } from '@/services/ReviewService';
import Title from '@/components/shared/Title';

const EventReviews = ({ eventId }: { eventId: string }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!eventId) {
      setReviews([]);
      setLoading(false);
      return;
    }

    const fetchReviews = async () => {
      try {
        const data = await getReviewsByEvent(eventId);
        setReviews(data);
      } catch (error: any) {
        console.error('Failed to load reviews:', error.message);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [eventId]);

  return (
    <div className="my-12 px-4 max-w-7xl mx-auto">
      <div className="">
        {/* Reviews Carousel */}
        <div className="w-full bg-white dark:bg-neutral-900 rounded-2xl shadow-md p-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          <Title title="Reviews"/>
          </h2>
          {loading ? (
            <p className="text-center py-10 text-gray-500 dark:text-gray-400">Loading reviews...</p>
          ) : reviews.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-600 dark:text-gray-400 text-lg">No reviews found for event.</p>
              <p className="text-sm text-gray-400">Be the first to leave a review!</p>
            </div>
          ) : (
            <div className="flex justify-center">
              <ReviewCarosal reviews={reviews} />
            </div>
          )}
        </div>

        {/* Review Form */}
        {/* <div className="w-full lg:w-1/2 bg-white dark:bg-neutral-900 rounded-2xl p-6">
          <ReviewForm eventId={eventId} />
        </div> */}
      </div>
    </div>
  );
};

export default EventReviews;
