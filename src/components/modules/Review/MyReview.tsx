/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {  useState } from "react";
import { toast } from "sonner";
import { Review } from "@/app/types";
import { deleteReview, updateReview } from "@/services/ReviewService";
import { useUser } from "@/context/UserContext";
import NextButton from "@/components/shared/NextButton";

export default function MyReviewList(reviews: any) {
  const { user } = useUser();
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [editForm, setEditForm] = useState<{ rating: number; comment: string }>({ rating: 0, comment: "" });

  const handleDelete = async (reviewId: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    try {
      await deleteReview(reviewId);
      toast.success("Review deleted successfully");
    } catch (err: any) {
      toast.error(err.message || "Failed to delete review");
    }
  };

  const handleEdit = (review: Review) => {
    setEditingReview(review);
    setEditForm({ rating: review.rating, comment: review.comment });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReview) return;
    try {
      await updateReview(editingReview.id, editForm);
      toast.success("Review updated successfully");
      setEditingReview(null);
    } catch (err: any) {
      toast.error(err.message || "Failed to update review");
    }
  };

  const renderStars = (rating: number) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-5 h-5 ${star <= rating ? "text-amber-500 fill-amber-500" : "text-gray-300"}`}
          viewBox="0 0 24 24"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );


  if (!reviews.length) {
    return (
      <div className="max-w-md mx-auto p-6 bg-gradient-to-br from-[#0a3b5e] to-[#1e6a9e] rounded-xl shadow-lg text-center">
        <p className="text-white text-lg">You haven’t submitted any reviews yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">My Reviews</h2>
      <div className="space-y-6">
        {reviews.map((review: any) => (
          <div
            key={review.id}
            className="bg-gradient-to-br from-[#0a3b5e] to-[#1e6a9e] text-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300 relative overflow-hidden"
          >
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 bg-[url('/dots-pattern.png')] opacity-10 z-0" />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-white">{user?.name || "User"}</h3>
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-gray-200">{review.comment}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(review)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
              {review.eventId && (
                <p className="text-sm text-gray-300">Event ID: {review.eventId}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Edit Review</h3>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <select
                  value={editForm.rating}
                  onChange={(e) => setEditForm({ ...editForm, rating: Number(e.target.value) })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num} Star{num > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
                <textarea
                  value={editForm.comment}
                  onChange={(e) => setEditForm({ ...editForm, comment: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                  rows={4}
                />
              </div>
              <div className="flex justify-end gap-2">
                {/* <button
                  type="button"
                  onClick={() => setEditingReview(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button> */}
                <NextButton   onClick={() => setEditingReview(null)} name="Cancel"/>
                <NextButton name="Save"/>
                {/* <button
                  type="submit"
                  portale="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Save
                </button> */}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}