// components/modules/Invite/ManageInvitesTable.tsx

'use client';

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { MoreHorizontal } from 'lucide-react';

interface ManageInvitesTableProps {
  invites: any[];
}

const ManageInvitesTable = ({ invites }: ManageInvitesTableProps) => {
  return (
    <div className="p-4 md:p-6 max-w-[1300px] mx-auto">
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="grid grid-cols-12 text-xs text-gray-500 py-2 px-4 border-b font-medium bg-gray-50">
          <div className="col-span-1">SELECT</div>
          <div className="col-span-3">INVITER</div>
          <div className="col-span-3">INVITEE</div>
          <div className="col-span-2">EVENT</div>
          <div className="col-span-1">STATUS</div>
          <div className="col-span-1">ACTION</div>
        </div>

        {invites?.map((invite) => (
          <div
            key={invite.id}
            className="grid grid-cols-12 py-3 px-4 items-center border-b hover:bg-gray-50"
          >
            <div className="col-span-1">
              <Checkbox />
            </div>
            <div className="col-span-3 flex items-center gap-3">
              <div className="w-10 h-10 relative">
                <Image
                  src={invite.inviter?.profileImage || '/avatar.png'}
                  alt={invite.inviter?.name || 'Inviter'}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <div>
                <p className="text-sm font-medium">{invite.inviter?.name}</p>
                <p className="text-xs text-gray-500">{invite.inviter?.email}</p>
              </div>
            </div>
            <div className="col-span-3 flex items-center gap-3">
              <div className="w-10 h-10 relative">
                <Image
                  src={invite.invitee?.profileImage || '/avatar.png'}
                  alt={invite.invitee?.name || 'Invitee'}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <div>
                <p className="text-sm font-medium">{invite.invitee?.name}</p>
                <p className="text-xs text-gray-500">{invite.invitee?.email}</p>
              </div>
            </div>
            <div className="col-span-2 capitalize text-sm">{invite.event?.title}</div>
            <div className="col-span-1">
              <Badge
                className={`text-xs capitalize transition-colors ${
                  invite.status === 'Accepted'
                    ? 'bg-green-100 text-green-700 hover:bg-black hover:text-white'
                    : invite.status === 'Declined'
                    ? 'bg-red-100 text-red-700 hover:bg-black hover:text-white'
                    : 'bg-yellow-100 text-yellow-700 hover:bg-black hover:text-white'
                }`}
              >
                {invite.status}
              </Badge>
            </div>
            <div className="col-span-1 flex justify-end">
              <Button size="icon" variant="ghost">
                <MoreHorizontal className="w-4 h-4 text-gray-500" />
              </Button>
            </div>
          </div>
        ))}

        {!invites?.length && (
          <div className="px-4 py-4 text-sm text-gray-500 text-center">
            No invites found.
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageInvitesTable;
