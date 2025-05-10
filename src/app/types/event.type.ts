
export interface IEvent {
    id?: string;
    slug: string;
    title: string;
    description: string;
    dateTime: string;
    startDate: string;
    endDate: string;
    venue: string;
    bannerImage: string;
    type: 'PUBLIC' | 'PRIVATE';
    fee: string;
    organizerId: string;
    isPaid: boolean;
  }
  