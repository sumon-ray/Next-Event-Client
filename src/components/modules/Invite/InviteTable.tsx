'use client'
import { useEffect, useState } from "react";
import { toast } from "sonner";
import NextButton from "@/components/shared/NextButton";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import { sendInvitation } from "@/services/InviteService";
import { getAllUsers } from "@/services/UserService";

interface IUser {
  id: string;
  email: string;
  name: string;
  profileImage: string
}

interface InviteUserTableProps {
  eventId: string;

}

const InviteUserTable = ({ eventId }: InviteUserTableProps) => {

  const [loading, setLoading] = useState(false);
  const { user } = useUser()



  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const Users = await getAllUsers();
    
        if (!Users.success) {
          toast.error(Users.message || "Failed to fetch users");
          return;
        }
        setUsers(Users.data );
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleInvite = async (inviteReceiverId: string, email: string) => {


    if (user?.email === email) {
      toast.error("You can't invite yourself")
      return
    }
    try {
      setLoading(true);
      const payload = {
        inviteReceiverId,
        eventId,
      };
      const res = await sendInvitation(payload);
      console.log("🚀 ~ handleInvite ~ res:", res)
     

      if (!res.success) {
        toast.error(res.message || "Failed to send invite");
      } else {
        toast.success(res.message || "Invite sent successfully");
      }
    } catch (error) {
      toast.error("Error sending invitation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full overflow-x-auto border-t border-white rounded-lg shadow-md border-1">
      <table className="min-w-[700px] w-full text-left text-base">
        <thead className="text-sm font-medium text-gray-500 uppercase border-b border-white">
          <tr>
            <th className="px-4 py-3 border-2">Name</th>
            <th className="px-4 py-3 border-2">Email</th>
            <th className="px-4 py-3 text-center border-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: IUser) => (
            <tr key={user.id} className="border-white border-1">
              <td className="flex items-center gap-4 px-4 border-2 py-9"><Image src={
    user.profileImage?.startsWith("http")
      ? user.profileImage
      : "https://res.cloudinary.com/dhl04adhz/image/upload/v1742656837/Zayed%20Iqbal-Zayed%40Iqbal.com.jpg"
  } alt="" width={5000} height={5000} className="w-10 h-10 rounded-full" /> {user.name}</td>
              <td className="px-4 py-4 border-2">{user.email}</td>
              <td className="flex items-center justify-center h-full gap-4 my-4">
                <NextButton
                  disabled={loading}
                  onClick={() => handleInvite(user.id, user.email)}
                  name={loading ? "Sending..." : "Invite"}
                >

                </NextButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InviteUserTable;
