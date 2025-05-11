'use client';

import { useEffect, useState } from 'react';
import ReviewForm from '../ReviewForm';
import ReviewCarosal from './ReviewCarousal';
import { Review } from '@/app/types';
import { getReviewsByEvent } from '@/services/ReviewService';

const ReviewButton = ({ eventId }: { eventId: string }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  console.log('ReviewButton rendered with eventId:', eventId);

  useEffect(() => {
    // console.log('useEffect triggered with eventId:', eventId);

    if (!eventId) {
      // console.error('Invalid or missing eventId:', eventId);
      setReviews([]);
      setLoading(false);
      return;
    }

    const fetchReviews = async () => {
      // console.log('Fetching reviews for eventId:', eventId);
      try {
        const data = await getReviewsByEvent(eventId);
        console.log(data);
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
    <div className="my-12 px-4">
      <div className="lg:flex gap-6 justify-center items-start bg-transparent">
        {/* Reviews Section */}
        <div className="w-full lg:w-1/2 bg-transparent rounded-lg shadow-md p-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
            <span className="text-gray-700">FEED</span>
            <span className="text-cyan-500">BACK</span>
          </h1>
          {loading ? (
            <p className="text-center py-10 text-gray-600">Loading reviews...</p>
          ) : reviews.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 text-lg">No reviews found for event.</p>
              <p className="text-sm text-gray-400">Be the first to leave a review!</p>
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <ReviewCarosal reviews={reviews} />
            </div>
          )}
        </div>
        {/* Review Form Section */}
        <div className="w-full lg:w-1/2 bg-transparent rounded-lg shadow-md p-6 mt-8 lg:mt-0">
          
          <div className="w-full max-w-md mx-auto">
            <ReviewForm eventId={eventId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewButton;