import MyReceivedInvite from '@/components/modules/Invite/MyReceivedInvite';
import NextButton from '@/components/shared/NextButton';
import Title from '@/components/shared/Title';
import { getAllMyReceivedInvites } from '@/services/InviteService';
import { Mailbox, Send } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const MyReceivedInvitesPage = async () => {
    const invites = await getAllMyReceivedInvites();

    return (
        <div className='px-4 py-16 md:px-0'>

            <Title title="My Event Invites" />

            {
                invites.length > 0 ? (
                    <MyReceivedInvite invites={invites} />
                ) :
                    <div className='py-6 '>

                        <div className="flex flex-col items-center justify-center py-16 px-4 bg-gradient-to-br from-[#E3F2FD] via-[#BBDEFB] to-[#E3F2FD] rounded-xl shadow-inner">

                            <div className="relative w-48 h-48 mb-8">

                                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#1E3A8A] to-[#1E40AF] opacity-10"></div>

                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="p-6 bg-white rounded-full shadow-lg">
                                        <Mailbox className="w-12 h-12 text-[#1E3A8A]" strokeWidth={1.5} />
                                    </div>
                                </div>


                                <div className="absolute -right-2 -bottom-2">
                                    <Send className="w-16 h-16 text-[#1E3A8A]" strokeWidth={1.5} />
                                </div>
                            </div>


                            <h3 className="text-3xl font-semibold text-[#1E3A8A] mb-3">
                                No Invitations Sent
                            </h3>
                            <p className="text-[#475569] text-center max-w-md mb-6">
                                You haven't sent any invitations yet. Invite people to your events!

                            </p>



                            <Link href="/profile/my-events">
                                <NextButton name="Send Invitations" >


                                </NextButton>
                            </Link>

                        </div>
                    </div>
            }

        </div>
    );
};

export default MyReceivedInvitesPage;

export const dynamic = 'force-dynamic'