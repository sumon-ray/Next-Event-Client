import Image from "next/image";
import {  MoreHorizontal, X, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

interface ReviewRowProps {
  avatar: string;
  name: string;
  comment: string;
  rating: number;
  status: "Approved" | "Pending";
}

function ReviewRow({ avatar, name, comment, rating, status }: ReviewRowProps) {
  return (
    <div className="grid items-center grid-cols-12 px-4 py-3 border-b hover:bg-gray-50">
      <div className="col-span-1">
        <Checkbox />
      </div>
      <div className="flex items-center col-span-5 gap-3">
        <div className="relative w-12 h-12">
          <Image
            src={avatar || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover rounded-full"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-medium">{name}</span>
          <span className="text-xs text-gray-500 line-clamp-1">{comment}</span>
        </div>
      </div>
      <div className="col-span-2">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-3 h-3 ${
                star <= Math.floor(rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-gray-200 text-gray-200"
              }`}
            />
          ))}
        </div>
      </div>
      <div className="col-span-2">
        <Badge
          className={`text-xs capitalize transition-colors ${
            status === "Approved"
              ? "bg-green-100 text-green-700 hover:bg-black hover:text-white"
              : "bg-yellow-100 text-yellow-700 hover:bg-black hover:text-white"
          }`}
        >
          {status}
        </Badge>
      </div>
      <div className="flex items-center justify-between col-span-2">
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-500 hover:text-gray-700"
        >
          View
        </Button>
        <Button variant="ghost" size="sm" className="text-gray-500">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

const ReviewList = () => {
  return (
    <div className="p-4 md:p-6 max-w-[1200px] mx-auto">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-medium text-gray-700">Review List</h1>

          <div className="flex items-center gap-3">
            <div className="flex items-center border rounded-md px-3 py-1.5 gap-2 bg-red-600 text-white">
              <button className="flex items-center gap-1 text-sm text-white">
                Delete
              </button>
              <X className="w-4 h-4 text-white" />
            </div>                     
           
          </div>
        </div>

        <div className="overflow-hidden bg-white border rounded-lg">
         
          <div className="grid grid-cols-12 px-4 py-2 text-xs font-medium text-gray-500 border-b bg-gray-50">
            <div className="col-span-1">SELECT</div>
            <div className="col-span-5">REVIEW DETAILS</div>
            <div className="col-span-2">RATING</div>
            <div className="col-span-2">STATUS</div>
            <div className="col-span-2">ACTIONS</div>
          </div>

          {[
            {
              name: "Sharmin S.",
              comment: "Really loved the product quality and support.",
              rating: 5,
              status: "Approved",
            },
            {
              name: "Riyad H.",
              comment: "The packaging was not great.",
              rating: 3,
              status: "Pending",
            },
            {
              name: "Nishat K.",
              comment: "Perfect experience, highly recommended!",
              rating: 5,
              status: "Approved",
            },
            {
              name: "Tariq M.",
              comment: "Average performance, could improve a lot.",
              rating: 2,
              status: "Pending",
            },
          ].map((review, idx) => (
            <ReviewRow
              key={idx}
              avatar="/avatar.png"
              name={review.name}
              comment={review.comment}
              rating={review.rating}
              status={review.status as "Approved" | "Pending"}
            />
          ))}

          <div className="px-4 py-2 text-xs text-gray-500 border-t">
            +3 more reviews...
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewList;
