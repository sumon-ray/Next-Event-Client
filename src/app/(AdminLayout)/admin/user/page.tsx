"use client";

import Image from "next/image";
import { useCallback, useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { getAllUsers, deleteUser, blockUser } from "@/services/UserService";
import { IUser } from "@/app/types";
import Loader from "@/components/ui/Loader/Loader";
import Title from "@/components/shared/Title";
import NextButton from "@/components/shared/NextButton";
import { Badge } from "@/components/ui/badge";
import { IQuery } from "@/services/EventService";

const ROLES = ["ALL", "ADMIN", "USER"];

const UserList = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState<IQuery & { searchTerm?: string; role?: string }>({
    page: 1,
    limit: 10,
    searchTerm: "",
    role: "ALL",
  });

  const [meta, setMeta] = useState<{ page: number; limit: number; total: number }>({
    page: 1,
    limit: 10,
    total: 0,
  });

  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  // Fetch users based on current query
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const fetchQuery = { ...query };
      if (fetchQuery.role === "ALL") delete fetchQuery.role;

      const res = await getAllUsers(fetchQuery);
      setUsers(res?.data?.data || []);
      setMeta(res?.data?.meta || { page: 1, limit: 10, total: 0 });
    } catch (error) {
      console.error("Failed to load users:", error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  }, [query]); // <-- Removed 'meta' here to avoid infinite loop

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Cleanup search debounce on unmount
  useEffect(() => {
    return () => {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
    };
  }, []);

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      const res = await deleteUser(id);
      if (res.success) {
        toast.success("User deleted successfully");
        fetchUsers();
      } else {
        toast.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
      toast.error("Failed to delete user");
    } finally {
      setLoading(false);
    }
  };

  const handleBlock = async (id: string) => {
    setLoading(true);
    try {
      const res = await blockUser(id);
      if (res.success) {
        toast.success("User blocked successfully");
        fetchUsers();
      } else {
        toast.error("Failed to block user");
      }
    } catch (error) {
      console.error("Failed to block user:", error);
      toast.error("Failed to block user");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    setQuery((prev) => ({ ...prev, page: newPage }));
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuery((prev) => ({ ...prev, limit: Number(e.target.value), page: 1 }));
  };

  const handleRoleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuery((prev) => ({ ...prev, role: e.target.value, page: 1 }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (searchTimeout.current) clearTimeout(searchTimeout.current);

    searchTimeout.current = setTimeout(() => {
      setQuery((prev) => ({ ...prev, searchTerm: val.trim(), page: 1 }));
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="px-10 py-6 mb-20"
    >
      <div className="flex items-center justify-between mb-6">
        <Title title="Manage All Users" />

        <div className="flex gap-4 items-center">
          {/* Search input */}
          <input
            type="text"
            placeholder="Search by name or email"
            onChange={handleSearchChange}
            className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Search users"
          />

          {/* Role filter */}
          <select
            className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={query.role}
            onChange={handleRoleFilterChange}
            aria-label="Filter by role"
          >
            {ROLES.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>

          {/* Items per page */}
          <select
            className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={query.limit}
            onChange={handleLimitChange}
            aria-label="Items per page"
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size} per page
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[500px]">
          <Loader />
        </div>
      ) : (
        <>
          <div className="w-full overflow-x-auto border-t border-white rounded-lg shadow-md border-1">
            <table className="min-w-[900px] w-full text-left text-base">
              <thead className="text-sm font-medium text-gray-500 uppercase border-b border-white">
                <tr>
                  <th className="px-4 py-3 w-[200px]">User</th>
                  <th className="px-4 py-3 w-[100px]">Role</th>
                  <th className="px-4 py-3 w-[100px]">Status</th>
                  <th className="px-4 py-3 w-[100px]">Deleted?</th>
                  <th className="px-4 py-3 w-[150px] text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-500">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="border-white">
                      <td className="flex items-center gap-3 px-4 py-4 border-2">
                        <div className="relative w-16 h-16">
                          <Image
                            src={
                              user.profileImage?.startsWith("http")
                                ? user.profileImage
                                : "https://res.cloudinary.com/dhl04adhz/image/upload/v1742656837/Zayed%20Iqbal-Zayed%40Iqbal.com.jpg"
                            }
                            alt={`${user.name} Profile`}
                            width={64}
                            height={64}
                            className="rounded-full"
                            priority={false}
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-800">{user.name}</span>
                          <span className="text-sm text-gray-500">{user.email}</span>
                        </div>
                      </td>

                      <td className="p-4 capitalize border-2">
                        <Badge
                          className={`text-xs px-3 py-1 shadow rounded-full font-semibold ${
                            user.role === "ADMIN"
                              ? "bg-green-200 text-green-800"
                              : user.role === "USER"
                              ? "bg-blue-200 text-blue-800"
                              : ""
                          }`}
                        >
                          {user.role}
                        </Badge>
                      </td>

                      <td className="px-4 border-2">
                        {user.isDeleted ? (
                          <span className="text-red-500">Inactive</span>
                        ) : (
                          <span className="text-green-600">Active</span>
                        )}
                      </td>

                      <td className="p-4 capitalize border-2">
                        <Badge
                          className={`text-xs px-3 py-1 shadow rounded-full font-semibold ${
                            user.isDeleted
                              ? "bg-green-200 text-red-800"
                              : "bg-blue-200 text-green-800"
                          }`}
                        >
                          {user.isDeleted ? "Deleted" : "Not Deleted"}
                        </Badge>
                      </td>

                      <td className="flex items-center justify-center gap-6">
                        <NextButton name="Delete" onClick={() => handleDelete(user.id)} />
                        <NextButton name="Block" onClick={() => handleBlock(user.id)} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6 gap-4">
            {[...Array(Math.ceil(meta.total / meta.limit)).keys()].map((num) => (
              <button
                key={num + 1}
                onClick={() => handlePageChange(num + 1)}
                className={`px-3 py-1 rounded-md ${
                  meta.page === num + 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-black"
                }`}
                aria-current={meta.page === num + 1 ? "page" : undefined}
              >
                {num + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
};

export default UserList;
