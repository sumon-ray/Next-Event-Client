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
import Title from "@/components/shared/Title";
import UpdateEventForm from "./UpdateEvent";


export const UpdateModal = ({id}:{id:string}) => {

  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <NextButton name="Update" />
      </DialogTrigger>
      <DialogContent className="bg-gradient-to-br from-[#E3F2FD] via-[#BBDEFB] to-[#E3F2FD] max-h-[90vh] overflow-y-auto w-full">
        <DialogHeader>
          <DialogTitle> <Title  title="Update Event" /></DialogTitle>
          <DialogDescription>
            Modify the event details below and save changes.
          </DialogDescription>
        </DialogHeader>
      <UpdateEventForm id={id}/>
     
      </DialogContent>
    </Dialog>
  );
}