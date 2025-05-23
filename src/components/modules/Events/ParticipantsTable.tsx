'use client'
import Image from "next/image";
import { IEvent } from "@/app/types";

interface IUser {
  id: string;
  email: string;
  name: string;
  profileImage: string
}

interface InviteUserTableProps {
    event: IEvent | any

}

const ParticipantsTable = ({event }: InviteUserTableProps) => {
    // console.log(event.participants);


  return (
    <div className="w-full overflow-x-auto border-t border-white rounded-lg shadow-md border-1">
      <table className="min-w-[700px] w-full text-left text-base">
        <thead className="text-sm font-medium text-gray-500 uppercase border-b border-white">
          <tr>
            <th className="px-4 border-2">Name</th>
            <th className="px-4 border-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {event?.participants?.map((user: IUser | any) => (
            <tr key={user.user.id} className="border-white border-1">
              <td className="flex items-center gap-4 px-4 border-2"><Image src={
    user.user.profileImage?.startsWith("http")
      ? user.user.profileImage
      : "https://res.cloudinary.com/dhl04adhz/image/upload/v1742656837/Zayed%20Iqbal-Zayed%40Iqbal.com.jpg"
  } alt="" width={5000} height={5000} className="w-10 h-10 rounded-full" /> {user.user.name}</td>
              <td className="px-4 border-2">{user.user.email}</td>
              <td className="flex items-center justify-center h-full gap-4">
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParticipantsTable;
