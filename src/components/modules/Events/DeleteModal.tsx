"use client";
import NextButton from "@/components/shared/NextButton";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { DeleteEvent } from "@/services/EventService";
import { toast } from "sonner";

export const DeleteModal = ({ id }: { id: string }) => {
  const handleDelete = async () => {
    const data = await DeleteEvent(id);

    if (!data.success) {
      toast.error(data.message || "Failed to delete event");
    } else if (data.success) {
      toast.success("Event deleted successfully!");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <NextButton name="Delete" />
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-gradient-to-br from-[#E3F2FD] via-[#BBDEFB] to-[#E3F2FD]">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this event?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            event.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-600" onClick={handleDelete}>
            Yes, Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
