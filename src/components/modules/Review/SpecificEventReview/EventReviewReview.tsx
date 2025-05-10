'use client';

import { getReviewsByEvent } from '@/services/ReviewService';
import { useEffect, useState } from 'react';
// import ReviewCard from '../ReviewCard';

const EventReviews = ({ id }: { id: string }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const data = await getReviewsByEvent(id);
      setReviews(data);
    };
    fetchReviews();
  }, [id]);

  if (!reviews.length) {
    return <p className="text-gray-500">No reviews for this event yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {/* {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          name={review.user.name}
          profileImage={review.user.profileImage}
          rating={review.rating}
          comment={review.comment}
        />
      ))} */}
    </div>
  );
};

export default EventReviews;
