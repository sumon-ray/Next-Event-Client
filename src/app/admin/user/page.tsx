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
          <span className="text-xs text-gray-500">{email}</span>
        </div>
      </div>
      <div className="col-span-2">
        <Badge variant="outline" className="text-xs capitalize bg-gray-50">
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
      <div className="flex items-center justify-between col-span-2">
        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
          Edit
        </Button>
        <Button variant="ghost" size="sm" className="text-gray-500">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

const UserList = () => {
  const userInfo=[
    { name: "Sharmin S.", email: "sharmin@example.com", role: "admin", status: "Active" },
    { name: "Riyad H.", email: "riyad@example.com", role: "moderator", status: "Inactive" },
    { name: "Nishat K.", email: "nishat@example.com", role: "user", status: "Active" },
    { name: "Tariq M.", email: "tariq@example.com", role: "user", status: "Inactive" },
  ]
  return (
    <div className="p-4 md:p-0 max-w-[1200px] mx-auto">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-medium text-gray-700">User List</h1>

          <div className="flex items-center gap-3">
            <div className="flex items-center border rounded-md px-3 py-1.5 gap-2 bg-white">
              <button className="flex items-center gap-1 text-sm text-gray-500">
                Delete
              </button>
              <X className="w-4 h-4 text-gray-400" />
            </div>

            <div className="flex items-center border rounded-md px-3 py-1.5 gap-2 bg-white">
              <span className="text-sm text-gray-700">Sort by</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>

            <div className="flex items-center border rounded-md px-3 py-1.5 gap-2 bg-white">
              <span className="text-sm text-gray-700">Role</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>

            <div className="flex items-center border rounded-md px-3 py-1.5 gap-2 bg-white">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">Status</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        </div>

        <div className="overflow-hidden bg-white border rounded-lg">
     
          <div className="grid grid-cols-12 px-4 py-2 text-xs font-medium text-gray-500 border-b bg-gray-50">
            <div className="col-span-1">SELECT</div>
            <div className="col-span-5">USER DETAILS</div>
            <div className="col-span-2">ROLE</div>
            <div className="col-span-2">STATUS</div>
            <div className="col-span-2">ACTIONS</div>
          </div>

          {userInfo.map((user, idx) => (
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
