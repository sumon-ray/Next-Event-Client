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
  
  export const InviteModal = () => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <NextButton name="Invite" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Invitation</DialogTitle>
            <DialogDescription>
              Enter user email or ID to send an invitation to this event.
            </DialogDescription>
          </DialogHeader>
          {/* Add your form or content here */}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <Button type="submit">Send Invite</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };
  