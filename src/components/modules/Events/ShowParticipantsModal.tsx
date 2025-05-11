// components/InviteModal.tsx
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
  } from "@/components/ui/dialog";

import NextButton from "@/components/shared/NextButton";
import Title from "@/components/shared/Title";
import ParticipantsTable from "./ParticipantsTable";
import { IEvent } from "@/app/types";
  
  export const ShowParticipantsModal = ({event, id}:{event:IEvent | any ,id:string }) => {
    return (
      <Dialog  >
        <DialogTrigger  asChild>
          <NextButton name="Participants" />
        </DialogTrigger>
        <DialogContent className="w-full overflow-auto max-h-[60vh] max-w-4xl mx-auto bg-gradient-to-br from-[#E3F2FD] via-[#BBDEFB] to-[#29B6F6]">

          <DialogHeader>
            <DialogTitle>  <Title title="Event Participants" /></DialogTitle>
            
            <DialogDescription>
            
            </DialogDescription>
          </DialogHeader>
          <ParticipantsTable event={event}/>
          <DialogFooter className="flex items-center justify-center mx-auto mt-6 mb-16" >
            <DialogClose asChild>
              
              <NextButton name="Cancel" />
            </DialogClose>
          
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };
  