"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Review } from "@/app/types";
import { deleteReview, updateReview } from "@/services/ReviewService";
import { useUser } from "@/context/UserContext";
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
import { Star, Edit2, Trash2, X, Mailbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import Title from "@/components/shared/Title";
import NextButton from "@/components/shared/NextButton";
import { myAllReviews } from "@/services/ReviewService";
import Loader from "@/components/ui/Loader/Loader";
export default function MyReviewList() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const { user } = useUser();
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [deletingReviewId, setDeletingReviewId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ rating: 0, comment: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      setLoading(true);
   const fetchReviews = async () => {
    const data = await myAllReviews();
    setReviews(data);
    setLoading(false);
   }
 
    fetchReviews(); 
   } 
  ,[deletingReviewId,editingReview])
  const handleDeleteConfirm = async () => {
    if (!deletingReviewId) return;
    try {
      const res = await deleteReview(deletingReviewId);
      if (res.success) {
        toast.success("Review deleted successfully");
      } else {
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
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${star <= rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`}
        />
      ))}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="px-4 py-12 mx-auto md:px-0"
    >
      <div className="flex items-center justify-between pb-6">
        <Title title="My Reviews" />
      </div>
 {
  loading && <div className="flex items-center justify-center min-h-screen"><Loader></Loader>

  </div>
 }
      {!loading && !reviews.length ? (
        <div className="flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#E3F2FD] via-[#BBDEFB] to-[#E3F2FD] rounded-xl">
          <Mailbox className="w-12 h-12 mb-4 text-[#1E3A8A]" />
          <h3 className="mb-2 text-xl font-semibold text-[#1E3A8A]">No Reviews Yet</h3>
          <p className="text-[#475569] max-w-md">
            You haven't submitted any reviews yet. Your reviews will appear here once you create them.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="p-6 transition-shadow bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-md"
            >
              <div className="flex flex-col gap-4 md:flex-row md:justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative w-10 h-10 overflow-hidden rounded-full">
                      <Image
                        src={user?.profileImage || "/default-avatar.png"}
                        alt={user?.name || "User"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{user?.name || "User"}</h3>
                      <div className="flex items-center gap-2">
                        {renderStars(review.rating)}
                        <span className="text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="mb-4 text-gray-700">{review.comment}</p>

                  {review.event && (
                    <Link
                      href={`/events/${review.event.slug}`}
                      className="flex items-center gap-3 p-3 mt-4 -mx-3 -mb-3 text-sm transition-colors rounded-lg hover:bg-gray-50"
                    >
                      <div className="relative w-12 h-12 overflow-hidden rounded-md">
                        <Image
                          src={review.event.bannerImage}
                          alt={review.event.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="font-medium text-[#1E3A8A]">{review.event.title}</span>
                    </Link>
                  )}
                </div>

                <div className="flex gap-2 md:flex-col">
                  <NextButton name="Edit"onClick={() => handleEdit(review)} />
                 
                  <Dialog>
                    <DialogTrigger asChild>
                        <NextButton name="Delete" onClick={() => setDeletingReviewId(review.id)} />
                    
                    </DialogTrigger>
                    <DialogContent className="max-w-sm">
                      <DialogHeader>
                        <h4 className="text-lg font-semibold">Delete Review</h4>
                      </DialogHeader>
                      <p className="text-gray-600">Are you sure you want to delete this review? This action cannot be undone.</p>
                      <DialogFooter className="gap-2">
                        <DialogClose asChild>
                      
               <NextButton name="Update"  />
                        </DialogClose>
                          <NextButton name="Delete" onClick={handleDeleteConfirm} />
                       
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    
      {editingReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md p-6 mx-4 bg-white shadow-xl rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-3xl font-semibold text-[#1E3A8A]">Edit Review</h3>
              <button
                onClick={() => setEditingReview(null)}
                className="p-1 text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block mb-1.5 text-sm font-medium text-gray-700">Rating</label>
                <Select
                  value={editForm.rating.toString()}
                  onValueChange={(value) => setEditForm({ ...editForm, rating: Number(value) })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent className="w-full bg-white">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <SelectItem className="hover:bg-gradient-to-br from-[#E3F2FD] via-[#BBDEFB] to-[#E3F2FD]" key={num} value={num.toString()}>
                        {num} Star{num > 1 ? "s" : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block mb-1.5 text-sm font-medium text-gray-700">Comment</label>
                <Textarea
                  value={editForm.comment}
                  onChange={(e) => setEditForm({ ...editForm, comment: e.target.value })}
                  rows={4}
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
               <NextButton name="Cancel" onClick={() => setEditingReview(null)} />
               <NextButton name="Update"  />
              </div>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  );
}