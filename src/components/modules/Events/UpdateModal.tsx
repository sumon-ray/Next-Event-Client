import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import NextButton from "@/components/shared/NextButton";
import Title from "@/components/shared/Title";
import UpdateEventForm from "./UpdateEvent";
import { IEvent } from "@/app/types";


export const UpdateModal= ({event}:{event:IEvent}) => {


  
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
      <UpdateEventForm   event={event}/>
     
      </DialogContent>
    </Dialog>
  );
}