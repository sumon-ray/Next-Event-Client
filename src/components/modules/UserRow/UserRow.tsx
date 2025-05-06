// components/UserRow.tsx
"use client";

import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { UserRowProps } from "@/app/types/userRowProps";


const UserRow = ({
  id,
  avatar,
  name,
  email,
  role,
  status,
  isSelected,
  onSelect,
}: UserRowProps) => {
  return (
    <div className="grid grid-cols-12 py-3 px-4 items-center border-b hover:bg-gray-50">
      <div className="col-span-1">
        <Checkbox checked={isSelected} onCheckedChange={() => onSelect(id)} />
      </div>
      <div className="col-span-5 flex gap-3 items-center">
        <div className="w-12 h-12 relative">
          <Image
            src={avatar || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover rounded-full"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-medium">{name}</span>
          <span className="text-xs text-gray-500">{email}</span>
        </div>
      </div>
      <div className="col-span-2">
        <Badge
          className={`text-xs capitalize transition-colors ${
            role === "admin"
              ? "bg-blue-100 text-blue-700 hover:bg-black hover:text-white"
              : role === "moderator"
              ? "bg-purple-100 text-purple-700 hover:bg-black hover:text-white"
              : "bg-orange-100 text-orange-700 hover:bg-black hover:text-white"
          }`}
        >
          {role}
        </Badge>
      </div>
      <div className="col-span-2">
        <Badge
          className={`text-xs capitalize transition-colors ${
            status === "Active"
              ? "bg-green-100 text-green-700 hover:bg-black hover:text-white"
              : "bg-red-100 text-red-700 hover:bg-black hover:text-white"
          }`}
        >
          {status}
        </Badge>
      </div>
      <div className="col-span-2 flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          className="bg-blue-100 text-blue-700 hover:bg-black hover:text-white"
        >
          Edit
        </Button>
        <Button variant="ghost" size="sm" className="text-gray-500">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default UserRow;
