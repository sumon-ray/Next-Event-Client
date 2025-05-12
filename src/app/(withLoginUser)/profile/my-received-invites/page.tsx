import MyReceivedInvite from '@/components/modules/Invite/MyReceivedInvite';
import { getAllMyReceivedInvites } from '@/services/InviteService';
import React from 'react';

const MyReceivedInvitesPage = async() => {
    const invites = await getAllMyReceivedInvites();
    return (
        <div>
            <MyReceivedInvite invites={invites}/>
        </div>
    );
};

export default MyReceivedInvitesPage;

export const dynamic = 'force-dynamic'