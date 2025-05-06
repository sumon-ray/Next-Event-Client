"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ReviewRowProps } from "@/app/types/reviewType";

const ReviewRow = ({id,
  image,
  name,
  comment,
  rating,
  onDetailClick,
  onDelete,
}: ReviewRowProps & {
  onDetailClick: (id: string) => void;
  onDelete: () => void;
}) => {
  return (
    <div className="grid grid-cols-12 py-3 px-4 items-center border-b hover:bg-gray-50">
      <div className="col-span-1">
        <Checkbox />
      </div>

      <div className="col-span-5 flex gap-3 items-center">
        <div className="w-12 h-12 relative">
          <Image
            src={image }
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
      <span className=" bg-blue-500 border-gray-400 p-1 px-2 rounded-lg font-normal text-sm hover:bg-blue-700 text-white" onClick={() => onDetailClick(id)}>Details</span>

      </div>

      <div className="col-span-2 ">
        <Button
          size="sm"
          variant="destructive"
          className="text-xs"
          onClick={ onDelete}
        >
          Delete
        </Button>
      </div>

      
    </div>
  );
};

export default ReviewRow;
