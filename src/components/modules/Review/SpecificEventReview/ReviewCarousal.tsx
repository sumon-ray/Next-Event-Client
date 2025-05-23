/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';

// interface Review {
//   name: string;
//   role: string;
//   comment: string;
//   rating: number;
//   image: string;
// }

const ReviewCarosal = ({ reviews }: { reviews: any[] }) => {
  // console.log(reviews);
  if (!reviews || reviews.length === 0) {
    return (
      <p className="text-center py-10 text-gray-500 text-base sm:text-lg font-medium">
        No reviews available.
      </p>
    );
  }

  return (
    <div className="w-full max-w-[90%] sm:max-w-3xl lg:max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        className="review-swiper"
        breakpoints={{
          640: {
            spaceBetween: 30,
          },
          1024: {
            spaceBetween: 40,
          },
        }}
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="relative bg-gradient-to-br from-[#0a3b5e] to-[#1e6a9e] text-white p-6 sm:p-8 rounded-2xl shadow-xl transform transition-all duration-300 hover:shadow-2xl">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-[url('/dots-pattern.png')] opacity-10 rounded-2xl" />
              {/* Content */}
              <div className="relative z-10 text-center">
                {/* Reviewer Image */}
                <div className="flex justify-center mb-4 sm:mb-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-white p-1 shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
                    <Image
                      src={review.reviewer.profileImage}
                      alt={review.name}
                      width={96}
                      height={96}
                      className="rounded-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
                {/* Reviewer Info */}
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1">
                  {review.reviewer.name}
                </h2>
                {/* Rating Stars */}
                <div className="flex justify-center gap-1 mt-2 sm:mt-3 mb-3 sm:mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      aria-label={`Star ${star} ${star <= review.rating ? 'filled' : 'empty'}`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill={star <= review.rating ? '#facc15' : 'none'}
                      viewBox="0 0 24 24"
                      stroke="#facc15"
                      className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 hover:scale-110"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 17l-5 3 2-6-5-4h6L12 4l2 6h6l-5 4 2 6-5-3z"
                      />
                    </svg>
                  ))}
                </div>
                {/* Comment */}
                <p className="text-sm sm:text-base text-gray-100 italic max-w-full mx-auto leading-relaxed line-clamp-4 sm:line-clamp-5 lg:line-clamp-6">
                  “{review.comment}”
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Swiper Styles */}
      <style jsx global>{`
        .review-swiper .swiper-button-next,
        .review-swiper .swiper-button-prev {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          width: 32px;
          height: 32px;
          transition: background 0.3s ease;
        }
        .review-swiper .swiper-button-next:hover,
        .review-swiper .swiper-button-prev:hover {
          background: rgba(255, 255, 255, 0.4);
        }
        .review-swiper .swiper-button-next::after,
        .review-swiper .swiper-button-prev::after {
          font-size: 14px;
        }
        @media (min-width: 640px) {
          .review-swiper .swiper-button-next,
          .review-swiper .swiper-button-prev {
            width: 40px;
            height: 40px;
          }
          .review-swiper .swiper-button-next::after,
          .review-swiper .swiper-button-prev::after {
            font-size: 18px;
          }
        }
        .review-swiper .swiper-pagination-bullet {
          background: #ffffff;
          opacity: 0.5;
          width: 8px;
          height: 8px;
        }
        .review-swiper .swiper-pagination-bullet-active {
          background: #facc15;
          opacity: 1;
        }
        .swiper-slide {
          opacity: 0.6;
          transition: opacity 0.3s ease;
        }
        .swiper-slide-active {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default ReviewCarosal;