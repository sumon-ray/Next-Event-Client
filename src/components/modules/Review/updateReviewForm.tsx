"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function UpdateForm() {
  const [rating, setRating] = useState(4)
  const [feedback, setFeedback] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)

  const handleRatingChange = (index: number) => {
    setRating(index + 1)
  }

  const handleSubmit = () => {
    console.log({ rating, feedback, isAnonymous })
    // Handle form submission logic here
  }
 
  return (
    <Card className="w-full max-w-sm mx-auto bg-white shadow-md rounded-xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium">Feedback Us</CardTitle>
        <CardDescription className="text-sm text-gray-500">
          Please provide your rating and feedback regarding our user experience with our service/product.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center space-x-1 py-2">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={`w-8 h-8 cursor-pointer ${
                index < rating ? "fill-blue-500 text-blue-500" : "fill-gray-200 text-gray-200"
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
  )
}
