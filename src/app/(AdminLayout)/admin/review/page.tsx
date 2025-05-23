"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getAllReview, deleteReview, ReviewDetails } from "@/services/ReviewService";
import { Review } from "@/app/types/reviewType";
import Loader from "@/components/ui/Loader/Loader";
import Title from "@/components/shared/Title";
import NextButton from "@/components/shared/NextButton";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import ReviewDetailModal from "@/components/modules/ReviewRow/ReviewDetailModal";

const UserReviewList = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  const [loading, setLoading] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  useEffect(() => {
    setLoading(true);
    const fetchReviews = async () => {
      try {
        const res = await getAllReview();
        setReviews(res?.data || []);
      } catch (error) {
        console.error("Failed to load reviews", error);
      }
      setLoading(false);
    };

    fetchReviews();
  }, []);

  const handleOpenDetail = async (id: string) => {
    try {
      setLoading(true);
      const data = await ReviewDetails(id);
      setSelectedReview(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch review details", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await deleteReview(id);
      setReviews((prev) => prev.filter((r) => r.id !== id));
      
      setLoading(false);
      toast.success("Review deleted");
    } catch (error) {
      toast.error("Failed to delete review");
    }
  };

  return (
    <div className="px-10 py-6 mb-20">
      <div className="flex items-center justify-between mb-4">
        <Title title="Manage All Reviews" />
      </div>

      {loading ? <div className="flex justify-center h-[50dvh]"><Loader /></div> : reviews.length > 0 ? (
        <div className="w-full overflow-x-auto border-t border-white rounded-lg shadow-md border-1">
          <table className="min-w-[900px] w-full text-left text-base">
            <thead className="text-sm font-medium text-gray-500 uppercase border-b border-white">
              <tr>
                <th className="px-4 py-3 w-[250px]">Reviewer</th>
                <th className="px-4 py-3 w-[100px]">Rating</th>
                <th className="px-4 py-3">Comment</th>
                <th className="px-4 py-3 w-[200px] text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {reviews.map((review) => (
                <tr key={review.id} className="border-white">
                  <td className="flex items-center gap-3 px-4 py-4 ">
                    <div className="relative w-16 h-16">
                      <Image
                        src={
                          review.reviewer?.profileImg?.startsWith("http")
                            ? review.reviewer.profileImg
                            : "https://res.cloudinary.com/dhl04adhz/image/upload/v1742656837/Zayed%20Iqbal-Zayed%40Iqbal.com.jpg"
                        }
                        alt="Reviewer"
                        width={5000}
                        height={5000}
                        className="w-16 h-16 rounded-full"
                      />
                    </div>
                    <div className="flex flex-col">
                      <p className="font-medium text-gray-800">{" "}{review.reviewer?.name}</p>
                      <p className="text-sm text-gray-500"> {" "}{review.reviewer?.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4 border-2">
                    <Badge className="px-3 py-1 text-xs font-semibold text-white bg-blue-800 rounded-full">
                      {review.rating} Stars
                    </Badge>
                  </td>
                  <td className="px-4 py-4 text-gray-600 border-2">{review.comment}</td>
                  <td className="flex items-center justify-center gap-6 px-4 py-4 ">
                    <NextButton name="Details" onClick={() => handleOpenDetail(review.id)} />
                    <NextButton name="Delete" onClick={() => handleDelete(review.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-semibold text-center text-gray-500">No Reviews Found</h1>
        </div>
      )}

      {selectedReview && (
        <ReviewDetailModal
          review={selectedReview}
          onClose={() => setSelectedReview(null)}
        />
      )}
    </div>
  );
};

export default UserReviewList;
