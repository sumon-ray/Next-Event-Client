"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { createReview } from "@/services/ReviewService";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";
import NextButton from "@/components/shared/NextButton";

interface ReviewFormProps {
  eventId: string;
}

export default function ReviewForm({ eventId }: ReviewFormProps) {
  const { user } = useUser();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [hasReviewed, setHasReviewed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRatingChange = (index: number) => {
    setRating(index + 1);
  };

  const handleSubmit = async () => {
    if (!user?.id || !eventId || rating === 0) {
      toast.error("Please fill in all fields before submitting.");
      return;
    }

    const payload = {
      rating,
      comment: feedback,
      eventId,
    };

    try {
      setIsSubmitting(true);
      const response = await createReview(payload);
      if (response.success) {
        setHasReviewed(true);
        toast.success("Thank you for your feedback!");
      } else {
        toast.error(response.message || "Failed to submit review.");
      }
    } catch (err: any) {
      console.error("Error submitting review:", err.message);
      toast.error("Failed to submit review. You might not be a participant.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-white border-none rounded-2xl ">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">Leave a Review</CardTitle>
        <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
          Share your experience and help others!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-start space-x-1 py-2">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={`w-7 h-7 cursor-pointer transition-colors ${
                index < rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-gray-200 text-gray-300"
              }`}
              onClick={() => handleRatingChange(index)}
            />
          ))}
        </div>

        <div>
          <p className="text-sm font-medium mb-1">Your Feedback</p>
          <Textarea
            placeholder="Type your experience here..."
            className=" dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 resize-none min-h-[100px]"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            disabled={hasReviewed}
          />
        </div>

        <NextButton
          name={isSubmitting ? "Submitting..." : "Submit Review"}
          onClick={handleSubmit}
          disabled={hasReviewed || isSubmitting}
        />
      </CardContent>
    </Card>
  );
}
