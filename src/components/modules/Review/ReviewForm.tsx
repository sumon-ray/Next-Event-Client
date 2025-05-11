"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription
} from "@/components/ui/card"
import { createReview } from "@/services/ReviewService"
import { useUser } from "@/context/UserContext"

interface ReviewFormProps {
  eventId: string
}

export default function ReviewForm({ eventId }: ReviewFormProps) {
  const { user } = useUser()
  console.log("user....", user?.id,   "event....", eventId)

  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [hasReviewed, setHasReviewed] = useState(false)
  const [error, setError] = useState("")

  const handleRatingChange = (index: number) => {
    setRating(index + 1)
  }

  const handleSubmit = async () => {
    if (!user?.id || !eventId || rating === 0) {
      setError("Please fill in all fields.")
      return
    }

    const payload = {
      rating,
      comment: feedback,
      isAnonymous,
      userId: user.id,
      eventId,
    }

    try {
      const response = await createReview(payload)
      console.log("Review created:", response)
      setHasReviewed(true)
      setError("")
    } catch (err: any) {
      console.log(err)
      console.error("Error submitting review:", err.message)
      setError("Failed to submit review. You might not be a participant.")
    }
  }

  return (
    <Card className="w-full max-w-sm mx-auto bg-white shadow-md rounded-xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium">Feedback Us</CardTitle>
        <CardDescription className="text-sm text-gray-500">
          Please provide your rating and feedback.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center space-x-1 py-2">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={`w-8 h-8 cursor-pointer ${
                index < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
              }`}
              onClick={() => handleRatingChange(index)}
            />
          ))}
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Write Your Experiences</p>
          <Textarea
            placeholder="Type here..."
            className="bg-gray-50 border-0 resize-none min-h-[100px]"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            disabled={hasReviewed}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="anonymous"
            checked={isAnonymous}
            onCheckedChange={(checked) => setIsAnonymous(checked as boolean)}
            disabled={hasReviewed}
          />
          <label htmlFor="anonymous" className="text-sm text-gray-600">
            Submit Anonymous Feedback
          </label>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button
          className="w-full bg-gradient-to-br from-[#0a3b5e] to-[#1e6a9e] text-white"
          onClick={handleSubmit}
          disabled={hasReviewed}
        >
          {hasReviewed ? "You already submitted a review" : "Submit Now"}
        </Button>
      </CardContent>
    </Card>
  )
}
