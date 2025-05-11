import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Title from "@/components/shared/Title";
import { getEventsOfUser } from "@/services/EventService";
import { IEvent } from "@/app/types";
import { InviteModal } from "@/components/modules/Invite/InviteModal";
import { UpdateModal } from "@/components/modules/Events/UpdateModal";
import { DeleteModal } from "@/components/modules/Events/DeleteModal";



const UserList =async () => {
  const users = await getEventsOfUser()




  return (
    <div className="px-10 py-6 mb-20">
      <div className="flex items-center justify-between mb-4">
        <Title title="Manage Your Own Events" />
      </div>

      <div className="w-full overflow-x-auto border-t border-white rounded-lg shadow-md border-1">
        <table className="min-w-[900px] w-full text-left text-base">
          <thead className="text-sm font-medium text-gray-500 uppercase border-b border-white">
            <tr>
              <th className="px-4 py-3 w-[200px] pl-10 ">Title</th>
          
              <th className="px-4 py-3 w-[200px] text-center border-2 ">Venue</th>
              <th className="px-4 py-3 w-[140px] border-2 ">Event Type</th>
              <th className="px-4 py-3 w-[180px] border-2 ">Paid / Free</th>    
              <th className="px-4 py-3 w-[120px] border-2 text-center ">Actions</th>
            </tr>
          </thead>

          <tbody>
          {users?.map((event:IEvent) => (
  <tr key={event.id} className="border-white ">
    <td className="flex items-center h-full gap-3 px-4 border-2 py-9">
      <div className="relative w-10 h-10">
        <Image
          src={event.bannerImage || "/placeholder.svg"}
          alt={event.title}
          fill
          className="object-cover rounded-full"
        />
      </div>
      <span className="font-medium text-gray-800">{event.title}</span>
    </td>
   
    <td className="h-full px-4 py-4 truncate border-2">{event.venue}</td>
    <td className="h-full px-4 py-4 border-2">{event.type}</td>
    <td className="h-full px-4 py-4 border-2">{event.isPaid ? "Paid" : "Free"}</td>
    <td className="flex items-center justify-center h-full gap-4 my-4">
     <InviteModal   id={event.id!}/>
     <UpdateModal  id={event.id!}/>
    <DeleteModal id={event.id!}  />
    </td>
  </tr>
))}

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
