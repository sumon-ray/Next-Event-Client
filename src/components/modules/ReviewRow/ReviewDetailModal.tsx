
"use client";

import { Review } from "@/app/types/reviewType";
import { X } from "lucide-react";

interface Props {
  review : Review;
  onClose : () => void;
}

const ReviewDetailModal = ({ review, onClose } : Props) => {
console.log("🚀 ~ ReviewDetailModal ~ review:", review)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-gradient-to-b from-[#E0F7FA] via-[#B3E5FC] to-[#E0F7FA] p-6 rounded-md w-[90%] max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2">
          <X className="w-5 h-5" />
        </button>

        <div className="max-w-lg p-8 mx-auto space-y-6 ">
          <h2 className="pb-3 mb-6 text-3xl tracking-wide text-transparent  drop-shadow-sm bg-gradient-to-r from-[#1E3A8A] via-[#3B82F6] to-[#1E293B] bg-clip-text text-center font-bold border-b-4">
            Review Details
          </h2>

          <div className="space-y-5">
            <p className="text-lg text-gray-700">
              <strong className="font-medium text-[#1E3A8A]">Name :</strong>
              {review?.data?.reviewer?.name }
            </p>
            <p className="text-lg text-gray-700">
              <strong className="font-medium text-[#1E3A8A]">Rating :</strong>{" "}
              {review?.data?.rating }
            </p>
            <p className="text-lg text-gray-700">
              <strong className="font-medium text-[#1E3A8A]">Comment :</strong>{" "}
              {review?.data?.comment }
            </p>
            <p className="text-lg text-gray-700">
              <strong className="font-medium text-[#1E3A8A]">Status :</strong>{" "}
              {review?.data?.isDeleted ? (
                <span className="text-red-600">Deleted</span>
              )  : (
                <span className="text-green-600">Active</span>
              )}
            </p>
          </div>

          <div className="pt-4 mt-6 border-t-4">
            <h4 className="mb-4 text-2xl font-semibold tracking-wide text-transparent  drop-shadow-sm bg-gradient-to-r from-[#1E3A8A] via-[#3B82F6] to-[#1E293B] bg-clip-text text-center">
              Reviewer Profile
            </h4>
            <div className="space-y-5">
              <p className="text-lg text-gray-700">
                <strong className="font-medium text-[#1E3A8A]">Email :</strong>{" "}
                {review?.data?.reviewer?.email}
              </p>
              <p className="text-lg text-gray-700">
                <strong className="font-medium text-[#1E3A8A]">Phone :</strong>{" "}
                {review?.data?.reviewer?.phoneNumber || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReviewDetailModal;
