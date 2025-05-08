import Image from "next/image";
import { Star, Pencil, Trash } from "lucide-react";

export default function FeedbackCard() {
  return (
    <div className="max-w-md w-full mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md relative">
      {/* Dotted background pattern */}
      <div className="absolute inset-0 bg-[url('/dots-pattern.png')] opacity-10 z-0 rounded-lg" />

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold">
            <span className="text-gray-700">FEED</span>
            <span className="text-cyan-500">BACK</span>
          </h1>
        </div>

        {/* Avatar */}
        <div className="flex justify-center -mb-10 relative z-20">
          <div className="w-20 h-20 rounded-full bg-white p-1 shadow-md">
            <div className="w-full h-full rounded-full bg-cyan-100 flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=80&width=80"
                alt="Profile"
                width={80}
                height={80}
                className="rounded-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Card Content */}
        <div className="bg-[#0a3b5e] text-white p-6 pt-14 rounded-lg shadow-lg">
          {/* Name and title */}
          <div className="text-center mb-2">
            <h2 className="text-lg sm:text-xl font-semibold">Dr. John Smith</h2>
            <p className="text-sm text-gray-300">Graphic Design</p>
          </div>

          {/* Star rating */}
          <div className="flex justify-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={16} className="fill-yellow-400 text-yellow-600" />
            ))}
          </div>

          {/* Review text */}
          <p className="text-center text-sm text-gray-300 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </p>

          {/* Actions */}
          <div className="flex justify-between items-center gap-2 text-xs mt-4">
            <button className="flex items-center gap-1 px-3 py-1 border border-white rounded-full hover:bg-white hover:text-[#0a3b5e] transition">
              <Pencil size={14} /> Edit
            </button>
            <button className="flex items-center gap-1 px-3 py-1 border border-white rounded-full hover:bg-red-100 hover:text-red-700 text-white transition">
              <Trash size={14} /> Delete
            </button>
          </div>

          {/* View More Button */}
          {/* <div className="flex justify-center mt-6">
            <button className="bg-transparent border border-white text-white text-xs py-1 px-4 rounded-full hover:bg-white hover:text-[#0a3b5e] transition-colors">
              VIEW MORE
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
