'use client'
import { motion } from "framer-motion";
import Image from "next/image";
import Title from "@/components/shared/Title";
import { deleteInvite, getMyAllSentInvites } from "@/services/InviteService";
import { useEffect, useState } from "react";
import NextButton from "@/components/shared/NextButton";
import { toast } from "sonner";
import Loader from "@/components/ui/Loader/Loader";
import { Calendar, Mailbox, Plus, Send } from "lucide-react";
import Link from "next/link";

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
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }} className="px-4 py-6 md:mx-0">
      <div className="flex items-center justify-between mb-4">
        <Title title="Sent Invitations " />
      </div>

      <div className="w-full overflow-x-auto border rounded-lg shadow-sm">
       { loading && <div className="flex justify-center items-center md:h-[500px]"><Loader />
      </div>}
   
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
                 {invite.event?.fee || 0} BDT
               </div>
             </td>
               <td className="px-4 py-4">{invite.invitee?.email}</td>
               <td className="px-4 py-4">{invite.status } </td>
             
               <td className="px-4 py-4"><NextButton onClick={() => handleDelete(invite.id)} name="Delete" /></td>
             </tr>
           ))}
         </tbody>
       </table>
     
       
       :  
            <div className="flex flex-col items-center justify-center py-16 px-4 bg-gradient-to-br from-[#E3F2FD] via-[#BBDEFB] to-[#E3F2FD] rounded-xl shadow-inner">

      <div className="relative w-48 h-48 mb-8">
 
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#1E3A8A] to-[#1E40AF] opacity-10"></div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="p-6 bg-white rounded-full shadow-lg">
            <Mailbox className="w-12 h-12 text-[#1E3A8A]" strokeWidth={1.5} />
          </div>
        </div>
        

        <div className="absolute -right-2 -bottom-2">
          <Send className="w-16 h-16 text-[#1E3A8A]" strokeWidth={1.5} />
        </div>
      </div>
      

      <h3 className="text-3xl font-semibold text-[#1E3A8A] mb-3">
       No Invitations Sent
      </h3>
      <p className="text-[#475569] text-center max-w-md mb-6">
        You haven't sent any invitations yet. Invite people to your events!
          
      </p>

   
     
        <Link href="/profile/my-events">
          <NextButton name="Send Invitations" >
           
        
          </NextButton>
        </Link>
     
    </div>
       } 
      </div>
     
    </motion.div>
  );
};

export default MyAllSentInvites;
