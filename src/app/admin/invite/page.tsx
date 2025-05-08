import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Title from "@/components/shared/Title";
import NextButton from "@/components/shared/NextButton";
import { getAllUsers } from "@/services/Users";

interface IUser {
  id: string;
  name: string;
  email: string;
  address?: string;
  occupation?: string;
  phoneNumber: string;
  profileImage?: string;

}

const UserList =async () => {
  const users = await getAllUsers()
 


  return (
    <div className="px-4 py-6 md:mx-8">
      <div className="flex items-center justify-between mb-4">
        <Title title="Invites Users" />
      </div>

      <div className="w-full overflow-x-auto border rounded-lg shadow-sm">
        <table className="min-w-[900px] w-full text-left text-base">
          <thead className="text-sm font-medium text-gray-500 uppercase border-b ">
            <tr>
              <th className="px-4 py-3 w-[200px]">Name</th>
              <th className="px-4 py-3 w-[200px]">Email</th>
              <th className="px-4 py-3 w-[200px]">Address</th>
              <th className="px-4 py-3 w-[140px]">Occupation</th>
              <th className="px-4 py-3 w-[180px]">Phone</th>    
              <th className="px-4 py-3 w-[120px] text-end pr-10">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map(
              (user:IUser) => (
                <tr
                  key={user.id}
                  className="transition-colors border-b hover:bg-gray-50"
                >
                  <td className="flex items-center gap-3 px-4 py-4">
                    <div className="relative w-10 h-10">
                      <Image
                        src={user.profileImage || "/placeholder.svg"}
                        alt={user.name}
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                    <span className="font-medium text-gray-800">{user.name}</span>
                  </td>
                  <td className="px-4 py-4 truncate">{user.email}</td>
                  <td className="px-4 py-4 truncate">{user.address || 'not updated yet'}</td>
                  <td className="px-4 py-4">{user.occupation || 'not updated yet'}</td>
                  <td className="px-4 py-4">{user.phoneNumber}</td>
                 
                  <td className="px-4 py-4 text-right">
                    <NextButton name="Invite" />
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
