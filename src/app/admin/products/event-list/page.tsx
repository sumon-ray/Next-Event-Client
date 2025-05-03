import Image from "next/image";
import { Star, ChevronDown, MoreHorizontal, X, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

interface ProductRowProps {
  image: string;
  name: string;
  categories: string[];
  rating: number;
  reviews: number;
  quantity?: string;
}

function ProductRow({
  image,
  name,
  categories,
  rating,
  reviews,
}: ProductRowProps) {
  return (
    <div className="grid grid-cols-12 py-3 px-4 items-center border-b hover:bg-gray-50">
      <div className="col-span-1">
        <Checkbox />
      </div>
      <div className="col-span-5 flex gap-3">
        <div className="w-16 h-16 relative">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-medium">{name}</span>
          <span className="text-xs text-gray-500">
            Manufacturer offers new event...
          </span>
        </div>
      </div>
      <div className="col-span-2">
        <div className="flex flex-wrap gap-1">
          {categories.map((category, index) => (
            <Badge
              key={index}
              variant="outline"
              className="text-xs bg-gray-50"
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>
      <div className="col-span-2">
        <div className="flex items-center gap-1">
          <div className="flex">
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
          <span className="text-xs text-gray-500">
            {rating} ({reviews})
          </span>
        </div>
      </div>
      <div className="col-span-2 flex items-center justify-between">
        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
          Edit
        </Button>
        <Button variant="ghost" size="sm" className="text-gray-500">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

const EventList = () => {
  return (
    <div className="p-4 md:p-6 max-w-[1200px] mx-auto">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-medium text-gray-700">Event List </h1>

          <div className="flex items-center gap-3">
            <div className="flex items-center border rounded-md px-3 py-1.5 gap-2 bg-white">
              <button className="text-gray-500 text-sm flex items-center gap-1">
                delete
              </button>
              <X className="h-4 w-4 text-gray-400" />
            </div>

            <div className="flex items-center border rounded-md px-3 py-1.5 gap-2 bg-white">
              <span className="text-sm text-gray-700">Sort by:</span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>

            <div className="flex items-center border rounded-md px-3 py-1.5 gap-2 bg-white">
              <span className="text-sm text-gray-700">Collection Type</span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>

            <div className="flex items-center border rounded-md px-3 py-1.5 gap-2 bg-white">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">Price Range</span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-12 text-xs text-gray-500 py-2 px-4 border-b font-medium bg-gray-50">
            <div className="col-span-1">SELECT</div>
            <div className="col-span-5">PRODUCT DETAILS</div>
            <div className="col-span-2">CATEGORY</div>
            <div className="col-span-2">RATE</div>
            <div className="col-span-2">ACTIONS</div>
          </div>

          {/* Product Rows */}
          {[
            {
              name: "Wood Chair Dark Brown",
              categories: ["Furniture"],
              colors: ["#8B4513", "#A0522D", "#CD853F"],
            },
            {
              name: "Scandinavian Armchair",
              categories: ["Furniture"],
              colors: ["#F5F5DC", "#D2B48C"],
            },
            {
              name: "Kitchen Table",
              categories: ["Furniture"],
              colors: ["#8B4513", "#A0522D"],
            },
            {
              name: "Paris Decor Set",
              categories: ["Plaques"],
              colors: ["#D3D3D3"],
            },
            {
              name: "Modern White Kitchen",
              categories: ["Furniture"],
              colors: ["#000000", "#FFFFFF"],
            },
            {
              name: "Brown Swivel Chair GH1 2k",
              categories: ["Furniture"],
              colors: ["#000000", "#8B4513"],
            },
            {
              name: "Blue Armchair HD1 2k",
              categories: ["Furniture"],
              colors: ["#000000", "#8B4513", "#4682B4", "#FFD700"],
            },
            {
              name: "Scandinavian Armchair GG3 2k",
              categories: ["Furniture"],
              colors: ["#8B4513", "#A0522D", "#F5F5DC"],
            },
          ].map((product, idx) => (
            <ProductRow
              key={idx}
              image="/placeholder.svg?height=60&width=60"
              name={product.name}
              categories={product.categories}           
            
              rating={4.3}
              reviews={45}
            />
          ))}

          <div className="px-4 py-2 text-xs text-gray-500 border-t">
            +3 More items...
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventList;
