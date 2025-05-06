
export interface IEvent {
    id: string;
    slug: string;
    title: string;
    description: string;
    dateTime: string;
    venue: string;
    bannerImage: string;
    type: 'PUBLIC' | 'PRIVATE';
    isPaid: boolean;
    fee: string;
    isDeleted: boolean;
    organizerId: string;
    createdAt: string;
    updatedAt: string;
  }
  