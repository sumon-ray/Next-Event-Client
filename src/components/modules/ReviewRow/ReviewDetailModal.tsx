// components/modules/ReviewRow/ReviewDetailModal.tsx
"use client";

import { Review } from "@/app/types/reviewType";
import { X } from "lucide-react";

interface Props {
  review: Review;
  onClose: () => void;
}

const ReviewDetailModal = ({ review, onClose }: Props) => {
  //console.log("review...... ", review);
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md w-[90%] max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2">
          <X className="w-5 h-5" />
        </button>

        <div className="max-w-lg mx-auto bg-gradient-to-r from-indigo-100 to-indigo-300 shadow-2xl rounded-lg p-8 space-y-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <h2 className="text-3xl font-extrabold text-gray-800 border-b-4 pb-3 mb-6 text-center">
            Review Details
          </h2>

          <div className="space-y-5">
            <p className="text-lg text-gray-700">
              <strong className="font-medium text-indigo-600">Name:</strong>{" "}
              {review?.data?.reviewer?.name }
            </p>
            <p className="text-lg text-gray-700">
              <strong className="font-medium text-indigo-600">Rating:</strong>{" "}
              {review?.data?.rating }
            </p>
            <p className="text-lg text-gray-700">
              <strong className="font-medium text-indigo-600">Comment:</strong>{" "}
              {review?.data?.comment }
            </p>
            <p className="text-lg text-gray-700">
              <strong className="font-medium text-indigo-600">Status:</strong>{" "}
              {review?.data?.isDeleted ? (
                <span className="text-red-600">Deleted</span>
              ) : (
                <span className="text-green-600">Active</span>
              )}
            </p>
          </div>

          <div className="border-t-4 pt-4 mt-6">
            <h4 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Reviewer Profile
            </h4>
            <div className="space-y-5">
              <p className="text-lg text-gray-700">
                <strong className="font-medium text-indigo-600">Email:</strong>{" "}
                {review?.data?.reviewer?.email}
              </p>
              <p className="text-lg text-gray-700">
                <strong className="font-medium text-indigo-600">Phone:</strong>{" "}
                {review?.data?.reviewer?.phoneNumber}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReviewDetailModal;
