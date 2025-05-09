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

  import { Button } from "@/components/ui/button";
import NextButton from "@/components/shared/NextButton";
import InviteUserTable from "./InviteTable";
import Title from "@/components/shared/Title";
  
  export const InviteModal = ({id}:{id:string }) => {
    return (
      <Dialog  >
        <DialogTrigger  asChild>
          <NextButton name="Invite" />
        </DialogTrigger>
        <DialogContent className="w-full overflow-auto max-h-[60vh] max-w-4xl mx-auto bg-gradient-to-br from-[#E3F2FD] via-[#BBDEFB] to-[#29B6F6]">

          <DialogHeader>
          <Title title="Send Invitation " />
            <DialogDescription>
            
            </DialogDescription>
          </DialogHeader>
          <InviteUserTable eventId={id}/>
          <DialogFooter className="flex items-center justify-center mx-auto mt-6 mb-16" >
            <DialogClose asChild>
              
              <NextButton name="Cancel" />
            </DialogClose>
          
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };
  