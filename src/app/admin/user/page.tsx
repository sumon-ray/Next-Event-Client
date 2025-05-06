/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// app/user/UserList.tsx
"use client";
import { useEffect, useState } from "react";
import { X, } from "lucide-react";
import { toast } from "sonner";
import { daleteUser, getAllUser } from "@/services/UserService";
import UserRow from "@/components/modules/UserRow/UserRow";

const UserList = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUser();
        setUsers(res?.data || []);
      } catch (error) {
        console.error("Failed to load users", error);
      }
    };
    fetchUsers();
  }, []);

  const handleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleDelete = async () => {
    if (selectedIds.length === 0) return;

    const selectedUsers = users.filter((u) => selectedIds.includes(u.id));
    for (const user of selectedUsers) {
      try {
        await daleteUser(user.id);
        toast.success(`${user.name} deleted`);
      } catch (error ) {
        toast.error(`Failed to delete ${user.name}`);
      }
    }

    setUsers((prev) => prev.filter((u) => !selectedIds.includes(u.id)));
    setSelectedIds([]);
  };

  return (
    <div className="p-4 md:p-6 max-w-[1200px] mx-auto">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-medium text-gray-700">All Users</h1>
          <div className="flex items-center gap-3">
            <div
              className="flex items-center border rounded-md px-3 py-1.5 gap-2 text-white bg-red-600 cursor-pointer"
              onClick={handleDelete}
            >
              <button className="text-white text-sm flex items-center gap-1">
                Delete
              </button>
              <X className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border overflow-hidden">
          <div className="grid grid-cols-12 text-xs text-white py-3 px-4 border-b font-medium bg-blue-500 hover:bg-blue-700">
            <div className="col-span-1">SELECT</div>
            <div className="col-span-5">USER DETAILS</div>
            <div className="col-span-2">ROLE</div>
            <div className="col-span-2">STATUS</div>
            <div className="col-span-2">ACTIONS</div>
          </div>

          {users.map((user) => (
            <UserRow
              key={user.id}
              id={user.id}
              avatar={user.profileImage}
              name={user.name}
              email={user.email}
              role={user.role.toLowerCase()}
              status={user.isDeleted ? "Inactive" : "Active"}
              isSelected={selectedIds.includes(user.id)}
              onSelect={handleSelect}
            />
          ))}

          {users.length === 0 && (
            <div className="px-4 py-4 text-sm text-center text-gray-500">
              No users found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserList;
