"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { createReview } from "@/services/ReviewService"

export default function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleRatingChange = (index: number) => {
    setRating(index + 1);
  };

  const handleSubmit = async () => {
    // Assuming you have userId and eventId in your state/context
    const userId = "USER_ID"; // Replace with actual user ID from context/state
    const eventId = "EVENT_ID"; // Replace with actual event ID

    const payload = {
      rating,
      comment: feedback,
      isAnonymous,
      userId,
      eventId,
    };
console.log("data....",payload)
    try {
      const response = await createReview(payload); 
      console.log("Review created:", response); 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error creating review:", error.message); 
    }
  };


return (
  <Card className="w-full max-w-sm mx-auto bg-white shadow-md rounded-xl">
    <CardHeader className="pb-2">
      <CardTitle className="text-xl font-medium">Feedback Us</CardTitle>
      <CardDescription className="text-sm text-gray-500">
        Please provide your rating and feedback regarding our user experience with our service.
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
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="anonymous"
          checked={isAnonymous}
          onCheckedChange={(checked) => setIsAnonymous(checked as boolean)}
        />
        <label htmlFor="anonymous" className="text-sm text-gray-600">
          Submit Anonymous Feedback
        </label>
      </div>

      <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white" onClick={handleSubmit}>
        Submit Now
      </Button>
    </CardContent>
  </Card>
);
}