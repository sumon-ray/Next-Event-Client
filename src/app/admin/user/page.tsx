"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { getAllUsers, deleteUser } from "@/services/UserService";
import { IUser } from "@/app/types";
import Loader from "@/components/ui/Loader/Loader";
import Title from "@/components/shared/Title";
import NextButton from "@/components/shared/NextButton";
import { Badge } from "@/components/ui/badge";

const UserList = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchUsers = async () => {
      try {
        const res = await getAllUsers();
        setUsers(res?.data || []);
      } catch (error) {
        console.error("Failed to load users", error);
      }
    };
    fetchUsers();
    setLoading(false);
  }, []);
  const handleDelete = async (id: string) => { }
  const handleBlock = async (id: string) => { }


  return (
    <div className="px-10 py-6 mb-20">
      <div className="flex items-center justify-between mb-4">
        <Title title="Manage All Users" />

      </div>

      {loading ? <Loader /> : users?.length > 0 ? (
        <div className="w-full overflow-x-auto border-t border-white rounded-lg shadow-md border-1">
          <table className="min-w-[900px] w-full text-left text-base">
            <thead className="text-sm font-medium text-gray-500 uppercase border-b border-white">
              <tr>

                <th className="px-4 py-3 w-[200px]">User</th>
                <th className="px-4 py-3 w-[100px]">Role</th>
                <th className="px-4 py-3 w-[100px]">Status</th>
                <th className="px-4 py-3 w-[100px]">Delete ?</th>
                <th className="px-4 py-3 w-[150px] text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-white">

                  <td className="flex items-center gap-3 px-4 py-4 border-2">
                    <div className="relative w-16 h-16">
                      <Image src={
                        user.profileImage?.startsWith("http")
                          ? user.profileImage
                          : "https://res.cloudinary.com/dhl04adhz/image/upload/v1742656837/Zayed%20Iqbal-Zayed%40Iqbal.com.jpg"
                      } alt="" width={5000} height={5000} className="w-16 h-16 rounded-full" /> 
                
                    
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-800">{user.name}</span>
                      <span className="text-sm text-gray-500">{user.email}</span>
                    </div>
                  </td>
                  <td className="p-4 px-4 py-4 capitalize border-2">
                    <Badge
                  className={`text-xs px-3 py-1 shadow rounded-full font-semibold ${
                    user.role === "ADMIN"
                      ? " bg-green-200  text-green-800"
                      : user.role === "USER"
                      ? " bg-blue-200  text-blue-800"
                      : ""
                  }`}
                >
                  {user.role}
                </Badge></td>
                  <td className="px-4 py-4 border-2">
                    {user.isDeleted ? (
                      <span className="text-red-500">Inactive</span>
                    ) : (
                      <span className="text-green-600">Active</span>
                    )}
                  </td>
                   <td className="p-4 px-4 py-4 capitalize border-2">
                    <Badge
                  className={`text-xs px-3 py-1 shadow rounded-full font-semibold ${
                    user.isDeleted
                      ? " bg-green-200  text-red-800"
                     :
                       " bg-blue-200  text-green-800"
                     
                  }`}
                >
                  {user.isDeleted ? "Deleted" : "Not Deleted"}
                </Badge></td>
                  <td className="flex items-center justify-center gap-6 ">
                    <NextButton name="Delete" onClick={() => handleDelete(user.id)} />
                    <NextButton name="Block" onClick={() => handleBlock(user.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-semibold text-center text-gray-500">
            No Users Found
          </h1>
        </div>
      )}
    </div>
  );
};

export default UserList;
