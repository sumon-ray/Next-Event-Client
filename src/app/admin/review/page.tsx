/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { daleteReview, getAllReview, ReviewDetails } from "@/services/ReviewService";
import ReviewRow from "@/components/modules/ReviewRow/ReviewRow";
import { Review } from "@/app/types/reviewType";
import ReviewDetailModal from "@/components/modules/ReviewRow/ReviewDetailModal";
import { toast } from "sonner";

const ReviewList = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedRating, setSelectedRating] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  //console.log("review......", reviews);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await getAllReview({
          rating: selectedRating ? Number(selectedRating) : undefined,
          user: searchUser || undefined,
        });
        setReviews(res?.data || []);
      } catch (error) {
        console.error("Failed to load reviews", error);
      }
    };

    fetchReviews();
  }, [selectedRating, searchUser]);

  const filteredReviews = reviews.filter((review) => {
    const matchRating = selectedRating
      ? review.rating === Number(selectedRating)
      : true;
    const matchUser = searchUser
      ? review.reviewer?.name?.toLowerCase().includes(searchUser.toLowerCase())
      : true;
    return matchRating && matchUser;
  });

  const handleOpenDetail = async (id: string) => {
    try {
      const data = await ReviewDetails(id);
      setSelectedReview(data);
    } catch (error) {
      console.error("Failed to fetch......! ", error);
    }
  };

  const handleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleDelete = async (id: string) => {
    if (selectedIds.length === 0) return;

    const selectedReview = reviews.filter((u) => selectedIds.includes(u.id));
    for (const user of selectedReview) {
      try {
        await daleteReview(user.id);
        toast.success( "Review deleted");
      } catch (error ) {
        toast.error(`Failed to delete Review`);
      }
    }

  }
  return (
    <div className="p-4 md:p-6 max-w-[1200px] mx-auto">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-700">All Review List</h1>

          <div className="flex gap-3">
            <input
              type="text"
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
              placeholder="Search by user name"
              className="border px-2 py-1 rounded text-sm"
            />

            <select
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
              className="border px-2 py-1 rounded text-sm"
            >
              <option value="">All Ratings</option>
              {[1, 2, 3, 4, 5].map((rating) => (
                <option key={rating} value={rating}>
                  {rating} Star
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-white rounded-lg border overflow-hidden">
          <div className="grid grid-cols-12 text-xs text-white py-3 px-4 border-b font-medium bg-blue-500 hover:bg-blue-700">
            <div className="col-span-1">SELECT</div>
            <div className="col-span-5">REVIEW DETAILS</div>
            <div className="col-span-2">RATING</div>
            <div className="col-span-2"> Details </div>
            <div className="col-span-2"> Delete</div>
          </div>

          {reviews.length === 0 ? (
            <div className="px-4 py-4 text-gray-500 text-sm text-center">
              No reviews found.
            </div>
          ) : filteredReviews.length === 0 ? (
            <div className="px-4 py-4 text-gray-500 text-sm text-center">
              No matching reviews found.
            </div>
          ) : (
            filteredReviews.map((review) => (
              <ReviewRow
                key={review.id}
                id={review.id}
                image={review.reviewer?.profileImg}
                name={review.reviewer?.name}
                comment={review.comment}
                rating={review.rating}
                status={"Approved"}
                onDetailClick={handleOpenDetail}
                isSelected={selectedIds.includes(review.id)}
                onSelect={handleSelect}
                onDelete={() => handleDelete(review.id)} 
              />
            ))
          )}

          {/* Modal section */}
          {selectedReview && (
            <ReviewDetailModal
              review={selectedReview}
              onClose={() => setSelectedReview(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewList;
