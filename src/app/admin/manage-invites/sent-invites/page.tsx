'use client'

import Image from "next/image";
import Title from "@/components/shared/Title";
import { getSingleUserInvites } from "@/services/InviteService";
import { useEffect, useState } from "react";
import NextButton from "@/components/shared/NextButton";

const SentInviteList =  () => {
   const [invites, setInvites] = useState([]);
 
  console.log("🚀 ~ SentInviteList ~ invites:", invites)
useEffect(() => {
  const getInvites = async () => {
    const data = await getSingleUserInvites();
    setInvites(data?.data || []);
  };
  getInvites();
},[])


  return (
    <div className="px-4 py-6 md:mx-8">
      <div className="flex items-center justify-between mb-4">
        <Title title="Sent Invitations" />
      </div>

      <div className="w-full overflow-x-auto border rounded-lg shadow-sm">
       {
         invites.length > 0? <table className="min-w-[900px] w-full text-left text-base">
         <thead className="text-sm font-medium text-gray-500 uppercase border-b">
           <tr>
             <th className="px-4 py-3 w-[200px]">Event</th>
             <th className="px-4 py-3 w-[200px]">Sender</th>
             <th className="px-4 py-3 w-[200px]">Receiver ID</th>
             <th className="px-4 py-3 w-[140px]">Event Fee</th>
             <th className="px-4 py-3 w-[180px]">Action</th>
           </tr>
         </thead>
         <tbody>
           { invites.map((invite: any) => (
             <tr key={invite.id} className="transition-colors border-b hover:bg-gray-50">
               <td className="px-4 py-4">
                 <div className="flex items-center gap-3">
                   <div className="relative w-10 h-10">
                     <Image
                       src={invite.event?.bannerImage || "/placeholder.svg"}
                       alt={invite.event?.title || "Event Image"}
                       fill
                       className="object-cover rounded-md"
                     />
                   </div>
                   <span className="font-medium text-gray-800">{invite.event?.title}</span>
                 </div>
               </td>

               <td className="px-4 py-4">
                 <div className="flex items-center gap-3">
                   <div className="relative w-10 h-10">
                     <Image
                       src={invite.inviter?.profileImage || "/placeholder.svg"}
                       alt={invite.inviter?.email || "Sender Image"}
                       fill
                       className="object-cover rounded-full"
                     />
                   </div>
                   <span className="text-gray-800">{invite.inviter?.email}</span>
                 </div>
               </td>
               <td className="px-4 py-4">{invite.event?.title}</td>
               <td className="px-4 py-4">{invite.event?.fee || 0} BDT</td>
             
               <td className="px-4 py-4"><NextButton name="Accept" /></td>
             </tr>
           ))}
         </tbody>
       </table> : <div className="py-4 text-3xl text-center "> No Invitation has sent recently</div>
       
       } 
      </div>
    </div>
  );
};

export default SentInviteList;
