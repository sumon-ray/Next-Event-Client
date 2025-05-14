/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Review } from "@/app/types";
import { deleteReview, updateReview } from "@/services/ReviewService";
import { useUser } from "@/context/UserContext";
import NextButton from "@/components/shared/NextButton";
import Title from "@/components/shared/Title";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import Link from "next/link";
import Image from "next/image";

interface MyReviewListProps {
  reviews: Review[] | any[];
}

export default function MyReviewList({ reviews }: MyReviewListProps) {
  // console.log(reviews);
  const { user } = useUser();
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [deletingReviewId, setDeletingReviewId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{ rating: number; comment: string }>({
    rating: 0,
    comment: "",
  });

  const handleDeleteConfirm = async () => {
    if (!deletingReviewId) return;
    try {
     const res = await deleteReview(deletingReviewId);
     if(res.success){
      toast.success("Review deleted successfully");
     }else{
      toast.error(res.message || "Failed to delete review");
     }
    } catch (err: any) {
      toast.error(err.message || "Failed to delete review");
    } finally {
      setDeletingReviewId(null);
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

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <Title title="Manage My Own Reviews" />
        {/* <Link href="/profile/my-events/add-event">
          <NextButton name="Create Event" />
        </Link> */}
      </div>

      {!reviews.length ? (
        <div className="bg-gradient-to-br from-[#0a3b5e] to-[#1e6a9e] text-white rounded-xl shadow-lg p-6 text-center">
          <p className="text-lg">You {"haven’t"} submitted any reviews yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">My Submitted Reviews</h2>
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-gradient-to-br from-[#0a3b5e] to-[#1e6a9e] text-white rounded-xl shadow-lg p-6 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[url('/dots-pattern.png')] opacity-10 z-0" />
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{user?.name || "User"}</h3>
                      {renderStars(review.rating)}
                    </div>
                    <p className="text-gray-200">{review.comment}</p>
                    {review.event && (
                      <div className="mt-4 flex items-center gap-4">
                        <Image
                          src={review.event.bannerImage}
                          alt={review.event.title}
                          width={60}
                          height={40}
                          className="rounded object-cover border border-white"
                        />
                        <Link
                          href={`/events/${review.event.slug}`}
                          className="text-sm text-gray-300 font-medium underline hover:text-white transition-colors"
                        >
                          {review.event.title}
                        </Link>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(review)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Edit
                    </button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <button
                          onClick={() => setDeletingReviewId(review.id)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          Delete
                        </button>
                      </DialogTrigger>
                      <DialogContent className="max-w-sm">
                        <DialogHeader>
                          <h4 className="text-lg font-semibold text-gray-800">Delete Confirmation</h4>
                        </DialogHeader>
                        <p className="text-gray-600 mb-4">Are you sure you want to delete this review?</p>
                        <DialogFooter className="flex justify-end gap-2">
                          <DialogClose asChild>
                            <button
                              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors"
                              onClick={() => setDeletingReviewId(null)}
                            >
                              Cancel
                            </button>
                          </DialogClose>
                          <button
                            onClick={handleDeleteConfirm}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                          >
                            Delete
                          </button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

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
                <button
                  type="button"
                  onClick={() => setEditingReview(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <NextButton name="Save" />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
