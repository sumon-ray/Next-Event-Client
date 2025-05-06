
import ManageInvitesTable from '@/components/modules/Invite/ManageInvitesTable';
import { getAllInvites } from '@/services/InviteService';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Manage Invites',
};

const ManageInvitesPage = async () => {
  const invitesData = await getAllInvites();
  console.log(invitesData);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Manage Invitations</h2>
      <ManageInvitesTable invites={invitesData?.data || []} />
    </div>
  );
};

export default ManageInvitesPage;
