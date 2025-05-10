/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { toast } from "sonner";
import { Review } from "@/app/types";
import { deleteReview } from "@/services/ReviewService";

interface MyReviewWrapperProps {
  review?: Review; // Make it optional
  onRefresh?: () => void;
}

export default function MyReview({ review, onRefresh }: MyReviewWrapperProps) {
  const handleDelete = async () => {
    if (!review) return;
    if (!confirm("Are you sure you want to delete this review?")) return;

    try {
      await deleteReview(review.id);
      toast.success("Review deleted successfully");
      onRefresh?.();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error("Failed to delete review");
    }
  };

  if (!review) {
    return (
      <div className="max-w-md mx-auto p-4 bg-white rounded shadow text-center">
        <p className="text-gray-500">You havent submitted any review yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h3 className="text-lg font-semibold text-center mb-2">Your Review</h3>
      <div className="mb-3">
        <p className="font-semibold">Rating: {review.rating}</p>
        <p>{review.comment}</p>
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleDelete}
          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
