'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';

const reviews = [
  {
    name: 'John Doe',
    role: 'Event Attendee',
    comment: 'Great event, well organized!',
    rating: 5,
    image: '/placeholder.svg',
  },
  {
    name: 'Jane Smith',
    role: 'Speaker',
    comment: 'Loved the audience and venue.',
    rating: 4,
    image: '/placeholder.svg',
  },
  {
    name: 'Alex Johnson',
    role: 'Volunteer',
    comment: 'Glad to be part of the team!',
    rating: 5,
    image: '/placeholder.svg',
  },
];

const ReviewCarosal = () => {
  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="bg-[#0a3b5e] text-white p-6 py-10 rounded-lg shadow-md relative">
              <div className="absolute inset-0 bg-[url('/dots-pattern.png')] opacity-10 z-0 rounded-lg" />

              <div className="relative z-10 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 rounded-full bg-white p-1 shadow-md">
                    <Image
                      src={review.image}
                      alt={review.name}
                      width={80}
                      height={80}
                      className="rounded-full object-cover"
                    />
                  </div>
                </div>

                <h2 className="text-lg font-semibold">{review.name}</h2>
                <p className="text-sm text-gray-300">{review.role}</p>

                <div className="flex justify-center gap-1 mt-2 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      fill={star <= review.rating ? '#facc15' : 'none'}
                      viewBox="0 0 24 24"
                      stroke="#facc15"
                      className="w-4 h-4"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 17l-5 3 2-6-5-4h6L12 4l2 6h6l-5 4 2 6-5-3z" />
                    </svg>
                  ))}
                </div>

                <p className="text-sm text-gray-300 italic max-w-xl mx-auto">
                  “{review.comment}”
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReviewCarosal;
