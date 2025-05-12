"use client";

import Image from "next/image";
import Title from "@/components/shared/Title";
import NextButton from "@/components/shared/NextButton";
import Link from "next/link";
import { getCurrentUser } from "@/services/AuthService";
import { toast } from "sonner";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { makePayment } from "@/services/PaymentService";
import { acceptInvite, rejectInvite } from "@/services/InviteService";

interface Invite {
  id: string;
  status: "PENDING" | "ACCEPTED" | "DECLINED";
  eventId: string;
  event: {
    slug: string;
    title: string;
    type: string;
    venue: string;
    fee: number;
    isPaid: boolean;
    bannerImage: string;
  };
  inviter: {
    name: string;
    email: string;
    profileImage: string;
  };
}

interface Props {
  invites: {
    data: Invite[];
  };
}

const MyReceivedInvite = ({ invites }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [actionType, setActionType] = useState<"pay" | "accept" | "reject" | null>(null);

  const handlePayment = async (eventId: string, inviteId: string) => {
    try {
      const user = await getCurrentUser();
      if (!user) {
        toast.warning("You must be logged in to register for this event.");
        router.push(`/login?redirectPath=${encodeURIComponent(pathname)}`);
        return;
      }

      setLoadingId(inviteId);
      setActionType("pay");

      const response = await makePayment({
        eventId,
        method: "Online",
      });

      if (response?.success) {
        window.location.href = response.data.paymentUrl;
      } else {
        toast.error(response.message || "Payment failed");
        console.error("Payment failed", response);
      }
    } catch (error) {
      console.error("handlePayment error:", error);
    } finally {
      setLoadingId(null);
      setActionType(null);
    }
  };

  const handleAccept = async (inviteId: string) => {
    try {
      setLoadingId(inviteId);
      setActionType("accept");

      const accepted = await acceptInvite(inviteId);
      if (accepted?.success) {
        toast.success("Invite accepted successfully");
        router.refresh();
      } else {
        toast.error(accepted?.message || "Failed to accept invite");
      }
    } finally {
      setLoadingId(null);
      setActionType(null);
    }
  };

  const handleReject = async (inviteId: string) => {
    try {
      setLoadingId(inviteId);
      setActionType("reject");

      const rejected = await rejectInvite(inviteId);
      if (rejected?.success) {
        toast.success("Invite rejected successfully");
        router.refresh();
      } else {
        toast.error(rejected?.message || "Failed to reject invite");
      }
    } finally {
      setLoadingId(null);
      setActionType(null);
    }
  };

  return (
    <div className="w-full md:w-[80%] mx-auto px-4 md:px-2 py-6 mb-20">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <Title title="My Event Invites" />
      </div>

      <div className="w-full overflow-x-auto border border-white rounded-lg shadow-md">
        <table className="w-full text-left text-base">
          <thead className="text-sm font-medium text-gray-500 uppercase border-b border-white">
            <tr>
              <th className="px-4 py-3 w-[200px] pl-10">Event</th>
              <th className="px-4 py-3 w-[150px] border-2">Venue</th>
              <th className="px-4 py-3 w-[120px] border-2">Type</th>
              <th className="px-4 py-3 w-[100px] border-2">Fee</th>
              <th className="px-4 py-3 w-[200px] border-2">Inviter</th>
              <th className="px-4 py-3 w-[180px] border-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invites?.data?.map((invite) => (
              <tr key={invite.id} className="border-white">
                <td className="flex items-center gap-3 px-4 py-3 border-2">
                  <div className="relative w-10 h-10">
                    <Image
                      src={invite.event?.bannerImage || "/placeholder.svg"}
                      alt={invite.event?.title || "Event"}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <Link href={`/events/${invite.event?.slug}`}>
                    <span className="font-medium text-gray-800">
                      {invite.event?.title}
                    </span>
                  </Link>
                </td>
                <td className="px-4 py-3 truncate border-2">{invite.event?.venue}</td>
                <td className="px-4 py-3 border-2">{invite.event?.type}</td>
                <td className="px-4 py-3 border-2">
                  {invite.event?.isPaid ? `$${invite.event?.fee}` : "Free"}
                </td>
                <td className="px-4 py-3 border-2">
                  <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8">
                      <Image
                        src={invite.inviter?.profileImage || "/placeholder.svg"}
                        alt={invite.inviter?.name}
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{invite.inviter?.name}</p>
                      <p className="text-sm text-gray-500">{invite.inviter?.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 border-2">
                  <div className="flex justify-center items-center gap-2">
                    {invite.status === "ACCEPTED" ? (
                      <NextButton name="Accepted" disabled />
                    ) : invite.status === "DECLINED" ? (
                      <NextButton name="Rejected" disabled />
                    ) : (
                      <>
                        {invite.event?.isPaid ? (
                          <NextButton
                            onClick={() => handlePayment(invite.eventId, invite.id)}
                            name={
                              loadingId === invite.id && actionType === "pay"
                                ? "Processing..."
                                : "Pay & Accept"
                            }
                            disabled={loadingId === invite.id && actionType === "pay"}
                          />
                        ) : (
                          <NextButton
                            name={
                              loadingId === invite.id && actionType === "accept"
                                ? "Processing..."
                                : "Accept"
                            }
                            onClick={() => handleAccept(invite.id)}
                            disabled={loadingId === invite.id && actionType === "accept"}
                          />
                        )}
                        <NextButton
                          name={
                            loadingId === invite.id && actionType === "reject"
                              ? "Processing..."
                              : "Reject"
                          }
                          onClick={() => handleReject(invite.id)}
                          disabled={loadingId === invite.id && actionType === "reject"}
                        />
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyReceivedInvite;
