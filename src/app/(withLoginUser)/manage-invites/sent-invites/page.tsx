'use client'

import Image from "next/image";
import Title from "@/components/shared/Title";
import { deleteInvite, getMyAllSentInvites } from "@/services/InviteService";
import { useEffect, useState } from "react";
import NextButton from "@/components/shared/NextButton";
import { toast } from "sonner";
import Loader from "@/components/ui/Loader/Loader";

const MyAllSentInvites =  () => {
   const [invites, setInvites] = useState([]);
 const [loading, setLoading] = useState(false);



useEffect(() => { 
   setLoading(true);
  const getInvites = async () => {
    const data = await getMyAllSentInvites();
    setInvites(data?.data );
  };
  getInvites();
  setLoading(false);
  
},[])



const handleDelete = async (id: string) => {
  setLoading(true);
  const res =   await deleteInvite(id);
if (res.length > 0) {
  toast.success(res.message || "Invite deleted successfully");
}
  const updatedInvites = invites.filter((invite: any) => invite.id !== id);
  setInvites(updatedInvites);
 setLoading(false);


}

  return (
    <div className="px-4 py-6 md:mx-8">
      <div className="flex items-center justify-between mb-4">
        <Title title="Sent Invitations " />
      </div>

      <div className="w-full overflow-x-auto border rounded-lg shadow-sm">
       { loading && <div className="flex justify-center items-center md:h-[500px]"><Loader /></div>}
     
       { !loading &&
         invites?.length > 0? <table className="min-w-[900px] w-full text-left text-base">
         <thead className="text-sm font-medium text-gray-500 uppercase border-b">
           <tr>
             <th className="px-4 py-3 w-[200px]">Event</th>
             <th className="px-4 py-3 w-[140px]">Event Fee</th>
             <th className="px-4 py-3 w-[200px]">Receiver ID</th>
             <th className="px-4 py-3 w-[140px]">Status </th>
             <th className="px-4 py-3 w-[180px]">Action</th>
           </tr>
         </thead>
         <tbody>
           { invites.map((invite: any) => (
             <tr key={invite.id} className="transition-colors border-b ">
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
                 <td className="px-4 py-4">{invite.event?.fee || 0} BDT</td>
             
                 </div>
               </td>
               <td className="px-4 py-4">{invite.invitee?.email}</td>
               <td className="px-4 py-4">{invite.status } </td>
             
               <td className="px-4 py-4"><NextButton onClick={() => handleDelete(invite.id)} name="Delete" /></td>
             </tr>
           ))}
         </tbody>
       </table> : <div className="py-4 text-3xl text-center ">{!loading && " No Invitation has been sent"}</div>
       
       } 
      </div>
    </div>
  );
};

export default MyAllSentInvites;
