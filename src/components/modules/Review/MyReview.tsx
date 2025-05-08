import Image from "next/image";
import { Star, Pencil, Trash } from "lucide-react";

interface FeedbackCardProps {
  name?: string;
  role?: string;
  rating?: number;
  comment?: string;
  image?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function MyReview({
  name = "Anonymous User",
  role = "Event Participant",
  rating = 0,
  comment = "No comment provided.",
  image = "/placeholder.svg?height=80&width=80",
  onEdit,
  onDelete,
}: FeedbackCardProps) {

  return (
    <div className="">

      <div className="max-w-md w-full mx-auto px-4 sm:px-6 pb-4  rounded-lg shadow-md relative">      
      <div className="absolute inset-0 bg-[url('/dots-pattern.png')] opacity-10 z-0 rounded-lg" />

      <div className="relative z-10">       

        <div className="flex justify-center -mb-10 relative z-20">
          <div className="w-20 h-20 rounded-full bg-white p-1 shadow-md">
            <div className="w-full h-full rounded-full bg-cyan-100 flex items-center justify-center">
              <Image
                src={image}
                alt="Profile"
                width={80}
                height={80}
                className="rounded-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="bg-[#0a3b5e] text-white p-6 pt-14 rounded-lg shadow-lg">
         
          <div className="text-center mb-2">
            <h2 className="text-lg sm:text-xl font-semibold">{name}</h2>
            <p className="text-sm text-gray-300">{role}</p>
          </div>

       
          <div className="flex justify-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={16}
                className={star <= rating ? "fill-yellow-400 text-yellow-600" : "text-gray-400"}
              />
            ))}
          </div>

          <p className="text-center text-sm text-gray-300 mb-4">{comment}</p>

     
          <div className="flex justify-between items-center gap-2 text-xs mt-4">
            <button
              onClick={onEdit}
              className="flex items-center gap-1 px-3 py-1 border border-white rounded-full hover:bg-white hover:text-[#0a3b5e] transition"
            >
              <Pencil size={14} /> Edit
            </button>
            <button
              onClick={onDelete}
              className="flex items-center gap-1 px-3 py-1 border border-white rounded-full hover:bg-red-100 hover:text-red-700 text-white transition"
            >
              <Trash size={14} /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
