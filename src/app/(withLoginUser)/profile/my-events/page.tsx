import MyEvents from "@/components/modules/Events/MyEvents";
import NextButton from "@/components/shared/NextButton";
import Title from "@/components/shared/Title";
import { getEventsOfUser } from "@/services/EventService";
import { Calendar, Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const MyEventsPage = async () => {
  const events = await getEventsOfUser();


  return (
    <div className="pt-12">
      <Title title="My Events" />
      {events && events.length > 0 ? (
        <MyEvents events={events} />
      ) : (
        <div className="flex flex-col items-center mt-6 justify-center py-16 px-4 bg-gradient-to-br from-[#E3F2FD] via-[#BBDEFB] to-[#E3F2FD] rounded-xl shadow-inner">
    
      <div className="relative w-48 h-48 mb-8">
      
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#1E3A8A] to-[#1E40AF] opacity-10"></div>
        
      
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="p-6 bg-white rounded-full shadow-lg">
            <Calendar className="w-12 h-12 text-[#1E3A8A]" strokeWidth={1.5} />
          </div>
        </div>
        
  
        <div className="absolute -right-2 -bottom-2">
          <Plus className="w-16 h-16 text-[#1E3A8A]" strokeWidth={1.5} />
        </div>
      </div>
      
    
      <h3 className="text-2xl font-semibold text-[#1E3A8A] mb-3">
        {'No Events Found'}
      </h3>
      <p className="text-[#475569] text-center max-w-md mb-6">
        { "There are currently no events available. Check back later!"}
      </p>
<Link href="/profile/add-event">
          <NextButton name="Add Event">
           
          
          </NextButton>
        </Link>
     
   
       </div>
      )}
    </div>
  );
};

export default MyEventsPage;


export const dynamic = 'force-dynamic'
