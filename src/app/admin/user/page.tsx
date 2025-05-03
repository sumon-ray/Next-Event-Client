import Image from "next/image";
import { ChevronDown, MoreHorizontal, X, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

interface UserRowProps {
  avatar: string;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive";
}

function UserRow({ avatar, name, email, role, status }: UserRowProps) {
  return (
    <div className="grid grid-cols-12 py-3 px-4 items-center border-b hover:bg-gray-50">
      <div className="col-span-1">
        <Checkbox />
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
        <Badge variant="outline" className="text-xs bg-gray-50 capitalize">
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

const UserList = () => {
  return (
    <div className="p-4 md:p-6 max-w-[1200px] mx-auto">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-medium text-gray-700">User List</h1>

          <div className="flex items-center gap-3">
            <div className="flex items-center border rounded-md px-3 py-1.5 gap-2 bg-white">
              <button className="text-gray-500 text-sm flex items-center gap-1">
                Delete
              </button>
              <X className="h-4 w-4 text-gray-400" />
            </div>

            <div className="flex items-center border rounded-md px-3 py-1.5 gap-2 bg-white">
              <span className="text-sm text-gray-700">Sort by</span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>

            <div className="flex items-center border rounded-md px-3 py-1.5 gap-2 bg-white">
              <span className="text-sm text-gray-700">Role</span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>

            <div className="flex items-center border rounded-md px-3 py-1.5 gap-2 bg-white">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">Status</span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-12 text-xs text-gray-500 py-2 px-4 border-b font-medium bg-gray-50">
            <div className="col-span-1">SELECT</div>
            <div className="col-span-5">USER DETAILS</div>
            <div className="col-span-2">ROLE</div>
            <div className="col-span-2">STATUS</div>
            <div className="col-span-2">ACTIONS</div>
          </div>

          {/* User Rows */}
          {[
            { name: "Sharmin S.", email: "sharmin@example.com", role: "admin", status: "Active" },
            { name: "Riyad H.", email: "riyad@example.com", role: "moderator", status: "Inactive" },
            { name: "Nishat K.", email: "nishat@example.com", role: "user", status: "Active" },
            { name: "Tariq M.", email: "tariq@example.com", role: "user", status: "Inactive" },
          ].map((user, idx) => (
            <UserRow
              key={idx}
              avatar="/avatar.png"
              name={user.name}
              email={user.email}
              role={user.role}
              status={user.status as "Active" | "Inactive"}
            />
          ))}

          <div className="px-4 py-2 text-xs text-gray-500 border-t">
            +3 more users...
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
